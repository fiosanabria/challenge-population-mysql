import { createPool, PoolOptions } from "mysql2/promise";

export type Employee = {
  id: number;
  name: string;
  salary: number;
};

class DBCompany {
  private readonly config: PoolOptions;
  constructor() {
    this.config = {
      host: process.env.BDD_HOST,
      user: process.env.BDD_USER,
      password: process.env.BDD_PASS,
      database: "company",
    };
  }

  private async queryDB(query: string) {
    const pool = createPool(this.config);
    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.log(error);
    } finally {
      await pool.end();
    }
  }

  async getEmployees(): Promise<Employee[]> {
    const rows = await this.queryDB("SELECT * FROM employee");
    const employees = await JSON.parse(JSON.stringify(rows));
    return employees;
  }
}

export const createDB = async () => {
  const config: PoolOptions = {
    host: process.env.BDD_HOST || "localhost",
    user: process.env.BDD_USER || "root",
    password: process.env.BDD_PASS || "newpass",
  };
  const pool = createPool(config);
  try {
    await pool.query(" CREATE DATABASE IF NOT EXISTS company; ");
    await pool.query(" USE company; ");
    await pool.query(
      " CREATE TABLE employee ( id INT(11) NOT NULL AUTO_INCREMENT, name VARCHAR(45) DEFAULT NULL, salary INT(11) DEFAULT NULL, PRIMARY KEY(id));"
    );
    await pool.query(
      " INSERT INTO employee values (1, 'Ryan Ray', 20000), (2, 'Joe McMillan', 40000), (3, 'John Carter', 50000); "
    );
  } catch (error) {
    console.log(error);
  } finally {
    await pool.end();
  }
};

export const destroyDB = async () => {
  const config: PoolOptions = {
    host: process.env.BDD_HOST || "localhost",
    user: process.env.BDD_USER || "root",
    password: process.env.BDD_PASS || "newpass",
  };
  const pool = createPool(config);
  try {
    await pool.query(" DROP DATABASE IF EXISTS company; ");
  } catch (error) {
    console.log(error);
  } finally {
    await pool.end();
  }
};

export default DBCompany;
