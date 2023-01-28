"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv = __importStar(require("dotenv"));
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
//import { StatusCodes } from 'http-status-codes'
//import sharp from 'sharp'
const routes_1 = __importDefault(require("./routes"));
dotenv.config();
const PORT = process.env.PORT || 3002;
// create an instance server
const app = (0, express_1.default)();
exports.app = app;
app.set('view engine', 'ejs');
// instanciate the sharp package
// HTTP request logger middleware
app.use((0, morgan_1.default)('dev'));
app.use('/process_image', routes_1.default);
// start express server
app.listen(PORT, () => {
    const myImgDirectory = path_1.default.join(__dirname, '/images');
    try {
        if (!fs_1.default.existsSync(myImgDirectory)) {
            fs_1.default.mkdirSync(myImgDirectory);
            const defaults = ['jpeg', 'png', 'jpg'];
            defaults.forEach((d) => {
                fs_1.promises.copyFile(path_1.default.join(__dirname, `../defaults/default.${d}`), `${myImgDirectory}/default.${d}`);
            });
            fs_1.default.mkdirSync(`${myImgDirectory}/thumb`);
        }
        console.log(`Server running on port ${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
    console.log(`Server is starting at prot:${PORT}`);
});
