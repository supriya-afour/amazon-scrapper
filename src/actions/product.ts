import { Page } from "puppeteer";

interface ProductInterface {
  name: string,
  price: string,
  series: string,
  brand: string,
  specific_uses_for_product: string,
  screen_size: string,
  operating_system: string,
  human_interface_input: string,
  cpu_manufacturer: string,
  card_description: string,
  color: string,
  connectivity_technology: string,
}
// As specified by puppeteer docs.
const PUPPETEER_DEFAULT_TIMEOUT_MS = 30000;
const TOP_WAIT_PRODUCT_SELECTOR: string = "div[data-cel-widget='search_result_1']"
const TOP_PRODUCT_SELECTOR: string = "div[data-cel-widget='search_result_1'] h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2 a";
const PRODUCT_DETAILS_HEADERS_SELECTOR = '#poExpander table tr td.a-span3 span.a-size-base';
const PRODUCT_DETAILS_RESULTS_SELECTOR = '#poExpander table tr td.a-span9 span.a-size-base';
const PRODUCT_NAME_WAIT_SELECTOR: string = "#ppd #centerCol #titleSection";
const PRODUCT_NAME_SELECTOR: string = '#ppd #centerCol #titleSection #productTitle'
const PRODUCT_PRICE_SELECTOR: string = '#corePrice_desktop table .a-offscreen';
const PRODUCT_CLICK_MORE_WAIT_SELECTOR: string = "#poToggleButton";
const PRODUCT_CLICK_MORE_SELECTOR: string = "#poToggleButton a";
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

export default class Product {
  private delay: number = 3000;
  constructor(private readonly page: Page) { }

  public static init(page: Page){
    return new Product(page)
  }

  // get first product from the filtered data.
  public async getProduct() {
    try {
      await this.page.waitForSelector(TOP_PRODUCT_SELECTOR);
      await this.page.click(TOP_PRODUCT_SELECTOR, { delay: this.delay });
    } catch (err) {
      throw `Expected selector ${TOP_WAIT_PRODUCT_SELECTOR} didn't appear after ${this.delay}ms.`
    }
  }

  public async scrapProductDetails(): Promise<ProductInterface> {
    // scrap product name
    await this.page.waitForSelector(PRODUCT_NAME_WAIT_SELECTOR);
    const productTitle = await this.page.$(PRODUCT_NAME_SELECTOR);
    const productName = await this.page.evaluate(el => el.textContent.trim(), productTitle);

    // scrap product price
    const productPrice = await this.page.$(PRODUCT_PRICE_SELECTOR);
    const price = await this.page.evaluate(el => el.textContent, productPrice);

    // click on see more button
    await this.page.waitForSelector(PRODUCT_CLICK_MORE_WAIT_SELECTOR);
    console.log("PRODUCT_CLICK_MORE_WAIT_SELECTOR", PRODUCT_CLICK_MORE_WAIT_SELECTOR);
    await this.page.click(PRODUCT_CLICK_MORE_SELECTOR, { delay: this.delay });

    // scrap product table details
    // const headerValues = await this.getAndValidateProductHeaders(
    //   PRODUCT_DETAILS_HEADERS_SELECTOR,
    //   EXPECTED_PRODUCT_DETAILS_HEADERS,
    // );

    ;
    // const poRows = await this.page.$$(PRODUCT_DETAILS_RESULTS_SELECTOR);

    const rowValues: string[] = await this.page.$$eval(PRODUCT_DETAILS_RESULTS_SELECTOR, elements =>
      elements.map(e => e.textContent?.replace(/\n/g, '') || ''),
    );

    const productDetails: ProductInterface = {
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
    }
    console.log(productDetails);
    return productDetails;
  }

  private async getAndValidateProductHeaders(
    headerSelector: string,
    expectedHeaders: string[],
  ): Promise<string[]> {
    await this.page.waitForSelector(headerSelector, { timeout: this.delay });
    const responseContent = await this.page.$$eval(headerSelector, rows =>
      rows.map(row => (row as HTMLInputElement).textContent)
    );
    const headersMatchExpected =
      expectedHeaders.length === responseContent.length &&
      expectedHeaders.every(header => responseContent.includes(header));

    if (headersMatchExpected === false) {
      console.error(
        `Actual headers don't match expected: expected=${JSON.stringify(
          expectedHeaders,
        )}, actual=${JSON.stringify(responseContent)}`,
      );
    }
    return responseContent.map(content => content?.trim() ?? '');
  }
}
