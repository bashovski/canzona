const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const atlas = require('./config/atlas');

const env = require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = atlas.getAtlasURI();
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('[canzona-api]: successfully connected to the MongoDB cluster.');
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('[canzona-api]: connection to the MongoDB cluster is open.');
});

const apiRoutes = require('./routes/api');

apiRoutes.initialize(app);

app.listen(port, () => {
    console.log(`[canzona-api]: serving the API on port of :${port}`);
});
