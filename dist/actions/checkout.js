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
Object.defineProperty(exports, "__esModule", { value: true });
const ADD_TO_CART_WAIT_SELECTOR = "#mbc-addtocart-div-1";
const ADD_TO_CART_SELECTOR = "#mbc-addtocart-div-1 span#mbc-buybutton-addtocart-1 input[type='submit']";
const CHECKOUT_WAIT_SELECTOR = "#huc-v2-order-row-buttons";
const CHECKOUT_SELECTOR = "#huc-v2-order-row-buttons #huc-v2-subcart-buttons-wrapper #hlb-ptc-btn .a-button-inner a";
class Checkout {
    constructor(page) {
        this.page = page;
        this.delay = 3000;
    }
    static init(page) {
        return new Checkout(page);
    }
    // click on addtocart button
    addToCart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.waitForSelector(ADD_TO_CART_WAIT_SELECTOR, { timeout: this.delay });
                yield this.page.click(ADD_TO_CART_SELECTOR, { delay: this.delay });
            }
            catch (err) {
                throw `Expected selector ${ADD_TO_CART_WAIT_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
        });
    }
    // click on checkout button
    checkout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.waitForSelector(CHECKOUT_WAIT_SELECTOR, { timeout: this.delay });
                yield this.page.click(CHECKOUT_SELECTOR, { delay: this.delay });
            }
            catch (err) {
                throw `Expected selector ${CHECKOUT_WAIT_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
        });
    }
}
exports.default = Checkout;
