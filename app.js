const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Connect to MongoDB
mongoose.connect('mongodb+srv://fiona:9VuBTyF4U3G3fu7E@cluster0-xwrdv.mongodb.net/test?retryWrites=true&w=majority').then(()=>{
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

module.exports = app;
