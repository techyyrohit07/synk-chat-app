import jwt from 'jsonwebtoken'



export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.token
        if(!token) {
            return res.status(401).json({
                message : "Token not available"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            res.status(401).json({
                message : "Unauthorised access"
            })
        }

        req.user = decoded

        next()  
    } catch (error) {
        res.status(401).json({
            message : error.message
        })
    }
}