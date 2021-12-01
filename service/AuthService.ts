import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { app, auth } from '../firebase';

class AuthService {
  auth: any;
  constructor(firebaseApp: any) {
    this.auth = auth;
  }

  waitForUser(callback: any) {
    return onAuthStateChanged(this.auth, (userCred) => {
      callback(userCred);
    });
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCred) => {
        return {
          user: userCred.user,
        };
      })
      .catch((error) => {
        return {
          error: error.message,
        };
      });
  }
  async logout() {
    await signOut(this.auth);
  }
}

export default new AuthService(app);
