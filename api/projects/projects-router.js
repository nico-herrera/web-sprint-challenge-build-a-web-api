// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const ProjectsMiddleware = require('../middleware/ProjectsMiddleware');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', ProjectsMiddleware.ValidateId, (req, res) => {
    res.status(200).json(req.project)
});

router.post('/', ProjectsMiddleware.ValidatePost, async (req, res) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', ProjectsMiddleware.ValidateId, ProjectsMiddleware.ValidateBody, async (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    try {
        if (typeof changes.completed !== "boolean") {
            res.status(400).json({message: "completed should be true or false"})
        } else {
            await Projects.update(id, changes);
            res.status(200).json(changes);
        }
      
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/:id', ProjectsMiddleware.ValidateId, async (req, res) => {
    const {id} = req.params;
    try {
        await Projects.remove(id);
        res.status(200).json({message: "Action has been deleted"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id/actions', ProjectsMiddleware.ValidateId, async (req, res) => {
    const { id } = req.params;
    try {
        const projectActions = await Projects.getProjectActions(id);
        res.status(200).json(projectActions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;