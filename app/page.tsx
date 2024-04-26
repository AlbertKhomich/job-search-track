import CompaniesTable from "@/app/ui/table";
import Search from "./ui/search";
import DatePicker from "./ui/datepicker";
import { fetchDates } from "./lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    startDate?: string;
    endDate?: string;
  };
}) {
  const { dateStart, dateEnd } = await fetchDates();

  const query = searchParams?.query || "";
  const startDate = searchParams?.startDate || dateStart;
  const endDate = searchParams?.endDate || dateEnd;

  return (
    <main>
      <div className="mb-5 grid">
        <div className="flex">
          <div className="col">
            <div className="inline-grid">
              <DatePicker dateStart={dateStart} dateEnd={dateEnd} />
            </div>
          </div>
          <Search placeholder="Search companies..." />
        </div>
      </div>
      <CompaniesTable query={query} startDate={startDate} endDate={endDate} />
    </main>
  );
}
