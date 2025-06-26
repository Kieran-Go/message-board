const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter"); 
const newRouter = require("./routes/newRouter"); 
const path = require("node:path");

// Define path for static assets to the "public" folder
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Look for view templates in the "views" folder and set EJS as the engine for rendering views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse req.body
app.use(express.urlencoded({ extended: true }));

// Handle router requests
app.use("/", indexRouter);
app.use("/new", newRouter);

// Define the port and listen for it
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}!`);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});