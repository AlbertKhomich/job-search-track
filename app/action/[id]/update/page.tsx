import { fetchActionById } from "@/app/lib/data";
import UpdateActionForm from "@/app/ui/update-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const action = await fetchActionById(id);

  if (!action) {
    notFound();
  }

  return (
    <main className="grid place-items-center mt-20">
      <UpdateActionForm action={action} />
    </main>
  );
}
