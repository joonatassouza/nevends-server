const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/comment', PostController.comment);
routes.get('/posts', PostController.index);
routes.delete('/posts/:id', PostController.delete);
routes.get('/posts/:id/remove', PostController.delete);

routes.post('/posts/:id/like', LikeController.like);
routes.post('/posts/:id/dislike', LikeController.dislike);

module.exports = routes;