import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDATv6NdTUeIA1hBPyoEfe2TtdkDfVoElk",
    authDomain: "financial-management-mobile.firebaseapp.com",
    projectId: "financial-management-mobile",
    storageBucket: "financial-management-mobile.firebasestorage.app",
    messagingSenderId: "312246674346",
    appId: "1:312246674346:web:757186f5d727f3a68101d3",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
