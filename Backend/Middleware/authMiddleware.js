const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) =>{
     const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(" ")[1]
     console.log(token)
     if(!token){
        return res.status(401).json({
            success: false,
            message: 'Access deined, No token provided'
        }) 
     }
     try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
  } catch (error) {
      console.error("Token verification error:", error);
      if (error.name === 'TokenExpiredError') {
          return res.status(401).json({
              success: false,
              message: 'Token has expired',
          });
      }
      if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({
              success: false,
              message: 'Invalid token',
          });
      }
      return res.status(500).json({
          success: false,
          message: 'Internal server error',
      });
  }
  
}
module.exports = authMiddleware;