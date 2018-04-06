const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');

const {Todo}=require('./../server/models/todo');

var id="5ac60f5104a2d72ad892455211";

if(!ObjectID.isValid(id)){
    console.log('Id not valid');
}else{

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);
// },(e)=>{

// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todos',todo);
// });

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('Not found id');
    }
    console.log('Todo by id',todo);
}).catch((e)=>{
    console.log(e);
})
}