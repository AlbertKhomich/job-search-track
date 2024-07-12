"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchFilteredCompanies } from "../lib/data";
import { CompaniesTableType } from "../lib/definitions";
import { useSearchParams } from "next/navigation";
import Company from "./company";
import { Session } from "next-auth";

let page = 2;

export default function LoadMore({
  query,
  startDate,
  endDate,
  totalPages,
  session,
}: {
  query: string;
  startDate: string;
  endDate: string;
  totalPages: number;
  session: Session | null;
}) {
  const searchParams = useSearchParams();

  const { ref, inView } = useInView();
  const [data, setData] = useState<CompaniesTableType[]>([]);

  useEffect(() => {
    setData([]);
    page = 2;
  }, [searchParams]);

  useEffect(() => {
    if (inView && page <= totalPages) {
      fetchFilteredCompanies(query, startDate, endDate, page).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      {data?.map((company) => (
        <Company
          name={company.name}
          status={company.status}
          date={company.date}
          id={company.id}
          session={session}
          key={company.id}
        />
      ))}
      <div ref={ref}></div>
    </>
  );
}
