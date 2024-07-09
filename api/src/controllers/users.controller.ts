import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;
  try {
    const newUser = await User.create({ name, surname, email, password });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && user.validPassword(password)) {
      const token = jwt.sign({ id: user.id }, "my_jwt_secret", {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ message: "Login successful", token, userId: user.id });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
