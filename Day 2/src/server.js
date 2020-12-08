const express = require("express");
const cors = require("cors");
const studentRoutes = require("./services/students");

const server = express();
const port = 3001
// ROUTES

server.use(cors());
server.use(express.json());

server.use("/students", studentRoutes);

server.listen(port, () => {
    console.log("server is running on port: ", port)
});
