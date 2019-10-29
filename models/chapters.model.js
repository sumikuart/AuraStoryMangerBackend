const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Chapterlist = new schema({

    chapter_nr: {
        type:Number
    }, 

    chapter_name: {
        type:String,
        default: 'To be detement'
    },

    
    chapter_status: {
        type:String,
        default: 'none'
    }

});


module.exports = mongoose.model('Chapterlist', Chapterlist, 'Chapterlist')