// import dotenv configuration file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
const API_VER_PREFIX = "/api/v1";

const app = express();
//Connect to Mongo Db
dbConnection();
//Midelwares
app.use(cors());
// body parser
app.use(express.json());
// Auth routes
app.use(API_VER_PREFIX + "/auth", require("./routes/auth.routes"));
// User routes
app.use(API_VER_PREFIX + "/user", require("./routes/user.routes"));
// root route
app.use("/", (req, res) => {
    res.send("Negozia's Api");
});

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});
