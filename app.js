const express = require("express");
const path = require("path");
const vhost = require("vhost");
const productRoutes = require("./routes/product");

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

const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

const kanapApp = express();
kanapApp.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/kanap/index.html"));
});
kanapApp.use("/images", express.static(path.join(__dirname, "images")));
app.use(vhost("kanap.jimmydef.net", kanapApp));


app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, "discover-me/index.html"));
});
app.get("/kanap", (req, res) => {
  res.sendFile(path.join(buildPath, "kanap/index.html"));
});
app.get("/kaza", (req, res) => {
  res.sendFile(path.join(buildPath, "kaza/build/index.html"));
});
app.get("/ohmyfood", (req, res) => {
  res.sendFile(path.join(buildPath, "ohmyfood/index.html"));
});
app.get("/booki", (req, res) => {
  res.sendFile(path.join(buildPath, "booki/index.html"));
});
app.get("/gameon", (req, res) => {
  res.sendFile(path.join(buildPath, "gameon/index.html"));
});
app.get("/fisheye", (req, res) => {
  res.sendFile(path.join(buildPath, "fisheye/index.html"));
});
app.get("/lespetitsplat", (req, res) => {
  res.sendFile(path.join(buildPath, "lespetitsplats/index.html"));
});

app.use("/kanap/images", express.static(path.join(__dirname, "images")));
// app.use(express.static("images"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productRoutes);

module.exports = app;
