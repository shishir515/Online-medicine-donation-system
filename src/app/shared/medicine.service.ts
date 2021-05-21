import { Medicine } from './medicine.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  formData: Medicine;

  constructor(private firsestore: AngularFirestore) { }
  getMedicine() {
    return this.firsestore.collection('medicine').snapshotChanges();
  }

  getApproveMedicine() {
    return this.firsestore.collection('approvedmedicine').snapshotChanges();
  }
}
