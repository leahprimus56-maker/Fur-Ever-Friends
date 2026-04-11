import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { 
  getAuth, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import firebaseConfig from "./firebaseConfig.js";


const app = initializeApp(firebaseConfig);
const auth = getAuth();

function setAuthUsers(onLogin, onLogout){
  onAuthStateChanged(auth, user => {
    if (user) {
      onLogin(user);
    } else {
      onLogout();
    }
  });
}

async function signUp(email, password){
    try{
        await setPersistence(auth, browserLocalPersistence);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
        return userCredential;
    } catch (error) {
        console.error("Error signing up:", error.message);
        throw error;
    }
}

async function login(email, password){
  try{
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential;
  } catch (error){
    console.error("Error logging in:", error.message);
    throw error;
  }
}

async function logout() {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error signing out', error.message);
  }
}

export {auth, setAuthUsers, login, signUp, logout};