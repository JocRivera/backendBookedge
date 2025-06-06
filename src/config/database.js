// db.js o database.js
import { Sequelize } from "sequelize";
import "dotenv/config";

// 👇 Aquí usas directamente la URL
const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
});

export { database };

database.sync({ force: false })
  .then(() => {
    console.log("✅ Database synced successfully");
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });
