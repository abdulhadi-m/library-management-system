const mongoose = require('mongoose')

function DbConnection(){
    const DB_URL = process.env.MONGO_URI;
    
    mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB Connected Successfully... ");
    })
    .catch((error) => {
        console.error("Connection Error:", error.message);
    });
    
    const db = mongoose.connection;

}
 
module.exports = DbConnection;