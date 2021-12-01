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
// As specified by puppeteer docs.
const PUPPETEER_DEFAULT_TIMEOUT_MS = 30000;
const TOP_WAIT_PRODUCT_SELECTOR = ".s-include-content-margin.s-latency-cf-section.s-border-bottom.s-border-top:first-child";
const TOP_PRODUCT_SELECTOR = ".s-include-content-margin.s-latency-cf-section.s-border-bottom.s-border-top:first-child .a-section>.sg-row:nth-child(2)>div:nth-child(2) h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2 a";
// const PRODUCT_DETAILS_HEADERS_SELECTOR = '#poExpander table tr td.a-span3 span.a-size-base';
const PRODUCT_DETAILS_RESULTS_SELECTOR = '#poExpander table tr td.a-span9';
const PRODUCT_NAME_WAIT_SELECTOR = "#ppd #centerCol #titleSection";
const PRODUCT_NAME_SELECTOR = '#ppd #centerCol #titleSection #productTitle';
const PRODUCT_PRICE_SELECTOR = '#corePrice_desktop table .a-offscreen';
const PRODUCT_CLICK_MORE_WAIT_SELECTOR = "#productOverview_feature_div";
const PRODUCT_CLICK_MORE_SELECTOR = "#poToggleButton a";
const EXPECTED_PRODUCT_DETAILS_HEADERS = [
    'Series',
    'Brand',
    'Specific Uses For Product',
    'Screen Size',
    'Operating System',
    'Human Interface Input',
    'CPU Manufacturer',
    'Card Description',
    'Color',
    'Connectivity Technology',
];
class Product {
    constructor(page) {
        this.page = page;
        this.delay = 3000;
    }
    // get first product from the filtered data.
    getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.waitForSelector(TOP_WAIT_PRODUCT_SELECTOR);
                yield this.page.click(TOP_PRODUCT_SELECTOR, { delay: this.delay });
            }
            catch (err) {
                throw err;
            }
        });
    }
    scrapProductDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            // scrap product name
            yield this.page.waitForSelector(PRODUCT_NAME_WAIT_SELECTOR);
            const productTitle = yield this.page.$(PRODUCT_NAME_SELECTOR);
            const productName = yield this.page.evaluate(el => el.textContent.replace(/\n/g, ''), productTitle);
            // scrap product price
            const productPrice = yield this.page.$(PRODUCT_PRICE_SELECTOR);
            const price = yield this.page.evaluate(el => el.textContent, productPrice);
            // click on see more button
            yield this.page.waitForSelector(PRODUCT_CLICK_MORE_WAIT_SELECTOR);
            yield this.page.click(PRODUCT_CLICK_MORE_SELECTOR, { delay: this.delay });
            // scrap product table details
            // const headerValues = await this.getAndValidateProductHeaders(
            //   PRODUCT_DETAILS_HEADERS_SELECTOR,
            //   EXPECTED_PRODUCT_DETAILS_HEADERS,
            // );
            // console.log(headerValues);
            const productDetails = [];
            // const poRows = await this.page.$$(PRODUCT_DETAILS_RESULTS_SELECTOR);
            const rowValues = yield this.page.$$eval(PRODUCT_DETAILS_RESULTS_SELECTOR, elements => elements.map(e => { var _a; return ((_a = e.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\n/g, '')) || ''; }));
            productDetails.push({
                name: productName,
                price: price,
                series: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('Series')],
                brand: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('Brand')],
                specific_uses_for_product: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('Specific Uses For Product')],
                screen_size: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('Screen Size')],
                operating_system: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('Operating System')],
                human_interface_input: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('Human Interface Input')],
                cpu_manufacturer: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('CPU Manufacturer')],
                card_description: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('Card Description')],
                color: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('Color')],
                connectivity_technology: rowValues[EXPECTED_PRODUCT_DETAILS_HEADERS.indexOf('Connectivity Technology')],
            });
            console.log(productDetails);
            return productDetails;
        });
    }
    getAndValidateProductHeaders(headerSelector, expectedHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForSelector(headerSelector, { timeout: this.delay });
            const responseContent = yield this.page.$$eval(headerSelector, rows => rows.map(row => row.textContent));
            const headersMatchExpected = expectedHeaders.length === responseContent.length &&
                expectedHeaders.every(header => responseContent.includes(header));
            if (headersMatchExpected === false) {
                console.error(`Actual headers don't match expected: expected=${JSON.stringify(expectedHeaders)}, actual=${JSON.stringify(responseContent)}`);
            }
            return responseContent.map(content => { var _a; return (_a = content === null || content === void 0 ? void 0 : content.trim()) !== null && _a !== void 0 ? _a : ''; });
        });
    }
}
exports.default = Product;
