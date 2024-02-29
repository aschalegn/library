const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) => {
    try {
        const userToken = req.headers["authorization"];
        if (!userToken) return res.status(401).send("unAuthorized");
        const token = userToken.split(" ")[1];
        const payload = verifyToken(token);
        if (!payload) return res.status(401).send("unAuthorized");
        req.user = payload; //! pass the payload to the functions
        next();
    } catch (error) {
        return res.status(401).send("unAuthorized");
    }
};

const authorize = (roles) => {
    console.log({ roles });
    return (req, res, next) => {
        const user = req.user;
        // if (user.roles === roles) next();
        if (roles.includes(user.role)) next();
        else res.sendStatus(401);
    }
};

module.exports = { auth, authorize };