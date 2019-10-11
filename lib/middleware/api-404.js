module.exports = (req, res) => {
  res.status(404).json({
    error: `API path ${req.url} not found`
  });
};