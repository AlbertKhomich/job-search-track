import {
  fetchFilteredCompanies,
  fetchFilteredCompaniesWithoutOffset,
} from "../lib/data";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import CounterCard from "./counter";
import { EditCompany, UpdateCompany } from "./buttons";
import { DeleteAction } from "./deleteModal";
import { Badge } from "flowbite-react";
import { auth } from "@/auth";
import MakePdf from "@/app/ui/toPdfBtn";

const badges = {
  Beworben: "gray",
  beworben: "gray",
  Absage: "failure",
  Vorstellungsgespräch: "warning",
  Angebot: "success",
};

export default async function CompaniesTable({
  query,
  startDate,
  endDate,
  currentPage,
  totalRows,
}: {
  query: string;
  startDate: string;
  endDate: string;
  currentPage: number;
  totalRows: number;
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
    <div className="overflow-x-auto">
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
        <Table striped>
          <TableHead>
            <TableHeadCell>Company</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            {session?.user && (
              <>
                <TableHeadCell>
                  <span className="sr-only">Update</span>
                </TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Delete</span>
                </TableHeadCell>
              </>
            )}
          </TableHead>
          <TableBody className="divide-y">
            {companies?.map((company) => (
              <TableRow
                key={company.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {company.name}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge color={badges[`${company.status}`]}>
                      {company.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  {moment(company.date).format("DD.MM.YYYY")}
                </TableCell>
                {session?.user && (
                  <>
                    <TableCell>
                      <UpdateCompany id={company.id} />
                    </TableCell>
                    <TableCell>
                      <EditCompany id={company.id} />
                    </TableCell>
                    <TableCell>
                      <DeleteAction
                        id={company.id}
                        companyTitle={company.name}
                      />
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
