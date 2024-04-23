import { fetchFilteredCompanies } from "../lib/data";
import moment from "moment";

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
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-cyan-100">
        <thead className="text-sx text-gray-700 uppercase bg-gray-50 dark:bg-neutral-300 dark:text-cyan-950">
          <tr>
            <th scope="col" className="px-6 py-3">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {companies?.map((company) => (
            <tr
              key={company.id}
              className="bg-white border-b dark:bg-cyan-950 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {company.name}
              </th>
              <td className="px-6 py-4">{company.status}</td>
              <td className="px-6 py-4">
                {moment(company.date).format("DD.MM.YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
