import { Component, OnInit } from "@angular/core";
import { HttpServiceService } from "../Services/http-service.service";
import { environment } from "src/environments/environment";
import { Employee } from "../modal/modal";
@Component({
  selector: "app-user-data",
  templateUrl: "./user-data.component.html",
  styleUrls: ["./user-data.component.css"],
})
export class UserDataComponent implements OnInit {
  // games = [
  //   {
  //     id: "1",
  //     name: "Employee 1",
  //     genre: "EMP001",
  //   },
  //   {
  //     id: "2",
  //     name: "Employee 2",
  //     genre: "EMP002",
  //   },
  //   {
  //     id: "3",
  //     name: "Employee 3",
  //     genre: "EMP003",
  //   },
  //   {
  //     id: "4",
  //     name: "Employee 4",
  //     genre: "EMP004",
  //   },
  //   {
  //     id: "5",
  //     name: "Employee 5",
  //     genre: "EMP005",
  //   },
  //   {
  //     id: "6",
  //     name: "Employee 6",
  //     genre: "EMP006",
  //   },
  //   {
  //     id: "7",
  //     name: "Employee 7",
  //     genre: "EMP007",
  //   },
  //   {
  //     id: "8",
  //     name: "Employee 8",
  //     genre: "EMP008",
  //   },
  //   {
  //     id: "9",
  //     name: "Employee 9",
  //     genre: "EMP009",
  //   },
  //   {
  //     id: "10",
  //     name: "Employee 10",
  //     genre: "EMP010",
  //   },
  // ];
  EmployeeData: Employee[];
  constructor(private service: HttpServiceService) {}
  filter: string;
  key: string = "name"; //set default
  reverse: boolean = false;
  p: number = 1;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.pageload();
  }

  pageload() {
    this.service
      .GetCall(`${environment.apiUrl}/Employee`)
      .subscribe((data: Employee[]) => {
        console.log("Call Successed");
        console.log(data);

        if (!this.service.isEmpty(data)) {
          this.EmployeeData = data;
          // this.service.showSuccess("Data Received Success !!", "Success")
        } else {
          this.service.showWarning("No Record Found !!", "Opps !");
        }
      });
  }
}
