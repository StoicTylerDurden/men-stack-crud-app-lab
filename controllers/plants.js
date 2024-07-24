// controllers/plants.js

const Plant = require('../models/plant.js')

const Index = async(req, res)=>{
    const foundPlants = await Plant.find()
    res.render('plants/index.ejs', {plants: foundPlants})
}

const New = async(req, res)=>{
    res.render('plants/new.ejs')
}

const Create = async(req, res)=>{
    await Plant.create(req.body)
    res.redirect('plants/new')
}

const Show = async(req, res)=>{
    const foundPlant = await Plant.findById(req.params.plantId)
    res.render('plants/show.ejs', {plant: foundPlant})
}

const Edit = async(req, res)=>{
    const foundPlant = await Plant.findById(req.params.plantId)
    res.render('plants/edit.ejs', {plant: foundPlant})
}

const Update = async (req, res) => {
    
    // Update the plant in the database
    await Plant.findByIdAndUpdate(req.params.plantId, req.body);
  
    // Redirect to the show page after updating plant
    res.redirect(`/plants/${req.params.plantId}`);
  }


  const Delete = async (req, res) => {
    await Plant.findByIdAndDelete(req.params.plantId);
    res.redirect("/plants");
  }


module.exports = {
    Index, New, Create, Show, Edit, Update, Delete
}