import express from 'express';
import axios from 'axios';
import { Recipes } from '../db/index.js';
import { getIngredientIds, getIngredientInfo } from '../spoonacular-helpers/helpers.js';

// Create a new instance of express router
const recipes = express.Router();

// For GET requests to /user/recipes
recipes.get('/', (req, res) => {
  // Grab the user id and use it to find the recipes we want
  const { _id } = req.user;
  // Get al the recipes from the database
  Recipes.find({ userId: _id })
    .then((recipes) => {
      res.status(200).send(recipes);
    }).catch((err) => {
      console.error('Error GETting recipes from the database: ', err);
      res.sendStatus(500);
    });
})
// For POST requests to /user/recipes
recipes.post('/', (req, res) => {
  // Grab the config from the req body
  const { recipe } = req.body;
  // Grab the user id and add it to the recipe we are posting
  const { _id } = req.user;
  recipe.userId = _id;
  // Grab the ingredients list from recipe
  const { ingredients } = recipe
  // Pass the ingredients into the helper
  getIngredientIds(ingredients)
  .then((ids) => {
    // Get the ingredient info for the returned ids
    getIngredientInfo(ids, ingredients)
    .then((nutritionObj) => {
      // Add the nutrition object onto the recipe
      recipe.nutrition = nutritionObj;
    }).then(() => {
      // Add the recipe to the database
      Recipes.create(recipe)
      .then((createdRec) => {
        res.status(201).send(createdRec);
      })
    });
  }).catch((err) => {
    console.error('Error creating the recipe in the database: ', err);
    res.sendStatus(500);
  })
});
// For DELETE requests to /user/recipes/:id
recipes.delete('/:id', (req, res) => {
  // Grab the id from the req params
  const { id } = req.params;
  // Delete the recipe with the id from the database
  Recipes.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      console.error('Error deleting recipe from database: ', err);
      res.sendStatus(500);
    });
});

// PATCH requests to user/recipes/:ids
recipes.patch('/:id', (req, res) => {
  // Grab the id from path parameters and config from the body
  const { id } = req.params;
  const { recipe } = req.body;
  // Grab the ingredients list from recipe
  const { ingredients } = recipe
  // Pass the ingredients into the helper
  getIngredientIds(ingredients)
  .then((ids) => {
    // Get the ingredient info for the returned ids
    getIngredientInfo(ids, ingredients)
      .then((nutritionObj) => {
      // Add the nutrition object onto the recipe
      recipe.nutrition = nutritionObj;
      }).then(() => {
         // Use mongoose to update the database
        Recipes.findByIdAndUpdate(id, recipe)
        .then(() => {
          res.sendStatus(200);
        })
      })
  }).catch((err) => {
    console.error('Error updating recipe: ', err);
})
});

export default recipes;
