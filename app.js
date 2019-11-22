const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

const app = express();

//Connect to MongoDB
mongoose.connect( 'mongodb+srv://fiona:9VuBTyF4U3G3fu7E@cluster0-xwrdv.mongodb.net/test?retryWrites=true&w=majority').then(()=>{
	console.log("Successfully connected to MongoDB Atlas!")
}).catch((error)=>{
	console.log("Unable to connect to MongoDB Atlas!");
	console.error(error);
});

//Allows CORS - Cross Origin Resource Sharing
app.use((req,res, next)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
	next();
});

//Add middleware to pass incoming requests
app.use(body_parser.json());
//Create a recipe

app.post('/api/recipes',(req, res, next)=>{
	const recipe = new Recipe({
		title: req.body.title,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		difficulty: req.body.difficulty,
		time: req.body.time
	});

	recipe.save().then(()=>{
		res.status(201).json({
			message: 'Recipe saved successfully'
		})
	}).catch((error)=>{
		res.status(400).json({
			error: error
		});
	});
});
//Update a recipe
app.put('/api/recipes/:id',(req, res, next)=>{
	const recipe = new Recipe({
		_id: req.params.id,
		title: req.body.title,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		difficulty: req.body.difficulty,
		time: req.body.time
	});

	Recipe.updateOne({_id: req.params.id},recipe).then(()=>{
		res.status(200).json({
			message: "Recipe updated successfully"
		});
	}).catch((error)=>{
		res.status(400).json({
			error: error
		});
	});
});

//Delete endpoint
app.delete('/api/recipes/:id',(req, res, next)=>{
	Recipe.deleteOne({_id: req.params.id}).then(()=>{
		res.status(200).json({
			message: "Deleted"
		});
	}).catch((error)=>{
		res.status(400).json({
			error: error
		});
	});
});

// Get a recipe with the provided ID from the database
app.use('/api/recipes/:id', (req, res, next)=>{
	Recipe.findOne({_id: req.params.id}).then((recipe)=>{
		res.status(200).json(recipe);
	}).catch((error)=>{
		res.status(400).json({
			error: error
		});
	});
});

//Get all the recipes
app.use('/api/recipes',(req, res, next)=>{
	Recipe.find().then((recipes)=>{
		res.status(200).json(recipes);
	}).catch((error)=>{
		res.status(400).json({
			error: error
		});
	});
});



module.exports = app;
