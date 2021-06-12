import { NGO } from "./../../dashboard/add-ngo/ngo.model";
import {
  AngularFirestoreModule,
  AngularFirestore,
} from "@angular/fire/firestore";
import { MedicineService } from "./../../../shared/medicine.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-addmedicine",
  templateUrl: "./addmedicine.component.html",
  styleUrls: ["./addmedicine.component.css"],
})
export class AddmedicineComponent implements OnInit {
  ngoList = [];
  DonationType = ["NGO", "Individual", "Pharmacy"];
  constructor(
    public service: MedicineService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.resetForm();
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
    this.firestore.collection("medicine").add(data);
    this.resetForm(form);
    this.toastr.success("Submit Sucessfully", "Medicine Added Sucessfully");
  }
}
