var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Food Finder' });
});

router.post('/reportFood', function (req, res) {
  res.json({
    success: true,
    request: {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      accuracy: req.body.accuracy
    }});
});

module.exports = router;
