const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/Brain-Place', {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}`);
});