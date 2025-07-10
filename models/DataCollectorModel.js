import mongoose from "mongoose";

const DataCollectorSchema = new mongoose.Schema({
    MailID:{type: String, required: [true,"EmailID is Required"], trim: true,unique:true},
    Password:{type: String, required:true, trim: true, minlength:8, maxlength:15},
    FirstName:{type: String, required:true, trim: true, maxlength:20},
    LastName:{type: String, required:true, trim: true, maxlength:20},
    MobileNo:{type: Number, required:true, trim: true, unique:true, minlength:10, maxlength:10},
    Gender:{type: String, required:true, trim: true},
    Dob:{type: String, required:false, trim: true},
    Pincode:{type: String, required:true, trim: true, minlength:6, maxlength:6},
    Department: {
        type: String,
        required: true,
        trim: true,
        enum: ["IT", "CSE", "ECE", "MECH", "CIVIL", "EEE", "AI-ML", "AI-DS", "Others"],
    },
    CurrentLocation:{type: String, required:false, trim: true, maxlength:40},
    ProfilePhoto:{type: String, default:'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='}
});

const DataCollectorModel = mongoose.model("DummyData", DataCollectorSchema)
export default DataCollectorModel;