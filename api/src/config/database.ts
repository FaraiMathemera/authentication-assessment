import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize("blogdb", "admin", "blogpassword", {
  host: "blog-db.cdriq2ocopfi.us-east-1.rds.amazonaws.com",
  dialect: "mysql",
  port: Number(3306),
});

export default sequelize;
