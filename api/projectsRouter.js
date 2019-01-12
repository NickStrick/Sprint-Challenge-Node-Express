const express = require('express');
const router = express.Router();

module.exports = router;

const projectsDb = require('../data/helpers/projectModel.js');

const nameToUpper = require('./middleware/customMiddleware.js');


router.get('/', (req, res) => {
    Get(req, res);
});

router.get('/:id', (req, res) => {
    Get(req, res);
});

router.post('/', nameToUpper, (req,res) => {
    const postInfo = req.body;
    if((postInfo.name !== undefined && postInfo.description !== undefined)){
        if(postInfo.name.length < 128){
            projectsDb.insert(postInfo).then(result => {
                res.status(201).json(result);
            })
            .catch(err => res.status(500).json({msg: "the post failed", err}))
        }else{
            res.status(500).json({msg: "project names must be less than 128 characters"})
        }
    }else{
        res.status(500).json({msg: "projects must have a name and description"})
    }   
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    projectsDb.remove(id)
    .then(count => {
        res.status(202).json(count);
    })
    .catch(err => 
        res.status(500).json({msg: "the project could not be removed", err})
        )
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if((changes.name !== undefined)){
        if(changes.name.length < 128){
            projectsDb.update(id, changes)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => res.status(500).json({msg: "could not update", err}))
        }else{
            res.status(500).json({msg: "project names must be less than 128 characters"})
        }
    }else{
        res.status(500).json({msg: "you must give a project name"})
    }
});

router.get('/:id/actions', (req,res) => {
    let {id} = req.params;

    projectsDb.get()
    .then( projects => {
        let found = false;
            for(let i = 0; i < projects.length; i++) {
                if (projects[i].id == id) {
                    found = true;
                    break;
                }
            }
            if(found){
                projectsDb.getProjectActions(id)
                .then(posts =>{
                    res.status(200).json(posts)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
            }else{
                res.status(500).json({msg: "id must be an existing project"})
            }
    })
    .catch(err => res.status(500).json({msg: "cant find the projects list", err}))
})



//functions
function Get(req, res) {
    const id = req.params.id;
    projectsDb.get(id)
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({msg:'cant find projects', err})
    })
}