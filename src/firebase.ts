// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebaseConfigJson from "../firebaseConfig.json"
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig: FirebaseOptions = firebaseConfigJson as FirebaseOptions;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {
    auth,
    analytics
}