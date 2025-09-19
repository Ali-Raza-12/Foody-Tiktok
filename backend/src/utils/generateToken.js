const jwt = require("jsonwebtoken")

function generateToken(userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d"})
    return token;
}

module.exports = generateToken