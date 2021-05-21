import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  loggedInUser: string;
  pictureUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.loggedInUser = res.displayName;
        this.pictureUrl = res.photoURL;
      } else {
        console.log('user not logged in');
      }
    });
  }

  onlogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
