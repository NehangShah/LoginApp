import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "../Helper/must-match.validator";
import { Employee } from "../modal/modal";
import { HttpServiceService } from "../Services/http-service.service";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  loading = false;
  EmployeeData: Employee[];
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: HttpServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    document.getElementById("UName").focus();
    this.pageload();
    this.form = this.formBuilder.group(
      {
        UserName: ["", [Validators.required, Validators.maxLength(15)]],
        FirstName: ["", [Validators.required, Validators.maxLength(30)]],
        LastName: ["", [Validators.required, Validators.maxLength(30)]],
        Email: ["", [Validators.required, Validators.email]],
        Password: ["", [Validators.required, Validators.minLength(6)]],
        CPassword: ["", [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: MustMatch("Password", "CPassword"),
      }
    );
  }

  pageload() {
    this.service
      .GetCall(`${environment.apiUrl}/Employee`)
      .subscribe((data: Employee[]) => {

        if (!this.service.isEmpty(data)) {
          this.EmployeeData = data;
          // this.service.showSuccess("Data Received Success !!", "Success")
        } else {
          this.service.showWarning("No Record Found !!", "Opps !");
        }
      });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    var EmployeeClass = {
      FirstName: this.f.FirstName.value.toLowerCase(),
      UserName: this.f.UserName.value.toLowerCase(),
      LastName: this.f.LastName.value,
      Email: this.f.Email.value.toLowerCase(),
      Password: this.f.Password.value,
      token: "faketoken",
    };

    this.service
      .PostCall(`${environment.apiUrl}/Employee`, EmployeeClass)
      .subscribe((data: Employee) => {

        this.service.showSuccess("Registerd Successful !!", "Success");
        this.router.navigate(["/login"]);

      });
  }

  OnBlur(Flag: string) {
    if (Flag == "U") {
      for (var i = 0; i < this.EmployeeData.length; i++) {
        if (
          this.f.UserName.value.toLowerCase() == this.EmployeeData[i].UserName
        ) {
          this.service.showWarning("User Name Already Used. please provide another one !!", "Opps !!");
          document.getElementById("UName").focus();
          return false;
        }
      }
    }

    if (Flag == "E") {
      for (var i = 0; i < this.EmployeeData.length; i++) {
        if (
          this.f.Email.value.toLowerCase() == this.EmployeeData[i].Email
        ) {
          this.service.showWarning("Email Already Used. please provide another one !!", "Opps !!");
          document.getElementById("Email").focus();
          return false;
        }
      }
    }
  }
}
