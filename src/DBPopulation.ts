import { createPool, PoolOptions } from "mysql2/promise";
import { City } from "../database/cities";

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

  async addCity(city: City) {
    const query = ``;
    await this.queryDB(query);
  }

  async deleteCityById(id: number) {
    const query = ``;
    await this.queryDB(query);
  }

  async updateNumberOfInhabitantsById(id: number, newPopulation: number) {
    const query = ``;
    await this.queryDB(query);
  }
}

export default DBPopulation;
