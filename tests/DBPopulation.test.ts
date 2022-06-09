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

test("Deberian existir 1001 ciudades si agregamos una ciudad", async () => {
  const city = {
    id: 1001,
    city: "Santiago",
    country: "Chile",
    number_inhabitants: 1000000,
  };
  await db.addCity(city);
  const cities = await db.getCities();
  expect(cities?.length).toBe(1001);
});
