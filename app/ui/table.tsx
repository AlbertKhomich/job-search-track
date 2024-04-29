import { fetchFilteredCompanies } from "../lib/data";
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

  return (
    <div className="overflow-x-auto">
      <CounterCard countTotal={totalRows} />
      <Table striped>
        <TableHead>
          <TableHeadCell>Company</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Update</span>
          </TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Delete</span>
          </TableHeadCell>
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
              <TableCell>{moment(company.date).format("DD.MM.YYYY")}</TableCell>
              <TableCell>
                <UpdateCompany id={company.id} />
              </TableCell>
              <TableCell>
                <EditCompany id={company.id} />
              </TableCell>
              <TableCell>
                <DeleteAction id={company.id} companyTitle={company.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
