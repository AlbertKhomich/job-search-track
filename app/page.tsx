import CompaniesTable from "@/app/ui/table";
import Search from "./ui/search";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  return (
    <main>
      <Search placeholder="Search companies..." />
      <CompaniesTable query={query} />
    </main>
  );
}
