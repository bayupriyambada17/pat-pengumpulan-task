const cuid = require("cuid");

module.exports = (sequelize, DataTypes) => {
  const submitTask = sequelize.define('submitTask', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => cuid()
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    taskId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id'
      }
    },
    submitUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    submitDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'submitTask',
    timestamps: true,
  });

  submitTask.associate = (models) => {
    submitTask.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'id'
    }),
      submitTask.belongsTo(models.tasks, {
        foreignKey: 'taskId',
        targetKey: 'id'
      })
  }

  return submitTask;
}
