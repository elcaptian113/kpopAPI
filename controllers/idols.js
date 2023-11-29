const router = require('../routes/idols');
const utilities = require('../utilities/utility');
const db = require('../models');
const fs = require('fs');
const path = require('path');

const Idols = db.idols;
const Groups = db.band;

getAll = async (req, res) =>{
 const idols = await Idols.findAll({
    order:['id'],
    attributes: { exclude: ['groupId']},
    include: [{
    model: Groups,
    attributes: { include: ['name','short_name','korean_name'], exclude: ['debut','company','current_members','original_members','fanclub_name','active','gender']},
    required: true
    }]
    });
 res.status(200).json(idols);
}

getById = async (req, res) =>{
   const id =req.params.id;
   try{
   const idols = await Groups.findByPk(id);
   if(idols==null || idols.length==0){
   throw new Error("Unable to find Idol with id: " + id);
   }
   res.status(200).json(groups);
   }
   catch(error){
   utilities.formatErrorResponse(res,400,error.message);
   }
}

getByGroup = async (req, res) =>{
   const bandName =req.params.value;
   try{
   const idols = await Idols.findAll(
   {where: {groupId: bandName},
   });
   if(idols.length==0){
   throw new Error("Unable to find a Group with ID: " + bandName);
   }
   res.status(200).json(idols);
   }
   catch(error){
   utilities.formatErrorResponse(res,400,error.message);
   }
}

create = async (req, res) =>{
   const idols = {
      stage_name: req.body.stage_name,
      full_name: req.body.full_name,
      korean_name: req.body.korean_name,
      korean_stage_name: req.body.korean_stage_name,
      dob: req.body.dob,
      country: req.body.country,
      birthplace: req.body.birthplace,
      other_group: req.body.other_group,
      gender: req.body.gender,
      groupId: req.body.groupId
   };
   try{
       if(idols.stage_name==null || idols.full_name==null || 
         idols.korean_name==null || idols.korean_stage_name==null ||
         idols.dob==null || idols.country==null || idols.birthplace==null ||
         idols.gender==null || idols.groupId==null){
               throw new Error("Essential fields missing");
           }
           await Idols.create(idols);
           res.status(201).json(idols);
   }
   catch (error){
       utilities.formatErrorResponse(res,400,error.message);
   }
}

update = async (req, res) =>{
   const id =req.body.id;
   const idols = {
      stage_name: req.body.stage_name,
      full_name: req.body.full_name,
      korean_name: req.body.korean_name,
      korean_stage_name: req.body.korean_stage_name,
      dob: req.body.dob,
      country: req.body.country,
      birthplace: req.body.birthplace,
      other_group: req.body.other_group,
      gender: req.body.gender,
      groupId: req.body.groupId
   };
   try{
       if(idols.stage_name==null || idols.full_name==null || 
         idols.korean_name==null || idols.korean_stage_name==null ||
         idols.dob==null || idols.country==null || idols.birthplace==null ||
         idols.gender==null || idols.groupId==null){
               throw new Error("Essential fields missing");
           }
           await Idols.update(idols,
               {where: { id: id }}
               );
           res.status(200).json(idols);
   }
   catch (error){
       utilities.formatErrorResponse(res,400,error.message);
   }
}
deleting = async (req, res) =>{
   const id =req.body.id;
   try{
       const deleted = await Idols.destroy({where: { id: id }});
       if (deleted==0) {
           throw new Error("Id not found");
        }
        res.status(200).send("Idol has been deleted");
   }
  catch(error){
       utilities.formatErrorResponse(res,404,error.message);
  }
}


module.exports = {getAll, deleting, update, create, getById, getByGroup};