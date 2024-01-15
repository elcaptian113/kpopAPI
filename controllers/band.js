//import file dependencies for endpoints
const router = require('../routes/band');
const utilities = require('../utilities/utility');
const db = require('../models');
const fs = require('fs');
const path = require('path');

const Groups = db.band;

//GET all endpoint
getAll = async (req, res) =>{
 const groups = await Groups.findAll({order: ['name']});
 res.status(200).json(groups);
}

//GET all by ID endpoint
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

//GET all by groups NAME endpoint
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

//POST endpoint for group creation
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
        gender: req.body.gender,
        image: path.join('/public/images', req.file.filename)
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

//PUT endpoint for updating existing group records
update = async (req, res) =>{
    const id =req.body.id;
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
        gender: req.body.gender,
        image: path.join('/public/images', req.file.filename)
    };
    try{
        if(groups.name==null || groups.korean_name==null || 
            groups.debut==null || groups.company==null || groups.current_members==null || 
            groups.original_members==null || groups.active==null || groups.gender==null){
                throw new Error("Essential fields missing");
            }
            await Groups.update(groups,
                {where: { id: id }}
                );
            res.status(200).json(groups);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}

//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await Groups.destroy({where: { id: id }});
        if (deleted==0) {
            throw new Error("Id not found");
         }
         res.status(200).send("Groups has been deleted");
    }
   catch(error){
        utilities.formatErrorResponse(res,404,error.message);
   }
}

//export all functions to enable access by other files
module.exports = {getAll, getById, getByName, create, update, deleting};