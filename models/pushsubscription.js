'use strict';
module.exports = function(sequelize, DataTypes) {
  var PushSubscription = sequelize.define('PushSubscription', {
    endpoint: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return PushSubscription;
};