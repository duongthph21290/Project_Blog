const express = require('express');
const router = express.Router();

const courseController = require("../app/controllers/CourseController");



router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:slug', courseController.show);
router.post('/handle-form-actions', courseController.handleFormActions);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.remove);
router.delete('/:id/real', courseController.real);


module.exports = router;