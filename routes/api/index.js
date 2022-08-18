const router = require('express').Router();
const thoughtRoutes = require ('./thoughtRoutes');
const userRoutes = require ('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
// import the routes from the files in the folder. Then it exports the info to the index in the routes folder.