import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { CompaniesTableType } from "./definitions";

export async function fetchFilteredCompanies(
  query: string,
  dateStart: string,
  dateEnd: string
) {
  noStore();

  try {
    const companies = await sql<CompaniesTableType>`
        SELECT
            actions.id,
            companies.name,
            actions.name AS status,
            actions.date
        FROM companies
        JOIN actions ON companies.id = actions.company_id
        WHERE
            (actions.date BETWEEN ${`${dateStart}`} AND ${`${dateEnd}`}) AND
            (companies.name ILIKE ${`%${query}%`} OR
            actions.name ILIKE ${`%${query}%`} OR
            actions.date::text ILIKE ${`%${query}%`})
        ORDER BY actions.date DESC
        `;

    return companies.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch companies.");
  }
}

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

    return data.rows;
  } catch (error) {
    console.log("Database Error", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchDates() {
  noStore();

  try {
    const dateStartPromise = sql`
        SELECT actions.date FROM actions
        ORDER BY actions.date
        LIMIT 1
        `;

    const dateEndPromise = sql`
        SELECT actions.date FROM actions
        ORDER BY actions.date DESC
        LIMIT 1
        `;

    const data = await Promise.all([dateStartPromise, dateEndPromise]);

    const dateStart = data[0].rows[0].date.toLocaleString();
    const dateEnd = data[1].rows[0].date.toLocaleString();

    return {
      dateStart,
      dateEnd,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}
