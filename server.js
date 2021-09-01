const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const passport   = require('passport');
const path       = require('path');
const app        = express();

const DB = require('./config/key').MONGO_URL;
const user = require('./routes/user');
const profile = require('./routes/profile');

const PORT = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, './uploads')));

require('./config/passport')(passport);

mongoose
  .connect(DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use('/api/user', user);
app.use('/api/profile', profile);

app.listen(PORT, () => {
  console.log(`Running on server ${PORT}...`);
})