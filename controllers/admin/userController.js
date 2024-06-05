const { Op } = require("sequelize");
const { hashPassword } = require("../../lib/bcrypt");
const status = require("../../lib/status");
const { users } = require("../../models")

const countUser = async (req, res) => {
  try {
    const count = await users.count({
      where: {
        roles: 'user'
      }
    });
    status(res, 200, 'Success', { count });
  } catch (error) {
    status(res, 500, 'Internal Server Error');
  }
}

const listUsers = async (req, res) => {
  const { username, email } = req.query;
  try {
    const searchCondition = {
      roles: 'user'
    }

    if (username) {
      searchCondition.username = {
        [Op.like]: `%${username}%`
      }
    }
    if (email) {
      searchCondition.email = {
        [Op.like]: `%${email}%`
      }
    }
    const allUsers = await users.findAll({
      where: searchCondition,
      attributes: ['id', 'username', 'email', 'roles']
    });
    status(res, 200, 'Success', allUsers);
  } catch (error) {
    status(res, 500, 'Internal Server Error');
  }
}
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      status(res, 400, 'User already exists');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await users.create({
      username,
      email,
      password: hashedPassword,
      roles: 'user'
    });

    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      roles: newUser.roles,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    status(res, 201, 'Success Created User', userResponse);
  } catch (error) {
    status(res, 500, 'Internal Server Error');
  }
}


module.exports = {
  countUser, listUsers, registerUser
}