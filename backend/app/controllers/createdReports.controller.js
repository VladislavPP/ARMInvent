const db = require("../models");
const CreatedReports = db.createdReports;
const Op = db.Sequelize.Op;

// Retrieve all CreatedReport from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.id]: `%${id}%` } } : null;

    CreatedReports.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Roles."
            });
        });
};

// Find a single CreatedReport with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    CreatedReports.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Roles with id=" + id
            });
        });
};

// Delete a CreatedReport with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    CreatedReports.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "CreatedReport was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete CreatedReport with id=${id}. Maybe CreatedReport was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete CreatedReport with id=" + id
            });
        });
};

exports.download = (req, res) => {
    const idReport = req.params.idReport;

    CreatedReports.findByPk(idReport)
        .then(data => {
            res.send(data);
            const file = `${data['name_report_to_url']}`;
            res.download(file);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Roles with id=" + id
            });
        });
};