const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Chlist = new schema({

    ch_name: {
        type:String,
        default: ''
    },
    ch_vip: {
        type:Boolean,
        default: false
    }

});


module.exports = mongoose.model('Chlist', Chlist, 'Chlist')