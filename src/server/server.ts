import express from "express";
import { createServer as createViteServer } from "vite";
// import spotify from './lib/spotify';

// async function createServer() {
//   // creates a standard express app
//   const app = express();
//   // create vite using ssr mode
//   const vite = await createViteServer({
//     server: { middlewareMode: "ssr" },
//   });
//   // register vite's middleware
//   app.use(vite.middlewares);
//   // when a page is requested, call our serverRenderRoute method
//   // app.use("/callback", spotify({ vite }));
//   app.use("/api/hello", spotify);

//   // start the server on port 3000
//   app.listen(3000, () => console.log("listening on :3000"));
// }

// createServer();

const app = express()

app.get('/callback', function(req, res) {

  console.log("HOLA")
  // // your application requests refresh and access tokens
  // // after checking the state parameter

  // var code = req.query.code || null;
  // var state = req.query.state || null;
  // var storedState = req.cookies ? req.cookies[stateKey] : null;

  // if (state === null || state !== storedState) {
  //   res.redirect('/#' +
  //     querystring.stringify({
  //       error: 'state_mismatch'
  //     }));
  // } else {
  //   res.clearCookie(stateKey);
  //   var authOptions = {
  //     url: 'https://accounts.spotify.com/api/token',
  //     form: {
  //       code: code,
  //       redirect_uri: redirect_uri,
  //       grant_type: 'authorization_code'
  //     },
  //     headers: {
  //       'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  //     },
  //     json: true
  //   };

  //   request.post(authOptions, function(error, response, body) {
  //     if (!error && response.statusCode === 200) {

  //       var access_token = body.access_token,
  //           refresh_token = body.refresh_token;

  //       var options = {
  //         url: 'https://api.spotify.com/v1/me',
  //         headers: { 'Authorization': 'Bearer ' + access_token },
  //         json: true
  //       };

  //       // use the access token to access the Spotify Web API
  //       request.get(options, function(error, response, body) {
  //         console.log(body);
  //       });

  //       // we can also pass the token to the browser to make requests from there
  //       res.redirect('/#' +
  //         querystring.stringify({
  //           access_token: access_token,
  //           refresh_token: refresh_token
  //         }));
  //     } else {
  //       res.redirect('/#' +
  //         querystring.stringify({
  //           error: 'invalid_token'
  //         }));
  //     }
  //   });
  // }
});

// app.get('/refresh_token', function(req, res) {

//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });