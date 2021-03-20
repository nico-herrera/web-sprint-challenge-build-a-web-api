const Actions = require('../actions/actions-model');

module.exports = {
    ValidateId: async (req, res, next) => {
        const {id} = req.params;
        try {
            const action = await Actions.get(id);
            if (id) {
              req.action = action;
              next();
            } else {
                next({ message: "action not found", status: 404 });
            }
        } catch (err) {
            next({ error: err, message: err.message, status: 500 });
        }
    },

    ValidateBody: async (req, res, next) => {
        const body = req.body;
        try {
            if (body && Object.keys(body).length === 0) {
                next({ message: "missing user data", status: 400 });
            } else if (!body.project_id) {
                next({ message: "missing project id", status: 400 });
            } else if (!body.description) {
                next({ message: "missing description", status: 400 });
            } else if (!body.notes) {
                next({ message: "missing notes", status: 400 });
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
                next({ message: "missing user data", status: 400 });
            } else if (!body.project_id) {
                next({ message: "missing project id", status: 400 });
            } else if (!body.description) {
                next({ message: "missing description", status: 400 });
            } else if (!body.notes) {
                next({ message: "missing notes", status: 400 });
            } else {
                next();
            }
        } catch (err) {
            next({ error: err, message: err.message, status: 500 });
        }
    }
};