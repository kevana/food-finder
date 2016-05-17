'use strict';
module.exports = function(sequelize, DataTypes) {
  var FoodReport = sequelize.define('FoodReport', {
    reporter: DataTypes.STRING,
    description: DataTypes.TEXT,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FoodReport;
};