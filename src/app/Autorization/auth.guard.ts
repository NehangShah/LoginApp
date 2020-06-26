import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { HttpServiceService } from "../Services/http-service.service";
HttpServiceService;

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: HttpServiceService // private accountService: AccountService
  ) {}

  canActivate(): boolean {
    if (this.service.logedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
