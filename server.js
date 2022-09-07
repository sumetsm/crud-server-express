const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");

//import routes
const authRoutes = require("./routes/auth");
const personRoutes = require("./routes/person");
//app
const app = express();

app.use(express.static(__dirname+'/public'));

//connect DB
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTED"))
  .catch(err => console.log("DB CONNECTED IS ERR!"));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes
//localhost:8000/api/ต่างๆในauth
// app.use('/api',authRoutes);
// app.use('/api',personRoutes);
//ultimate routes map haha
readdirSync("./routes").map(r => {
  app.use("/api", require("./routes/" + r));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port =>", port);
});
