const express = require('express')
const app = express()
const tasks = require('./tasks')

app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.get('/',(req,res)=>{
    res.json(tasks)
})

app.get('/:id', (req,res) => {
    let Id = parseInt(req.params.id) - 1;
    if(!tasks[Id] || tasks[Id].completed ){
        return  res.status(400).json({
            msg : "please try again correctly"
        })
    }
    tasks[Id].completed = true;
    res.status(200).json({
        msg : "Good for compliting this task",
        completed : tasks[Id] 
    })
 })
app.delete('/:id', (req,res) => {
    let Id = parseInt(req.params.id) - 1;
    if(!tasks[Id]){
        return  res.status(400).json({
            msg : "please try again correctly"
        })
    }
    tasks.splice(Id,1);
    tasks.map(task => {
        if(task.id > (Id + 1)){
            task.id -= 1;
        }
    })
    res.status(200).json({
        msg : "the task has beeen deleted",
    })
 })

app.post('/add',(req,res) => {
    const newTask = {
        ...req.body,
        "completed": false,
        "id":tasks.length + 1
    };
    tasks.push(newTask);
    res.status(200).json( 
        newTask
    )
})

app.put('/:id', (req,res) => {
    let Id = parseInt(req.params.id) - 1;
    let changedNote = req.body.note;
    if(!tasks[Id] || !changedNote){
        return  res.status(400).json({
            msg : "please try again correctly"
        })
    }
    tasks[Id].note = changedNote;
    res.status(200).json({
        msg: "note updated successfully",
        note: tasks[Id]
    })
})





app.listen(3000)