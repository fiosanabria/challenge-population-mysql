import DBCompany, { createDB, destroyDB } from "../src/DBPopulation";
import dotenv from "dotenv";

dotenv.config();

const db = new DBCompany();

beforeEach(() => {
  return createDB();
});

afterEach(() => {
  return destroyDB();
});

test("Deberian existir 1000 ciudades", async () => {
  const cities = await db.getCities();
  expect(cities?.length).toBe(1000);
});
