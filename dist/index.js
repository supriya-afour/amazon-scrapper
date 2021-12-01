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
const express_1 = __importDefault(require("express"));
const operation_1 = __importDefault(require("./operation"));
const router_1 = __importDefault(require("./router"));
const operation = new operation_1.default();
const amazonRouter = new router_1.default();
class ScrapperApp {
    constructor() {
        this.initialize = () => __awaiter(this, void 0, void 0, function* () {
            // const PORT: number = parseInt(process.env.PORT as string, 10);
            const PORT = 3000;
            const app = express_1.default();
            app.use(express_1.default.json());
            // First route
            app.get('/', (req, res) => {
                res.send('Hello from Amazon scrapper');
            });
            // app.use("/", amazonRouter.getRouter());
            operation.visitAmazon();
            return app.listen(PORT, () => {
                console.log(`Server running on PORT number ${PORT}`);
            });
        });
    }
}
const baseApp = new ScrapperApp();
baseApp.initialize();
