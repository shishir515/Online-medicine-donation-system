import { AngularFirestore } from "@angular/fire/firestore";
import { MedicineService } from "../../../shared/medicine.service";
import { Component, OnInit } from "@angular/core";
import { Medicine } from "src/app/shared/medicine.model";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-viewmedicine",
  templateUrl: "./viewmedicine.component.html",
  styleUrls: ["./viewmedicine.component.css"],
})
export class ViewmedicineComponent implements OnInit {
  list: Medicine[];
  approveMedicine = [];
  surveys2: Observable<any>;
  userId: string;
  constructor(
    private service: MedicineService,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.service.getMedicine().subscribe((actionArray) => {
      this.list = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Object),
        } as Medicine;
      });
    });
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this Medicine")) {
      this.firestore.doc("medicine/" + id).delete();
      this.toastr.warning("Deleted Sucessfully", "Medicine Delete");
    }
  }
}
