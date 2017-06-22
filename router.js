const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/todos', (req, res)=>{
    mongoose.model('User').getTasksByUserId(req.cookies.user_id)
        .then(result => {
            res.json(result)
        })
   
})
router.delete('/todos/:id', (req, res) => {
    const {id} = req.params
    mongoose.model('Task').delete(id, req.cookies.user_id)
       .then(() =>mongoose.model('User').getTasksByUserId(req.cookies.user_id))
        .then(result=>{
            res.json(result.tasks)
        })
        .catch(err=>console.log(err))
    
})

router.post('/todos', (req, res)=>{
    const data = req.body
    mongoose.model('Task').add(data, req.cookies.user_id)
        .then(() =>mongoose.model('User').getTasksByUserId(req.cookies.user_id))
        .then(result=>{
            res.json(result.tasks)
        })
        .catch(err=>console.log(err))
    
})


router.put('/todos/:id', (req, res) => {
  const {id} = req.params
  const data = req.body
  req.checkBody('title', 'Title is required').notEmpty()
  req.getValidationResult()
    .then(result => result.array())
    .then(result=>{
        console.log(result)
      if(result <= 0){
        mongoose.model('Task').edit(id, data)
      }
      mongoose.model('User').getTasksByUserId(req.cookies.user_id)
      .then(result=>{
            res.json(result.tasks)
        })
        .catch(err=>console.log(err))
    })
})




module.exports = router