import { AngularFirestore } from "@angular/fire/firestore";
import { MedicineService } from "../../../shared/medicine.service";
import { Component, OnInit } from "@angular/core";
import { Medicine } from "src/app/shared/medicine.model";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-viewdonated",
  templateUrl: "./viewdonated.component.html",
  styleUrls: ["./viewdonated.component.css"],
})
export class ViewDonatedComponent implements OnInit {
  list: Medicine[];
  approveMedicine = [];
  surveys2: Observable<any>;
  userId: string;
  constructor(
    private service: MedicineService,
    private toastr: ToastrService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((res) => {
      if (!this.userId) {
        this.userId = res.uid;
      }
      this.service
        .getApproveMedicineByUser(this.userId)
        .subscribe((actionArray) => {
          this.list = actionArray.map((item) => {
            return {
              id: item.payload.doc.id,
              ...(item.payload.doc.data() as Object),
            } as Medicine;
          });
        });
    });
  }
}
