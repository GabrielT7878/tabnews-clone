import migrationRunner from "node-pg-migrate";
import database from "infra/database.js";
import { join } from "node:path";

async function migrations(resquest, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationRunner = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  };

  if (resquest.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationRunner);
    dbClient.end();
    return response.status(200).json(pendingMigrations);
  }
  if (resquest.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationRunner,
      dryRun: false,
    });

    dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }

  dbClient.end();

  return response.status(405).end();
}

export default migrations;
