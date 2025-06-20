import express from "express";
import path from "path";
import url from "url";

const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "FrontEnd", "ejsAdmin"));

// Sirvo todo FrontEnd con el prefijo /static
app.use("/static", express.static(path.join(__dirname, "..", "FrontEnd")));

app.get("/", (req, res) => {
  res.render("homeAdmin");
});

app.get("/edicion-admin", (req, res) => {
  res.render("edicionAdmin");
});

app.listen(5001, () => {
  console.log("Admin server corriendo en http://localhost:5001/");
});
