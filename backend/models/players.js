const mongoose = require('mongoose');



const matchSchema=mongoose.Schema({
    playerName:String,
    playerPost:String,
    playerImage:String,
    userId:String,
});
const match=mongoose.model('Player',matchSchema)


module.exports=match
