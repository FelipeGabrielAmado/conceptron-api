const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// Routes
app.use(require('./routes/index'));

app.listen(5000);
console.log('Server on port', 5000);