  
const express = require("express")
const cors = require("cors")
const productRoutes = require("./services/products");
const reviewRoutes = require("./services/reviews")

const server = express()

const port = 3001

server.use(cors())
server.use(express.json()) // I need to specify this line of code otherwise all the request bodies will be undefined. And this line of code must come BEFORE the routes

server.use("/products", productRoutes)
server.use("/reviews", reviewRoutes)

server.listen(port, () => {
  console.log("Server is running on port: ", port)
})