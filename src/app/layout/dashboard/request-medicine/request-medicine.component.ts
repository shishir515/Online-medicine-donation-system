import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/shared/medicine.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Medicine } from 'src/app/shared/medicine.model';

@Component({
  selector: 'app-request-medicine',
  templateUrl: './request-medicine.component.html',
  styleUrls: ['./request-medicine.component.css']
})
export class RequestMedicineComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {

  }

}
