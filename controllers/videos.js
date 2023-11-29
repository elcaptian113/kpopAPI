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
    attributes: { include: ['name','korean_name'], exclude: ['debut','company','current_members','original_members','fanclub_name','active','gender','short_name']},
    required: true,
    },
    {
      model: Idols,
      attributes: { include: ['stage_name','korean_stage_name'], exclude: ['full_name','korean_name','dob','country','birthplace','other_group','gender','groupId']},
      required: true,
      }]
    });
 res.status(200).json(videos);
}
create = async (req, res) =>{
  const videos = {
    artist: req.body.artist,
    song_name: req.body.song_name,
    korean_name: req.body.korean_name,
    youtube_video_extention: req.body.youtube_video_extention,
    type: req.body.type,
    release_type: req.body.release_type,
    groupId: req.body.groupId,
    idolId: req.body.idolId
  };
  try{
      if(videos.artist==null || videos.song_name==null || videos.youtube_video_extention==null || 
        videos.groupId==null || videos.idolId==null){
              throw new Error("Essential fields missing");
          }
          await Videos.create(videos);
          res.status(201).json(videos);
  }
  catch (error){
      utilities.formatErrorResponse(res,400,error.message);
  }
}

update = async (req, res) =>{
  const id =req.body.id;
  const videos = {
    artist: req.body.artist,
    song_name: req.body.song_name,
    korean_name: req.body.korean_name,
    youtube_video_extention: req.body.youtube_video_extention,
    type: req.body.type,
    release_type: req.body.release_type,
    groupId: req.body.groupId,
    idolId: req.body.idolId
  };
  try{
      if(videos.artist==null || videos.song_name==null || videos.youtube_video_extention==null || 
        videos.groupId==null || videos.idolId==null){
              throw new Error("Essential fields missing");
          }
          await Videos.update(videos,
              {where: { id: id }}
              );
          res.status(200).json(videos);
  }
  catch (error){
      utilities.formatErrorResponse(res,400,error.message);
  }
}
deleting = async (req, res) =>{
  const id =req.body.id;
  try{
      const deleted = await Videos.destroy({where: { id: id }});
      if (deleted==0) {
          throw new Error("Id not found");
       }
       res.status(200).send("Video has been deleted");
  }
 catch(error){
      utilities.formatErrorResponse(res,404,error.message);
 }
}


module.exports = {getAll, create, update, deleting};