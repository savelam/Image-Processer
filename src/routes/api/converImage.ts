import { Router } from 'express'
import cache from '../../middleware/cache'
import { processImage } from '../../classes'

const conversionRoutes = Router()

conversionRoutes
  .route('/')
  .get(
    cache.validateDimensions,
    cache.validateFormat,
    cache.lookup,
    processImage
  )

export default conversionRoutes
