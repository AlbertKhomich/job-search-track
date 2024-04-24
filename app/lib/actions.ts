"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { uuid } from "uuidv4";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const AddFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["Beworben", "Absage", "Vorstellungsgespräch", "Angebot"]),
  date: z.string(),
});

const AddCompany = AddFormSchema.omit({ id: true, status: true, date: true });

export async function addCompany(formData: FormData) {
  const { name } = AddCompany.parse({
    name: formData.get("companyName"),
  });
  const id = uuid();
  const status = "Beworben";
  const date = new Date().toISOString();

  await sql`
  INSERT INTO companies (id, name)
  VALUES (${id}, ${name})
  `;

  await sql`
  INSERT INTO actions (company_id, name, date)
  VALUES (${id}, ${status}, ${date})`;

  revalidatePath("/");
  redirect("/");
}
