var express = require('express');
var router = express.Router();

var models  = require('../models');
var socket = require('../socket');

/* GET home page. */
router.get('/', (req, res, next) => {
  models.FoodReport
    .findAll({
      where: {
        createdAt: {
          $gt: new Date(new Date() - 60 * 60 * 1000) // Get reports from the last hour
        }
      }
    })
    .then(foodReports => {
      res.render('index', {
        title: 'Food Finder',
        foodReports
      });
  });
});

router.post('/reportFood', function (req, res) {
  models.FoodReport
    .create({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      description: req.body.description
    })
    .then(({ dataValues }) => {
      socket.emit(dataValues);
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
