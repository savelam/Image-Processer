import supertest from 'supertest'
import { app } from '../index'
import fs from 'fs'
import path from 'path'
import { convert, processImage } from '../classes'
const filename = 'default'
let ImgToTest: string | null
const imgBase = path.join(__dirname, `../images/thumb/${filename}`)

const request = supertest(app)

afterEach(() => {
  if (ImgToTest && fs.existsSync(ImgToTest)) {
    fs.unlinkSync(ImgToTest)
  }
  ImgToTest = null
})

describe('Testing the api endpoint', () => {
  it('Image processing endpoint', async () => {
    const response = await request.get('/process_image')
    expect(response.status).toBe(200)
  })
  it('should return status code 200 if image is not absent', async () => {
    const result = await request.get(
      `/process_image/?filename=${filename}&height=300&width=200&input=jpg`
    )
    ImgToTest = `${imgBase}_500x600.jpg`
    expect(result.statusCode).toBe(200)
  })

  it('Test that the image processing function is defined', () => {
    expect(processImage).toBeDefined()
  })

  //
  it('check that image is successfully converted', () => {
    const height = 500
    const width = 400
    const filename = 'default'
    const input = 'jpg'
    const output = 'jpg'

    convert(filename, height, width, output, input)

    const convertedImg = `${imgBase}_${height}x${width}.${output}`

    console.log(convertedImg)

    expect(fs.existsSync(convertedImg)).toBeTruthy()
  })
})
