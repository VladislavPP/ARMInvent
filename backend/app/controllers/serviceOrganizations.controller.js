const db = require("../models");
const ServiceOrganizations = db.serviceOrganizations;
const Op = db.Sequelize.Op;

// Create and Save a new ServiceOrganizations
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a ServiceOrganizations
    const serviceOrganizations = {
        title: req.body.title,
        adress: req.body.adress,
        services_provided: req.body.services_provided,
        edrpou: req.body.edrpou,
    };

    // Save ServiceOrganizations in the database
    ServiceOrganizations.create(serviceOrganizations)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ServiceOrganizations."
            });
        });
};

// Retrieve all ServiceOrganizations from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    ServiceOrganizations.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ServiceOrganizations."
            });
        });
};

// Find a single ServiceOrganizations with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ServiceOrganizations.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ServiceOrganizations with id=" + id
            });
        });
};

// Update a ServiceOrganizations by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    ServiceOrganizations.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ServiceOrganizations was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update ServiceOrganizations with id=${id}. Maybe ServiceOrganizations was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating ServiceOrganizations with id=" + id
            });
        });
};

// Delete a ServiceOrganizations with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ServiceOrganizations.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ServiceOrganizations was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete ServiceOrganizations with id=${id}. Maybe ServiceOrganization was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete ServiceOrganizations with id=" + id
            });
        });
};