import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBzmSYCj5CrlczAm8Wmp5OtPqodIbtg79E",
    authDomain: "chat-app-57f32.firebaseapp.com",
    projectId: "chat-app-57f32",
    storageBucket: "chat-app-57f32.appspot.com",
    messagingSenderId: "719007817461",
    appId: "1:719007817461:web:dacc63ee9eec5cf3edefbc",
    measurementId: "G-K2Y2H8X99W"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const fireStore = firebase.firestore();

// Initialize WebRTC
const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

export const peerConnect = new RTCPeerConnection(servers);
