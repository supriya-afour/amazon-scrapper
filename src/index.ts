import express from "express";
import http from 'http';
import Operation from "./operation";
import AmazonRouter from "./router";
const operation = new Operation();
const amazonRouter = new AmazonRouter();

class ScrapperApp {
  public initialize = async (): Promise<http.Server> => {

    // const PORT: number = parseInt(process.env.PORT as string, 10);
    const PORT = 3000;
    const app = express();
    app.use(express.json());

    // First route
    app.get('/', (req, res) => {
      res.send('Hello from Amazon scrapper');
    });

    try {
      operation.visitAmazon();
    } catch (err) {
      throw err;
    }


    return app.listen(PORT, () => {
      console.log(`Server running on PORT number ${PORT}`);
    });
  };
}

const baseApp = new ScrapperApp();
baseApp.initialize();
