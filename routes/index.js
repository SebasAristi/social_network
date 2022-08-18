const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;

// the data from routes from the api folder is imported.  then the routes are exported to index in the main folder.
