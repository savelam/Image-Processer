import { Request, Response } from 'express'
//import morgan from 'morgan'
//import * as dotenv from 'dotenv'
//import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import { StatusCodes } from 'http-status-codes'
import sharp from 'sharp'

//import routes from '../routes/index'

/* dotenv.config()
const PORT = process.env.PORT || 3002 */

// create an instance server
/* const app: Application = express() */

// instanciate the sharp package

// HTTP request logger middleware
/* app.use(morgan('dev'))
app.use('/process_image', routes) */

// function to convert the images
const convert = async (
  filename: string | undefined,
  width: number | undefined,
  height: number | undefined,
  output: string,
  input: string
): Promise<string> => {
  const inputPath: string = path.join(
    __dirname,
    `../images/${filename}.${input}`
  )

  const outputPath = path.join(
    __dirname,
    `../images/thumb/${filename}_${width ?? 'auto'}x${
      height ?? 'auto'
    }.${output}`
  )

  await sharp(inputPath)
    .resize(width, height, {
      kernel: sharp.kernel.nearest,
      fit: 'cover',
    })
    .toFile(outputPath)
  return outputPath
}

//function to process image and send to file
const processImage = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const convertedImgPath = await convert(
      req.filename,
      req.width,
      req.height,
      req.output as string,
      req.input as string
    )
    res.status(StatusCodes.OK).sendFile(convertedImgPath)
  } catch (error) {
    //next(new Error())
    console.log('Error')
  }
}

//export default app

export { convert, processImage }
