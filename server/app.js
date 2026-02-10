import express from 'express';
import { connection, database } from './database/database.js';
import setupCollections from './database/collections.js';
import mongodb from 'mongodb';



const app = express();
let server;

connection
  .then(() => setupCollections(database))
  .then(() => {
    console.log("Success: connected to database!");
    server = app.listen(3000, () => console.log('Server ready'));
  });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('index');
});

const validatePost = (req, res, next) => {//middleware
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  if (title.length < 3) {
    return res.status(400).json({ error: 'Title must be at least 3 characters' });
  }

  next();
};


app.post('/api/user', async (req, res) => {//adds a user
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  try {
    await database.collection('Users').insertOne({ username, password });
    res.status(200).json({ message: "Sign In successfully!" });
} catch (error) {
    console.error("Error inserting post:", error);
    res.status(500).json({ message: "Error Signing IN!" });
}
});




app.post('/api/make-post', validatePost, (req, res) => {
  const postContent = req.body.content;
  const postTitle = req.body.title;
  const userID = mongodb.ObjectId.createFromHexString(req.body.userID);

  if (!postTitle || !postContent) {
      return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
      postTitle,
      postContent,
      userID,
  };

  console.log('Received post data:', newPost);

  database.collection("Posts")
      .insertOne(newPost)
      .then(result => {
          console.log('Insert result:', result);
          if (result.acknowledged) {
              newPost._id = result.insertedId;
              res.json(newPost);
          } else {
              res.status(500).json({ error: 'Failed to insert post' });
          }
      })
      .catch(err => {
          console.error('Error inserting post:', err);
          res.status(500).json({ error: 'Failed to create post' });
      });
});


app.get('/api/posts', (req, res) => {
  database.collection("Posts")
    .aggregate([
      {
        $match: {}  // You can add more filtering conditions if needed
      },
      {
        $lookup: {
          from: 'Users',        // Name of the Users collection
          localField: 'userID', // Field in Posts collection to match
          foreignField: '_id',  // Field in Users collection to match
          as: 'userInfo'        // The resulting array that will hold matched user data
        }
      },
      {
        $project: {
          postTitle: 1,
          postContent: 1,
          userInfo: { username: 1 } // Only include the username from the userInfo array
        }
      }
    ])
    .toArray()
    .then(posts => res.json(posts)) // Send the posts with user info back
    .catch(err => {
      console.error('Error fetching posts:', err);
      res.status(500).json({ error: 'Failed to fetch posts' });
    });
});



app.get('/api/get-current-id/:name',(req,res)=>{
  const user = req.params.name;
  database.collection("Users")
  .aggregate([
    {
      $match: {username: user}
    } 
    
  ])
  .toArray()
  .then(id=>res.json(id))
  .catch((e)=>console.log(e+"api current-id ERROR"))
});


