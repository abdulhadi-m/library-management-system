const {userModel, bookModel} = require('../models')

exports.getAllUsers = async (req, res) => {
    const users = await userModel.find()
    
    if(!users.length){
        return res.status(404).json({
            success: false,
            message: 'No users found'
        })
    }

    res.status(200).json({
        success: true,
        data: users
    })
}


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
exports.getSingleUserById = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id)   
    // const user = await userModel.findOne({_id:id})
    // const user = await userModel.findById({_id:id})
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })

}



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
exports.createUser = async (req, res) => {
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields."
        })
    }

    const user = await userModel.create(data);
    const getAllUsers = await userModel.find();
    
    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: getAllUsers
    })
}



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
exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields."
        })
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

    if(!updatedUser){
        return res.status(404).json({
            success: false,
            message: `User not found: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User Updated Successfully"
    })

}



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
exports.deleteUserbyId = async (req, res) => {
    const {id} = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if(!deletedUser){
        return res.status(404).json({
            success: false,
            message: `User not found: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
}



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
exports.subscriptionDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Database se user dhoondho
        const user = await userModel.findById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found with ID: ${id}`
            });
        }

        // 2. Mongoose ke heavy data ko normal object mein badlo
        const userPlainObject = user.toObject();

        // 3. Helper Function: Date ko simple Numbers (Din) mein badalne ke liye
        const getDateInDays = (dateStr = '') => {
            let date;
            if (dateStr) {
                date = new Date(dateStr); // Jo date string di hai use pakdo
            } else {
                date = new Date(); // Agar kuch nahi diya toh Aaj ki date pakdo
            }
            // Milliseconds ko pure din (Days) mein convert karne ka math
            return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
        };

        // 4. Sabhi dates ko simple numbers (Days) mein convert karo
        let currentDate = getDateInDays(); // Aaj ka din
        let returnDate = getDateInDays(userPlainObject.returnDate); // Book return karne ka din
        let subscriptionDate = getDateInDays(userPlainObject.subscriptionDate); // Subscription shuru hone ka din

        // 5. Plan ke hisab se check karo subscription kitne din chalegi
        let subscriptionExpirationDate = subscriptionDate;
        
        if (userPlainObject.subscriptionType === "Basic") {
            subscriptionExpirationDate += 90; // 3 Mahine
        } else if (userPlainObject.subscriptionType === "Standard") {
            subscriptionExpirationDate += 180; // 6 Mahine
        } else if (userPlainObject.subscriptionType === "Premium") {
            subscriptionExpirationDate += 365; // 1 Saal
        }

        // 6. Kitne din bache hain (Minus karke nikal lo)
        const subscriptionDaysLeft = subscriptionExpirationDate - currentDate;
        const daysLeftForExpiration = returnDate - currentDate;

        // 7. Fine (Penalty) lagane ka simple If-Else logic
        let fineAmount = 0;

        if (returnDate < currentDate) {
            // Case A: Book late hai aur plan bhi khatam ho gaya hai
            if (subscriptionExpirationDate < currentDate) {
                fineAmount = 200;
            } 
            // Case B: Book late hai par plan abhi chal raha hai
            else {
                fineAmount = 100;
            }
        }

        // 8. Saara data ek sath pack karo aur response bhej do
        const finalData = {
            ...userPlainObject,
            subscriptionExpired: subscriptionExpirationDate < currentDate,
            subscriptionDaysLeft: subscriptionDaysLeft,
            daysLeftForExpiration: daysLeftForExpiration,
            bookStatus: returnDate < currentDate ? "Book Overdue" : "No Fine",
            fine: fineAmount
        };

        res.status(200).json({
            success: true,
            data: finalData
        });

    } catch (error) {
        // Agar code mein koi dikkat aaye toh server crash na ho
        res.status(500).json({
            success: false,
            message: "Error counting subscription details",
            error: error.message
        });
    }
};