import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from "../Services/http-service.service";
import { environment } from "src/environments/environment";
import { Employee } from "../modal/modal";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  EmployeeRow = <Employee>{};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: HttpServiceService
  ) {

  }

  ngOnInit() {
    document.getElementById("Uname").focus();
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    var Email: string;
    if (this.form.invalid) {
      return;
    }
    if (this.f.username.value.includes("@")) {

      Email = "Email";
    }
    else {
      Email = "FirstName";
    }


    this.service
      .GetCall(
        `${
          environment.apiUrl
        }/Employee?${Email}=${this.f.username.value.toLowerCase()}&Password=${
          this.f.password.value
        }`
      )
      .subscribe((data: Employee) => {


        if (!this.service.isEmpty(data)) {
          this.EmployeeRow = data[0];
          this.service.showSuccess("Login Successful !!", "Success");


          localStorage.setItem("User", JSON.stringify(data[0]));
          this.router.navigate(["/home"]);
        } else {
          // alert("Username or Password is incorrect !!");
          this.service.showWarning(
            "Username or Password is incorrect !!",
            "Opps !"
          );
        }
      });
  }
}
