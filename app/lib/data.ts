import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { CompaniesTableType } from "./definitions";

export async function fetchCompanies() {
  noStore();

  try {
    const data = await sql<CompaniesTableType>`
    SELECT *
    FROM (
        SELECT DISTINCT ON (companies.name)
            actions.id AS id, 
            companies.name AS name, 
            actions.name AS status, 
            actions.date AS date
    FROM 
        companies
    JOIN 
        actions ON companies.id = actions.company_id
    ORDER BY 
        companies.name, actions.date DESC
    ) AS subquery
    ORDER BY
        subquery.date DESC;
    `;
    // const data = await sql<CompaniesTableType>`
    // SELECT actions.id AS key, companies.name AS name, actions.name AS status, actions.date AS date
    // FROM companies
    // JOIN actions ON companies.id = actions.company_id
    // ORDER BY actions.date DESC;
    // `;

    return data.rows;
  } catch (error) {
    console.log("Database Error", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
