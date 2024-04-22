import CompaniesTable from "@/app/ui/table";
import { fetchCompanies } from "./lib/data";

export default async function Home() {
  const companies = await fetchCompanies();

  return (
    <main>
      <CompaniesTable companies={companies} />
    </main>
  );
}
