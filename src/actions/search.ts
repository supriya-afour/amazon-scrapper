import { Page } from "puppeteer";

const SEARCH_SELECTOR: string = "input[name=field-keywords]";
const LAPTOP_TEXT: string = "laptop";
const SUBMIT_SELECTOR: string = 'input[type="submit"]';
const BRAND_WAIT_SELECTOR: string = '#brandsRefinements';
const HP_SELECTOR: string = '#brandsRefinements ul[aria-labelledby="p_89-title"] li[aria-label="HP"] span.a-list-item a';
const SAMSUNG_SELECTOR: string = '#brandsRefinements ul[aria-labelledby="p_89-title"] li[aria-label="Samsung Electronics"] span.a-list-item a'
const REVIEW_BRAND_SELECTOR: string = '#reviewsRefinements'
const REVIEW_SELECTOR: string = '#reviewsRefinements ul li:first-child span.a-list-item a.a-link-normal.s-navigation-item'
const PRICE_BRAND_SELECTOR: string = '#priceRefinements'
const MIN_PRICE_SELECTOR: string = "#priceRefinements ul[aria-labelledby='p_36-title'] form input[id='low-price']"
const MAX_PRICE_SELECTOR: string = "#priceRefinements ul[aria-labelledby='p_36-title'] form input[id='high-price']"
const PRICE_SUBMIT_SELECTOR: string = "#priceRefinements ul[aria-labelledby='p_36-title'] form input[type='submit']"
const SORT_DROPDOWN_CONTAINER_SELECTOR: string = ".a-dropdown-container"
const SORT_DROPDOWN_SELECTOR: string = "i.a-icon-dropdown"
const SORT_WAIT_SELECTOR: string = ".a-popover.a-dropdown.a-dropdown-common.a-declarative"
const SORT_LOW_TO_HIGH_SELECTOR: string = ".a-popover.a-dropdown.a-dropdown-common.a-declarative .a-popover-wrapper .a-popover-inner ul[role='listbox'] li a#s-result-sort-select_1"

export default class searchAction {
  private delay: number = 3000;
  private minPrice: string = "100";
  private maxPrice: string = "200";
  constructor(private readonly page: Page) { }

  public async findSearchBar() {
    try {
      await this.page.type(SEARCH_SELECTOR, LAPTOP_TEXT);
      await this.page.click(SUBMIT_SELECTOR);
      await this.page.waitForNavigation();
    } catch (err) {
      console.log(err);
    }
  }

  // brand filter
  public async applyBrandFilterData() {
    try {
      await this.page.waitForSelector(BRAND_WAIT_SELECTOR);
      await this.page.click(HP_SELECTOR, { delay: this.delay });
      await this.page.waitForSelector(BRAND_WAIT_SELECTOR);
      await this.page.click(SAMSUNG_SELECTOR, { delay: this.delay });
    }
    catch (err) {
      console.log(err);
    }
  }

  // reviews filter
  public async applyReviewsFilterData() {
    try {
      await this.page.waitForSelector(REVIEW_BRAND_SELECTOR);
      await this.page.click(REVIEW_SELECTOR, { delay: this.delay });
    }
    catch (err) {
      console.log(err);
    }
  }

  // price filter
  public async applyPriceFilterData() {
    try {
      await this.page.waitForSelector(PRICE_BRAND_SELECTOR);
      await this.page.type(MIN_PRICE_SELECTOR, this.minPrice, { delay: 100 });
      await this.page.type(MAX_PRICE_SELECTOR, this.maxPrice, { delay: 100 });
      await this.page.click(PRICE_SUBMIT_SELECTOR, { delay: this.delay });
    }
    catch (err) {
      console.log(err);
    }
  }

  // sort filter
  public async applySortFilterData() {
    try {
      await this.page.waitForSelector(SORT_DROPDOWN_CONTAINER_SELECTOR);
      await this.page.click(SORT_DROPDOWN_SELECTOR, { delay: this.delay });
      await this.page.waitForSelector(SORT_WAIT_SELECTOR);
      await this.page.click(SORT_LOW_TO_HIGH_SELECTOR, { delay: this.delay })
    }
    catch (err) {
      console.log(err);
    }
  }
}
