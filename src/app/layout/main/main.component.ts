import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/shared/medicine.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { UserService } from 'src/app/shared/user.service';
import { NgoService } from 'src/app/shared/ngo.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  listOfUsers = [];
  listOfMedicines = [];
  listOfNgos = [];
  listofVistors = [];
  numberOfUsers: number;
  numberOfMedicines: number;
  numberOfNgos: number;
  numberofVistors: number;
  constructor(
    private service: UserService,
    private firestore: AngularFirestore,
    private medicineService: MedicineService,
    private ngoService: NgoService) { }

  ngOnInit() {
    this.getNumberOfUser();
    this.getNumberOfMedicine();
    this.getNumberOfNgo();
    this.getNumberofVistors();
  }

  //Getting total number of users
  getNumberOfUser() {
    this.service.getUser().subscribe(value => {
      value.map(item => {
        const data = item.payload.doc.data();
        this.listOfUsers.push(data);
      });
      this.numberOfUsers = this.listOfUsers.length;
    });
  }

  getNumberOfMedicine() {
    this.medicineService.getApproveMedicine().subscribe(value => {
      value.map(item => {
        const data = item.payload.doc.data();
        this.listOfMedicines.push(data);
      });
      this.numberOfMedicines = this.listOfMedicines.length;
    });
  }

  getNumberOfNgo() {
    this.ngoService.getNgo().subscribe(value => {
      value.map(item => {
        const data = item.payload.doc.data();
        this.listOfNgos.push(data);
      });
      this.numberOfNgos = this.listOfNgos.length;
    });
  }

  getNumberofVistors() {
    this.medicineService. getMedicine().subscribe(value => {
      value.map(item => {
        const data = item.payload.doc.data();
        this.listofVistors.push(data);
      });
      this.numberofVistors = this.listofVistors.length;
    });
  }

}
