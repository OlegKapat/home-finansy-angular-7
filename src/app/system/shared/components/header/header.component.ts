import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:User;
  date: Date=new Date();
  onLogout(){
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

}
