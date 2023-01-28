import conversionRoutes from './api/converImage'
import { Router, Request, Response } from 'express'

import notFound from '../middleware/not-found'
import errorHandlerMiddleware from '../middleware/error-handler'

const routes = Router()

routes.get('/', async (_req: Request, res: Response): Promise<void> => {
  res.render('includes/index')
})

routes.use('/process_image', conversionRoutes)
routes.use(notFound)
routes.use(errorHandlerMiddleware)

export default routes
