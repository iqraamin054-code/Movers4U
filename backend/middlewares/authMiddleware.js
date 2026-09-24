import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        // Remove "Bearer "
        const token = bearerToken.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Save decoded user info
        req.user = decoded;

        next();
    }
    catch (error) {
        console.log(error);

        res.status(401).json({
            message: "Invalid token"
        });
    }
};

export default authMiddleware;