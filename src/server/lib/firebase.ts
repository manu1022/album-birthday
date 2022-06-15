import { FirebaseApp, initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

let firebaseApp: FirebaseApp;
const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

export const setupFirebase = () => {
  try {
    firebaseApp = initializeApp({
      // apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
      // authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
      // databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
      // projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
      // storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
      // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
      // appId: import.meta.env.VITE_FIREBASE_APPID,
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
};

let auth: Auth;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

// const analytics = getAnalytics(setupFirebase);

export const useAuth = () => {
  auth = getAuth(firebaseApp);
  if (useEmulator()) {
    console.log("HOLA")
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
  return auth;
};

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore();
    if (useEmulator()) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  }
  return firestore;
};

export const useStorage = () => {
  if (!storage) {
    storage = getStorage();
    if (useEmulator()) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }
  return storage;
};