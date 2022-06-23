import { createContext, useContext } from 'react'
import { Firebase } from './firebase'


const FirebaseContext = createContext<typeof Firebase>({} as typeof  Firebase)

const useFirebase = () => {

    const firebase = useContext(FirebaseContext)
    return firebase
}
export { FirebaseContext, useFirebase }
