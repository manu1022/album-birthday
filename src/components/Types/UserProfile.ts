// // interface ImageArray {
// //     height: number;
// //     url: string;
// //     width: number;
// // }

// // interface SpotifyUrls {
// //     spotify: string
// // }

// // export interface UserProfile {
// //     id: string,
// //     uid: string,
// //     images: Array<ImageArray>,
// //     urls: SpotifyUrls,
// //     name: string,
// // }

// // export interface ApiProfile extends UserProfile {
// //     accessToken: string,
// //     tokenExpiryMs: number,
// //     refreshToken: string,
// // }

// // const transformSpotifyProfile = (spotifyProfile: any) => {
// //     return {
// //         ...spotifyProfile,
// //         urls: spotifyProfile.external_urls,
// //         name: spotifyProfile.display_name
// //     } as UserProfile
// // }

// // export { transformSpotifyProfile }


// // import { firestore } from "firebase-admin"


interface Artists {
    artistImage: string,
    artistName: string,
    albums: Array<Albums>
}

interface Albums {
    albumImage: string,
    albumName: string,
    enable: boolean,
    releaseDate: Date
}

interface User {
    accessToken: string,
    email: string,
    artists: Array<Artists>,
}

export interface ApiProfile extends User {
    accessToken: string,
    email: string,
    artists: Array<Artists>,
}

// // export interface ApiProfile extends UserProfile {
// //     accessToken: string,
// //     tokenExpiryMs: number,
// //     refreshToken: string,
// // }



// const transformSpotifyProfile = (spotifyProfile: any) => {
//     console.log("transformSpotify")
//     return {
//         ...spotifyProfile,
//         urls: spotifyProfile.external_urls,
//         name: spotifyProfile.display_name
//     } as User
// }

// export { transformSpotifyProfile }