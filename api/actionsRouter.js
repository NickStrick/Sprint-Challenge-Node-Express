const express = require('express');
const router = express.Router();

module.exports = router;

const actionsDb = require('../data/helpers/actionModel.js');


router.get('/', (req, res) => {
    Get(req, res);
});

router.get('/:id', (req, res) => {
    Get(req, res);
});

router.post('/', (req,res) => {
    const postInfo = req.body;
    if((postInfo.project_id !== undefined && postInfo.description !== undefined&& postInfo.notes !== undefined)){
        if(postInfo.description.length < 128){
            projectsDb.insert(postInfo).then(result => {
                res.status(201).json(result);
            })
            .catch(err => res.status(500).json({msg: "the post failed", err}))
        }else{
            res.status(500).json({msg: "descriptions must be less than 128 characters"})
        }
    }else{
        res.status(500).json({msg: "actions must have a project_id, dexription, and notes"})
    }   
});


//functions
function Get(req, res) {
    const id = req.params.id;
    actionsDb.get(id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({msg:'cant find actions', err})
    })
}