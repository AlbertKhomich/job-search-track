"use client";

import Link from "next/link";
import { CompaniesTableType } from "../lib/definitions";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import { FaFilePdf } from "react-icons/fa6";

export default function MakePdf({
  rows,
  startDate,
  endDate,
  search,
}: {
  rows: CompaniesTableType[];
  startDate: string;
  endDate: string;
  search: string;
}) {
  const makeBody = (rows: CompaniesTableType[]) => {
    const result: string[][] = [];
    rows.forEach((row, i) => {
      result.push([
        (i + 1).toString(),
        row.name,
        row.status,
        moment(row.date).format("DD.MM.YYYY"),
      ]);
    });
    return result;
  };

  const generatePdf = (body: string[][]) => {
    const doc = new jsPDF("portrait");
    doc.setFontSize(18);
    doc.text("Job Report - Albert Khomich", 20, 20);
    doc.setFontSize(15);
    doc.text(`For time: ${startDate} - ${endDate}`, 20, 30);
    search !== "" && doc.text(`For request: '${search}'`, 20, 40);
    autoTable(doc, {
      head: [["", "Company", "Status", "Date"]],
      body: body,
      theme: "striped",
      margin: { top: 50 },
    });
    doc.setFontSize(12);
    doc.save("JobReport-Albert-Khomich.pdf");
  };

  const handleClick = () => {
    const body = makeBody(rows);
    return generatePdf(body);
  };

  return (
    <Link
      href=""
      onClick={handleClick}
      className="font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-500 dark:hover:text-cyan-600"
    >
      <FaFilePdf className="text-xl" />
    </Link>
  );
}
