import DataCollectorModel from "../models/DataCollectorModel.js";

const getAll = async(req, res) => {
    const data=await DataCollectorModel.find(); 
    if(data==[])
        res.send({status:"Warn",message:"No Item found..."});
    else
    res.send({status:"Success",message:"Recieved Required Data",data});
}

const register = async (req, res) => {
    try {
        const {
            MailID,
            Password,
            FirstName,
            LastName,
            MobileNo,
            Gender,
            Dob,
            Pincode,
            Department,
            CurrentLocation,
            ProfilePhoto, // Optional
        } = req.body;

        if (
            !MailID || !Password || !FirstName || !LastName || !MobileNo ||
            !Gender || !Pincode || !Department
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        // Check if email already exists
        const emailExists = await DataCollectorModel.findOne({ MailID });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Check if mobile number already exists
        const mobileExists = await DataCollectorModel.findOne({ MobileNo });
        if (mobileExists) {
            return res.status(400).json({
                success: false,
                message: "Mobile number already exists",
            });
        }

        // Create new DataCollector
        const newData = new DataCollectorModel({
            MailID,
            Password,
            FirstName,
            LastName,
            MobileNo,
            Gender,
            Dob: Dob || null, // Optional
            Pincode,
            Department,
            CurrentLocation: CurrentLocation || null, // Optional
            ProfilePhoto: ProfilePhoto || undefined // Will default to model value if not sent
        });

        const savedData = await newData.save();

        return res.status(201).json({
            success: true,
            message: "DataCollector registered successfully",
            data: savedData,
        });

    } catch (error) {
        console.error("Error while registering DataCollector:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { MailID, Password } = req.body;
        const user = await DataCollectorModel.findOne({ MailID });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.Password !== Password) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const { Password: _, ...userDataWithoutPassword } = user._doc;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: userDataWithoutPassword
        });

    } 
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export default {getAll,register,login}