import { createContext, useContext } from 'react'
import { Firebase } from './firebase'


const FirebaseContext = createContext<typeof Firebase>({} as typeof  Firebase)

const useFirebase = () => {

    const firebase = useContext(FirebaseContext)
    console.log("🚀 ~ file: context.tsx ~ line 12 ~ useFirebase ~ firebase", firebase)

    return firebase
}
export { FirebaseContext, useFirebase }
