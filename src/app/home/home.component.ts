import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HttpServiceService } from "../Services/http-service.service";
import { Employee } from "../modal/modal";
import { environment } from "src/environments/environment";
import { HttpErrorResponse } from "@angular/common/http";
// import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  id: number;
  User: any;
  EmployeeRow = <Employee>{};
  constructor(
    private service: HttpServiceService // private accountService: AccountService, // private alertService: AlertService
  ) {}

  ngOnInit(): void {

    this.User = JSON.parse(localStorage.getItem("User"));
    this.id = this.User.id;
    setTimeout(() => {
      this.GetEmployeeData();
    }, 10);
  }

  GetEmployeeData() {
    this.service
      .GetCall(`${environment.apiUrl}/Employee?id=${this.id}`)
      .subscribe((data: Employee) => {
        this.EmployeeRow = data[0];
      });
  }
}
