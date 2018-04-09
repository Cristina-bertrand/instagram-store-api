const express = require('express');
const router = express.Router();
const secureMiddleware = require('../middleware/secure.middleware');
const sessionController = require('../controllers/sessions.controller');

router.post('/', sessionController.create);
router.delete('/', sessionController.destroy);

module.exports = router;
