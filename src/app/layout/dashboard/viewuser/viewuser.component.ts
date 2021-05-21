import { User } from './../../../shared/user.model';
import { UserService } from './../../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {
  list: User[];
  p: number = 1;
  userFilter: any = { fullName: '' };
  constructor(
    private service: UserService,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.service.getUser().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as User;
      })
      const numberUser = this.list.length;
      console.log("The Total Numer of Users" + numberUser);
    })
  }

}
