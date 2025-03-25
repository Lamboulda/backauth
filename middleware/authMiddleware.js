import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
        return res.status(405).json({ message: 'Missing token, access denied' })
    }
    try {
    
        const verify = jwt.verify(token, JWT_SECRET);
        req.user = verify
        next()

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: "Invalid token : incorrect signature" })
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: "Token expired, please login again" })
        }
        return res.status(500).json({ error: "Error while verifating the token" })
    }
  };