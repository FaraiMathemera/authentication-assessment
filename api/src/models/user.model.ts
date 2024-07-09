import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";

class User extends Model {
  public id!: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public password!: string;
  public locked!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    surname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Users",
    sequelize,
    hooks: {
      beforeCreate: (user: User) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      },
    },
  }
);

export default User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: Id of user auto increment
 *         name:
 *           type: string
 *           description: Name of user
 *         surname:
 *           type: string
 *           description: Surname of user
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           description: User password
 *         locked:
 *           type: boolean
 *           description: Whether user is locked from logging in
 *       example:
 *         id: 1
 *         name: John
 *         surname: Doe
 *         email: Sample Email
 *         password: Sample Email
 *         locked: false
 */
