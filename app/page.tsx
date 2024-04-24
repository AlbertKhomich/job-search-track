import CompaniesTable from "@/app/ui/table";
import Search from "./ui/search";
import { fetchDates } from "./lib/data";
import DatePicker from "./ui/datepicker";

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
    <main className="grid place-items-center">
      <div className="md:w-6/12 mt-32 mx-4 md:mx-16 mb-32">
        <div className="mb-5 grid grid-cols-4">
          <div className="col-span-2 ml-3">
            <Search placeholder="Search companies..." />
          </div>
          <div className="col-span-2">
            <DatePicker />
          </div>
        </div>
        <CompaniesTable query={query} startDate={startDate} endDate={endDate} />
      </div>
    </main>
  );
}
