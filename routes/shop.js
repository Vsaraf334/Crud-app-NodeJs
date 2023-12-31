const express = require('express');

const router = express.Router();
const isAuth = require('../middleware/is-auth');

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);

router.get('/orders', isAuth, shopController.getOrders);

router.post('/create-order', isAuth, shopController.postOrder);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

module.exports = router;
