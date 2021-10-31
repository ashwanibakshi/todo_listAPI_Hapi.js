const mongoose      = require("mongoose");

const userSchema    = new mongoose.Schema({
        item:{
           type:String   
        },
        createdAt:{
           type:Date 
        },
        updatedAt:{
           type:Date
        }
});

module.exports = mongoose.model("usersdemoo",userSchema);