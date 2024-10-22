require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const todoService = require("./service/todoService");

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", todoService);

app.listen(PORT, () => {
  console.log(`App has started on port ${PORT}`);
});
