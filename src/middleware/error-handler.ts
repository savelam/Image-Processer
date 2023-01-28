import { CustomError } from '../errors'
import { StatusCodes } from 'http-status-codes'

import { Request, Response } from 'express'

const errorHandlerMiddleware = (err: Error, _req: Request, res: Response) => {
  console.log(err.message)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.message)
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Something went wrong. Please try again later')
}

export default errorHandlerMiddleware
