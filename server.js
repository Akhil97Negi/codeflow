import express from 'express'
import { config } from 'dotenv'
import { userRouter } from './src/routes/userRouter.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { compilerRouter } from './src/routes/compilerRouter.js';
import connectToDB from './src/config/db.js';


config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors ({
    origin : "http://localhost:5173" || "https://code-flow-woy3.vercel.app", 
    credentials : true
}))

// app.use(cors());

const port =  4000;
const url = process.env.URL || null;



//userRoute
app.get("/" , (req, res) =>{
    res.send("This is home route")
})
app.use("/user", userRouter);

//compilerRoute
app.use("/compiler" , compilerRouter);




app.listen(port , async() =>{
    try {
        await connectToDB(url);
    console.log(`Server is running on ${port}`);
    
    } catch (error) {
       console.log('error :' , error.message);    
    }
})