import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/user.routes";
import sequelize from "./src/config/database";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();
const port = 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "Blog API",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const specs = swaggerJsDoc(options);

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>hi</h1>");
});

app.use("/api/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/auth", userRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

sequelize
  .sync()
  .then(() => {
    console.log("Connected to Database:");
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
