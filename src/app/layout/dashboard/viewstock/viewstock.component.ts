import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/shared/medicine.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Medicine } from 'src/app/shared/medicine.model';

@Component({
  selector: 'app-viewstock',
  templateUrl: './viewstock.component.html',
  styleUrls: ['./viewstock.component.css']
})
export class ViewstockComponent implements OnInit {
  list: Medicine[];
  p: number = 1;
  userFilter: any = { medicineName: '' };
  constructor(
    private service: MedicineService,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.service.getApproveMedicine().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Medicine;
      })
    })
  }

}
