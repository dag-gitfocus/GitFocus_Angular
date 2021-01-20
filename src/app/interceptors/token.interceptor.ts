// import { Injectable, Injector, Inject } from '@angular/core';
// import {
//     HttpRequest,
//     HttpHandler,
//     HttpEvent,
//     HttpInterceptor
// } from '@angular/common/http';
// import { KeycloakService } from '../utils/keycloak.service';
// import { Observable, config } from 'rxjs';




// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//     constructor(private kcService: KeycloakService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         let authToken = '';

//         authToken = this.kcService.getToken() || '';

//         request = request.clone({
//             setHeaders: {
//                 'Authorization': 'Bearer ' + authToken,
//                'Content-Type': 'application/x-www-form-urlencoded',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET', 
//             }
//         });
//         return next.handle(request);
//     }
// }