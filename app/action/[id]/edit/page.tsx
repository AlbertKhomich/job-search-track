import { fetchActionById } from "@/app/lib/data";
import EditActionForm from "@/app/ui/edit-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const action = await fetchActionById(id);

  if (!action) {
    notFound();
  }

  return (
    <main className="grid place-items-center mt-20">
      <EditActionForm action={action} />
    </main>
  );
}
