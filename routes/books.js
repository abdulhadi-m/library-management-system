const express=require('express')
const {books}= require('../data/books.json');
const {users}=require('../data/users.json');
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, deleteBookById } = require('../controllers/book-controller');

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get list of all the books
 * Access: public
 * Parameters: none
 */

// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: books
//     });
// });

router.get('/',getAllBooks);


/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by it's id
 * Access: public
 * Parameters: id
 */

// router.get('/:id',(req,res)=>{

//     const {id}=req.params;
//     const book = books.find((each)=>each.id === id)
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found with: ${id}`
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: book
//     })
// })

router.get('/:id',getSingleBookById)


/**
 * Route: /books
 * Method: POST
 * Description: Add a new book
 * Access: public
 * Parameters: none
 */
// router.post('/',(req,res)=>{
//     const {id, name, author, genre, price, publisher} = req.body;
    
//     // Validation
//     if(!id || !name || !author || !genre || !price || !publisher){
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all the required fields."
//         })
//     }

//     // Check if book already exists
//     const book = books.find((each)=>each.id === id)
//     if(book){
//         return res.status(409).json({
//             success: false,
//             message: "Book Already Exists"
//         })
//     }

//     // Create new book
//     books.push({
//         id, 
//         name, 
//         author, 
//         genre, 
//         price, 
//         publisher
//     })
//     // Send response
//     res.status(201).json({
//         success: true,
//         message: "Book Added Successfully"
//     })
// })

router.post('/',addNewBook)


/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by it's id
 * Access: public
 * Parameters: id
 */
// router.put('/:id',(req,res)=>{
//     const {id}=req.params;
//     const {data}= req.body;
//     const book = books.find((each)=>each.id === id)
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found: ${id}`
//         })
//     }

// // Object.assign(book, data);

//     const updateBook = books.map((each)=>{
//         if (each.id === id){
//             return{
//                 ...each, ...data,
//             }
//         }
//         return each
//     })

//     res.status(200).json({
//         success: true,
//         data: updateBook,
//         message: "Book Updated Successfully"
//     })
// })

router.put('/:id',updateBookById)

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete a book by it's id
 * Access: public   
 * Parameters: id
 */
// router.delete('/:id',(req,res)=>{
//     const {id}=req.params;
//     const book = books.find((each)=>each.id === id) 
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found: ${id}`
//         })
//     }
//     const index = books.indexOf(book);
//     books.splice(index,1);
//     res.status(200).json({
//         success: true,
//         message: "Book Deleted Successfully"
//     })
// })
router.delete('/:id',deleteBookById)

/**
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get a list of all issued books
 * Access: public
 * Parameters: None
 */
// 

router.get('/issued/for-users', getAllIssuedBooks)

module.exports= router;
