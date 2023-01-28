"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cache_1 = __importDefault(require("../../middleware/cache"));
const classes_1 = require("../../classes");
const conversionRoutes = (0, express_1.Router)();
conversionRoutes
    .route('/')
    .get(cache_1.default.validateDimensions, cache_1.default.validateFormat, cache_1.default.lookup, classes_1.processImage);
exports.default = conversionRoutes;
