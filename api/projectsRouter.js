const express = require('express');
const router = express.Router();

module.exports = router;

const projectsDb = require('../data/helpers/projectModel.js');


router.get('/', (req, res) => {
    Get(req, res);
})

router.get('/:id', (req, res) => {
    Get(req, res);
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