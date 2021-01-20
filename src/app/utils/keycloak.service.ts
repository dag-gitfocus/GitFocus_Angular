// import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
// import { keycloakConfig } from '../../environments/environment';
// import { TitleCasePipe } from '@angular/common';
// import { tokenName } from '@angular/compiler';
// import { Router } from '@angular/router';

// declare var Keycloak: any;

// declare const keycloakAuth: any

// @Injectable({
//   providedIn: 'root'
// })

// export class KeycloakService {
//   static init() {
//     throw new Error("Method not implemented.");
//   }



//   static auth: any = {};


//   constructor() { }

//  init(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const config = keycloakConfig;
//       KeycloakService.auth.loggedIn = false;
//       const keycloakAuth: any = new Keycloak(config);
//       keycloakAuth.init({ onLoad: "login-required", "checkLoginIframe": false, })
//         .success(() => {
          
//           KeycloakService.auth.loggedIn = true;
          
//           KeycloakService.auth.authz = keycloakAuth;
          
//           KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + '/realms/DAG/protocol/openid-connect/logout?redirect_uri=' +
//             document.baseURI;
//           resolve();
//         })
//         .error((error) => {
//           reject();
//         });
//     });
//   }


    
//   getToken(): string {
//     var token: string;
//     token = KeycloakService.auth.authz.token;
//     if (KeycloakService.auth.authz.token) {
//       KeycloakService.auth.authz
//         .updateToken(100).then(function () {
//           token = KeycloakService.auth.authz.token;
//         }).catch(function () {
//           this.router.navigate(['sessiontimeout']);
//         });
//     }
//     return token;
//   }

//   logout() {
//     KeycloakService.auth.loggedIn = false;
//     KeycloakService.auth.authz = null;
//     window.location.href = KeycloakService.auth.logoutUrl;
//   }

  

//   getTokenStatus(): boolean {
//     return KeycloakService.auth.authz.isTokenExpired;

//   }

//   getUsername(): string {
//     // console.log("username",KeycloakService.auth.authz.tokenParsed.preferred_username)
//     return KeycloakService.auth.authz.tokenParsed.preferred_username;
//   }

//   // getFirstName(): string {
//   //   return this.titlecasePipe.transform(KeycloakService.auth.authz.tokenParsed.given_name);
//   // }

//   // getLastName(): string {
//   //   return this.titlecasePipe.transform(KeycloakService.auth.authz.tokenParsed.family_name);
//   // }

//   getEmail(): string {
//     return KeycloakService.auth.authz.tokenParsed.email;
//   }



// }



