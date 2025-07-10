import mongoose from "mongoose";
const ConnectDB = async()=>{
    try{
        const DB_Options={
            dbName:"Backend_Deployment_Testing_Data"
        };
        await mongoose.connect(process.env.Database_URL,DB_Options);
        console.log("Connection connected...");
    }
    catch(err){
        console.log(err);
    }
};
export default ConnectDB;