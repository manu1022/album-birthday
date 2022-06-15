// import app from 'firebase/app'
// // import * as app from 'firebase/compat/app'
// // import 'firebase/compat/auth'
// // import 'firebase/compat/firestore'
// // import 'firebase/compat/functions'

// // import firebase from "firebase/app";
// import "firebase/firestore";

// import TimeAgo from 'javascript-time-ago'
// // Load locale-specific relative date/time formatting rules.
// import en from 'javascript-time-ago/locale/en'

// // Add locale-specific relative date/time formatting rules.
// TimeAgo.addLocale(en)

// export interface TimestampMap {
//     '_seconds': number;
//     '_nanoseconds': number;
//     'seconds': number;
//     'nanoseconds': number;
// }

// const config = {
//     apiKey: "AIzaSyDr71YKaVuHp2ciHgX1Y7MkkCuaePftm2E",
//     authDomain: "spoti-calendar.firebaseapp.com",
//     projectId: "spoti-calendar",
//     storageBucket: "spoti-calendar.appspot.com",
//     messagingSenderId: "940202391179",
//     appId: "1:940202391179:web:d1c463862962898805068e",
//     measurementId: "G-6L0HHKQH95"
// }

// class Firebase {
//     auth: firebase.auth.Auth
//     db: firebase.firestore.Firestore
//     functions: firebase.functions.Functions
//     provider: firebase.auth.AuthProvider
//     timeAgo: TimeAgo


//     constructor() {
//         console.log(app)
//         if (!app.apps.length) {
//             app.initializeApp(config)
//         }
//         this.auth = app.auth()
//         // For ease of access. Note that db normally refers to Firebase Realtime Database.
//         this.db = app.firestore()
//         this.functions = app.functions()
//         this.provider = new app.auth.TwitterAuthProvider()
//         this.timeAgo = new TimeAgo('en-US')
//     }

//     // *** Auth API ***
//     doSignOut = () => this.auth.signOut()

//     getTimeText = (timeObject: any) => {
//         // Convert to time text once it's of type firestore.Timestamp
//         const getTextFromTimestamp = (timestamp: app.firestore.Timestamp) => {
//             if (timestamp instanceof app.firestore.Timestamp) {
//                 return this.timeAgo.format(timestamp.toDate())
//             } else {
//                 return 'some time ago'
//             }

//         }
//         // console.log(Object.prototype.toString.call(timeObject) === '[object Object]')
//         if (timeObject instanceof app.firestore.Timestamp) {
//             // Check if Timestamp (accessed from client SDK)
//             return getTextFromTimestamp(timeObject)
//         } else if (Object.prototype.toString.call(timeObject) === '[object Object]') {
//             // Check if it's a Map (JSON serialized from Cloud Functions)
//             const timestamp = this.getTimestampFromMap(timeObject)
//             if (timestamp) {
//                 return getTextFromTimestamp(timestamp)
//             }
//         }
//         // Fallback
//         console.log('Couldn\'t parse time. It is of type: ' + (typeof timeObject))
//         console.log(timeObject)
//         return 'some time ago'
//     }

//     getTimestampDifference = (laterTime: app.firestore.Timestamp, earlierTime: app.firestore.Timestamp) => {
//         const msDifference = laterTime.toMillis() - earlierTime.toMillis()
//         return msDifference
//     }

//     getTimestampFromMap = (timeMap: TimestampMap) => {
//         if (timeMap instanceof app.firestore.Timestamp) {
//             throw new Error('Object is a timestamp, not a map')
//         }
//         const keyArr = Object.keys(timeMap)
//         if (keyArr.includes('_seconds') && keyArr.includes('_nanoseconds')) {
//             let seconds = timeMap['_seconds']
//             let nanoseconds = timeMap['_nanoseconds']
//             const timestamp = new app.firestore.Timestamp(seconds, nanoseconds)
//             return timestamp
//         } else {
//             console.error('Expected TimeMap keys not present')
//             return null
//         }
//     }
// }

// export { Firebase }



// import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useEffect } from 'react';

function Firebase() {

    console.log("HOLA")
    const config = {
        apiKey: "AIzaSyDr71YKaVuHp2ciHgX1Y7MkkCuaePftm2E",
        authDomain: "spoti-calendar.firebaseapp.com",
        projectId: "spoti-calendar",
        storageBucket: "spoti-calendar.appspot.com",
        messagingSenderId: "940202391179",
        appId: "1:940202391179:web:d1c463862962898805068e",
        measurementId: "G-6L0HHKQH95"
    }


    const app = initializeApp(config);
    const db = getFirestore(app);
    console.log(app)



}
export { Firebase }
