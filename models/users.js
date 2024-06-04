const cuid = require("cuid");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => cuid()
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

        len: {
          args: [6, 128],
          msg: 'Password must be between 6 and 128 characters'
        }
      }
    },
    roles: {
      type: DataTypes.STRING,
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
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  users.associate = (models) => {
    users.hasMany(models.tasks, {
      foreignKey: 'createdBy',
      targetKey: 'id'
    })
    users.hasMany(models.submitTask, {
      foreignKey: 'userId',
      targetKey: 'id'
    })
  }

  return users;
}
