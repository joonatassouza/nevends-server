const Post = require('../models/Post');
const sharp = require('sharp');
const fs = require('fs');
const imgur = require('imgur');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;

        const resizedImageBuf = await sharp(req.file.path).resize(500).jpeg({ quality: 70 }).toBuffer();

        const image64 = resizedImageBuf.toString('base64');

        fs.unlinkSync(req.file.path);

        const { data } = await imgur.uploadBase64(image64);
            
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            imageUrl: data.link
        });
                
        req.io.emit('post', post);

        return res.json(post);
    },

    async delete(req, res) {
        const post = await Post.findByIdAndDelete(req.params.id);

        req.io.emit('delete', post._id);

        return res.send();
    },

    async comment(req, res) {

        const post = await Post.findById(req.params.id);

        post.comments.push({ text: req.body.comment });

        await post.save();

        req.io.emit('comment', post);

        return res.json(post);
    }
};