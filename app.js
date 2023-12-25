import express, { ExpressStatic, urlencoded, json } from "express";
import { join } from "path";

import productRoutes from "./routes/product";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const buildPath = join(__dirname, "build");
app.use(ExpressStatic(buildPath));

app.get("/", (req, res) => {
  res.sendFile(join(buildPath, "discover-me/index.html"));
});
app.get("/kanap", (req, res) => {
  res.sendFile(join(buildPath, "kanap/index.html"));
});
app.get("/kaza", (req, res) => {
  res.sendFile(join(buildPath, "kaza/build/index.html"));
});
app.get("/ohmyfood", (req, res) => {
  res.sendFile(join(buildPath, "ohmyfood/index.html"));
});
app.get("/booki", (req, res) => {
  res.sendFile(join(buildPath, "booki/index.html"));
});
app.get("/gameon", (req, res) => {
  res.sendFile(join(buildPath, "gameon/index.html"));
});
app.get("/fisheye", (req, res) => {
  res.sendFile(join(buildPath, "fisheye/index.html"));
});
app.get("/lespetitsplat", (req, res) => {
  res.sendFile(join(buildPath, "lespetitsplats/index.html"));
});

app.use("/kanap/images", ExpressStatic(join(__dirname, "images")));
// app.use(express.static("images"));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api/products", productRoutes);

export default app;
