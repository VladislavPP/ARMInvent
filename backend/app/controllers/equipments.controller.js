const db = require("../models");
const Equipments = db.equipments;
const Op = db.Sequelize.Op;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('ARMInvent', 'root', 'Qwaszx123!', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

// Create and Save a new Equipments
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Equipments
    const equipments = {
        title: req.body.title,
        invent_n: req.body.invent_n,
        serial_n: req.body.serial_n,
        new: req.body.new,
        actual: req.body.actual,
        edrpou: req.body.edrpou,
    };

    // Save Equipments in the database
    Equipments.create(equipments)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Equipments."
            });
        });
};

// Retrieve all Equipments from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Equipments.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving equipments."
            });
        });
};

// Find a single Equipments with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Equipments.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Equipments by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Equipments.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Equipments was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Equipments with id=${id}. Maybe Equipments was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Equipments with id=" + id
            });
        });
};

// Delete a Equipments with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Equipments.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Equipments was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Equipments with id=${id}. Maybe Equipments was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Equipments with id=" + id
            });
        });
};

// Find id a last added Equipment
exports.findLastId = (req, res) => {
    const edrpou = req.params.edrpou;
    sequelize.query(`SELECT id FROM equipments WHERE edrpou = ${edrpou} ORDER BY id DESC LIMIT 1`).then(results => {
            res.send(results);
        }
    )
};

// Update Actual
exports.disactive = (req, res) => {
    const id = req.params.id;
    sequelize.query(`UPDATE equipments SET actual = 0 WHERE id = ${id}`).then(results => {
            res.send(results);
        }
    )
};