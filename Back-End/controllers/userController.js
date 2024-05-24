import User from "../models/userModel.js";

export const getUsersFromSidebar = async (req,res) =>{
    try {
        const loggedUser = req.user._id;
        const filteredUsers = await User.find({_id : { $ne: loggedUser }}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("get users "+ error.message);
        res.status(500).json({message: "internal server error"})  
    }
}