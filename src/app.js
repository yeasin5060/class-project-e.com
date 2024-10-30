import express from "express";
import cors from "cors"


const app = express()

app.use(express.json({limit : "20kb"}));
app.use(express.urlencoded({limit : "20kb" , extended:true}));
app.use(express.static("./public"));

app.use(cors({
    origin : "*"
}))

        //import all routes
import userRoute from './routes/user.route.js';
import productRoute from './routes/product.route.js';
import categoryRoute from './routes/category.routes.js';

app.use("/api/v1/user" ,userRoute);
app.use("/api/v1" ,productRoute);
app.use("/api/v1" ,categoryRoute);

export {app}