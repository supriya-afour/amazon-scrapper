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
const SEARCH_SELECTOR = "input[name=field-keywords]";
const LAPTOP_TEXT = "laptop";
const SUBMIT_SELECTOR = 'input[type="submit"]';
const BRAND_WAIT_SELECTOR = '#brandsRefinements';
const HP_SELECTOR = '#brandsRefinements ul[aria-labelledby="p_89-title"] li[aria-label="HP"] span.a-list-item a';
const SAMSUNG_SELECTOR = '#brandsRefinements ul[aria-labelledby="p_89-title"] li[aria-label="Samsung Electronics"] span.a-list-item a';
const REVIEW_BRAND_SELECTOR = '#reviewsRefinements';
const REVIEW_SELECTOR = '#reviewsRefinements ul li:first-child span.a-list-item a.a-link-normal.s-navigation-item';
const PRICE_BRAND_SELECTOR = '#priceRefinements';
const MIN_PRICE_SELECTOR = "#priceRefinements ul[aria-labelledby='p_36-title'] form input[id='low-price']";
const MAX_PRICE_SELECTOR = "#priceRefinements ul[aria-labelledby='p_36-title'] form input[id='high-price']";
const PRICE_SUBMIT_SELECTOR = "#priceRefinements ul[aria-labelledby='p_36-title'] form input[type='submit']";
const SORT_DROPDOWN_CONTAINER_SELECTOR = ".a-dropdown-container";
const SORT_DROPDOWN_SELECTOR = "i.a-icon-dropdown";
const SORT_WAIT_SELECTOR = ".a-popover.a-dropdown.a-dropdown-common.a-declarative";
const SORT_LOW_TO_HIGH_SELECTOR = ".a-popover.a-dropdown.a-dropdown-common.a-declarative .a-popover-wrapper .a-popover-inner ul[role='listbox'] li a#s-result-sort-select_2";
class searchAction {
    constructor(page) {
        this.page = page;
        this.BROWSER_LINK = 'https://www.amazon.com/';
        this.delay = 3000;
        this.typeDelay = 100;
        this.minPrice = "100";
        this.maxPrice = "200";
    }
    static init(page) {
        return new searchAction(page);
    }
    findSearchBar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.goto(this.BROWSER_LINK);
                yield this.page.type(SEARCH_SELECTOR, LAPTOP_TEXT, { delay: this.typeDelay });
            }
            catch (error) {
                throw `Expected selector ${SEARCH_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
            try {
                yield this.page.click(SUBMIT_SELECTOR);
            }
            catch (error) {
                throw `Expected selector ${SUBMIT_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
            yield this.page.waitForNavigation();
        });
    }
    // brand filter
    applyBrandFilterData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.waitForSelector(BRAND_WAIT_SELECTOR, { timeout: this.delay });
            }
            catch (error) {
                throw `Expected selector ${BRAND_WAIT_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
            try {
                yield this.page.click(HP_SELECTOR, { delay: this.delay });
            }
            catch (error) {
                throw `Expected selector ${HP_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
            try {
                yield this.page.waitForSelector(BRAND_WAIT_SELECTOR, { timeout: this.delay });
            }
            catch (error) {
                throw `Expected selector ${BRAND_WAIT_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
            try {
                yield this.page.click(SAMSUNG_SELECTOR, { delay: this.delay });
            }
            catch (error) {
                throw `Expected selector ${SAMSUNG_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
        });
    }
    // reviews filter
    applyReviewsFilterData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.waitForSelector(REVIEW_BRAND_SELECTOR, { timeout: this.delay });
            }
            catch (error) {
                throw `Expected selector ${REVIEW_BRAND_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
            try {
                yield this.page.click(REVIEW_SELECTOR, { delay: this.delay });
            }
            catch (err) {
                throw `Expected selector ${REVIEW_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
        });
    }
    // price filter
    applyPriceFilterData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.waitForSelector(PRICE_BRAND_SELECTOR);
            }
            catch (err) {
                throw `Expected selector ${PRICE_BRAND_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
            try {
                yield this.page.type(MIN_PRICE_SELECTOR, this.minPrice, { delay: this.typeDelay });
            }
            catch (error) {
                throw `Expected selector ${MIN_PRICE_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
            try {
                yield this.page.type(MAX_PRICE_SELECTOR, this.maxPrice, { delay: this.typeDelay });
            }
            catch (error) {
                throw `Expected selector ${MAX_PRICE_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
            try {
                yield this.page.click(PRICE_SUBMIT_SELECTOR, { delay: this.delay });
            }
            catch (error) {
                throw `Expected selector ${MAX_PRICE_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
        });
    }
    // sort filter
    applySortFilterData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.waitForSelector(SORT_DROPDOWN_CONTAINER_SELECTOR);
                yield this.page.click(SORT_DROPDOWN_SELECTOR, { delay: this.delay });
                yield this.page.waitForSelector(SORT_WAIT_SELECTOR);
                yield this.page.click(SORT_LOW_TO_HIGH_SELECTOR, { delay: this.delay });
            }
            catch (err) {
                throw `Expected selector ${SEARCH_SELECTOR} didn't appear after ${this.delay}ms.`;
            }
        });
    }
}
exports.default = searchAction;
