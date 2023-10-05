const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); //telling node file that hbs is being used
app.set("views", template_path); //views being renamed to that location
app.use(express.static(static_path));
hbs.registerPartials(partial_path);

//routing
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/weather", (req, res) => {
  res.render("weather");
});
app.get("*", (req, res) => {
  res.render("404");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
