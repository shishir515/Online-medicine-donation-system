import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/shared/medicine.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Medicine } from 'src/app/shared/medicine.model';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  list: Medicine[];
  p: number = 1;
  constructor(
    private service: MedicineService,
    private toastr: ToastrService,
    private firestore: AngularFirestore) { }
  ngOnInit() {
    this.service.getMedicine().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Medicine;
      });
    });
  }

  onDelete(id: string){
    if (confirm('Are you sure to delete this Medicine')) {
      this.firestore.doc('medicine/' + id).delete();
      this.toastr.warning('Deleted Sucessfully', 'Medicine Delete');
    }
  }
  onApprove(id: string) {
    if (confirm('Are you sure to Approve this Medicine')) {
    this.firestore.doc('medicine/' + id).snapshotChanges().subscribe(value => {
     const value2 = value.payload.data();
     this.firestore.collection('approvedmedicine').add(value2);
     });
    this.toastr.warning('Approve Sucessfully', 'Medicine Approved');
    }
    this.firestore.doc('medicine/' + id).delete();
  }


}
