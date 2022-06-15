import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppWithAuth as App } from './components/App';
// import * as serviceWorker from './serviceWorker';
// import './global.css'


// const el = document.getElementById('root')
// if (el === null) throw new Error('Root container missing in index.html')

// const root = ReactDOM.createRoot(el)
// root.render(
//     <React.StrictMode>
//     {/* <FirebaseContext.Provider value={new Firebase()}> */}
//       <App />
//     {/* </FirebaseContext.Provider> */}
//   </React.StrictMode>,
// );


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA

// // serviceWorker.unregister();
