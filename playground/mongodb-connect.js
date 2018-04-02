// const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('unable to connect mongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text:'something to do',
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name:"dhammika saman kumara",
    //     age :23,
    //     location:"A 249/3 Edurapotha, Dewalegama."
    // },(err,result)=>{
    //     if(err){
    //        return console.log('Unable to add data',err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    // })


    db.close();
});