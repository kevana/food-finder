'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('PushSubscriptions', 'key', Sequelize.STRING),
      queryInterface.addColumn('PushSubscriptions', 'authSecret', Sequelize.STRING)])
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('PushSubscriptions', 'key'),
      queryInterface.removeColumn('PushSubscriptions', 'authSecret')])
  }
};
