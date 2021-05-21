import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;

  constructor(private firsestore: AngularFirestore) { }
  getUser() {
    return this.firsestore.collection('user').snapshotChanges();
  }
}
