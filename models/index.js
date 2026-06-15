const userModel = require('./user-model');
const bookModel = require('./book-model'); 
module.exports = {
    userModel,
    bookModel
}   
// This file serves as an index for all the models in the application. It imports the user and book models and exports them as a single object, making it easier to manage and access the models throughout the application.
// By using this index file, you can simply import the models from this file instead of importing each model individually in other parts of the application. This promotes cleaner code and better organization.
