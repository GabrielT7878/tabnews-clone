import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function migrations(resquest, response) {
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

export default migrations;
