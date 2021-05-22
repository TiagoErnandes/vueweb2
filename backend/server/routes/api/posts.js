const express = require('express');

const router = express.Router();

const mongodb = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb');

const uri =
  'mongodb+srv://vue123:1234@cluster0.cjfdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new mongodb(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  await client.connect();
  return client.db('vue_express').collection('posts');
}

module.exports = router;
