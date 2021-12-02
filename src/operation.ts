import Browser from './actions/Browser';
import searchAction from './actions/search';
import Product from './actions/product';
import Checkout from './actions/checkout';

export default class Operation {
  

  public visitAmazon()  {
    (async () => {
      try {
        // create new browser object
        const browserObj = new Browser();

        // launch Puppeteer.
        const browser = await browserObj.launchPuppeteer();

        // launch browser
        const page = await browserObj.launchBrowser(browser);

        // Create object of searchaction

        const searchActionObj = searchAction.init(page);

        // // Search search bar
        await searchActionObj.findSearchBar()

        // // apply brand filter
        await searchActionObj.applyBrandFilterData();

        // // apply review filter
        await searchActionObj.applyReviewsFilterData();

        // // apply price filter
        await searchActionObj.applyPriceFilterData();

        // // apply sort filter
        await searchActionObj.applySortFilterData();

        // create object of productaction
        const product = Product.init(page);

        // pickup first product from the above filter
        await product.getProduct();

        //scrap all details of selected product
        await product.scrapProductDetails();

        // create object of checkoutaction
        const checkout = Checkout.init(page);

        // // click on addtocart button
        await checkout.addToCart();

        // // click on checkout button
        await checkout.checkout()
      } catch(err) {
        throw err;
      }
    })();
  }
}
