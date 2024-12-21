import database from "infra/database.js";

beforeAll(cleanDataBase);
async function cleanDataBase() {
  await database.query("drop schema public cascade; create schema public");
}

test("POST to localhost:3000/api/v1/migrations should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThanOrEqual(1);
});

test("POST to localhost:3000/api/v1/migrations should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBe(0);
});