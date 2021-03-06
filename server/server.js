const express=require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

const _ =require('lodash');
var app=express();

app.use(cors());
app.options('*', cors());

const port=process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo=new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    // res.send(req.params);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});

app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send();
    })
})

app.patch('/todos/:id',(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body,['text','comleted']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    
    }
    if(_.isBoolean(body.comleted)&&body.comleted){
        body.completedAt=new Date().getTime();
    }else{
        body.comleted=false;
        body.completedAt=null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })

})

app.listen(port,()=>{
    console.log(`started on port ${port}`);
});

module.exports={app};