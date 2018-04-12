const mongoose = require('mongoose');
require('../configs/db.config');
const Shop = require('../models/shop.model');

const shops = [
  {
    "name": "Revolve",
    "image": "http://img3.codigonuevo.com/ab/01/6b/20170906110423_00001.jpg",
    "specs": [
      "party",
      "dresses"
    ],
    "products": [{
      "name": "Falda",
      "image": "https://static.vix.com/es/sites/default/files/styles/m/public/m/mujer-no-sabe-que-prenda-escoger.jpg?itok=W147Ynhi",
      "price": 14,
    },]
  },
  {
    "name": "Missguided",
    "image": "http://cdn.vogue.es/uploads/images/thumbs/es/vog/2/s/2018/01/moda_tendencias_voguees_17817772_620x413.jpg",
    "specs": [
      "jackets",
      "t-shirts"
    ]
  },
  {
    "name": "Asos",
    "image": "http://www.abc.es/media/economia/2017/01/16/moda-k7DB--620x349@abc.jpg",
    "specs": [
      "summer"
    ]
  }
];

Shop.create(shops)
  .then(() => {
    console.info("Seeds success:", shops);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Seeds error:", shops);
    mongoose.connection.close();
  });
