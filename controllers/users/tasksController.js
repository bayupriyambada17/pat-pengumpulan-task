const status = require("../../lib/status")
const { tasks, users, submitTask } = require("../../models");

const allTasks = async (req, res) => {
  try {
    const all = await tasks.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });

    status(res, 200, 'Success', all)
  } catch (error) {
    console.error(error)
    status(res, 500, 'Internal Server Error')
  }
}

const submit = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id
  const { submitUrl } = req.body;
  try {
    const submitTaskUser = submitTask.findOrCreate({
      where: {
        taskId: id,
        userId,
      },
      defaults: {
        submitUrl
      }
    });

    if (!submitTaskUser) {
      status(res, 404, 'Task Not Found')
    }
    status(res, 200, 'Success Submit Task')
  } catch (error) {
    console.error(error)
    status(res, 500, 'Internal Server Error')
  }
}

module.exports = {
  allTasks,
  submit
}