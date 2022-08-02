const Post = require('../models/Post');

exports.getAllAboutPage = (req, res) => {
    res.render('about');
  };
exports.getAddPage = (req, res) => {
    res.render('add_post');
  };
exports.getPostPage = (req, res) => {
    res.render('post');
  };
exports.getPostEditPage =  async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.render('edit', {
      post,
    });
  };