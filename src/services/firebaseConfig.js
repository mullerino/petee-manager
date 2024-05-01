import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDNV0Ixgy4v3CmlRG-6yP4HkR9v3n2SowM",
  authDomain: "peteemanager.firebaseapp.com",
  projectId: "peteemanager",
  storageBucket: "peteemanager.appspot.com",
  messagingSenderId: "796029273350",
  appId: "1:796029273350:web:7dfc5029868efdf2750a87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
