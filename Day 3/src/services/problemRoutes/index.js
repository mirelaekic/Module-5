const express = require("express")

const router = express.Router()

router.get("/error", (req, res) => {
  throw new Error("an error occured!")
})

router.get("/nonExistant", (req, res, next) => {
  const err = new Error("I cannot find it!")
  err.httpStatusCode = 404
  next(err)
})

router.get("/forbiddenRoute", (req, res, next) => {
  const err = new Error("Forbidden!")
  err.httpStatusCode = 403
  next(err)
})

router.get("/anotherProblem", (req, res, next) => {
  const err = new Error("error!")
  next(err)
})

module.exports = router