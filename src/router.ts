/**
 * Required External Modules and Interfaces
 */
 import Operation from "./operation";
 import { Router } from 'express';
 const operation = new Operation();
 /**
  * Router Definition
  */
 
 export default class AmazonRouter {
   private router: Router;
   /**
    *
    */
   constructor() {
     this.router = Router();
     this.setRoutes();
   }
 
   private setRoutes() {
     this.router.get('/scrap-amazon-details', operation.visitAmazon);
   }
 
   public getRouter() {
     return this.router;
   }
 }
 