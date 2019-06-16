import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyBO3emUdScFuxy3P8aMrIT1IFCz-QzV6aQ",
    authDomain: "concrete-92b62.firebaseapp.com",
    databaseURL: "https://concrete-92b62.firebaseio.com",
    projectId: "concrete-92b62",
    storageBucket: "concrete-92b62.appspot.com",
    messagingSenderId: "326097592364",
    appId: "1:326097592364:web:3099a4bac86f6d84"
};
// var firebaseConfig = {
//     apiKey: "AIzaSyBO3emUdScFuxy3P8aMrIT1IFCz-QzV6aQ",
//     authDomain: "concrete-92b62.firebaseapp.com",
//     databaseURL: "https://concrete-92b62.firebaseio.com",
//     projectId: "concrete-92b62",
//     storageBucket: "concrete-92b62.appspot.com",
//     messagingSenderId: "326097592364",
//     appId: "1:326097592364:web:3099a4bac86f6d84"
//   };
let app = Firebase.initializeApp(config);
export const db = app.database();