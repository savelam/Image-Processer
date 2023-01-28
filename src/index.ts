import express, { Application } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import fs, { promises as fsPromises } from 'fs'
import path from 'path'
//import { StatusCodes } from 'http-status-codes'
//import sharp from 'sharp'

import routes from './routes'

dotenv.config()
const PORT = process.env.PORT || 3002

// create an instance server
const app: Application = express()
app.set('view engine', 'ejs')
// instanciate the sharp package

// HTTP request logger middleware
app.use(morgan('dev'))
app.use('/process_image', routes)

// start express server
app.listen(PORT, () => {
  const myImgDirectory = path.join(__dirname, '/images')
  try {
    if (!fs.existsSync(myImgDirectory)) {
      fs.mkdirSync(myImgDirectory)
      const defaults = ['jpeg', 'png', 'jpg']
      defaults.forEach((d) => {
        fsPromises.copyFile(
          path.join(__dirname, `../defaults/default.${d}`),
          `${myImgDirectory}/default.${d}`
        )
      })
      fs.mkdirSync(`${myImgDirectory}/thumb`)
    }

    console.log(`Server running on port ${PORT}`)
  } catch (err) {
    console.log(err)
  }

  console.log(`Server is starting at prot:${PORT}`)
})

//export default app

export { app }
