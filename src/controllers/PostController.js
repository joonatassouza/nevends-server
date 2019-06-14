const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
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
            imageUrl: fileName
        });
                
        req.io.emit('post', data.link);

        return res.json(post);
    },

    async delete(req, res) {
        const post = await Post.findByIdAndDelete(req.params.id);

        req.io.emit('post', post);

        return res.send();
    }
};