import CompaniesTable from "@/app/ui/table";
import Search from "./ui/search";
import DatePicker from "./ui/datepicker";
import { fetchDates, fetchActionsPage } from "./lib/data";
import { Suspense } from "react";
import { FullTableSkeleton } from "./ui/skeletons";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
  };
}) {
  const { dateStart, dateEnd } = await fetchDates();

  const query = searchParams?.query || "";
  const startDate = searchParams?.startDate || dateStart;
  const endDate = searchParams?.endDate || dateEnd;
  const currentPage = Number(searchParams?.page) || 1;

  const { totalRows, totalPages } = await fetchActionsPage(
    query,
    startDate,
    endDate
  );

  return (
    <main>
      <div className="mb-5 grid">
        <div className="md:flex">
          <DatePicker dateStart={dateStart} dateEnd={dateEnd} />
          <div className="flex-1 mt-5 md:mt-0">
            <Search placeholder="Search companies..." />
          </div>
        </div>
      </div>
      <Suspense fallback={<FullTableSkeleton />}>
        <CompaniesTable
          query={query}
          startDate={startDate}
          endDate={endDate}
          currentPage={currentPage}
          totalRows={totalRows}
          totalPages={totalPages}
        />
      </Suspense>
      {/* <div className="grid place-items-center">
        {totalPages > 0 && <Pagination totalPages={totalPages} />}
      </div> */}
    </main>
  );
}
