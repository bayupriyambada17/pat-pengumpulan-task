'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => cuid()
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      descriptionTask: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      deadlineDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          isAfterToday(value) {
            if (value < Sequelize.NOW) {
              throw new Error('Deadline date must be after today')
            }
          }
        }
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('tasks');
  }
};
