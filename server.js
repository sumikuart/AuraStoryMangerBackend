const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = 4464
const mongoose = require('mongoose')
const multer = require('multer');

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


//*************************************************************** */ Main File Håndtering.

// Save name + position
var storagevar = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/files');
    },
    filename: function (req, file, cb){
        cb(null,file.originalname +'-'+Date.now())
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

        return res.status(200).send(req.file)
    })
})
