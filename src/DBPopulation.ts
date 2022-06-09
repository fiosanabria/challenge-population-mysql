import { createPool, PoolOptions } from "mysql2/promise";
import { cities, City } from "../database/cities";

class DBPopulation {
  private readonly config: PoolOptions;
  constructor() {
    this.config = {
      host: process.env.BDD_HOST,
      user: process.env.BDD_USER,
      password: process.env.BDD_PASS,
      database: "population",
    };
  }

  private async queryDB(query: string) {
    const pool = createPool(this.config);
    try {
      const [rows] = await pool.query(query);
      const result = await JSON.parse(JSON.stringify(rows));
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      await pool.end();
    }
  }

  async getCities(): Promise<City[] | undefined> {
    const cities: City[] = await this.queryDB("select * from city");
    return cities;
  }

  async getCityById(id: number): Promise<City | undefined> {
    const query = ``;
    const cities: City[] = await this.queryDB(query);
    return cities[0];
  }

  async addCity(city: {
    id: number;
    name: string;
    country: string;
    number_inhabitants: number;
  }) {
    const query = ``;
    await this.queryDB(query);
  }

  async deleteCityById(id: number) {
    const query = ``;
    await this.queryDB(query);
  }

  async updateNumberOfInhabitantsById(id: number, numberInhabitants: number) {
    const query = ``;
    await this.queryDB(query);
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
    await pool.query(" create database if not exists population; ");
    await pool.query(" use population; ");
    await pool.query(
      " create table city ( id INT, name VARCHAR(50), country VARCHAR(50), number_inhabitants INT); "
    );
    const sql =
      "insert into city (id, name, country, number_inhabitants) values ?";
    const values = cities.map((city) => [
      city.id,
      city.name,
      city.country,
      city.number_inhabitants,
    ]);
    await pool.query(sql, [values]);
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
    await pool.query(" drop database if exists population; ");
  } catch (error) {
    console.log(error);
  } finally {
    await pool.end();
  }
};

export default DBPopulation;
