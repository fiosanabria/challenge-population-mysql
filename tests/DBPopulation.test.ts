import DBCompany from "../src/DBPopulation";
import { createDB, destroyDB } from "../utils/db";
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
    name: "Santiago",
    country: "Chile",
    population: 1000000,
  };
  await db.addCity(city);
  const cities = await db.getCities();
  expect(cities?.length).toBe(1001);
});

test("Deberian existir 999 ciudades si eliminamos una ciudad", async () => {
  const idCity = 999;
  await db.deleteCityById(idCity);
  const cities = await db.getCities();
  expect(cities?.length).toBe(999);
});

test("Deberia existir una ciudad cuyo id es 56 y su pais es Colombia ", async () => {
  const city = await db.getCityById(56);
  expect(city?.country).toBe("Colombia");
});

test("Deberia actualizarse la cantidad de habitantes de la ciudad con id 67 a 9000000", async () => {
  const populationBeforeUpdate = (await db.getCityById(67))?.population;
  await db.updateNumberOfInhabitantsById(67, 9000000);
  const populationAfterUpdate = (await db.getCityById(67))?.population;
  expect(populationBeforeUpdate).not.toBe(populationAfterUpdate);
});
