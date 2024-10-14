const express = require("express");
const cors = require("cors");
const { dbConection } = require("./database/dbConfig");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const servers = [{ url: "http://localhost:8081" || `${process.env.PORT}` }];

const swaggerSpec = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentación Generacion Desafiante",
      version: "1.0.0",
    },
    servers: servers,
  },
  apis: [`${path.join(__dirname, "./routes/**/*.js")}`],
};

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  "Access-Control-Allow-Origin": "*",
};
const app = express();

//todo conexion a la base datsos
dbConection();

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());

//todo routes
const loginUserRoute = require("./routes/auth/loginUserRoute");
const ProductsUserRoute = require("./routes/products");

app.use("/api/auth", loginUserRoute);
app.use("/api/products", ProductsUserRoute);
app.use("/api/categories", require("./routes/category"));
app.use(
  "/api/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerSpec))
);
app.listen(process.env.PORT, () => {
  console.log(`Listening port ${process.env.PORT}`);
});
