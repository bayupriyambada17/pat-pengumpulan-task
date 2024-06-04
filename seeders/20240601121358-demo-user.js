'use strict';

const cuid = require('cuid');
const { hashPassword } = require('../lib/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id: cuid(),
      username: 'admin',
      email: 'admin@smktibazma.sch.id',
      password: await hashPassword('admin123'),
      roles: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users')
  }
};
