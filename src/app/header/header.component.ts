import { Component, OnInit } from '@angular/core';
//import { KeycloakService } from '../utils/keycloak.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

public userName:string;
public user:string;
upperValue:string;
public logoutURL:String;
  constructor() { }

  ngOnInit() {
    // this.user=this.kcService.getUsername();
    // this.upperValue = this.user; 
    // this.userName = this.upperValue[0].toUpperCase() +  this.upperValue.slice(1); 
    // // console.log("usrName",this.userName);
    // this.logoutURL=KeycloakService.auth.logoutUrl;
    // // console.log("logout",KeycloakService.auth.logoutUrl)
  }
  logout(): void {
    // this.kcService.logout();
  } 
}
