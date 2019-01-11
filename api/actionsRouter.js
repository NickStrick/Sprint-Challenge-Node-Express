const express = require('express');
const router = express.Router();

module.exports = router;

const actionsDb = require('../data/helpers/actionModel.js');
const projectsDb = require('../data/helpers/projectModel.js');


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

            projectsDb.get()
            .then( projects => {
                let found = false;
                    for(let i = 0; i < projects.length; i++) {
                        if (projects[i].id == postInfo.project_id) {
                            found = true;
                            break;
                        }
                    }
                    if(found){
                        actionsDb.insert(postInfo)
                        .then(result => {
                            res.status(201).json(result);
                        })
                    }else{
                        res.status(500).json({msg: "project_id must be an existing project"})
                    }
            })
            .catch(err => res.status(500).json({msg: "cant find the projects list", err}))

            
        }else{
            res.status(500).json({msg: "descriptions must be less than 128 characters"})
        }
    }else{
        res.status(500).json({msg: "actions must have a project_id, decription, and notes"})
    }   
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    actionsDb.remove(id)
    .then(count => {
        res.status(202).json(count);
    })
    .catch(err => res.status(500).json({msg: "the action could not be removed", err}))
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if((changes.project_id !== undefined && changes.description !== undefined&& changes.notes !== undefined)){
        
        if(changes.description.length < 128){

            projectsDb.get()
            .then( projects => {
                let found = false;
                    for(let i = 0; i < projects.length; i++) {
                        if (projects[i].id == changes.project_id) {
                            found = true;
                            break;
                        }
                    }
                    if(found){
                        actionsDb.update(id, changes)
                        .then(result => {
                            res.status(201).json(result);
                        })
                    }else{
                        res.status(500).json({msg: "project_id must be an existing project"})
                    }
            })
            .catch(err => res.status(500).json({msg: "cant find the projects list", err}))

            
        }else{
            res.status(500).json({msg: "descriptions must be less than 128 characters"})
        }
    }else{
        res.status(500).json({msg: "actions must have a project_id, decription, and notes"})
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