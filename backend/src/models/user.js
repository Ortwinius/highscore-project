const mongoose = require('mongoose');
const randomToken = require('random-token');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required: true
    },
    token:{
        type: String
    }
})

// generate random token for user validation
userSchema.methods.generateRandomToken = function() {
    this.token = randomToken(128);
    console.log(this);
    return this.token;
}

// async static method to retrieve user (accesses model itself not child documents)
userSchema.statics.getAuthenticatedUser = async function (authToken) {    
    //console.log("Checking user authentication with token:\"", authToken, " \"=>");
    try{
        const user = await this.findOne({ token: authToken });
        console.log("Success: User found");
        return user;
    }
    catch(err) {
        console.log("Error: User not found");
        return null;
    }
}

module.exports = mongoose.model('User', userSchema);