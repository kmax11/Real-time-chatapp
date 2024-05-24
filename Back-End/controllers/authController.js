import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import GenerateToken from "../utils/generateToken.js";


export const signup = async (req,res)=>{ 
    try {

        // create variables for storing request parameters

        const {fullName,userName,password,confirmPassword,gender,profilePicture} = req.body;
        
        // checking the password matches the confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({message:'passwords do not match'})
        }

        // check the user exists or not
        const user = await User.findOne({userName})
        if(user){
            return res.status(400).json({message:"user already exists"})
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // create a new USER   
        const newUser = new User({
            fullName,
            userName,
            profilePicture,
            gender,
            password:hashedPassword
        })
        await newUser.save();
        
        // generate a new token
        GenerateToken(newUser._id,res);

        // response new created user
        res.status(201).json({
            _id: newUser._id,
            fullName:newUser.fullName,
            userName:newUser.userName,
            password:newUser.password,
            gender:newUser.gender,
            profilePicture:newUser.profilePicture
        })

    } catch (error) {
        console.log("error in signup controller : " + error);
    }
}


export const login = async (req, res) => {
	try {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		GenerateToken(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.userName,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const logout = (req,res)=>{
    try {
        res.cookie('jwt',{maxAge:0})
        return res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log("error in login controller : " + error);
    }
}