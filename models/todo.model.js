const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Todolist = new schema({

    todo_name: {
        type:String,
        default: 'To be detement'
    }, 
    
    todo_description: {
        type:String,
        default: 'To be detement'
    },
    
    todo_kategori: {
        type:String,
        default: 'To be detement'
    },

    todo_arkive: {
        type:Boolean,
        default: false
    },

    todo_Sidebar_status: { 
        type:String,
        default: 'dont show'
    },

    todo_complete_status: {
        type:String,
        default: 'Not Complete'
    }


    
});


module.exports = mongoose.model('Todolist', Todolist, 'Todolist')