//Include Mongoose required modules
var mongoose = require('mongoose');

//Define the user Schema
var UserSchema = mongoose.Schema({
    username : {
      type : String,
      index : true,
      required : true
    },
    name : {
      type : String,
      required : true
    },
    password : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required : true
    }
});

//Compile the users Schema model
mongoose.model('Users', UserSchema);
