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
    // <div className="relative overflow-x-auto">
    //   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-cyan-100">
    //     <thead className="text-sx text-gray-700 uppercase bg-gray-50 dark:bg-neutral-300 dark:text-cyan-950">
    //       <tr>
    //         <th scope="col" className="px-6 py-3">
    //           Company
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Status
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Date
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {companies?.map((company) => (
    //         <tr
    //           key={company.id}
    //           className="bg-white border-b dark:bg-cyan-950 dark:border-gray-700"
    //         >
    //           <th
    //             scope="row"
    //             className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //           >
    //             {company.name}
    //           </th>
    //           <td className="px-6 py-4">{company.status}</td>
    //           <td className="px-6 py-4">
    //             {moment(company.date).format("DD.MM.YYYY")}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}
