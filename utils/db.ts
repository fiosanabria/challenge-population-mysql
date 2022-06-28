import { createPool, PoolOptions } from "mysql2/promise";
import { cities, City } from "../database/cities";

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
      " create table city ( id INT, name VARCHAR(50), country VARCHAR(50), population INT); "
    );
    const sql = "insert into city (id, name, country, population) values ?";
    const values = cities.map((city) => [
      city.id,
      city.name,
      city.country,
      city.population,
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
    database: "population",
  };
  const pool = createPool(config);
  try {
    await pool.query('drop table if exists city;');
    await pool.query(" drop database if exists population; ");
  } catch (error) {
    console.log(error);
  } finally {
    await pool.end();
  }
};
