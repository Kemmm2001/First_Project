const Product = require('../Models/Products');

var getHomepage = (req, res) => {
    // Viết logic
    Product.find({})
        .then((Products) => {       
            res.json(Products);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
    // res.render('index.ejs')
}
module.exports = {
    getHomepage
}