var express = require('express');
var router = express.Router();

var models  = require('../models');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Food Finder' });
});

router.post('/reportFood', function (req, res) {
  models.FoodReport
    .create({
      latitude: req.body.latitude,
      longitude: req.body.longitude
    })
    .then(({ dataValues }) => {
      res.json({
        success: true,
        id: dataValues.id,
        request: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          accuracy: req.body.accuracy
        }});
    });
});

module.exports = router;
