'use strict';

const cuid = require('cuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => cuid()
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

          len: {
            args: [6, 128],
            msg: 'Password must be between 6 and 128 characters'
          }
        }
      },
      roles: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['admin', 'user']],
          }
        },
        defaultValue: 'user'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
