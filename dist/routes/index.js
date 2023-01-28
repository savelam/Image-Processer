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
const converImage_1 = __importDefault(require("./api/converImage"));
const express_1 = require("express");
const not_found_1 = __importDefault(require("../middleware/not-found"));
const error_handler_1 = __importDefault(require("../middleware/error-handler"));
const routes = (0, express_1.Router)();
routes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('includes/index');
}));
routes.use('/process_image', converImage_1.default);
routes.use(not_found_1.default);
routes.use(error_handler_1.default);
exports.default = routes;
