export const permit = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // comes from JWT payload
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: insufficient rights" });
    }
    next();
  };
};
