import jwt from "jsonwebtoken"

export const requireAuth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Access denied. Invalid token format." })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
    }
}

export const requireAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

