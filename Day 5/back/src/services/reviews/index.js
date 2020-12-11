const express = require("express")
const path = require("path")
const uniqid = require("uniqid")
const { readDB, writeDB } = require("../../lib/utilities")

const { check, validationResult } = require("express-validator")

const router = express.Router()

const reviewsFilePath = path.join(__dirname, "reviews.json")

router.get("/:id", async (req, res, next) => {
  try {
    const reviewsDB = await readDB(reviewsFilePath)
    const review = reviewsDB.filter(review => review.ID === req.params.id)
    if (review.length > 0) {
      res.send(review)
    } else {
      const err = new Error()
      err.httpStatusCode = 404
      next(err)
    }
  } catch (error) {
    next(error)
  }
})

router.get("/", async (req, res, next) => {
  try {
    const reviewsDB = await readDB(reviewsFilePath)
    if (req.query && req.query.name) {
      const filteredreviews = reviewsDB.filter(
        review =>
          review.hasOwnProperty("name") &&
          review.name.toLowerCase() === req.query.name.toLowerCase()
      )
      res.send(filteredreviews)
    } else {
      res.send(reviewsDB)
    }
  } catch (error) {
    next(error)
  }
})

router.post(
  "/",
  [
    check("name")
      .isLength({ min: 4 })
      .withMessage("Name too short!")
      .exists()
      .withMessage("Insert a name please!"),
  ],
  [
    check("description")
      .isLength({ min: 4 })
      .withMessage("Description too short!")
      .exists()
      .withMessage("Insert description please!"),
  ],
  [
    check("brand")
      .exists()
      .withMessage("Insert brand please!"),
  ],
  [
    check("price")
      .exists()
      .withMessage("Insert price please!"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const err = new Error()
        err.message = errors
        err.httpStatusCode = 400
        next(err)
      } else {
        const reviewsDB = await readDB(reviewsFilePath)
        const newreview = {
          ...req.body,
          ID: uniqid(),
          createdAt: new Date(),
        }

        reviewsDB.push(newreview)

        await writeDB(reviewsFilePath, reviewsDB)

        res.status(201).send({ id: newreview.ID })
      }
    } catch (error) {
      next(error)
    }
  }
)

router.delete("/:id", async (req, res, next) => {
  try {
    const reviewsDB = await readDB(reviewsFilePath)
    const newDb = reviewsDB.filter(review => review.ID !== req.params.id)
    await writeDB(reviewsFilePath, newDb)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const reviewsDB = await readDB(reviewsFilePath)
    const newDb = reviewsDB.filter(review => review.ID !== req.params.id)

    const modifiedreview = {
      ...req.body,
      ID: req.params.id,
      updatedAt: new Date(),
    }

    newDb.push(modifiedreview)
    await writeDB(reviewsFilePath, newDb)

    res.send({ id: modifiedreview.ID })
  } catch (error) {
    next(error)
  }
})

module.exports = router