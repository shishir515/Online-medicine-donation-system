import { UserService } from "./../../shared/user.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";

@Component({
  selector: "app-singnup",
  templateUrl: "./singnup.component.html",
  styleUrls: ["./singnup.component.css"],
})
export class SingnupComponent implements OnInit {
  fullName: string;
  email: string;
  address: string;
  password: string;
  phoneNumber: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    public userService: UserService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.authService
      .register(this.email, this.password)
      .then((res) => {
        console.log(res);
        this.router.navigate(["/login"]);
      })
      .catch((err) => {
        console.log("User is not Register");
      });

    let data = form.value;
    console.log(data);
    this.firestore.collection("user").add(data);
    this.resetForm();
    this.toastr.success("Submit Sucessfully", "Register  Sucessfully");
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.userService.formData = {
      id: null,
      fullName: "",
      email: "",
      address: "",
    };
  }

  googleSigninViaPopUp() {
    this.afAuth.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then((userData) => {
        this.toastr.success("Register Sucessfully", "User is signup");
        this.router.navigate(["/user"]);
        console.log(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  facebookSigninViaPopUp() {
    this.afAuth.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then((userData) => {
        console.log(userData);
        this.toastr.success("Register Sucessfully", "User is signup");
      })
      .catch((error) => {
        console.log(error);
        this.toastr.warning("User not Register", "User is not signup");
      });
  }

  githubSigninViaPopUp() {
    this.afAuth.auth
      .signInWithPopup(new auth.GithubAuthProvider())
      .then((userData) => {
        console.log(userData);
        this.toastr.success("Register sucessfully", "User is Signup");
      })
      .catch((error) => {
        console.log(error);
        this.toastr.warning("User not Register", "User is not Sign Up");
      });
  }
}
