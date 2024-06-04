const { comparePassword } = require("../../lib/bcrypt");
const generateToken = require("../../lib/generateToken");
const status = require("../../lib/status");
const { users } = require("../../models");
require('dotenv').config();
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({
      where: { email }
    });
    if (!user) status(res, 404, 'User not found');
    // compare password
    const isMatchPassword = await comparePassword(password, user.password);
    if (!isMatchPassword) status(res, 401, 'Wrong password');

    const adminResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles
    }
    const token = generateToken(user);
    status(res, 200, 'Login success', {
      user: adminResponse,
      token
    });

  } catch (error) {
    console.log(error);
    status(res, 500, 'Internal Server Error');
  }
}

const me = async (req, res) => {
  try {
    const admin = await users.findByPk(req.user.id);
    if (!admin) status(res, 404, 'Admin Not Found');
    const adminResource = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      roles: admin.roles,
    };
    status(res, 200, 'Success', {
      user: adminResource
    })
  } catch (error) {
    status(res, 500, 'Internal Server Error');
  }
}

const logout = (req, res) => {
  try {
    // Mendapatkan token dari header Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return status(res, 401, 'Token not provided');

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) return status(res, 401, 'Invalid Token, Unauthorized');

    // Logout sukses
    return status(res, 200, 'Logout Success');
  } catch (error) {
    console.error(error);
    return status(res, 500, 'Internal Server Error');
  }
}

module.exports = {
  login, me, logout
}