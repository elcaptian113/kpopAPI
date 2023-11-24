const router = require('../routes/videos');
const utilities = require('../utilities/utility');
const db = require('../models');
const fs = require('fs');
const path = require('path');

const Idols = db.idols;
const Groups = db.band;
const Videos = db.videos;

getAll = async (req, res) =>{
 const videos = await Videos.findAll({
    order:['id'],
    include: [{
    model: Groups,
    attributes: { include: ['name'], exclude: ['debut','company','current_members','original_members','fanclub_name','active','gender','short_name','korean_name']},
    required: true,
    },
    {
      model: Idols,
      required: true,
      }]
    });
 res.status(200).json(videos);
}



module.exports = {getAll};