import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    });
  }
  register(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
        (userData) => {
          userData.user.sendEmailVerification();
          resolve(userData);
        },
        (err) => reject(err)
      );
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
