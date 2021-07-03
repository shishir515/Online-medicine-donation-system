import { NGO } from "./../../dashboard/add-ngo/ngo.model";
import {
  AngularFirestoreModule,
  AngularFirestore,
} from "@angular/fire/firestore";
import { MedicineService } from "./../../../shared/medicine.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-addmedicine",
  templateUrl: "./addmedicine.component.html",
  styleUrls: ["./addmedicine.component.css"],
})
export class AddmedicineComponent implements OnInit {
  ngoList = [];
  DonationType = ["NGO", "Individual", "Pharmacy"];
  userId: string;
  constructor(
    public service: MedicineService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.resetForm();
    this.afAuth.authState.subscribe((res) => {
      if (!this.userId) {
        this.userId = res.uid;
      }
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      id: null,
      medicineName: "",
      donationType: "",
      dose: "",
      quantity: null,
      manufactureDate: "",
      expireDate: "",
    };
  }
  onSubmit(form: NgForm) {
    let data = form.value;
    this.firestore.collection("medicine").add({ ...data, userId: this.userId });
    this.resetForm(form);
    this.toastr.success("Submit Sucessfully", "Medicine Added Sucessfully");
  }
}
