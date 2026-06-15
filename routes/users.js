const express=require('express')
const {users}= require('../data/users.json')
const router = express.Router();
const { getAllUsers, getSingleUserById, createUser, updateUser, deleteUserbyId, subscriptionDetails } = require('../controllers/user-controller');
/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: public
 * Parameters: none
 */
// router.get('/', (req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: users
//     })
// })

router.get('/',getAllUsers)


/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a users by their id
 * Access: public
 * Parameters: id
 */
// router.get('/:id',(req,res)=>{

//     const {id}=req.params;
//     const user = users.find((each)=>each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found: ${id}`
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: user
//     })
// })

router.get('/:id', getSingleUserById)



/**
 * Route: /users
 * Method: POST
 * Description: Create/Register a new user
 * Access: public
 * Parameters: none
 */
// router.post('/',(req,res)=>{
//     // Destructuring the required fields from the request body
//     const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    
//     // Validation
//     if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all the requured fields."
//         })
//     }

//     // Check if user already exists
//     const user = users.find((each)=>each.id === id)
//     if(user){
//         return res.status(409).json({
//             success: false,
//             message: "User Already Exists"
//         })
//     }

//     // Create new user
//     users.push({
//         id, 
//         name, 
//         surname, 
//         email, 
//         subscriptionType, 
//         subscriptionDate
//     })
//     // Send response
//     res.status(201).json({
//         success: true,
//         message: "User Created Successfully"
//     })
// })

router.post('/', createUser)

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Update a users by their id
 * Access: public
 * Parameters: id
 */
// router.put('/:id',(req,res)=>{
//     const {id}=req.params;
//     const {data}= req.body;
//     const user = users.find((each)=>each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found: ${id}`
//         })
//     }
// // Object.assign(user, data);
//     const updateUser = users.map((each)=>{
//         if (each.id === id){
//             return{
//                 ...each, ...data,
//             }
//         }
//         return each
//     }) 
//     res.status(200).json({
//         success: true,
//         data: updateUser,
//         message: "User Updated Successfully"
//     })
// })

router.put('/:id', updateUser)


/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a users by their id
 * Access: public   
 * Parameters: id
 */
// router.delete('/:id',(req,res)=>{
//     const {id}=req.params;
//     const user = users.find((each)=>each.id === id) 
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found: ${id}`
//         })
//     }
//     const index = users.indexOf(user);
//     users.splice(index,1);
//     res.status(200).json({
//         success: true,
//         message: "User Deleted Successfully"
//     })
// })

router.delete('/:id', deleteUserbyId)



/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get subscription details of a user by their ID
 * Access: public   
 * Parameters: ID
*/
// router.get('/subscription-details/:id', (req,res)=>{
//     const {id} = req.params;

//     const user = users.find((each)=> each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found with ID: ${id}`
//         })
//     }
//     const getDateInDays = (data ='')=>{
//         let date;
//         if(data){
//             date = new Date(data);
//         }else{
//             date = new Date();
//         }
//         let days = Math.floor(date/(1000*60*60*24));
//         return days;
//     }

//     const subscriptionType = (date) =>{
//         if(user.subscriptionType === "Basic"){
//             date = date + 90
//         }
//         else if(user.subscriptionType === "Standard"){
//             date = date + 180
//         }
//         else if(user.subscriptionType === "Premium"){
//             date = date + 365
//         }
//         return date;
//     }

//     // Subscription Expiration Date
//     // Jan 1, 1970 UTC // Milliseconds
//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpirationDate = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpirationDate < currentDate,
//         subscriptionDaysLeft: subscriptionExpirationDate - currentDate,
//         daysLeftForExpiration: returnDate - currentDate,
//         returnDate: returnDate < currentDate ? "Book Overdue" : returnDate,
//         fine: returnDate < currentDate ? subscriptionExpirationDate <= currentDate ? 200 : 100 : 0
//     }
//     res.status(200).json({
//         success: true,
//         data
//     })
// })
router.get('/subscription-details/:id', subscriptionDetails)


module.exports = router;