const router = require('express').Router()
const postController = require('../Controllers/Posts')
const multer = require('multer')
const upload = multer();

router.get('/', postController.getPosts)
router.get('/:id', postController.getOnePost)
router.post('/', upload.single('file'), postController.createPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)
router.patch('/likepost/:id', postController.likePost)
router.patch('/unlikepost/:id', postController.unlikePost)

// Comments
router.patch('/commentpost/:id', postController.commentPost)
router.patch('/editcomment/:id', postController.editCommentPost)
router.patch('/deletecomment/:id', postController.deleteCommentPost)

module.exports = router