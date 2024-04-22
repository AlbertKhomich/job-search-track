import { fetchFilteredCompanies } from "../lib/data";

export default async function CompaniesTable({ query }: { query: string }) {
  const companies = await fetchFilteredCompanies(query);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sx text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {company.name}
              </th>
              <td className="px-6 py-4">{company.status}</td>
              <td className="px-6 py-4">{`${String(
                company.date.getDate()
              ).padStart(2, "0")}.${String(
                company.date.getMonth() + 1
              ).padStart(2, "0")}.${company.date.getFullYear()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
