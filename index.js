const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.js')
const articleRoutes = require('./routes/article.js')
const stageRoutes = require('./routes/game.js')
const cookieParser = require('cookie-parser');

//mongodb credentials
// const username = "enter your mongo username";
// const pass = "enter your mongo password";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors( 
    {credentials: true, }
))
app.use('/api/v1/article', articleRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/game', stageRoutes);

mongoose.connect(`mongodb+srv://${username}:${pass}@cluster0.tkhncfb.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
