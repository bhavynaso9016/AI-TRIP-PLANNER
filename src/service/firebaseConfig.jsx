// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: "ai-trip-planner-25655.firebaseapp.com",
    projectId: "ai-trip-planner-25655",
    storageBucket: "ai-trip-planner-25655.firebasestorage.app",
    messagingSenderId: "160660118363",
    appId: "1:160660118363:web:ed5d3295688b83ad8d87e",
    measurementId: "G-JHB36BXXQL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
