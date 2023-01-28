"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = exports.convert = void 0;
//import morgan from 'morgan'
//import * as dotenv from 'dotenv'
//import fs, { promises as fsPromises } from 'fs'
const path_1 = __importDefault(require("path"));
const http_status_codes_1 = require("http-status-codes");
const sharp_1 = __importDefault(require("sharp"));
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
const convert = (filename, width, height, output, input) => __awaiter(void 0, void 0, void 0, function* () {
    const inputPath = path_1.default.join(__dirname, `../images/${filename}.${input}`);
    const outputPath = path_1.default.join(__dirname, `../images/thumb/${filename}_${width !== null && width !== void 0 ? width : 'auto'}x${height !== null && height !== void 0 ? height : 'auto'}.${output}`);
    yield (0, sharp_1.default)(inputPath)
        .resize(width, height, {
        kernel: sharp_1.default.kernel.nearest,
        fit: 'cover',
    })
        .toFile(outputPath);
    return outputPath;
});
exports.convert = convert;
//function to process image and send to file
const processImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const convertedImgPath = yield convert(req.filename, req.width, req.height, req.output, req.input);
        res.status(http_status_codes_1.StatusCodes.OK).sendFile(convertedImgPath);
    }
    catch (error) {
        //next(new Error())
        console.log('Error');
    }
});
exports.processImage = processImage;
