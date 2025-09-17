// This file needs to be converted to TypeScript and use proper imports
// For now, let's create individual route files for Vercel
module.exports = (req, res) => {
  res.status(200).json({ message: "API is working" });
};
