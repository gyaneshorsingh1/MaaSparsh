const app = require("./app");
const connectDatabase = require("./config/database");

const cloudinary = require("cloudinary");





process.on("uncaughtException",(err)=>{
    console.log(`error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception!`);
    process.exit(1);
})



//connecting to database
connectDatabase();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})



//Unhandled Promise rejection//

process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down rhe server due to handled promise Rejection`);

});
