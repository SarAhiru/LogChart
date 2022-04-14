// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAqpZCu9q3ceSb7mqo8BTznvB8BoQ8WYPc",
//     authDomain: "digitaltextbook-log.firebaseapp.com",
//     projectId: "digitaltextbook-log",
//     storageBucket: "digitaltextbook-log.appspot.com",
//     messagingSenderId: "183191791064",
//     appId: "1:183191791064:web:76bab35c17af1ed2677ead",
//     measurementId: "G-8QVFYZZZX4"
//   };


  
import firebase from 'firebase/app' //node_modulesからコアとなるfirebaseのパッケージをimportする、firebaseを使うなら必ずimportする必要がある
import 'firebase/firestore' // firestoreを使いたいのでimportする
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAqpZCu9q3ceSb7mqo8BTznvB8BoQ8WYPc",
    authDomain: "digitaltextbook-log.firebaseapp.com",
    projectId: "digitaltextbook-log",
    storageBucket: "digitaltextbook-log.appspot.com",
    messagingSenderId: "183191791064",
    appId: "1:183191791064:web:76bab35c17af1ed2677ead",
    measurementId: "G-8QVFYZZZX4"
  };

// init firebase
firebase.initializeApp(firebaseConfig) // バックエンドのfirebaseを初期化する

// init firestore service
const projectFirestore = firebase.firestore() // firebaseのサービスも初期化する
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp //firebaseのtimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }