// Router for recipes/Recipes
const mongoose = require('mongoose');
const express = require('express');
const Recipes = require('../models/Recipes');
const User = require('../models/User');
const HttpError = require('../errors/HttpError');
const authmiddleware = require('../middleware/auth');
const router = express.Router();

// @route GET /api/recipes
// @desc Gets/Fetches all recipes
router.get("/", (req, res, next) => {

    Recipes.find().populate("creator")
    .exec()
    .then( result => {
        res.status(200)
        .json({
            "length" : result.length,
            "Recipes" : result
        })
    })
    .catch( err => {
        res.status(500)
        .json({
            "message" : err
        })
    })
})

// @route GET /api/recipes/user
// @desc Gets/Fetches the Recipes for a particular user
router.get("/user", authmiddleware, async (req, res, next) => {

    const uid = req.user.id;

    let data;
    try{
        data = await Recipes.find({creator : uid}).populate("creator")
    }
    catch{
        return res.status(500).json({
            "message" : "Fetching recipes failed !"
        })
    }

    // Error handling
    if(!data || data.length === 0){
        const error = new HttpError(`No recipes found for user ${uid}`, 404)
        // next(error) is used for asynchronous codes majorly
        return next(error)
    }

    return res.status(200)
    .json(data)


})

// @route GET /api/recipes/<id>
// @desc Gets/Fetches the Recipe for a specific id
router.get("/:id", async (req, res, next) => {

    await Recipes.findById(req.params.id)
    .then( result => {
        res.status(200)
        .json(
            result
        )
    })
    .catch( err => {
        const error = "No recipe found for this id.";
        next(new HttpError(error, 404));
    })

})


// @route POST /api/recipes
// @desc Creates a New Recipe
// @access Private (requires Auth)
router.post("/", authmiddleware, async (req, res, next) => {

    const {name,description, content, tribe, tags} = req.body;

    let user;
    try{
        user = await User.findById(req.user.id);
    }
    catch{
        return next(HttpError("Cannot find user, please login", 500))
    }
    
    const newRecipe = new Recipes({
        name : name,
        description : description,
        content : content,
        tribe : tribe,
        tags : tags.split(",").map( (obj) => (
            obj.trim()
        )),
        creator : user._id
    })

    newRecipe.save()
    .then( recipe => {
        user.recipes.push(recipe)
        user.save()
        .then( user => {
            return res.status(201)
            .json(recipe)
        })
        .catch(err => {
            return next(new HttpError(err, 500))
        })
    })
    .catch(err => {
        return new(HttpError(err, 500))
    })
    

})

// @route UPDATE /api/recipes/<id>
// @desc Updates a Recipe based on the id
// @access Private (requires Auth)
router.patch("/:id", authmiddleware, async (req, res, next) => {

    let data;
    try{
        data = await Recipes.findById(req.params.id)
    }
    catch{
        next(new HttpError("Could not find any recipe for the specified id.", 404))
    }

    for (const property in req.body){
        data[property] = req.body[property];
    }

    data.save()
    .then( result => {
        res.status(200)
        .json({
            "message" : "Recipe updated successfully.",
            "data" : data
        })
    })
    .catch( err => {
        res.status(500)
        .json({
            "error" : err,
            "message" : "An error occurred."
        })
    })
})

// @route DELETE /api/recipes/<id>
// @desc Deletes a Recipe based on the id
// @access Private (requires Auth)
router.delete("/:id", authmiddleware, async (req, res, next) => {

    const rid = req.params.id;
    let recipe;
    let user;
    try{
        recipe = await Recipes.findById(rid)
        user = await User.findById(req.user.id).populate("recipes")
    }
    catch{
        return next(new HttpError("Could not find a recipe for this id.", 404))
    }

    recipe.remove()
    .then( result => {
        return res.status(200)
        .json({
            "message" : "Recipe successfully deleted."
        })
    })
    .catch(err => {
        return next(new HttpError(err, 500))
    })

})


module.exports = router;
