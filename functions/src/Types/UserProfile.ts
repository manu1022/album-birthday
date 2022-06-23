// import { firestore } from "firebase-admin"


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

// export interface ApiProfile extends User {
//     accessToken: string,
//     email: string,
//     artists: Array<Artists>,
// }

export interface ApiProfile extends User {
    accessToken: string,
    tokenExpiryMs: number,
    refreshToken: string,
}



const transformSpotifyProfile = (spotifyProfile: any) => {
    console.log("transformSpotify", spotifyProfile)
    return {
        ...spotifyProfile,
        urls: spotifyProfile.external_urls,
        name: spotifyProfile.display_name
    } as User
}

export { transformSpotifyProfile }