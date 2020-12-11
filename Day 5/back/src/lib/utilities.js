
const { writeJSON, readJSON } = require("fs-extra")

const readDB = async filePath => {
  console.log(filePath)
  try {
    const fileJSON = await readJSON(filePath)
    return fileJSON
  } catch (error) {
    console.log(error)
 throw new Error(error)
  }
}

const writeDB = async (filePath, data) => {
  try {
    await writeJSON(filePath, data)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  readDB,
  writeDB,
}