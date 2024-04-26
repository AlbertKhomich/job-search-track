import Link from "next/link";
import { FaEdit } from "react-icons/fa";

export function EditCompany({ id }: { id: string }) {
  return (
    <Link
      href={`/action/${id}/edit`}
      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
    >
      <FaEdit className="w-5 h-5" />
    </Link>
  );
}

export function UpdateCompany({ id }: { id: string }) {
  return (
    <Link
      href={`/action/${id}/update`}
      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
    >
      Update
    </Link>
  );
}
