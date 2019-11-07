const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = 4464
const mongoose = require('mongoose')
const multer = require('multer');
const myRoutes = express.Router();

app.use(cors());
app.use(bodyparser.json())

app.listen(PORT, function(){
    console.log('Server is running on: ' + PORT)  
})

//*************************************************************** */ Database connection håndtering. 
mongoose.connect('mongodb://127.0.0.1:27017/asm_base_server', { useNewUrlParser: true, useUnifiedTopology:true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log('mongodb connection complete')
})

app.use('',myRoutes);

//*************************************************************** */ Set up Models
let filelistmodel = require('./models/filelist.model.js');
let charectermodel = require('./models/charecter.model.js');
let chaptermodel = require('./models/chapters.model.js');
let todomodel = require('./models/todo.model.js');

//*************************************************************** */ Todo Håndtering.

// add Todo
myRoutes.route('/add/todo').post(function(req,res){
    let newtodo = new todomodel(req.body);

    newtodo.save().then(newch =>{
        res.status(200).json({'todo':' Added'})
    }).catch(err => {
        res.status(400).send('add new todo Fail')
    })
})


// Get Todo List pratical

myRoutes.route('/gettodo/pratical').get(function(req,res){

    todomodel.find({"todo_kategori": "practical", "todo_arkive": false}  ,function(err, currentTodo){
        if(err){
            console.log('an Error has accured in -get practical List- endpoint')
        } else {
            res.json(currentTodo)
        }

    })
 
})


// get Arkived pratical Todos
myRoutes.route('/gettodo/pratical/arkived').get(function(req,res){

    todomodel.find({"todo_kategori": "practical", "todo_arkive": true}  ,function(err, currentTodo){
        if(err){
            console.log('an Error has accured in -get practical List- endpoint')
        } else {
            res.json(currentTodo)
        }

    })
 
})



// Get Todo List story


myRoutes.route('/gettodo/story').get(function(req,res){

    todomodel.find({"todo_kategori": "story", "todo_arkive": false}  ,function(err, currentTodo){
        if(err){
            console.log('an Error has accured in -get story List- endpoint')
        } else {
            res.json(currentTodo)
        }

    })
 
})


// get Arkived story Todos
myRoutes.route('/gettodo/story/arkived').get(function(req,res){

    todomodel.find({"todo_kategori": "story", "todo_arkive": true}  ,function(err, currentTodo){
        if(err){
            console.log('an Error has accured in -get story List- endpoint')
        } else {
            res.json(currentTodo)
        }

    })
 
})


// Get Todo List create

myRoutes.route('/gettodo/create').get(function(req,res){

    todomodel.find({"todo_kategori": "create", "todo_arkive": false}  ,function(err, currentTodo){
        if(err){
            console.log('an Error has accured in -get create List- endpoint')
        } else {
            res.json(currentTodo)
        }

    })
 
})


// get Arkived create Todos
myRoutes.route('/gettodo/create/arkived').get(function(req,res){

    todomodel.find({"todo_kategori": "create", "todo_arkive": true}  ,function(err, currentTodo){
        if(err){
            console.log('an Error has accured in -get create List- endpoint')
        } else {
            res.json(currentTodo)
        }

    })
 
})


// Get alle Sidebar Todos
myRoutes.route('/gettodo/next').get(function(req,res){

    todomodel.find({"todo_Sidebar_status": "show"}  ,function(err, currentTodo){
        if(err){
            console.log('an Error has accured in -get create List show- endpoint')
        } else {
            res.json(currentTodo)
        }

    })
 
})



// Get a Todo Based on Id.
myRoutes.route('/gettodo/:id').get(function(req,res){

    let id = req.params.id;

    todomodel.findById(id, function(err, todo){
        if(err) {
            console.log(err)
        } else {
            res.json(todo)
        }
        
    })
})


// Save Edit Todos: 
myRoutes.route('/update/todo/:id').post(function(req,res){
    todomodel.findById(req.params.id, function(err, saveobj){

        if(!saveobj){
            res.status(400).send('data not found')
        } else {
            saveobj.todo_name = req.body.todo_name;
            saveobj.todo_description = req.body.todo_description;
            saveobj.todo_kategori = req.body.todo_kategori;
            saveobj.todo_arkive = req.body.todo_arkive;
            saveobj.todo_Sidebar_status = req.body.todo_Sidebar_status;
            saveobj.todo_complete_status = req.body.todo_complete_status;
   

        saveobj.save().then(saveobj => {
            res.json('Todo Update')
        }).catch(err => {
            res.status(400).send("update fail.")
        })
    }
    })

})


// DELTE Edit Todo: 
myRoutes.delete('/delete/todo/:id', function(req,res, next){
    todomodel.deleteOne({_id: req.params.id}, function(err, result){
        if(err) {
            console.log('fejl in delete')
        } else {
            var svarretur = "Antal Slettede Todos: " + result.deletedCount
            res.json(svarretur);
            console.log("Antal Slettede: " + result.deletedCount) 
        }
    }) .catch(function(){
        console.log("FEJL i Deleted Catch")
    })
})


//*************************************************************** */ Chapter Håndtering.
// Make new Chapter to DB. 
myRoutes.route('/add/savechapter').post(function(req,res){
    let newch = new chaptermodel(req.body);

    newch.save().then(newch =>{
        res.status(200).json({'Chapter':' Added'})
    }).catch(err => {
        res.status(400).send('add new Charectetr Fail')
    })
})

// Get Complete chapterList from DB.
myRoutes.route('/getChapterList').get(function(req,res){
    chaptermodel.find({},function(err, chapterlist){
        if(err) {
            console.log(err)
        } else {
            res.json(chapterlist)
        }
        
    })
})

// Get Chapter from ID. 
myRoutes.route('/getchapter/:id').get(function(req,res){

    let id = req.params.id;

    chaptermodel.findById(id, function(err, chapter){
        if(err) {
            console.log(err)
        } else {
            res.json(chapter)
        }
        
    })
})

// Save Chapter:

myRoutes.route('/update/chapter/:id').post(function(req,res){
    chaptermodel.findById(req.params.id, function(err, saveobj){

        if(!saveobj){
            res.status(400).send('data not found')
        } else {
            saveobj.chapter_nr = req.body.chapter_nr;
            saveobj.chapter_name = req.body.chapter_name;
            saveobj.chapter_status = req.body.chapter_status;
            saveobj.chapter_page_length = req.body.chapter_page_length;
            saveobj.chapter_charecter_appear = req.body.chapter_charecter_appear;

        saveobj.save().then(saveobj => {
            res.json('Chapter Update')
        }).catch(err => {
            res.status(400).send("update fail.")
        })
    }
    })

})

// Delte Chapter by ID: 
myRoutes.delete('/delete/chapter/:id', function(req,res, next){
    chaptermodel.deleteOne({_id: req.params.id}, function(err, result){
        if(err) {
            console.log('fejl in delete')
        } else {
            var svarretur = "Antal Slettede chapter: " + result.deletedCount
            res.json(svarretur);
            console.log("Antal Slettede: " + result.deletedCount) 
        }
    }) .catch(function(){
        console.log("FEJL i Deleted Catch")
    })
})


//*************************************************************** */ Main Charecter Håndtering.

// Make new Charecter to DB. 
myRoutes.route('/add/savech').post(function(req,res){
    let newch = new charectermodel(req.body);

    newch.save().then(newch =>{
        res.status(200).json({'Charecter':' Added'})
    }).catch(err => {
        res.status(400).send('add new Charectetr Fail')
    })
})

// Get Complete CharecterList from DB.
myRoutes.route('/getNameList').get(function(req,res){
    charectermodel.find({},function(err, namelist){
        if(err) {
            console.log(err)
        } else {
            res.json(namelist)
        }
        
    })
})

// Get Charecter ID from DB.

myRoutes.route('/selectedCharecter/:id').get(function(req,res){

    let id = req.params.id;

    charectermodel.findById(id, function(err, charecter){
        if(err) {
            console.log(err)
        } else {
            res.json(charecter)
        }
        
    })
})

// save Charecters.

myRoutes.route('/update/:id').post(function(req,res){
    charectermodel.findById(req.params.id, function(err, saveobj){

        if(!saveobj){
            res.status(400).send('data not found')
        } else {
            saveobj.ch_name = req.body.ch_name;
            saveobj.ch_vip = req.body.ch_vip;
   

        saveobj.save().then(saveobj => {
            res.json('Charecter Update')
        }).catch(err => {
            res.status(400).send("update fail.")
        })
    }
    })

})

// Delete Charecter.
myRoutes.delete('/delete/:id', function(req,res, next){
    charectermodel.deleteOne({_id: req.params.id}, function(err, result){
        if(err) {
            console.log('fejl in delete')
        } else {
            var svarretur = "Antal Slettede Charatere: " + result.deletedCount
            res.json(svarretur);
            console.log("Antal Slettede: " + result.deletedCount) 
        }
    }) .catch(function(){
        console.log("FEJL i Deleted Catch")
    })
})


// søgning Charecter.

// Find Charecters der er VIP.
myRoutes.route('/vipchlist').get(function(req,res){

    charectermodel.find({"ch_vip": true}  ,function(err, currentUser){
        if(err){
            console.log('an Error has accured in -get all VIPS- endpoint')
        } else {
            res.json(currentUser)
        }

    })
 
})

//*************************************************************** */ Main File Håndtering.


//Get alle used names for the main document/the story

myRoutes.route('/get_all_file_names').get(function(req,res){

    filelistmodel.find(function(err, current_file_list){
        
        if(err){
            console.log('An Error has accured in getting all filenames endpoint')
        } else {
            res.json(current_file_list);
        }
        
    })
})

// Save name + position
var storagevar = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../asm/public/upload/files');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});

// Selve Upload funktionen:
var upload = multer({ storage:storagevar}).single('file');


// forbinder med frontend:
app.post('/upload', function(req, res){

    upload(req, res, function(err){
        if(err){
            console.log('Der skete en upload fejl');
            return res.status(500).json(err)
        }



        let fileNameData = new filelistmodel(req.body);

        fileNameData.save().then(n =>{
            return res.status(200).send(req.file);
        }).catch( err =>{ 
            console.log('Der skete en upload fejl');
            return res.status(500).json(err)
        })
            

        console.log("name: "+fileNameData)
        return res.status(200).send(req.file);


    })
})
