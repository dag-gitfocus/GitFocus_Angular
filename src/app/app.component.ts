import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
//import { KeycloakService } from '../app/utils/keycloak.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private isSideNavCollapsed: boolean = false;
  title = 'angular-app';

  OnSideNavChange(flag) {
    this.isSideNavCollapsed = flag;
  }

  ngOnInit() {
    
  }
 /* constructor(private router: Router) {
    router.events.forEach(element => {
        if (element instanceof NavigationStart && 
           (element.url === '/secure-route-1' || 
            element.url === '/secure-route-2')) {
  
          if (!KeycloakService.auth.loggedIn) {
               KeycloakService.init().then(() => {})
                  .catch(() => window.location.reload());
             }
        }
    });
  } */
}
