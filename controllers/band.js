const router = require('../routes/band');
const utilities = require('../utilities/utility');
const db = require('../models');

const Groups = db.band;

getAll = async (req, res) =>{
 const groups = await Groups.findAll();
 res.status(200).json(groups);
}

getById = async (req, res) =>{
    const id =req.params.id;
    try{
    const groups = await Groups.findByPk(id);
    if(groups==null || groups.length==0){
    throw new Error("Unable to find Group with id: " + id);
    }
    res.status(200).json(groups);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

getByName = async (req, res) =>{
    const bandName =req.params.value;
    try{
    const groups = await Groups.findAll(
    {where: {name: bandName},
    });
    if(groups.length==0){
    throw new Error("Unable to find a Group with name: " + bandName);
    }
    res.status(200).json(groups);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

module.exports = {getAll, getById, getByName};