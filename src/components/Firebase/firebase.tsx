import {initializeApp, FirebaseApp} from 'firebase/app'
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";



// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'
// import 'firebase/compat/functions'

// import firebase from "firebase/app";
// import "firebase/firestore";

import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)


// // import { FirebaseApp, initializeApp } from 'firebase/app';
// // import { getAnalytics } from "firebase/analytics";
// import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
// import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// import { connectStorageEmulator, getStorage } from "firebase/storage";

// const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;
const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

export interface TimestampMap {
    '_seconds': number;
    '_nanoseconds': number;
    'seconds': number;
    'nanoseconds': number;
}

const config = {
    apiKey: "AIzaSyDr71YKaVuHp2ciHgX1Y7MkkCuaePftm2E",
    authDomain: "spoti-calendar.firebaseapp.com",
    projectId: "spoti-calendar",
    storageBucket: "spoti-calendar.appspot.com",
    messagingSenderId: "940202391179",
    appId: "1:940202391179:web:d1c463862962898805068e",
    measurementId: "G-6L0HHKQH95"
}

let firebaseApp: FirebaseApp;

let auth: Auth;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

const Firebase = () => {
    console.log("HOLA desde firebase")
    // auth: useAuth
    // db: useFirestore
    // functions: firebase.functions.Functions
    // provider: firebase.auth.AuthProvider
    // timeAgo: TimeAgo | undefined

    // constructor() {
        // console.log("app: ", app)
        try {
            firebaseApp = initializeApp({
                apiKey: "AIzaSyDr71YKaVuHp2ciHgX1Y7MkkCuaePftm2E",
                authDomain: "spoti-calendar.firebaseapp.com",
                projectId: "spoti-calendar",
                storageBucket: "spoti-calendar.appspot.com",
                messagingSenderId: "940202391179",
                appId: "1:940202391179:web:d1c463862962898805068e",
                measurementId: "G-6L0HHKQH95"
            });
          } catch (error) {
            console.error({error})
          }
    // };


        // if (!firebaseApp) {
            // app.initializeApp(config)
            // }

        // auth = useAuth()
        // db = useFirestore
        // storage = useStorage()
        // timeAgo = new TimeAgo('en-US')

            const useAuth = () => {
                auth = getAuth(firebaseApp);
                if (useEmulator()) {
                connectAuthEmulator(auth, 'http://localhost:9099');
                }
            }

            const useFirestore = () => {
                if (!firestore) {
                    firestore = getFirestore();
                        if (useEmulator()) {
                            connectFirestoreEmulator(firestore, 'localhost', 8080);
                        }
                }
                return firestore;
            };

            const useStorage = () => {
                if (!storage) {
                    storage = getStorage();
                        if (useEmulator()) {
                            connectStorageEmulator(storage, 'localhost', 9199);
                        }
                }
                return storage;
            };

            initializeApp(config)
            useAuth()
            useFirestore()
            useStorage()

        // // For ease of access. Note that db normally refers to Firebase Realtime Database.
        // this.db = app.firestore()
        // this.functions = app.functions()
        // this.provider = new app.auth.TwitterAuthProvider()
        // this.timeAgo = new TimeAgo('en-US')
}

export { Firebase }

// export default { Firebase }

    // // *** Auth API ***
    // doSignOut = () => this.auth.signOut()

    // getTimeText = (timeObject: any) => {
    //     // Convert to time text once it's of type firestore.Timestamp
    //     const getTextFromTimestamp = (timestamp: app.firestore.Timestamp) => {
    //         if (timestamp instanceof app.firestore.Timestamp) {
    //             return this.timeAgo.format(timestamp.toDate())
    //         } else {
    //             return 'some time ago'
    //         }

    //     }
    //     // console.log(Object.prototype.toString.call(timeObject) === '[object Object]')
    //     if (timeObject instanceof app.firestore.Timestamp) {
    //         // Check if Timestamp (accessed from client SDK)
    //         return getTextFromTimestamp(timeObject)
    //     } else if (Object.prototype.toString.call(timeObject) === '[object Object]') {
    //         // Check if it's a Map (JSON serialized from Cloud Functions)
    //         const timestamp = this.getTimestampFromMap(timeObject)
    //         if (timestamp) {
    //             return getTextFromTimestamp(timestamp)
    //         }
    //     }
    //     // Fallback
    //     console.log('Couldn\'t parse time. It is of type: ' + (typeof timeObject))
    //     console.log(timeObject)
    //     return 'some time ago'
    // }

    // getTimestampDifference = (laterTime: app.firestore.Timestamp, earlierTime: app.firestore.Timestamp) => {
    //     const msDifference = laterTime.toMillis() - earlierTime.toMillis()
    //     return msDifference
    // }

    // getTimestampFromMap = (timeMap: TimestampMap) => {
    //     if (timeMap instanceof app.firestore.Timestamp) {
    //         throw new Error('Object is a timestamp, not a map')
    //     }
    //     const keyArr = Object.keys(timeMap)
    //     if (keyArr.includes('_seconds') && keyArr.includes('_nanoseconds')) {
    //         let seconds = timeMap['_seconds']
    //         let nanoseconds = timeMap['_nanoseconds']
    //         const timestamp = new app.firestore.Timestamp(seconds, nanoseconds)
    //         return timestamp
    //     } else {
    //         console.error('Expected TimeMap keys not present')
    //         return null
    //     }
    // }
// }

// export { Firebase }



// // import { initializeApp } from "firebase/app";
// // import { getFirestore } from "@firebase/firestore";


// import { initializeApp, FirebaseApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// // function Firebase() {

//     // const config = {
//     //     apiKey: "AIzaSyDr71YKaVuHp2ciHgX1Y7MkkCuaePftm2E",
//     //     authDomain: "spoti-calendar.firebaseapp.com",
//     //     projectId: "spoti-calendar",
//     //     storageBucket: "spoti-calendar.appspot.com",
//     //     messagingSenderId: "940202391179",
//     //     appId: "1:940202391179:web:d1c463862962898805068e",
//     //     measurementId: "G-6L0HHKQH95"
//     // }


//     // const app = initializeApp(config);
//     // const db = getFirestore(app);
//     // console.log(app)
//     // console.log(db)

// // }
// // export { Firebase }

// const dev = true;

// export const app = initializeApp({
//   apiKey: "AIzaSyBDrj-rL-Mzswu9VXhgp-RuvP9Hvl1kqQ0",
//   authDomain: "edit-elements.firebaseapp.com",
//   databaseURL: "https://edit-elements-default-rtdb.firebaseio.com",
//   projectId: "edit-elements",
//   storageBucket: "edit-elements.appspot.com",
//   messagingSenderId: "340652433701",
//   appId: "1:340652433701:web:a26472592c1538bbac7acc",
//   measurementId: "G-945XC7348K"
// })

// export const auth = getAuth(app)
// export const db = getFirestore(app)
// export const functions = dev ? app.functions().useEmulator("localhost", '5001') : app.functions()







// // import firebase from 'firebase/app'
// // import 'firebase/auth'
// // import 'firebase/firestore'
// // import 'firebase/functions'
// // const dev = true






// import { FirebaseApp, initializeApp } from 'firebase/app';
// // import { getAnalytics } from "firebase/analytics";
// import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
// import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// import { connectStorageEmulator, getStorage } from "firebase/storage";

// let firebaseApp: FirebaseApp;
// const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

// export const Firebase = () => {
//   try {
//     firebaseApp = initializeApp({
//       // apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//       // authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
//       // databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
//       // projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
//       // storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
//       // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
//       // appId: import.meta.env.VITE_FIREBASE_APPID,
//       apiKey: "AIzaSyDr71YKaVuHp2ciHgX1Y7MkkCuaePftm2E",
//       authDomain: "spoti-calendar.firebaseapp.com",
//       projectId: "spoti-calendar",
//       storageBucket: "spoti-calendar.appspot.com",
//       messagingSenderId: "940202391179",
//       appId: "1:940202391179:web:d1c463862962898805068e",
//       measurementId: "G-6L0HHKQH95"
//     });
//     console.log("🚀 ~ file: firebase.tsx ~ line 201 ~ setupFirebase ~ firebaseApp", firebaseApp)
//   } catch (error) {
//     console.error({error})
//   }
// };

// let auth: Auth;
// let firestore: ReturnType<typeof getFirestore>;
// let storage: ReturnType<typeof getStorage>;

// // const analytics = getAnalytics(setupFirebase);

// export const useAuth = () => {
//   auth = getAuth(firebaseApp);
//   if (useEmulator()) {
//     console.log("HOLA")
//     connectAuthEmulator(auth, 'http://localhost:9099');
//   }
//   return auth;
// };

// export const useFirestore = () => {
//   if (!firestore) {
//     firestore = getFirestore();
//     if (useEmulator()) {
//       connectFirestoreEmulator(firestore, 'localhost', 8080);
//     }
//   }
//   return firestore;
// };

// export const useStorage = () => {
//   if (!storage) {
//     storage = getStorage();
//     if (useEmulator()) {
//         console.log()
//       connectStorageEmulator(storage, 'localhost', 9199);
//     }
//   }
//   return storage;
// };