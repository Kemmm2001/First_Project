const express = require('express');
import homeController from '../Controller/HomeController';
import categoryController from '../Controller/CategoryController';
import orderController from '../Controller/OrrderController';

import taskController from '../Controller/taskController'


var router = express.Router();

const initWebRouter = (app) => {
    router.get('/home',homeController.getHomepage);
    router.get('/category',categoryController.getCategory)
    router.get('/order',orderController.orderPage)

    //Task list
    router.get('/task',taskController.getTask)
    router.post('/addTask',taskController.addTask)
    router.post('/deleteTask',taskController.deleteTask)

    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

export default initWebRouter;