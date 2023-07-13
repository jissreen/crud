const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://jishsreenth2016:crud123@crud.xvhgkmz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.use('/api/users',usersRouter);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
