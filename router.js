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
  req.checkBody('title', 'Title is required').notEmpty()
  req.getValidationResult()
    .then(result => result.array())
    .then(result=>{
      if(result.length <= 0) {
        const data = req.body
        data.id = Math.floor((Math.random() * 10000))
        todos.push(data)
      }
      res.send(todos)
    })

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
  req.checkBody('title', 'Title is required').notEmpty()
  req.getValidationResult()
    .then(result => result.array())
    .then(result=>{
      if(result <= 0){
        todos.map((todo, index) => {
          if (todo.id == id) {
            todo.title = title
          }
        })
      }
      res.json(todos)
    })
})

module.exports = router
