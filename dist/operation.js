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
const Browser_1 = __importDefault(require("./actions/Browser"));
const search_1 = __importDefault(require("./actions/search"));
const product_1 = __importDefault(require("./actions/product"));
const checkout_1 = __importDefault(require("./actions/checkout"));
class Operation {
    visitAmazon() {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                // create new browser object
                const browserObj = new Browser_1.default();
                // launch Puppeteer.
                const browser = yield browserObj.launchPuppeteer();
                // launch browser
                const page = yield browserObj.launchBrowser(browser);
                // Create object of searchaction
                const searchActionObj = search_1.default.init(page);
                // // Search search bar
                yield searchActionObj.findSearchBar();
                // // apply brand filter
                yield searchActionObj.applyBrandFilterData();
                // // apply review filter
                yield searchActionObj.applyReviewsFilterData();
                // // apply price filter
                yield searchActionObj.applyPriceFilterData();
                // // apply sort filter
                yield searchActionObj.applySortFilterData();
                // create object of productaction
                const product = product_1.default.init(page);
                // pickup first product from the above filter
                yield product.getProduct();
                //scrap all details of selected product
                yield product.scrapProductDetails();
                // create object of checkoutaction
                const checkout = checkout_1.default.init(page);
                // // click on addtocart button
                yield checkout.addToCart();
                // // click on checkout button
                yield checkout.checkout();
            }
            catch (err) {
                throw err;
            }
        }))();
    }
}
exports.default = Operation;
