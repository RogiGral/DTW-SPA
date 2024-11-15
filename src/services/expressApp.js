const express = require('express');

const { authRouter } = require('../routes');

module.exports = async (app) => {

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json());

    app.use(authRouter)

    return app;

}