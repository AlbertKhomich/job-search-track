const { db } = require("@vercel/postgres");
const jsonData = require("../app/lib/data");
const { uuid } = require("uuidv4");

companies = [];
actions = [];

for (const name in jsonData) {
  currentId = uuid();
  companies.push({ id: currentId, name: name });
  for (const status in jsonData[name]) {
    actions.push({
      id: uuid(),
      company_id: currentId,
      name: status,
      date: jsonData[name][status],
    });
  }
}

async function seedCompanies(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS companies (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    `;

    console.log("Created companies table");

    const insertedCompanies = await Promise.all(
      companies.map(async (company) => {
        return client.sql`
            INSERT INTO companies (id, name)
            VALUES (${company.id}, ${company.name})
            ON CONFLICT (id) DO NOTHING;
            `;
      })
    );

    console.log(`Seeded ${companies.length} companies`);

    return {
      createTable,
      companies: insertedCompanies,
    };
  } catch (error) {
    console.error("Error seeding companies:", error);
    throw error;
  }
}

async function seedActions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS actions (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            company_id UUID NOT NULL,
            name VARCHAR(255) NOT NULL,
            date DATE NOT NULL
        );
        `;

    console.log(`Created "actions" table`);

    const insertedActions = await Promise.all(
      actions.map(async (action) => {
        return client.sql`
                INSERT INTO actions (company_id, name, date)
                VALUES (${action.company_id}, ${action.name}, TO_DATE(${action.date}, 'DD.MM.YYYY'))
                ON CONFLICT (id) DO NOTHING;
                `;
      })
    );

    console.log(`Seeded ${actions.length} actions`);

    return {
      createTable,
      actions: insertedActions,
    };
  } catch (error) {
    console.error("Error seeding actions", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedCompanies(client);
  await seedActions(client);

  await client.end();
}

main().catch((err) => {
  console.error("An error occures while attempting to seed the database:", err);
});
