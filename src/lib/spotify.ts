// // import request, {CoreOptions} from 'request';
// // import {UserDao} from "./user";
// // import environment from './environment';

// export class SpotifyService {
//   static instance = new SpotifyService();

//   async getUserAlbums(username: string): Promise<Album[]> {
//     // const user = await UserDao.getUser(username);

//     // if (!user) {
//     //   throw new Error('Invalid user.');
//     // }

//     const res = await this.requestPromise('https://accounts.spotify.com/api/token', {
//     //   form: {grant_type: 'refresh_token', refresh_token: user.spotifyRefreshToken},
//       method: 'POST',
//       headers: {
//         // Authorization: 'Basic ' + Buffer.from(environment.clientId + ':' + environment.clientSecret).toString('base64')
//       }
//     });

//     const accessToken = res.access_token;

//     let albumNames = new Set<string>();
//     let albums = [];
//     let url = `https://api.spotify.com/v1/me/tracks?limit=50`;

//     while (url) {
//       const res = await this.requestPromise(url, {
//         headers: {
//           Authorization: 'Bearer ' + accessToken
//         }
//       });

//       const albs: Album[] = res.items.map(item => item.track.album).filter(album => album.release_date_precision === 'day');

//       for (let alb of albs) {
//         if (!albumNames.has(alb.name)) {
//           albums.push(alb);
//           albumNames.add(alb.name);
//         }
//       }

//       // albums.push(...res.items.map(item => item.track.album).filter(album => album.release_date_precision === 'day'));
//       url = res.next;
//     }

//     return albums;
//   }

//   // async getUserAlbums(username: string): Promise<Album[]> {
//   //   let albums = [];
//   //   let url = `https://api.spotify.com/v1/me/albums?limit=50`;
//   //
//   //   while (url) {
//   //     const res = await this.requestPromise(url, {
//   //       headers: {
//   //         Authorization: 'Bearer ' + this.users[username]
//   //       }
//   //     });
//   //
//   //     albums.push(...res.items.map(item => item.album).filter(album => album.release_date_precision === 'day'));
//   //     url = res.next;
//   //   }
//   //
//   //   return albums;
//   // }

//   private requestPromise(uri: string, options: CoreOptions): Promise<any> {
//     return new Promise<Album[]>((resolve, reject) => {
//       request(uri, options, (err, sRes, body) => {
//         if (err) {
//           reject(err);
//         }

//         else {
//           resolve(JSON.parse(body));
//         }
//       });
//     });
//   }

//   handleCallback(host: string, code: string): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       request('https://accounts.spotify.com/api/token', {
//         form: {grant_type: 'authorization_code', code, redirect_uri: host + '/callback'},
//         method: 'POST',
//         headers: {
//           Authorization: 'Basic ' + Buffer.from(environment.clientId + ':' + environment.clientSecret).toString('base64')
//         }
//       }, (err, sRes, body) => {
//         const {access_token, refresh_token} = JSON.parse(body);

//         request('https://api.spotify.com/v1/me', {
//           headers: {
//             Authorization: 'Bearer ' + access_token
//           }
//         }, (err, sRes, body) => {
//           const userId = JSON.parse(body).id;

//           UserDao.addUser(userId, refresh_token).then(() => {
//             resolve(userId);
//           }).catch(e => reject(e));
//         });
//       });
//     })
//   }
// }

import axios from 'axios';
import {Buffer} from 'buffer';

function SpotifyLogin () {
    console.log("SPOT")
    const clientID = 'e476f46fccba4586ab13915c5855f8d4'; // Your client id
    const clientSecret = 'b6416174c57b431faaa5ab160015f297'; // Your secret

    // your application requests authorization
    // const authOptions = {
    // url: 'https://accounts.spotify.com/api/token',
    // headers: {
    //     'Authorization': `Basic ${  new Buffer(`${clientID  }:${  clientSecret}`).toString('base64')}`
    // },
    // form: {
    //     grant_type: 'client_credentials'
    // },
    // json: true
    // };

    // axios({
    //     method: 'post',
    //     url: 'https://api.spotify.com/v1/users/manu1022',
    //     headers: {
    //         'Authorization': `Basic ${Buffer.from(`${clientID}:${clientSecret}`, 'base64').toString('base64')}`
    //     },
    //     // data: {
    //     //     grant_type: 'client_credentials',
    //     //     json: true
    //     // },
    //     transformResponse: [function (data) {
    //         console.log(data)
    //         // return data
    //       }],
    //   });


    // axios({authOptions}, function(error, response, body) {
    // if (!error && response.statusCode === 200) {

    //     // use the access token to access the Spotify Web API
    //     const token = body.access_token;
    //     const options = {
    //     url: 'https://api.spotify.com/v1/users/jmperezperez',
    //     headers: {
    //         'Authorization': `Bearer ${  token}`
    //     },
    //     json: true
    //     };
    //     axios.get(options, function(error, response, body) {
    //     console.log(body);
    //     });
    // }
    // });

    // let code = null;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          redirect_uri: '/',
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': `Basic ${ Buffer.from((`${clientID  }:${  clientSecret}`),'base64').toString('base64')}`
        },
        json: true
      };

      axios({
            method: 'post',
            url: authOptions.url,
            headers: authOptions.headers,
            data: {
                grant_type: 'client_credentials',
                json: true
            },

            transformResponse: [function (data) {
                console.log("DATA: ", data)
                // return data
              }],
          });



    //   axios.post(authOptions.url, function(error, response, body) {
    //     if (!error && response.statusCode === 200) {

    //         const access_token = body.access_token;
    //             const refresh_token = body.refresh_token;

    //         const options = {
    //             url: 'https://api.spotify.com/v1/me',
    //             headers: { 'Authorization': `Bearer ${  access_token}` },
    //             json: true
    //         };

    //         // use the access token to access the Spotify Web API
    //         axios.get(options.url, function(error, response, body) {
    //             console.log(body);
    //         });

    //     }
    //    })
}

export default SpotifyLogin;