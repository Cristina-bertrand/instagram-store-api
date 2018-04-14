const mongoose = require('mongoose');
require('../configs/db.config');
const Shop = require('../models/shop.model');

const shops = [
  {
    "name": "Revolve",
    "description": "REVOLVE currently in Hotel Revolve click below to shop our feed ",
    "direction": "Hotel Revolve",
    "list": "Shop",
    "image": "Resolve-front.png",
    "specs": [
      "ropa de verano", "bañadores", "shorts", "vestidos"
    ]
  },
  {
    "name": "Missguided",
    "description": "MISSGUIDED KEEP ON BEING YOU, IT’S A REALLY GREAT LOOK Tag your looks with #babesofmissguided for the chance to feature. Shop our Insta",
    "list": "Shop",
    "image": "Missguided-front.png",
    "specs": [
      "jerseys", "chaquetas", "pantalones", "vestidos", "faldas"
    ]
  },
  {
    "name": "Panambi",
    "description": "Panambi Apuesta por la calidad y elegancia. marketing@panambicollection.com️ 954127227",
    "direction": "Av.Ramón Carande,7, Sevilla / Claudio Coello 47,1D Madrid",
    "list": "Brand",
    "image": "Panambi-front.png",
    "specs": [
      "boda", "invitada perfecta", "fiesta"
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
