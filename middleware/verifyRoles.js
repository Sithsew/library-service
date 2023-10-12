const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.status(401).json({ error: "You don't have permission for this action" });
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.status(401).json({ error: "You don't have permission for this action" });
        next();
    }
}

module.exports = verifyRoles