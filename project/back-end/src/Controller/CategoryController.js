const express = require('express');
const category = require('../Models/category');



var getCategory = (req, res) => {
    // Viết logic
    let test = req.query.test;
    console.log(test)
    category.find({})
        .then((category) => {
            res.json(category);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
    // res.render('index.ejs')
}
module.exports = {
    getCategory
}