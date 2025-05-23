import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getAuth,
    initializeAuth,
    getReactNativePersistence,
    Auth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
    apiKey: "AIzaSyDATv6NdTUeIA1hBPyoEfe2TtdkDfVoElk",
    authDomain: "financial-management-mobile.firebaseapp.com",
    projectId: "financial-management-mobile",
    storageBucket: "financial-management-mobile.firebasestorage.app",
    messagingSenderId: "312246674346",
    appId: "1:312246674346:web:757186f5d727f3a68101d3",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;

if (Platform.OS === "web") {
    auth = getAuth(app);
} else {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
}

export { app, auth };
