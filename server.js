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
   

        saveobj.save().then(saveobj => {
            res.json('Charecter Update')
        }).catch(err => {
            res.status(400).send("update fail.")
        })
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
