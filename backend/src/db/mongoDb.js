/* 
Connection to mongoDB:

To start server:
docker pull mongo
=>  downloads the MongoDB image to your local machine
docker run -p 27017:27017 mongo
=> starts a new Docker container based on the MongoDB image (at port 27017)
docker exec -it <container-id> sh
=> allows you to execute a shell command (sh) inside a running Docker container
*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
console.log("Connected to MongoDB!")
})

module.exports=db;