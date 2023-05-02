// > controllers/index.js

//     this points to the
//     api folder inside the controllers folder

//     specifically to the index.js inside that folder
//     > controllers/api/index.js

//     which then points to...
//         api/blogRoutes.js
//         etc
// This is the index.js inside the controllers folder

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
