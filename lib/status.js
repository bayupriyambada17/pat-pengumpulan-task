const status = (res, code = 200, message = "Success", data = null) => {
  return res.status(code).json({
    code: code,
    message: message,
    data: data
  });
}

module.exports = status;