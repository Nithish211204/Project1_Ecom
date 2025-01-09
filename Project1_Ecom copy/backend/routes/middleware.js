
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



const authenticate = async(req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); 
        
        req.user = verified; 
         
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Authorization middleware: Verifies the role of the user
const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: "Access forbidden" });
    }
    next();
};

module.exports = { authenticate, authorizeRole };
