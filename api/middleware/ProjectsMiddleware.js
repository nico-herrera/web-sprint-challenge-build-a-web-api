const Projects = require('../projects/projects-model');

module.exports = {
    ValidateId: async (req, res, next) => {
        const {id} = req.params;
        try {
            const project = await Projects.get(id);
            if (id) {
              req.project = project;
              next();
            } else {
                next({ message: "project not found", status: 404 });
            }
        } catch (err) {
            next({ error: err, message: err.message, status: 500 });
        }
    },

    ValidateBody: async (req, res, next) => {
        const body = req.body;
        try {
            if (body && Object.keys(body).length === 0) {
                next({ message: "missing project data", status: 400 });
            } else if (!body.name) {
                next({ message: "missing name", status: 400 });
            } else if (!body.description) {
                next({ message: "missing description", status: 400 });
            } else {
                next();
            }
        } catch (err) {
            next({ error: err, message: err.message, status: 500 });
        }
    },

    ValidatePost: async (req, res, next) => {
        const body = req.body;
        try {
            if (body && Object.keys(body).length === 0) {
                    next({ message: "missing project data", status: 400 });
            } else if (!body.name) {
                    next({ message: "missing name", status: 400 });
            } else if (!body.description) {
                    next({ message: "missing description", status: 400 });
            } else {
                    next();
            }
        } catch (err) {
                next({ error: err, message: err.message, status: 500 });
        }
    }
};