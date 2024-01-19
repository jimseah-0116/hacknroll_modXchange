require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
//Creating the express app
const app = express();

//import routes
const slotRoutes = require('./routes/slots');

//middleware to parse request body (if it exists)
app.use(express.json());

//middleware to display request info
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

//handle requests, and route them accordingly
app.use('/api/slots', slotRoutes);


//connect to the databse using mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        //Listen for request on the port after connecting to the database
        app.listen(process.env.PORT, () => {
            console.log("Listening on port", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });

