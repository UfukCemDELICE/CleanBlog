const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');
const mongoose = require('mongoose');
const app = express();

//Db connection
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Method
app.set('view engine', 'ejs');

//MiddleWares
app.use(express.static((path.resolve(__dirname + '/public'))));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', async (req, res) => {
  const posts = await Post.find({})
  console.log(posts)
  res.render('index', {posts});

});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});


app.get('/post', (req, res) => {
  res.render('post');
});

app.post('/add_post', async (req, res) => {
  await Post.create(req.body)
  res.redirect('/')
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
