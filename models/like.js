const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId
    },
    //this defines the object id of the liked object
    likeable : {
        type : mongoose.Schema.ObjectId,
        required : true,
        refPath : 'onModel'
    },
    // this field is used for defining the type of like object at run time as it is a dynamic refernce
    onModel : {
        type : String,
        requireD : true,
        enum : ['Post', 'Comment']
    }
}, {
    timestamps : true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;