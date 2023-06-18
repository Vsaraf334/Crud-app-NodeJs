const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Products',
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(prod => {
      if (!prod) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        hasError: false,
        product: prod,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const id = req.body.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      hasError: true,
      product: {
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        _id: id
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Product.findById(id)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save().then(result => {
        res.redirect('/admin/products');
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const id = req.body.id;
  Product.deleteOne({ _id: id, userId: req.user._id })
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user._id
  });

  product
    .save()
    .then(result => {
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      // console.log(products);
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        prods: products,
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};
