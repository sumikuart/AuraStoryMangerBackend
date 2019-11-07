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
    },

    chapter_page_length: {
        type:Number,
        default: 0
    },

    chapter_charecter_appear: {
        type:Array,
        default: []
    }

});


module.exports = mongoose.model('Chapterlist', Chapterlist, 'Chapterlist')