import { auth, signOut } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, sendEmailVerification, createUserWithEmailAndPassword  } from '../firebase';
import Toast from 'react-native-root-toast';

// https://github.com/vrijraj/Firebase-For-Web/blob/master/3.1.%20Firebase%20Auth%20:%20Email%20and%20Password.md

// The callback and arg are passed to signout so that it can call a function after signing out.
// Login and Register functions also used signout so they take them as well.
// Mainly used to go back to the login screen after signing out.



const decorateMsg = (msg) => {
   msg = msg.substring(msg.indexOf('/') + 1)
   msg = msg.substring(0, msg.length - 2)
   msg = msg.replace(/-/g, ' ')
   msg = msg.charAt(0).toUpperCase() + msg.slice(1)
   msg = msg + ". Please check your input then try again"
   if (msg.includes("request")) {
      msg = "Please check your internet connection then try again"
   }
   if(msg.includes("password")){
      msg = "User not found. Please check your input then try again"
   }
   return msg;

}

const printError = (msg) => {
   Toast.show(decorateMsg(msg), { duration: 3000, position: 100, backgroundColor: '#BC243C', opacity:1.0});
}




const handleSignOut = async (callback, arg) => {
   try {
      await signOut(auth);
      callback(arg);
   } catch (error) {
      printError(error.message);
   }
}

const handleReset = async (email, callback, arg, color) => {
   try {
      await sendPasswordResetEmail(auth, email);
      msg = "If your email is registered, you will receive an email with instructions on how to reset your password."
      Toast.show(msg, { duration: 3000, position: 100, backgroundColor: color, opacity:1.0});
      callback(arg);
      
   } catch (error) {
     msg = decorateMsg(error.message);
     if(msg.includes("User")){
         msg = "If your email is registered, you will receive an email with instructions on how to reset your password."
         Toast.show(msg, { duration: 3000, position: 100, backgroundColor: color, opacity:1.0});
         callback(arg);
     }
     else {
         printError(error.message);
     }

   }
}


const handleLogin = async (email, password, color, callback, arg ) => {
   try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      if (!user.emailVerified) {
       handleSignOut(console.log, '');
       Toast.show("Please verify your email and try again", { duration: 3000, position: 100, backgroundColor: color, opacity:1.0});
      }
      else {
      callback(arg)
      }
      
   } catch (error) {
      printError(error.message);
   }
}

const handleSignUp = async (fname, lname, email, password, callback, arg, color) => {
try {
   const user = await createUserWithEmailAndPassword(auth, email, password);
   handleSignOut(callback, arg);
   const rnd = String(Math.floor(Math.random() * 1000) + 1);
   updateProfile(auth.currentUser, {
      photoURL: "https://avatars.dicebear.com/api/jdenticon/" + rnd + ".svg",
      displayName: fname + " " + lname
   })
   sendEmailVerification(auth.currentUser)
   Toast.show("We have sent a verification email to your email address. Please verify your email to login", { duration: 3000, position: 100, backgroundColor: color, opacity:0.9});

} catch (error) {
   printError(error.message);
}
}

export { auth, handleLogin, handleSignOut, onAuthStateChanged, handleReset, handleSignUp, printError  };
