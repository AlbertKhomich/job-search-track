import CompaniesTable from "@/app/ui/table";
import Search from "./ui/search";
import DatePicker from "./ui/datepicker";
import { tomorrow } from "./lib/utils";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    startDate?: string;
    endDate?: string;
  };
}) {
  const query = searchParams?.query || "";
  const startDate =
    searchParams?.startDate || new Date("01.01.2024").toISOString();
  const endDate = searchParams?.endDate || tomorrow;
  return (
    <main>
      <div className="mb-5 grid">
        <div className="flex">
          <div className="col">
            <div className="inline-grid">
              <DatePicker />
            </div>
          </div>
          <Search placeholder="Search companies..." />
        </div>
      </div>
      <CompaniesTable query={query} startDate={startDate} endDate={endDate} />
    </main>
  );
}
