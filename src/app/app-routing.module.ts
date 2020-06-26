import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { HomeComponent } from "./home/home.component";
import { UserDataComponent } from "./user-data/user-data.component";
import { AuthGuard } from "./Autorization/auth.guard";

const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },

  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegistrationComponent },
  { path: "userdata", component: UserDataComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
