import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from '@angular/common';
// import { environment } from '@envi';
// import { environment } from '../../environments/environment';
@Injectable({
  providedIn: "root",
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {

  }

  GetCall(apiUrl) {
    console.log(apiUrl);
    return this.httpClient.get(`${apiUrl}`);
  }

  PostCall(apiUrl, data) {
    console.log(apiUrl);
    console.log(data);

    return this.httpClient.post(`${apiUrl}`, data);
  }

  POSTCallWithHeader(apiUrl, data, Headers) {
    console.log(apiUrl);
    console.log(data);
    return this.httpClient.post(`${apiUrl}`, data, Headers);
  }


  logedIn() {
    return !!localStorage.getItem("User");
  }

  logout() {
    // remove user from local storage to log user out

    localStorage.removeItem("User");
  }

  isEmpty(value: any) {
    return (
      value === undefined ||
      value === "" ||
      value == "" ||
      value === null ||
      value !== value
    );
  }

  //NOTOFICATION PART STARTED

  showSuccess(message, title) {
    this.toastr.success(message, title);
  }

  showError(message, title) {
    this.toastr.error(message, title);
  }

  showInfo(message, title) {
    this.toastr.info(message, title);
  }

  showWarning(message, title) {
    this.toastr.warning(message, title);
  }

  // Date Formater Method

  getDateFormatted(date: string) {
    return new DatePipe('en-IN').transform(date, 'dd-MM-yyyy');
}
}
