const express = require('express');
const router = express.Router();
const secureMiddleware = require('../middleware/secure.middleware');
const usersController = require('../controllers/users.controller');

router.post('/', usersController.create);
router.get('/', usersController.list);
router.put('/edit/:id',secureMiddleware.isAuthenticated, usersController.edit);
router.delete('/:id', usersController.delete);

module.exports = router;
