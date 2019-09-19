const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Filelist = new schema({

    list_name: {
        type:String
    }, 

    list_date: {
        type:Date,
        default: Date.now
    }

});


module.exports = mongoose.model('Filelist', Filelist, 'Filelist')