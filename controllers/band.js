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

create = async (req, res) =>{
    const groups = {
        name: req.body.name,
        short_name: req.body.short_name,
        korean_name: req.body.korean_name,
        debut: req.body.debut,
        company: req.body.company,
        current_members: req.body.current_members,
        original_members: req.body.original_members,
        fanclub_name: req.body.fanclub_name,
        active: req.body.active,
        gender: req.body.gender
    };
    try{
        if(groups.name==null || groups.korean_name==null || 
            groups.debut==null || groups.company==null || groups.current_members==null || 
            groups.original_members==null || groups.active==null || groups.gender==null){
                throw new Error("Essential fields missing");
            }
            await Groups.create(groups);
            res.status(201).json(groups);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

module.exports = {getAll, getById, getByName, create};