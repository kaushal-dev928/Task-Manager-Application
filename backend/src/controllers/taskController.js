const prisma = require("../config/prisma")

//created task
exports.createTask = async (req, res) => {
    console.log(req.body);

    try {

        const { title, description } = req.body

        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId: req.userId
            }
        })

        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//get tasks

exports.getTasks = async (req, res) => {

    try {

        const { page = 1, search = "", status } = req.query

        const limit = 5

        const tasks = await prisma.task.findMany({
            where: {
                userId: req.userId,
                title: {
                    contains: search,
                    mode: "insensitive"
                },
                ...(status !== undefined && {
                    status: status === "true"
                })
            },

            skip: (page - 1) * limit,

            take: limit

        })

        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

// Update Task
exports.updateTask = async (req, res) => {

 try {

  const { id } = req.params
  const { title, description, status } = req.body

  const task = await prisma.task.update({

   where: { id: Number(id) },

   data: {
    title,
    description,
    status
   }

  })

  res.json(task)

 } catch (error) {
  res.status(500).json({ error: error.message })
 }

}

// Delete Task
exports.deleteTask = async (req, res) => {

 try {

  const { id } = req.params

  await prisma.task.delete({
   where: { id: Number(id) }
  })

  res.json({ message: "Task deleted" })

 } catch (error) {
  res.status(500).json({ error: error.message })
 }

}

