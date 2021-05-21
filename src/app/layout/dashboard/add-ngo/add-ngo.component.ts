import { Component, OnInit } from '@angular/core';
import { NgoService } from './ngo.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { NGO } from './ngo.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-ngo',
  templateUrl: './add-ngo.component.html',
  styleUrls: ['./add-ngo.component.css']
})
export class AddNGOComponent implements OnInit {
  ngoName: NGO[] = [];
  constructor(
    private ngoService: NgoService,
    private firestore: AngularFirestore,
    private toastor: ToastrService
    ) { }

  ngOnInit() {
    this.ngoName = this.ngoService.getNgo();
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    this.firestore.collection('Ngos').add(value);
    this.toastor.success('NGOs Added', 'NGO Added Sucessfully');
  }

}
