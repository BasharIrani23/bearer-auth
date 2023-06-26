// to check if the user is a user an having the correct token

"use strict";

const { User } = require("../models/index");

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ").pop();
        User.bearerAuthChecker(token)
            .then((data) => {
                req.user = data;
                next();
            })
            .catch((err) => {
                // next ({ massege: err })
                next(err);
            });
    }
};
