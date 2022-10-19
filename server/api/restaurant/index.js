import express from 'express';

import { RestaurantModel } from '../../database/allModels';
import { ValidateSearchString } from '../../validation/restaurant.validation';

const Router = express.Router();

/**
 * Route        /
 * Des          Create new restaurant
 * Params       none
 * Access       Public
 * Method       POST
*/
//Homework
Router.post('/', async (req, res) => {
    try {
        const { restaurantDetails } = req.body;
        const newRestaurant = await RestaurantModel.create({ ...restaurantDetails });

        if (!newRestaurant) {
            return res.status(404).json(newRestaurant);
        }

        return res.json({ newRestaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route        /
 * Des          Get all the restaurant details based on the city
 * Params       none
 * Access       Public
 * Method       GET
*/
Router.get('/', async (req, res) => {
    try {
        // http://localhost:4000/restaurant/?city=ncr
        const { city } = req.query;
        await ValidateRestaurantCity(req.query);
        const restaurants = await RestaurantModel.find({ city });
        if (restaurants.length === 0) {
            return res.status(404).json({ error: "No restaurant found in this city." });
        }
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route        /:_id
 * Des          Get individual restaurant details based on tid
 * Params       _id
 * Access       Public
 * Method       GET
*/
Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        await ValidityRequiredString(_id);
        const restaurant = await RestaurantModel.findById(_id);

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route        /search/:searchString
 * Des          Get restaurants details based on search string
 * Params       searchString
 * Access       Public
 * Method       GET
*/
Router.get('/search/:searchString', async (req, res) => {
    try {
        const { searchString } = req.params;
        await ValidateSearchString(req.params);
        const restaurants = await RestaurantModel.find({
            name: { $reqex: searchString, $options: "i" },
        });
        if (!restaurants.length === 0) {
            return res.status(404).json({ error: `No restaurant matched with ${searchString}` });
        }
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;