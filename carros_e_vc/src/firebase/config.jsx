import { initializeApp } from "firebase/app"


const firebaseConfig = {
  apiKey: "AIzaSyAra4zvjkFSYI5FC1Re02TrShy63mnWB_U",
  authDomain: "carros-e-vc.firebaseapp.com",
  projectId: "carros-e-vc",
  storageBucket: "carros-e-vc.firebasestorage.app",
  messagingSenderId: "506786936285",
  appId: "1:506786936285:web:c2fff7c1c9ac53590a7234"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)