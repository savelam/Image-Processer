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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const validateDimensions = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { width, height } = req.query;
    if (parseInt(width) <= 0 || parseInt(height) <= 0) {
        next(new errors_1.BadRequestError('Please enter a positive(greater than zero) value for both the width and height'));
    }
    const acceptedDimensions = [undefined, 'auto'];
    if ((!acceptedDimensions.includes(width) &&
        isNaN(parseInt(width))) ||
        (!acceptedDimensions.includes(height) &&
            isNaN(parseInt(height)))) {
        next(new errors_1.BadRequestError('Please enter valid height and width.'));
    }
    next();
});
const validateFormat = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let output = req.query.output;
    if (!output) {
        output = 'jpg';
    }
    let input = req.query.input;
    if (!input) {
        input = 'jpg';
    }
    const extensions = ['jpeg', 'png', 'jpg'];
    if (!extensions.includes(output.toLowerCase()) ||
        !extensions.includes(input.toLowerCase())) {
        if (extensions.includes(output.toLowerCase())) {
            next(new errors_1.BadRequestError(`Sorry, this extension is not yet supported. ${req.query.input}`));
        }
        else {
            next(new errors_1.BadRequestError(`Sorry, this extension is not yet supported. ${req.query.output}`));
        }
    }
    next();
});
const lookup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { width, height } = req.query;
    let filename = req.query.filename;
    if (!filename) {
        filename = 'default';
    }
    let output = req.query.output; // let default be jpg
    if (!output) {
        output = 'jpg';
    }
    let input = req.query.input; // let default be jpg
    if (!input) {
        input = 'jpg';
    }
    let pathEntered = path_1.default.join(__dirname, `../images/${filename}.${input}er`);
    if (!fs_1.default.existsSync(pathEntered)) {
        pathEntered = path_1.default.join(__dirname, `../images/${filename}.jpg`);
    }
    if (!fs_1.default.existsSync(pathEntered)) {
        next(new errors_1.BadRequestError(`Sorry, we don't have any ${input} images of ${filename}`));
    }
    if (!width && !height) {
        res.status(http_status_codes_1.StatusCodes.OK).sendFile(pathEntered);
        return;
    }
    const changed = path_1.default.join(__dirname, `../images/thumb/${filename}_${width}x${height}.${output}`);
    if (fs_1.default.existsSync(changed)) {
        res.status(http_status_codes_1.StatusCodes.OK).sendFile(changed);
        return;
    }
    req.filename = filename;
    req.output = output;
    req.input = input;
    req.width = isNaN(parseInt(width))
        ? undefined
        : parseInt(width);
    req.height = isNaN(parseInt(height))
        ? undefined
        : parseInt(height);
    next();
});
exports.default = { validateDimensions, validateFormat, lookup };
