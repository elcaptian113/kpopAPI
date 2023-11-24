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



module.exports = {getAll};