var express = require('express');
var router = express.Router();
const users = require('../models/users');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const result = await users('http://z.bokus.ru/user.json');
  
  res.render('index', {
    title: 'Таблица читателей',
    data: result
  });
});

module.exports = router;
    