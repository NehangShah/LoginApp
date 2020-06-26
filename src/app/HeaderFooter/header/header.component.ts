import { Component, OnInit } from '@angular/core';
 import { HttpServiceService} from '../../Services/http-service.service'
import { Router} from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  constructor(private service:HttpServiceService,private router:Router) { }

  ngOnInit(): void {
  }


  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
}
}
