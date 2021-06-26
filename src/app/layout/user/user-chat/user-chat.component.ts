import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-user-chat",
  templateUrl: "./user-chat.component.html",
  styleUrls: ["./user-chat.component.css"],
})
export class UserChatComponent implements OnInit {
  loggedInUser: string;
  pictureUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.loggedInUser = res.displayName;
        this.pictureUrl = res.photoURL;
      } else {
        console.log("user not logged in");
      }
    });
  }

  onlogout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
