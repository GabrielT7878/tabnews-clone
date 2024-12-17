import migrationRunner from "node-pg-migrate";
import { request } from "node:http";
import { join } from "node:path";

async function migrations(resquest, response) {
  if (resquest.method === "GET") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      verbose: true,
    });
    response.status(200).json(migrations);
  }
  if (resquest.method === "POST") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      verbose: true,
    });
    response.status(200).json(migrations);
  }

  return response.status(405).end();
}

export default migrations;
