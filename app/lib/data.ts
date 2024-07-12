"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { CompaniesTableType, ActionForm } from "./definitions";
import moment from "moment";

const ITEMS_PER_PAGE = 20;

export async function fetchFilteredCompaniesWithoutOffset(
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
    ORDER BY actions.date DESC, actions.id`;

    return companies.rows;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch companies.");
  }
}

export async function fetchFilteredCompanies(
  query: string,
  dateStart: string,
  dateEnd: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

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
        ORDER BY actions.date DESC, actions.id
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
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

    const dateStart: string = moment(data[0].rows[0].date).format("MM/DD/YYYY");
    const dateEnd: string = moment(data[1].rows[0].date).format("MM/DD/YYYY");

    return {
      dateStart,
      dateEnd,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch dates.");
  }
}

export async function fetchActionById(id: string) {
  noStore();

  try {
    const data = await sql<ActionForm>`
    SELECT 
      actions.id,
      actions.company_id,
      actions.name AS status,
      actions.date,
      companies.name
    FROM actions
    JOIN companies ON actions.company_id = companies.id
    WHERE actions.id = ${`${id}`}
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch action.");
  }
}

export async function fetchActionsPage(
  query: string,
  dateStart: string,
  dateEnd: string
) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
        FROM companies
        JOIN actions ON companies.id = actions.company_id
        WHERE
            (actions.date BETWEEN ${`${dateStart}`} AND ${`${dateEnd}`}) AND
            (companies.name ILIKE ${`%${query}%`} OR
            actions.name ILIKE ${`%${query}%`} OR
            actions.date::text ILIKE ${`%${query}%`})`;

    const totalRows = Number(count.rows[0].count);
    const totalPages = Math.ceil(Number(totalRows / ITEMS_PER_PAGE));
    return { totalRows, totalPages };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of actions.");
  }
}
