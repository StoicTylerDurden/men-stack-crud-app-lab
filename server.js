const dotenv = require("dotenv").config(); 
const express = require("express");
const morgan = require('morgan');
const methodOverride = require("method-override"); // new


// Database call 
require('./config/database.js');

// Import Plant Model
const Plant = require('./models/plant.js')


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
app.get('/plants', async(req, res)=>{
    const foundPlants = await Plant.find()
    res.render('plants/index.ejs', {plants: foundPlants})
})


// GET	/plants/new	New	Shows a form to create a new plant
app.get('/plants/new', async(req, res)=>{
    res.render('plants/new.ejs', {Plant})
})

// POST	/plants	Create	Creates a new plant
app.post('/plants', async(req, res)=>{
    await Plant.create(req.body)
    res.redirect('plants/new')
})


// GET	/plants/:id	Show	Displays a specific plant by its ID
app.get('/plants/:plantId', async(req, res)=>{
    const foundPlant = await Plant.findById(req.params.plantId)
    res.render('plants/show.ejs', {plant: foundPlant})
})

// GET	/plants/:id/edit	Edit	Shows a form to edit an existing plant
app.get('/plants/:plantId/edit', async(req, res)=>{
    const foundPlant = await Plant.findById(req.params.plantId)
    res.render('plants/edit.ejs', {plant: foundPlant})
})


// PUT	/plants/:id	Update	Updates a specific plant by its ID
app.put('/plants/:plantId/', async (req, res) => {
    
    // Update the plant in the database
    await Plant.findByIdAndUpdate(req.params.plantId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/plants/${req.params.plantId}`);
  })


// DELETE	/plants/:id	Destroy	Deletes a specific plant by its ID
app.delete("/plants/:plantId", async (req, res) => {
    await Plant.findByIdAndDelete(req.params.plantId);
    res.redirect("/plants");
  });
app.listen(3300), () =>{
    console.log("I'm listening to port 3300");
}

