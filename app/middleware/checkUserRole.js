

const checkUserRole = (allowedRoles) => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      const userRole = req.user.access_level; 

      if (allowedRoles.includes(userRole)) {
        next(); // User has the required role, proceed to the route handler
      } else {
        res.status(403).json({ message: 'Access denied' }); // User does not have the required role
      }
    } else {
      res.status(401).json({ message: 'Authentication required' });
    }
  };
};

module.exports = checkUserRole;
