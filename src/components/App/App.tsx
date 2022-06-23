
import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom"
import * as querystring from 'query-string'


import { ROUTES, SPOTIFY_REDIRECT_URL, DEV_SPOTIFY_REDIRECT_URL } from '../../constants'
import { HomePage } from '../Home'
import { useFirebase } from '../Firebase'
import { useSession, SessionContext } from '../Session/'
import Button from 'react-bootstrap/Button';
import styles from './App.module.css'
import Spinner from 'react-bootstrap/Spinner'
import { SessionObject, doRefreshToken } from '../Session/useSession';
import { ApiProfile } from '../Types/UserProfile';

import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions";

function useQuery() {

    return new URLSearchParams(useLocation().search);
}

const LoginWithCode: React.FC = () => {

    const query = useQuery()
    const firebase = useFirebase()

    const [loginFailed, setLoginFailed] = useState(false)

    useEffect(() => {
        const doLogin = async () => {
            const code = query.get('code')
            const devMode = process.env.NODE_ENV === 'development'
            if (!code) {
                return
            }

            const loginPayload = {
                code,
                devMode
            }

            const functions = getFunctions(getApp());
            console.log("🚀 ~ file: App.tsx ~ line 52 ~ doLogin ~ functions", functions)
            connectFunctionsEmulator(functions, "localhost", 5001);


            const loginWithCode = httpsCallable(functions,'loginWithCode')
            try {
                console.log("TRY")
                const result = await loginWithCode(loginPayload)
                console.log("🚀 ~ file: App.tsx ~ line 60 ~ doLogin ~ result", result)



                // const { success, customToken } = result.data
                // if (success && customToken) {
                //     firebase.auth.signInWithCustomToken(customToken)
                // } else {
                //     setLoginFailed(true)
                // }

            }
            catch (error) {
                console.log(error)
            }
        }
        doLogin()
    }, [query, firebase])

    if (loginFailed) {
        return (
            <Navigate to={ROUTES.ROOT} />
        )
    }
    return (
        <div className={styles.window}>
            <Spinner animation="border" role="status" variant="success" />
            <p>Logging you in...</p>
        </div>
    )
}

const generateRandomString = function (length: number) {

    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

const LoginScreen: React.FC = () => {

    const SPOTIFY_SCOPES = 'user-read-email'
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const REDIRECT_URL = process.env.NODE_ENV === 'development' ? DEV_SPOTIFY_REDIRECT_URL : SPOTIFY_REDIRECT_URL

    const queryStringPayload = {
        response_type: 'code',
        client_id: 'e476f46fccba4586ab13915c5855f8d4',
        scope: SPOTIFY_SCOPES,
        redirect_uri: REDIRECT_URL,
        state: generateRandomString(16)
    }
    const spotifyLoginUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify(queryStringPayload)


    return (
        <div className={styles.window}>
            <Button href={spotifyLoginUrl} variant="success">Login with Spotify</Button>
        </div>
    )
}

const MainApp: React.FC = () => {

    const session = useSession()

    if (session.initializing) {
        return (<div />)
    }

    if (!session.auth?.uid) {
        return (
            <Router>
                <Routes>
                    <Route path={ROUTES.LOGIN_WITH_CODE} element={<LoginWithCode />}/>
                    <Route path={ROUTES.ROOT} element= {<LoginScreen />} />
                </Routes>
            </Router>
        )
    }

    // Authenticated
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LOGIN_WITH_CODE}>
                    <Navigate to={ROUTES.ROOT} />
                </Route>
                <Route path={ROUTES.ROOT}>
                    <HomePage />
                </Route>
            </Routes>
        </Router>
    )
}

// Provides App-Wide Context to access auth object
const AppWithAuth: React.FC = () => {


        const firebase = useFirebase()
        const [session, setSession] = useState<SessionObject>({
            initializing: true,
            auth: null,
            prof: {} as ApiProfile,
        } as SessionObject)


    useEffect(() => {
        // unsubscribe to the profile listener when unmounting
        let unsubscribeProfileDoc = () => { }

        // function onChange(newUser: firebase.User | null) {
        //     if (newUser === null) {
        //         // Not authenticated
        //         setSession({ initializing: false, auth: null, prof: {} as ApiProfile, refreshMode: 0 })
        //         unsubscribeProfileDoc()
        //     } else {
        //         // New authentication occurred
        //         unsubscribeProfileDoc = firebase.db.collection('users').doc(newUser.uid).collection('sensitive').doc('api').onSnapshot(async function (profileDoc) {
        //             const profile = profileDoc.data() as ApiProfile
        //             setSession({ initializing: false, auth: newUser, prof: profile, refreshMode: 0 })
        //             doRefreshToken(firebase, profile)
        //         }, (error) => {
        //             console.error('Couldn\'t access profile')
        //             setSession({ initializing: false, auth: newUser, prof: {} as ApiProfile, refreshMode: 0 })
        //             console.log(error)
        //         })
        //     }
        // }

        // listen for auth state changes

        //     const unsubscribe = firebase.auth.onAuthStateChanged(onChange)

        //     return () => {
        //         unsubscribeProfileDoc()
        //         unsubscribe()
        //     }
        }, [firebase])


    return (
        <SessionContext.Provider value={session}>
            <MainApp />
        </SessionContext.Provider>
    )
}

export { AppWithAuth }







// import React from "react"

// function App () {
//         return (
//             <div>
//               <h1>Vite + React</h1>
//             </div>
//           )
// }
// export default App