const router = require('express').Router();



router
.route('/')
.get()

router
.route('/:id')
.get()
.post()
.put()
.delete();

router
.route('/:thoughtId/reactions')
.post()
.delete();

module.exports = router;