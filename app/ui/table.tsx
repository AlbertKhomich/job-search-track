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

export default async function CompaniesTable({
  query,
  startDate,
  endDate,
}: {
  query: string;
  startDate: string;
  endDate: string;
}) {
  const companies = await fetchFilteredCompanies(query, startDate, endDate);

  return (
    <div className="overflow-x-auto">
      <CounterCard countTotal={companies.length} />
      <Table striped>
        <TableHead>
          <TableHeadCell>Company</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          {/* <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell> */}
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
              <TableCell>{company.status}</TableCell>
              <TableCell>{moment(company.date).format("DD.MM.YYYY")}</TableCell>
              {/* <TableCell>
                <a
                  href="http://"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
