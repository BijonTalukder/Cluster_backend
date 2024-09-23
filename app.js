import express from 'express';

import { setup } from './src/config/dbConnect.js';
import router from './src/routes/route.js';
import globalErrorHandler from './src/error/globalErrorHandler.js';
import httpStatus from 'http-status';
import cors from 'cors'
const app = express();
app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000', 
  'https://cluster-project.vercel.app/' 
];

// Configure CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
  credentials: true, 
  optionsSuccessStatus: 200 
};


app.use(cors(corsOptions));

app.use('/api/v1', router);
// app.use("/api/v1/system-admin",sysAdminRouter);
app.use(globalErrorHandler);
app.get("/",(req,res)=>{
  res.send("server is okay")
})
app.use((req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'API Not Found',
        },
      ],
    });
    next();
  });
  
app.listen(4000, async () => {
    console.log("server is listening at port 4000");
    
    await setup()
});
