"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { uuid } from "uuidv4";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchActionById } from "./data";

const AddFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ invalid_type_error: "Please enter a name." })
    .min(1, { message: "Name is required." })
    .max(60, { message: "Name must be at most 60 chatacters long." }),
  status: z.enum(["Beworben", "Absage", "Vorstellungsgespräch", "Angebot"]),
  date: z.string(),
});

const AddCompany = AddFormSchema.omit({ id: true });

const UpdateAction = AddFormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    status?: string[];
    date?: string[];
  };
  message?: string | null;
};

export async function addCompany(prevState: State, formData: FormData) {
  const validatedFields = AddCompany.safeParse({
    name: formData.get("companyName"),
    status: formData.get("status"),
    date: formData.get("date"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Action.",
    };
  }

  const { name, status, date } = validatedFields.data;

  const id = uuid();

  try {
    await sql`
    INSERT INTO companies (id, name)
    VALUES (${id}, ${name})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to create a Company.",
    };
  }

  try {
    await sql`
    INSERT INTO actions (company_id, name, date)
    VALUES (${id}, ${status}, ${date})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to create Action.",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateAction(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateAction.safeParse({
    name: formData.get("companyName"),
    status: formData.get("status"),
    date: formData.get("date"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fileds. Failed to Edit Action.",
    };
  }

  const { name, status, date } = validatedFields.data;

  try {
    const currAction = await fetchActionById(id);

    await sql`
          UPDATE companies
          SET name = ${name}
          WHERE id = ${currAction.company_id}
          `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Companies." };
  }

  try {
    await sql`
          UPDATE actions
          SET name = ${status}, date = ${date}
          WHERE id = ${id}`;
  } catch (error) {
    return { message: "Database Error: Failed to Update Actions." };
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteAction(id: string) {
  try {
    await sql`DELETE FROM actions WHERE id = ${`${id}`}`;
  } catch (error) {
    return { message: "Database Error: Failed to Delete Action." };
  }

  revalidatePath("/");
}
