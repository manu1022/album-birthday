import { createContext, useContext } from 'react'
import firebase from 'firebase'
import { ApiProfile } from '../Types/UserProfile';
import { Firebase } from '../Firebase';

export interface SessionObject {
    initializing: boolean,
    auth: firebase.User | null,
    prof: ApiProfile,
    refreshMode: -1 | 0 | 1, // -1 = invalid token and currently refreshing, 0 = TBD (while loading), 1 = valid token
}


const doRefreshToken = async (firebase: Firebase, profile: ApiProfile) => {
    const { tokenExpiryMs, accessToken } = profile

    if (Date.now() < (tokenExpiryMs - (5 * 60 * 1000))) {
        return { success: true, accessToken }
    }
    try {
        const refreshTokenFunc = firebase.functions.httpsCallable('doRefreshTokenCF')
        const refreshResult = (await refreshTokenFunc()).data
        return { success: refreshResult.success, accessToken: refreshResult.accessToken }
    } catch (error) {
        console.log(error)
        return { success: false, accessToken: '' }
    }
}

const SessionContext = createContext<SessionObject>({
    auth: null,
    initializing: true,
    prof: {} as ApiProfile,
    refreshMode: 0
})

const useSession: () => SessionObject = () => {
    const session = useContext(SessionContext)
    // return session
    return false
}

export { SessionContext, useSession, doRefreshToken }

