const router = require('express').Router();

router
.route('/')
.get()
.post();

router
.route('/:id')
.get()
.put()
.delete();

router
.route('/:userId/friend/:friendId')
.post()
.delete();

module.exports = router;