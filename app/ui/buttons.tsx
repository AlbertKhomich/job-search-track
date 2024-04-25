import Link from "next/link";
import { deleteAction } from "../lib/actions";

export function UpdateCompany({ id }: { id: string }) {
  return (
    <Link
      href={`/action/${id}/edit`}
      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
    >
      Edit
    </Link>
  );
}

export function DeleteAction({ id }: { id: string }) {
  const deleteActionWithId = deleteAction.bind(null, id);

  return (
    <form action={deleteActionWithId}>
      <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
        Delete
      </button>
    </form>
  );
}
