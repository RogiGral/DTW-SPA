require('dotenv').config();
const express = require('express');
const App = require('./services/expressApp');
const { PORT } = require('./config');


const StartServer = async () => {

    const app = express();

    await App(app);

    app.listen(PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    })

}

StartServer();