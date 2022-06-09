import DBCompany, { createDB, destroyDB } from "../src/DBCompany";
import dotenv from "dotenv";

dotenv.config();

const db = new DBCompany();

beforeEach(() => {
  return createDB();
});

afterEach(() => {
  return destroyDB();
});

test("Deberian existir tres empleados", async () => {
  const employees = await db.getEmployees();
  expect(employees.length).toBe(3);
});

test("Deberia existir un empleado con sueldo igual a 50000", async () => {
  const employees = await db.getEmployees();
  const employee = employees.find((employee) => employee.salary === 50000);
  expect(employee).toBeDefined();
});

test("Deberia existir un empleado llamado Ryan Ray", async () => {
  const employees = await db.getEmployees();
  const employee = employees.find((employee) => employee.name === "Ryan Ray");
  expect(employee).toBeDefined();
});
