"use strict";

const base64 = require("base-64");
const { User } = require("../models/index");

module.exports = async (req, res, next) => {
    console.log(User);

    if (req.headers.authorization) {
        const basicAuthData = req.headers.authorization;
        const splitBasicWord = basicAuthData.split(" ");
        const theAutodecodedOnly = splitBasicWord.pop();
        const decodedData = base64.decode(theAutodecodedOnly);

        const [userName, password] = decodedData.split(":");

        try {
            const data = await User.basicAuthChecker(userName, password);
            console.log(data);
            req.user = data;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next({ message: "Please enter username and the password" });
    }
};
