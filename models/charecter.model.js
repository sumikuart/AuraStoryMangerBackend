const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Chlist = new schema({

    ch_name: {
        type:String,
        default: ''
    }

});


module.exports = mongoose.model('Chlist', Chlist, 'Chlist')