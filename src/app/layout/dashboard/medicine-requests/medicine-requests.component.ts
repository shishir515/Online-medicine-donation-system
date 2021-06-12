import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";
import { Medicine } from "src/app/shared/medicine.model";
import { MedicineService } from "src/app/shared/medicine.service";
import { MedicineRequest } from "src/app/shared/medicinerequest.model";

@Component({
  selector: "app-medicine-requests",
  templateUrl: "./medicine-requests.component.html",
  styleUrls: ["./medicine-requests.component.css"],
})
export class MedicineRequestsComponent implements OnInit {
  list: MedicineRequest[];
  p: number = 1;
  constructor(
    private service: MedicineService,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) {}
  ngOnInit() {
    this.service
      .getMedicineRequestsByStatus("pending")
      .subscribe((actionArray) => {
        this.list = actionArray.map((item) => {
          return {
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as Object),
          } as MedicineRequest;
        });
      });
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this Medicine Request")) {
      this.firestore.doc("medicine-requests/" + id).delete();
      this.toastr.warning("Deleted Sucessfully", "Medicine Delete");
    }
  }
  onApprove(data: MedicineRequest) {
    console.log(data);
    if (confirm("Are you sure to Approve this Medicine Request")) {
      this.service
        .getApproveMedicineByNameAndQuantity(data.medicineName, data.quantity)
        .subscribe(async (actionArray) => {
          console.log(actionArray);
          if (actionArray.docs.length == 0) {
            this.toastr.error("Not enough in stock", "Stock lacking");
            return;
          }
          const e = actionArray.docs.map((item) => {
            return {
              id: item.id,
              ...(item.data() as Object),
            } as MedicineRequest;
          });
          console.log(e);
          // if (e?.length < 1) return;
          console.log(e);
          const selected = e[0];
          console.log(selected);
          if (Number(selected.quantity) > Number(data.quantity)) {
            await this.firestore.doc("approvedmedicine/" + selected.id).update({
              quantity: Number(selected.quantity) - Number(data.quantity),
            });

            await this.firestore
              .doc("medicine-requests/" + data.id)
              .update({ status: "completed" });
            this.toastr.success("Approve Sucessfully", "Medicine Approved");
          }
          if (Number(selected.quantity) == Number(data.quantity)) {
            await this.firestore
              .doc("approvedmedicine/" + selected.id)
              .delete();

            await this.firestore
              .doc("medicine-requests/" + data.id)
              .update({ status: "completed" });
            this.toastr.success("Approve Sucessfully", "Medicine Approved");
          }
          if (Number(selected.quantity) < Number(data.quantity)) {
            this.toastr.error("Not enough in stock", "Stock lacking");
            return;
          }
        });

      //  this.firestore
      // .doc("medicine-requests/" + id)
      // .update({ status: "completed" })
      // .then((data) => {
      //   console.log(data);
      //   this.firestore
      //     .doc("approved-medicine")
      //     .update({ status: "completed" });
      // })
      // .catch((data) => console.log(data));
      // this.toastr.success("Approve Sucessfully", "Medicine Approved");
    }
  }
}
