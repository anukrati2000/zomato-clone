import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';

// Private route authorization config
import privateRouteConfig from './config/route.config';

// Database connection
import ConnectDB from './database/connection';

import Auth from './api/auth';
import Food from './api/food';
import Restaurant from './api/restaurant';
import User from './api/user';

dotenv.config();

// adding additional passport configuration
privateRouteConfig(passport);

const zomato = express();

zomato.use(express.json());
zomato.use(session({ secret: "ZomatoApp" }));
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get('/', (req, res) => {
    res.json({
        message: "Server is running",
    });
});

// /auth/signup
zomato.use('/auth', Auth);
zomato.use('/food', Food);
zomato.use('/restaurant', Restaurant);
zomato.use('/user', passport.authenticate('jwt', { session: false }), User);

zomato.listen(4000, () => {
    ConnectDB()
        .then(() => {
            console.log("Server is running !!!");
        })
        .catch((error) => {
            console.log("Server is running, but database connection failed...");
            console.log(error);
        });

});