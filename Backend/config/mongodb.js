import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB=  async ()=>{
    mongoose.connection.on("connected",()=>{
        console.log("DB Connected");
        
    })

       mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully ✅"))
  .catch((err) => console.error("MongoDB Error ❌:", err.message));
}


export default connectDB;