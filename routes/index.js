var express = require('express');
var router = express.Router();

var models = require('../models');
var socket = require('../socket');
var webPush = require('web-push');

webPush.setGCMAPIKey(process.env.GCM_API_KEY);

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

function sendPushNotifications(payload) {
  return models.PushSubscription.findAll()
    .then(pushSubscriptions =>
      Promise.all(pushSubscriptions.map(pushSubscription =>
        webPush.sendNotification(pushSubscription.endpoint, {
          TTL: 10,
          payload: JSON.stringify(payload),
          userPublicKey: pushSubscription.key,
          userAuth: pushSubscription.authSecret
        }))
      )
    )
}

router.post('/reportFood', function (req, res) {
  models.FoodReport
    .create({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      description: req.body.description
    })
    .then(({dataValues}) => {
      console.log(dataValues);
      sendPushNotifications(dataValues);
      socket.emit(dataValues);
      res.json({
        success: true,
        id: dataValues.id,
        request: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          accuracy: req.body.accuracy
        }
      });
    });
});

router.post('/register', function (req, res) {
  models.PushSubscription
    .findOrCreate({where: {
      endpoint: req.body.endpoint,
      key: req.body.key,
      authSecret: req.body.authSecret
    }})
    .then(([pushSubscription, created]) => {
      res.sendStatus(created ? 201 : 204);
    })
});

router.post('/sendNotification', function (req, res) {
  sendPushNotifications()
    .then(function () {
      res.sendStatus(201);
    });
});

module.exports = router;
