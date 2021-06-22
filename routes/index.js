const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');


router.use('/api/users', userRoutes);
router.use('/api/thoughts');

router.use((req, res) => {
    res.status(404).json({message: '404 Error'});
});

module.exports = router