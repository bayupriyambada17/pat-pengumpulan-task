const cuid = require("cuid");

module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => cuid()
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descriptionTask: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deadlineDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isAfterToday(value) {
          if (value < DataTypes.NOW) {
            throw new Error('Deadline date must be after today')
          }
        }
      }
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    tableName: 'tasks',
    timestamps: true,
  });

  tasks.associate = (models) => {
    tasks.belongsTo(models.users, {
      foreignKey: 'createdBy',
      targetKey: 'id'
    })
    tasks.hasMany(models.submitTask, {
      foreignKey: 'taskId',
      targetKey: 'id'
    })
  }

  return tasks;
}
