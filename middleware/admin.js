module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.send("change by admin only.");
  next();
};
