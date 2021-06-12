import { Medicine } from "./medicine.model";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { MedicineRequest } from "./medicinerequest.model";

@Injectable({
  providedIn: "root",
})
export class MedicineService {
  formData: Medicine;
  requestformData: MedicineRequest;

  constructor(private firsestore: AngularFirestore) {}
  getMedicine() {
    return this.firsestore.collection("medicine").snapshotChanges();
  }

  getMedicineRequestsByStatus(category) {
    return this.firsestore
      .collection("medicine-requests", (ref) =>
        ref.where("status", "==", category)
      )
      .snapshotChanges();
  }
  getApproveMedicineByNameAndQuantity(name, quantity) {
    return this.firsestore
      .collection("approvedmedicine", (ref) =>
        ref.where("medicineName", "==", name).where("quantity", ">=", quantity)
      )
      .get();
  }

  getApproveMedicine() {
    return this.firsestore.collection("approvedmedicine").snapshotChanges();
  }
}
