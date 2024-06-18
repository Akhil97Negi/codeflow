// import express from 'express'
// import { config } from 'dotenv'
// import { userRouter } from './src/routes/userRouter.js';
// import cors from 'cors'
// import cookieParser from 'cookie-parser';
// import { compilerRouter } from './src/routes/compilerRouter.js';
// import connectToDB from './src/config/db.js';


// config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors ({
//     origin : "http://localhost:5173" || process.env.HOST, 
//     credentials : true
// }))

// // app.use(cors());

// const port =  4000;
// const url = process.env.URL || null;



// //userRoute
// app.get("/" , (req, res) =>{
//     res.send("This is home route")
// })
// app.use("/user", userRouter);

// //compilerRoute
// app.use("/compiler" , compilerRouter);




// app.listen(port , async() =>{
//     try {
//         await connectToDB(url);
//     console.log(`Server is running on ${port}`);
    
//     } catch (error) {
//        console.log('error :' , error.message);    
//     }
// })



// import express from 'express';
// import { config } from 'dotenv';
// import { userRouter } from './src/routes/userRouter.js';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { compilerRouter } from './src/routes/compilerRouter.js';
// import connectToDB from './src/config/db.js';

// config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// const allowedOrigins = [
//     'http://localhost:5173',
//     'https://code-flow-woy3.vercel.app'
// ];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// };

// app.use(cors(corsOptions));

// const port = 4000;
// const url = process.env.URL || null;

// // userRoute
// app.get("/", (req, res) => {
//     res.send("This is home route");
// });
// app.use("/user", userRouter);

// // compilerRoute
// app.use("/compiler", compilerRouter);

// app.listen(port, async () => {
//     try {
//         await connectToDB(url);
//         console.log(`Server is running on ${port}`);
//     } catch (error) {
//         console.log('error :', error.message);
//     }
// });


import express from 'express';
import { config } from 'dotenv';
import { userRouter } from './src/routes/userRouter.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { compilerRouter } from './src/routes/compilerRouter.js';
import connectToDB from './src/config/db.js';

config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:5173',
    'https://code-flow-woy3.vercel.app'
];

const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true, credentials: true }; // Reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // Disable CORS for this request
    }
    callback(null, corsOptions); // Callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

const port = 4000;
const url = process.env.URL || null;

// userRoute
app.get("/", (req, res) => {
    res.send("This is home route");
});
app.use("/user", userRouter);

// compilerRoute
app.use("/compiler", compilerRouter);

app.listen(port, async () => {
    try {
        await connectToDB(url);
        console.log(`Server is running on ${port}`);
    } catch (error) {
        console.log('error :', error.message);
    }
});
