import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const dbVersionResult = await database.query("SHOW server_version;");
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const openedConnectionsQuery = {
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  };
  const openedConnectionsResult = await database.query(openedConnectionsQuery);

  const dbVersionValue = dbVersionResult[0].server_version;
  const maxConnectionsValue = maxConnectionsResult[0].max_connections;
  const openedConnectionsValue = openedConnectionsResult[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: openedConnectionsValue,
      },
    },
  });
}

export default status;
