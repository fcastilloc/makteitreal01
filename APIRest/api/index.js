const express = require('express');
const router = express.Router();

const users = require('./users');
const books = require('./books');
const logger = require('./middlewares/logger');

router.use(logger);
router.use('/users', users);
router.use('/books', books);

module.exports = router;