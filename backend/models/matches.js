const mongoose = require('mongoose');



const matchSchema=mongoose.Schema({
    teamOne:String,
    teamTwo:String,
    eventName:String,
    eventDate:String,
    imageOne:String,
    imageTwo:String,
    userId:String,
});
const match=mongoose.model('Match',matchSchema)


module.exports=match
