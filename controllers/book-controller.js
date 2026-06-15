const {userModel, bookModel} = require('../models')
const IssuedBook = require('../DTOs/book-dto')

// const getAllBooks = ()=>{
// }

// const getSingleBookById = ()=>{
// }

// module.exports({
//     getAllBooks,
//     getSingleBookById
// })

// (req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: books
//     });
// }

//calling the bookModel (table)
exports.getAllBooks = async(req,res)=>{
    const books = await bookModel.find();

    if (books.length === 0){
        return res.status(404).json({
            success: false,
            message: "No books in the system"
        })
    }

    res.status(200).json({
        success: true,
        data: books
    })
}


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
exports.getSingleBookById = async(req,res)=>{
    const {id} = req.params
    const book = await bookModel.findById(id)

    if(!book){
        res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: book
    })

}


// router.get('/issued/for-users',(req,res)=>{
//     // const issuedBooks = book.filter((each)=>each.issued === true);
    
//     const usersWithIssuedBooks = users.filter((each)=>{
//         if(each.issuedBook){
//             return each;
//         }
//     }) 

//     const issuedBook = [];

//     usersWithIssuedBooks.forEach((each)=>{
//         const book = books.find((book)=> book.id === each.issuedBook);

//         book.issuedBy = each.name
//         book.issueDate = each.issuedDate
//         book.returnDate = each.returnDate 

//         issuedBook.push(book);
//     })
//     if(!issuedBook===0){
//         return res.status(404).json({
//             success: false,
//             message: "No Books Issued Yet"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBook
//     })  
// })
exports.getAllIssuedBooks = async(req,res)=>{
    const users = await userModel.find({
        issuedBook: {$exists: true}
    }).populate("issuedBook")

    const issuedBooks = users.map((each)=>{
        return new IssuedBook(each)
    })

    if(issuedBooks.length === 0){
            res.status(404).json({
                success: false,
                message: "No books issued yet"
            })
        }
        res.status(200).json({
            success: true,
            data: issuedBooks
        })
}


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
exports.addNewBook = async(req,res)=>{
    const {data} = req.body;

    // this is for validation
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields."
        })
    }

    // Check if book already exists
    await bookModel.create(data)
    // res.status(201).json({
    //     success: true,
    //     message: "Book Added Successfully"
    // })

    const allBooks = await bookModel.find();
    res.status(200).json({
        success: true,
        data: allBooks
    })
}


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
exports.updateBookById = async(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields."
        })
    }

    // Check if book already exists
    // const book = await bookModel.findById(id)
    // if(!book){
    //     return res.status(404).json({
    //         success: false,
    //         message: `Book not found for id: ${id}`
    //     })
    // }

    // // update the book
    // Object.assign(book, data);
    // await book.save();

    // res.status(200).json({
    //     success: true,
    //     data: book,
    //     message: "Book Updated Successfully"
    // })

    
    // const updatedBook = await bookModel.findByIdAndUpdate(id, data, {new: true})
    const updatedBook = await bookModel.findByOneAndUpdate(
        {_id: id}, 
        data, 
        {new: true}
    )
    if(!updatedBook){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: updatedBook,
        message: "Book Updated Successfully"
    })
}


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
exports.deleteBookById = async(req,res)=>{
    const {id} = req.params;

    const book = await bookModel.findById(id)
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        })
    }

    await bookModel.findByIdAndDelete(id)
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        message: "Book Deleted Successfully"
    })
}