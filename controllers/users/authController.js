const { comparePassword } = require("../../lib/bcrypt");
const generateToken = require("../../lib/generateToken");
const status = require("../../lib/status");
const { users } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({
      where: {
        email,
        roles: 'user'
      }
    });
    if (!user) status(res, 404, 'User not found');
    // compare password
    const isMatchPassword = await comparePassword(password, user.password);
    if (!isMatchPassword) status(res, 401, 'Wrong password');

    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles
    }
    const token = generateToken(user);
    if (!token) {
      status(res, 400, 'Authorization Failed');
    }
    status(res, 200, 'Login success', {
      user: userResponse,
      token
    });

  } catch (error) {
    status(res, 500, 'Internal Server Error');
  }
}

const me = async (req, res) => {
  try {
    // // Mendapatkan token dari header Authorization
    // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    // if (!token) return status(res, 401, 'Token not provided');

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) status(res, 401, 'Token not provided');

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) status(res, 401, 'Invalid Token, Unauthorized');
      return decoded;
    });

    const user = await users.findByPk(decoded.id);
    if (!user) status(res, 404, 'user Not Found');
    const userResource = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
    status(res, 200, 'Success', {
      user: userResource
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
    return status(res, 500, 'Internal Server Error');
  }
}

module.exports = {
  login, me, logout
}