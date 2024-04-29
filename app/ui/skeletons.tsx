export function CounterSkeleton() {
  return (
    <div className=" relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 p-2 shadow-sm max-w-sm w-52 text-center">
      <div className="grid p-4 place-content-center">
        <div className="h-8 w-32 rounded-md bg-gray-200 dark:bg-gray-700 text-sm font-medium" />
      </div>
    </div>
  );
}

export function TableReportRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 dark:border-gray-700 last-of-type:border-none  [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap h-20 w-2/3 px-3 py-3">
        <div className="h-6 w-full rounded bg-gray-100 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap w-1/6 px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap w-1/6 px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100 dark:bg-gray-700"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100 dark:bg-gray-700"></div>
      </td>
    </tr>
  );
}

export function TableReportSkeleton() {
  return (
    <table className="hidden min-w-full text-gray-700 dark:text-gray-400 mt-4 md:table">
      <thead className="uppercase rounded-lg h-10 text-left bg-gray-100 dark:bg-gray-700 text-xs font-bold">
        <tr>
          <th scope="col" className="rounded-tl-lg px-4 font-bold sm:pl-6">
            Company
          </th>
          <th scope="col" className="px-4 font-bold sm:pl-6">
            Status
          </th>
          <th scope="col" className="px-4 font-bold sm:pl-6">
            Date
          </th>
          <th scope="col" className="relative pl-3 pr-6 sm:pr-6">
            <span className="sr-only">Update</span>
          </th>
          <th scope="col" className="relative pl-3 pr-6 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
          <th scope="col" className="relative rounded-tr-lg pl-3 pr-6 sm:pr-6">
            <span className="sr-only">Delete</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800">
        <TableReportRowSkeleton />
        <TableReportRowSkeleton />
        <TableReportRowSkeleton />
        <TableReportRowSkeleton />
        <TableReportRowSkeleton />
        <TableReportRowSkeleton />
        <TableReportRowSkeleton />
        <TableReportRowSkeleton />
        <TableReportRowSkeleton />
      </tbody>
    </table>
  );
}

export function FullTableSkeleton() {
  return (
    <div className="animate-pulse">
      <CounterSkeleton />
      <TableReportSkeleton />
    </div>
  );
}
