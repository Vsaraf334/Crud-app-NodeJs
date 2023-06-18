const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// // const fs = require('fs');
// // const path = require('path');
// // const Cart = require('./cart');

// // const rootDir = require('../util/path');
// // const filePath = path.join(rootDir, 'data', 'products.json');
// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// module.exports = class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result, 'dfdddsf');
//       })
//       .catch(err => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(err => console.log(err));
//   }

//   static deleteById(proId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(proId) })
//       .then(result => {})
//       .catch(err => console.log(err));
//   }
// };
