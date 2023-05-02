const router = require('express').Router();
const writerRoutes = require('./writerRoutes');
const blogRoutes = require('./blogRoutes');

// profiles for writers/commenters
// articles for blogposts
router.use('/profiles', writersRoutes);
router.use('/articles', blogRoutes);

module.exports = router;
