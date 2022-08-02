const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');
const postController = require('./controllers/postControl');
const pageController = require('./controllers/pageController');
const methodOverride = require('method-override');
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
app.use(express.static(path.resolve(__dirname + '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));
app.use(express.json());

//Routes
app.get('/', postController.getAllPost);
app.get('/posts/:id', postController.getPost);
app.post('/add_post', postController.createPost );
app.put('/post/:id', postController.updatePost );
app.delete('/posts/:id', postController.deletePost );


app.get('/about', pageController.getAllAboutPage );
app.get('/add_post', pageController.getAddPage );
app.get('/post', pageController.getPostPage );
app.get('/post/edit/:id',pageController.getPostEditPage);



const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
