import {
  fetchFilteredCompanies,
  fetchFilteredCompaniesWithoutOffset,
} from "../lib/data";
import CounterCard from "./counter";
import { auth } from "@/auth";
import MakePdf from "@/app/ui/toPdfBtn";
import LoadMore from "./load-more";
import Company from "./company";

export default async function CompaniesTable({
  query,
  startDate,
  endDate,
  currentPage,
  totalRows,
  totalPages,
}: {
  query: string;
  startDate: string;
  endDate: string;
  currentPage: number;
  totalRows: number;
  totalPages: number;
}) {
  const companies = await fetchFilteredCompanies(
    query,
    startDate,
    endDate,
    currentPage
  );

  const pdf = await fetchFilteredCompaniesWithoutOffset(
    query,
    startDate,
    endDate
  );

  const session = await auth();

  return (
    <div className="overflow-x-auto grid">
      <div className="flex">
        <CounterCard countTotal={totalRows} />
        <div className="ml-5 mb-5 content-end">
          <MakePdf
            rows={pdf}
            startDate={startDate}
            endDate={endDate}
            search={query}
          />
        </div>
      </div>
      {companies.length > 0 ? (
        <div className="grid justify-items-center">
          {companies?.map((company) => (
            <Company
              name={company.name}
              status={company.status}
              date={company.date}
              id={company.id}
              session={session}
              key={company.id}
            />
          ))}
          <LoadMore
            query={query}
            startDate={startDate}
            endDate={endDate}
            totalPages={totalPages}
            session={session}
          />
        </div>
      ) : (
        <div className="text-center mt-12">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            No matches
          </h5>
        </div>
      )}
    </div>
  );
}
