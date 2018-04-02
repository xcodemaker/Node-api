// const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('unable to connect mongoDB server');
    }
    console.log('Connected to MongoDB server');

   db.collection('Todos').findOneAndUpdate({
       _id:new ObjectID('5ac26684a6405cff78fd3c32')
   },{
       $set:{
           comleted:true
       }
   },{
       returnOriginal:false
   }).then((result)=>{
       console.log(result);
   });

    // db.close();
});