const order = require('../Models/orders');

var orderPage = (req, res) => {
    order.find({})
        .then((orders) => {
            res.json(orders);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
}
module.exports = {
    orderPage
}