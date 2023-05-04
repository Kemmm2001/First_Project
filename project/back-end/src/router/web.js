const express = require('express');
import homeController from '../Controller/HomeController';
import categoryController from '../Controller/CategoryController'
import orderController from '../Controller/OrrderController'
var router = express.Router();

const initWebRouter = (app) => {
    router.get('/home',homeController.getHomepage);
    router.get('/category',categoryController.getCategory)
    router.get('/order',orderController.orderPage)

    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

export default initWebRouter;