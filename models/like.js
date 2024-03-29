const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
       // ref : 'User'
    },
    // this defines the object ID of the liked object
    likeable : {    
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel'
    },
    // this field is used for defining the type of liked object as it isa dynamic reference
    onModel : {
        type : String, 
        required : true,
        enum : ['Post', 'Comment']
    }
}, {timestamps : true});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;