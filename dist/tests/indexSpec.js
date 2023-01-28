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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const classes_1 = require("../classes");
const filename = 'default';
let ImgToTest;
const imgBase = path_1.default.join(__dirname, `../images/thumb/${filename}`);
const request = (0, supertest_1.default)(index_1.app);
afterEach(() => {
    if (ImgToTest && fs_1.default.existsSync(ImgToTest)) {
        fs_1.default.unlinkSync(ImgToTest);
    }
    ImgToTest = null;
});
describe('Testing the api endpoint', () => {
    it('Image processing endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/process_image');
        expect(response.status).toBe(200);
    }));
    it('should return status code 200 if image is not absent', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get(`/process_image/?filename=${filename}&height=300&width=200&input=jpg`);
        ImgToTest = `${imgBase}_500x600.jpg`;
        expect(result.statusCode).toBe(200);
    }));
    it('Test that the image processing function is defined', () => {
        expect(classes_1.processImage).toBeDefined();
    });
    //
    it('check that image is successfully converted', () => {
        const height = 500;
        const width = 400;
        const filename = 'default';
        const input = 'jpg';
        const output = 'jpg';
        (0, classes_1.convert)(filename, height, width, output, input);
        const convertedImg = `${imgBase}_${height}x${width}.${output}`;
        console.log(convertedImg);
        expect(fs_1.default.existsSync(convertedImg)).toBeTruthy();
    });
});
