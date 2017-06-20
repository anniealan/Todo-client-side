const express = require('express')
const router = express.Router()

const todos = [
  {
    id: 1,
    title: "Eat"
  }, {
    id: 2,
    title: "Sleep"
  }, {
    id: 3,
    title: "Code"
  }
]

router.get('/todos', (req, res) => {
  res.json(todos)
})

router.post('/todos', (req, res) => {
  const data = req.body
  data.id = Math.floor((Math.random() * 10000))
  todos.push(data)
  res.send(todos)
})
router.delete('/todos/:id', (req, res) => {
  const {id} = req.params
  todos.map((todo, index) => {
    if (todo.id == id) {
      todos.splice(index, 1)
    }
  })
  res.json(todos)
})

router.put('/todos/:id', (req, res) => {
  const {id} = req.params
  const {title} = req.body
  todos.map((todo, index) => {
    if (todo.id == id) {
      todo.title = title
    }
  })
  res.json(todos)
})

module.exports = router
