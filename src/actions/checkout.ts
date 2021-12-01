import { Page } from "puppeteer";

const ADD_TO_CART_WAIT_SELECTOR: string = "#mbc-addtocart-div-1";
const ADD_TO_CART_SELECTOR: string = "#mbc-addtocart-div-1 span#mbc-buybutton-addtocart-1";
const CHECKOUT_WAIT_SELECTOR: string = "#huc-v2-order-row-buttons";
const CHECKOUT_SELECTOR: string = "#huc-v2-order-row-buttons #huc-v2-subcart-buttons-wrapper #hlb-ptc-btn .a-button-inner a";

export default class Checkout {
  private delay: number = 3000;
  constructor(private readonly page: Page) { }

  // click on addtocart button
  public async addToCart(){
    try{
      await this.page.waitForSelector(ADD_TO_CART_WAIT_SELECTOR);
      await this.page.click(ADD_TO_CART_SELECTOR, { delay: this.delay });
    } catch(err){
      throw err;
    }
  }

  // click on checkout button
  public async checkout(){
    try{
      await this.page.waitForSelector(CHECKOUT_WAIT_SELECTOR);
      await this.page.click(CHECKOUT_SELECTOR, { delay: this.delay });
    } catch(err){
      throw err;
    }
  }
}
