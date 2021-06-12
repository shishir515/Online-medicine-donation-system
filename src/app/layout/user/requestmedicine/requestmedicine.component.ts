import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MedicineService } from "src/app/shared/medicine.service";
import { UserService } from "src/app/shared/user.service";

@Component({
  selector: "app-requestmedicine",
  templateUrl: "./requestmedicine.component.html",
  styleUrls: ["./requestmedicine.component.css"],
})
export class RequestmedicineComponent implements OnInit {
  ngoList = [];
  DonationType = ["NGO", "Individual"];
  user;
  constructor(
    public service: MedicineService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((res) => {
      console.log(res);
      console.log("res here");
      if (res && res.uid) {
        console.log(res);
        this.user = res;
      }
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.requestformData = {
      id: null,
      medicineName: "",
      dose: "",
      quantity: null,
      donationType: "",
    };
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    let data = form.value;
    this.firestore.collection("medicine-requests").add({
      ...data,
      userId: this.user.uid,
      email: this.user.email,
      status: "pending",
    });
    this.toastr.info("Requested Sucessfully", "Medicine Requested");
    this.resetForm(form);
  }
}
