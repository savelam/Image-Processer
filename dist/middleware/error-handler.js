"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, _req, res) => {
    console.log(err.message);
    if (err instanceof errors_1.CustomError) {
        return res.status(err.statusCode).send(err.message);
    }
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Something went wrong. Please try again later');
};
exports.default = errorHandlerMiddleware;
