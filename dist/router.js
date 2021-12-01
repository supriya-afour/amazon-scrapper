"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Required External Modules and Interfaces
 */
const operation_1 = __importDefault(require("./operation"));
const express_1 = require("express");
const operation = new operation_1.default();
/**
 * Router Definition
 */
class AmazonRouter {
    /**
     *
     */
    constructor() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.router.get('/scrap-amazon-details', operation.visitAmazon);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = AmazonRouter;
