const SpotifyWebApi = require('spotify-web-api-node');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = require('../config');


const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: SPOTIFY_REDIRECT_URI
});

async function getAuthUrl(req, res) {
    const authUrl = await spotifyApi.createAuthorizeURL(['user-read-private', 'user-read-email'], 'state');
    res.status(200).json({
        authUrl
    });
}

async function getAuthToken(req, res) {
    const authorizationCode = req.query.code || null;


    try {
        const data = await spotifyApi.authorizationCodeGrant(authorizationCode);
        const { access_token, refresh_token } = data.body;

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        res.status(200).json({
            access_token,
            refresh_token
        });

    } catch (error) {
        console.error('Error retrieving tokens:', error);
        res.send('Error retrieving tokens.');
    }
}


module.exports = {
    getAuthUrl,
    getAuthToken
};