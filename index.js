const express = require("express");
const app = express();
const fs = require("fs");

// Config
app.set("port", process.env.PORT || 9000);

// Midlewares
app.use(express.json());
app.use(express.static(__dirname + "/src/public"));

// Api Routes
const API_ROUTES = fs
  .readdirSync("./src/api")
  .filter((file) => file.endsWith(".js"));

API_ROUTES.forEach((router) => {
  app.use("/api", require(`./src/api/${router}`));
});

// Init Server
app.listen(app.get("port"), () => {
  console.log(`Listening to http://localhost:${app.get("port")}`);
});
