const db = require("../models");
const Workers = db.workers;
const Op = db.Sequelize.Op;

// Create and Save a new Workers
exports.create = (req, res) => {
    // Validate request
    if (!req.body.fio_full) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Workers
    const workers = {
        fio_full: req.body.fio_full,
        fio_small: req.body.fio_small,
        position_full: req.body.position_full,
        position_small: req.body.position_small,
        edrpou: req.body.edrpou,
    };

    // Save Workers in the database
    Workers.create(workers)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Workers."
            });
        });
};

// Retrieve all Workers from the database.
exports.findAll = (req, res) => {
    const fio_full = req.query.fio_full;
    var condition = fio_full ? { fio_full: { [Op.like]: `%${fio_full}%` } } : null;

    Workers.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Workers."
            });
        });
};

// Find a single Workers with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Workers.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Workers with id=" + id
            });
        });
};

// Update a Workers by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Workers.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Workers was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Workers with id=${id}. Maybe Workers was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Workers with id=" + id
            });
        });
};

// Delete a Workers with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Workers.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Workers was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Workers with id=${id}. Maybe Workers was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Workers with id=" + id
            });
        });
};