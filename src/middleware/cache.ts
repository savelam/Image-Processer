import express from 'express'
import fs from 'fs'
import path from 'path'

import { StatusCodes } from 'http-status-codes'

import { BadRequestError } from '../errors'

const validateDimensions = async (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> => {
  const { width, height } = req.query

  if (parseInt(width as string) <= 0 || parseInt(height as string) <= 0) {
    next(
      new BadRequestError(
        'Please enter a positive(greater than zero) value for both the width and height'
      )
    )
  }
  const acceptedDimensions: [undefined, string] = [undefined, 'auto']

  if (
    (!acceptedDimensions.includes(width as string | undefined) &&
      isNaN(parseInt(width as string))) ||
    (!acceptedDimensions.includes(height as string | undefined) &&
      isNaN(parseInt(height as string)))
  ) {
    next(new BadRequestError('Please enter valid height and width.'))
  }

  next()
}

const validateFormat = async (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> => {
  let output = req.query.output
  if (!output) {
    output = 'jpg'
  }

  let input = req.query.input
  if (!input) {
    input = 'jpg'
  }

  const extensions = ['jpeg', 'png', 'jpg']

  if (
    !extensions.includes((output as string).toLowerCase()) ||
    !extensions.includes((input as string).toLowerCase())
  ) {
    if (extensions.includes((output as string).toLowerCase())) {
      next(
        new BadRequestError(
          `Sorry, this extension is not yet supported. ${req.query.input}`
        )
      )
    } else {
      next(
        new BadRequestError(
          `Sorry, this extension is not yet supported. ${req.query.output}`
        )
      )
    }
  }

  next()
}

const lookup = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> => {
  const { width, height } = req.query

  let filename = req.query.filename
  if (!filename) {
    filename = 'default'
  }

  let output = req.query.output // let default be jpg
  if (!output) {
    output = 'jpg'
  }

  let input = req.query.input // let default be jpg
  if (!input) {
    input = 'jpg'
  }

  let pathEntered: string = path.join(
    __dirname,
    `../images/${filename}.${input}er`
  )

  if (!fs.existsSync(pathEntered)) {
    pathEntered = path.join(__dirname, `../images/${filename}.jpg`)
  }

  if (!fs.existsSync(pathEntered)) {
    next(
      new BadRequestError(
        `Sorry, we don't have any ${input} images of ${filename}`
      )
    )
  }

  if (!width && !height) {
    res.status(StatusCodes.OK).sendFile(pathEntered)
    return
  }

  const changed = path.join(
    __dirname,
    `../images/thumb/${filename}_${width}x${height}.${output}`
  )

  if (fs.existsSync(changed)) {
    res.status(StatusCodes.OK).sendFile(changed)
    return
  }

  req.filename = filename as string
  req.output = output as string
  req.input = input as string
  req.width = isNaN(parseInt(width as string))
    ? undefined
    : parseInt(width as string)
  req.height = isNaN(parseInt(height as string))
    ? undefined
    : parseInt(height as string)

  next()
}

export default { validateDimensions, validateFormat, lookup }
