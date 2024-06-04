const status = require("../../lib/status");
const { tasks, users } = require("../../models");

const listsTasks = async (req, res) => {
  const userId = req.user.id
  try {
    const allTask = await tasks.findAll({
      where: {
        createdBy: userId,
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: users,
          as: 'user',
          attributes: ['id', 'username']
        }
      ]
    });

    status(res, 200, 'Success', allTask)
  } catch (error) {
    status(res, 500, 'Internal Server Error')
  }
}
const createTask = async (req, res) => {
  const userId = req.user.id
  const { title, descriptionTask, deadlineDate } = req.body;
  try {
    const create = await tasks.create({
      title,
      descriptionTask,
      deadlineDate,
      createdBy: userId,
    });
    status(res, 201, 'Success', create)
  } catch (error) {
    status(res, 500, 'Internal Server Error')

  }
}

const showTask = async (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  try {
    const show = await tasks.findOne({
      where: { id, createdBy: userId },
      attributes: ['id', 'title', 'descriptionTask', 'deadlineDate', 'createdBy'],
      include: [
        {
          model: users,
          as: 'user',
          attributes: ['id', 'username']
        }
      ]
    }
    );
    status(res, 200, 'Success Show Task', show)
  } catch (error) {
    status(res, 500, 'Internal Server Error')
  }
}

const updateTask = (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  const { title, descriptionTask, deadlineDate } = req.body
  try {

    const updateTaskId = tasks.update({ title, descriptionTask, deadlineDate }, {
      where: { id, createdBy: userId }
    });

    if (!updateTaskId) {
      status(res, 404, 'Task Not Found')
    }
    status(res, 200, 'Success Update Task: ' + title)
  } catch (error) {
    status(res, 500, 'Internal Server Error')
  }
}


const deleteTask = async (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  try {
    const checkId = await tasks.findOne({
      where: {
        id,
        createdBy: userId,
      }
    });

    if (!checkId) {
      return status(res, 404, 'Task Not Found');
    }

    await tasks.destroy({
      where: { id, createdBy: userId }
    });

    status(res, 200, 'Success Delete Task')
  } catch (error) {
    status(res, 500, 'Internal Server Error')
  }
}

module.exports = {
  listsTasks,
  createTask,
  updateTask,
  deleteTask,
  showTask
}