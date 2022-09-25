import express from 'express';
import dotenv from 'dotenv';

// Database connection
import ConnectDB from './database/connection';

dotenv.config();

const zomato = express();

zomato.use(express.json());

zomato.get('/', (req, res) => {
    res.json({
        message: "Server is running",
    });
});

zomato.listen(4000, () => {
    // ConnectDB()
    //     .then(() => {
    //         console.log("Server is running !!!");
    //     })
    //     .catch((error) => {
    //         console.log("Server is running, but database connection failed...");
    //         console.log(error);
    //     });

    console.log("Server is running !!!");

});