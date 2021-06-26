import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";
import { auth } from "firebase";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((res) => {
      if (res && res.uid && res.emailVerified) {
        this.router.navigate(["/user"]);
      } else {
        console.log("user not logged in");
      }
    });
  }

  onSubmit() {
    if (this.email === "admin" && this.password === "admin") {
      this.router.navigate(["/dashboard"]);
    } else {
      this.authService
        .login(this.email, this.password)
        .then((res) => {
          console.log(res);
          if (res.user.emailVerified) {
            this.router.navigate(["/user"]);
          } else {
            res.user.sendEmailVerification();
            this.toastr.error("Email not verified", "Please verify email");
          }
          console.log("login sucess");
        })
        .catch((err) => {
          console.log("Error found");
        });
    }
  }

  googleSigninViaRedirect() {
    this.afAuth.auth
      .signInWithRedirect(new auth.GoogleAuthProvider())
      .then((userdata) => {
        this.router.navigate(["/user"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  facebookSignViaRedirect() {
    this.afAuth.auth
      .signInWithRedirect(new auth.FacebookAuthProvider())
      .then((userData) => {
        this.router.navigate(["/user"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  githubSigninViaRedirect() {
    this.afAuth.auth
      .signInWithRedirect(new auth.GithubAuthProvider())
      .then((userData) => {
        this.router.navigate(["/user"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
