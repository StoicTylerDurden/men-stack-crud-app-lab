const dotenv = require("dotenv").config(); 
const express = require("express");
const morgan = require('morgan');
const methodOverride = require("method-override"); // new


// Database call 
require('./config/database.js');

// Import Plant Model
const Plant = require('./models/plant.js')


// Import plants.js/controllers

const plantsCtrl = require('./controllers/plants.js')

const app = express()

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // Allows overriding of HTTP methods via query parameter
app.use(morgan('dev'));


// Routes

// Landing Page
app.get('/', async(req, res)=>{
    res.render('index.ejs')
})

// GET	/plants/Index	Displays a list of all plants
app.get('/plants', plantsCtrl.Index)


// GET	/plants/new	New	Shows a form to create a new plant
app.get('/plants/new', plantsCtrl.New)

// POST	/plants	Create	Creates a new plant
app.post('/plants', plantsCtrl.Create)


// GET	/plants/:id	Show	Displays a specific plant by its ID
app.get('/plants/:plantId', plantsCtrl.Show)

// GET	/plants/:id/edit	Edit	Shows a form to edit an existing plant
app.get('/plants/:plantId/edit', plantsCtrl.Edit)

// PUT	/plants/:id	Update	Updates a specific plant by its ID
app.put('/plants/:plantId/', plantsCtrl.Update)


// DELETE	/plants/:id	Destroy	Deletes a specific plant by its ID
app.delete("/plants/:plantId", plantsCtrl.Delete);


app.listen(3300), () =>{
    console.log("I'm listening to port 3300");
}

