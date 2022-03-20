const express = require('express')
const res = require('express/lib/response')
const task = require('../models/task')
const router = express.Router()
const Task = require('../models/task')

router.get('/', async(req,res)=>{
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.send('Error: '+ error)
    }
})

router.get('/incomplete', async(req,res)=>{
    try {
        const tasks = await Task.find()
        console.log(tasks);
        filteredArray = tasks.filter((item)=>{
            return item['completed']==false;
        })

        res.json(filteredArray)
    } catch (error) {
        res.send('Error: '+ error)
    }
})

router.post('/',async(req,res)=>{
    const task = new Task({
        description: req.body.description,
        completed: req.body.completed
    })

    try {
        const t1 = await task.save()
        res.json(t1)
    } catch (error) {
        res.send('Error: '+ error)
    }
})

router.patch('/:id',async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id)
        task.completed = req.body.completed
        const t1 = await task.save()
        res.json(t1)
    } catch (error) {
        res.send('Error: '+ error)
    }
})


router.delete('/:id',async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id)
        const t1 = await task.remove()
        res.json(t1)
    } catch (error) {
        res.send('Error: '+ error)
    }
})

module.exports = router