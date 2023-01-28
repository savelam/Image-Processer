"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.CustomError = void 0;
const custom_1 = __importDefault(require("./custom"));
exports.CustomError = custom_1.default;
const bad_request_1 = __importDefault(require("./bad-request"));
exports.BadRequestError = bad_request_1.default;
