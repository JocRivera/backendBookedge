import { Sequelize } from "sequelize";
import "dotenv/config";

const database = new Sequelize(
  process.env.DB_NAME || "bookedge",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export { database };
