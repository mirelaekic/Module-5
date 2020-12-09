const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const { check, validationResult } = require("express-validator")

const router = express.Router()

const readFile = fileName => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName))
  const fileContent = buffer.toString()
  return JSON.parse(fileContent)
}

router.get("/:id", (req, res, next) => {
  try {
    const studentsDB = readFile("studentPortfolio.json")
    const student = studentsDB.filter(student => student.ID === req.params.id)
    if (student.length > 0) {
      res.send(student)
    } else {
      const err = new Error()
      err.httpStatusCode = 404
      next(err)
    }
  } catch (error) {
    next(error)
  }
})

router.get("/", (req, res, next) => {
  try {
    const studentsDB = readFile("studentPortfolio.json")
    if (req.query && req.query.name) {
      const filteredstudents = studentsDB.filter(
        student =>
          student.hasOwnProperty("name") &&
          student.name.toLowerCase() === req.query.name.toLowerCase()
      )
      res.send(filteredstudents)
    } else {
      res.send(studentsDB)
    }
  } catch (error) {
    next(error)
  }
})

router.post(
  "/",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name too short!")
      .exists()
      .withMessage("Insert a name please!"),
  ],
  [
    check("description")
      .isLength({ min: 6 })
      .withMessage("Description too short!")
      .exists()
      .withMessage("Insert a description please!"),
  ],
  [
    check("repoURL")
      .exists()
      .withMessage("Insert a repository URL please!"),
  ],
  [
    check("liveURL")
      .exists()
      .withMessage("Insert a repository URL please!"),
  ],
  (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const err = new Error()
        err.message = errors
        err.httpStatusCode = 400
        next(err)
      } else {
        const studentsDB = readFile("studentPortfolio.json")
        const newStudentPortfolio = {
          ...req.body,
          ID: uniqid(),
          modifiedAt: new Date(),
        }

        studentsDB.push(newStudentPortfolio)

        fs.writeFileSync(
          path.join(__dirname, "studentPortfolio.json"),
          JSON.stringify(studentsDB)
        )

        res.status(201).send({ id: newStudentPortfolio.ID })
      }
    } catch (error) {
      next(error)
    }
  }
)

router.delete("/:id", (req, res, next) => {
  try {
    const studentsDB = readFile("studentPortfolio.json")
    const newDb = studentsDB.filter(student => student.ID !== req.params.id)
    fs.writeFileSync(path.join(__dirname, "studentPortfolio.json"), JSON.stringify(newDb))

    res.status(200).send("student deleted")
  } catch (error) {
    next(error)
  }
})

router.put("/:id", (req, res, next) => {
  try {
    const studentsDB = readFile("studentPortfolio.json")
    const newDb = studentsDB.filter(student => student.ID !== req.params.id)

    const modifiedstudent = {
      ...req.body,
      ID: req.params.id,
      modifiedAt: new Date(),
    }

    newDb.push(modifiedstudent)
    fs.writeFileSync(path.join(__dirname, "studentPortfolio.json"), JSON.stringify(newDb))

    res.send({ id: modifiedstudent.ID })
  } catch (error) {
    next(error)
  }
})

module.exports = router