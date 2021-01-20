import { KeycloakConfig } from 'keycloak-angular';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const keycloakConfig = {
//   url: 'http://13.234.254.213:8080/auth',
//   realm: 'DAG',
//   clientId: 'GitFocus'
// };

export const environment = {
  production: false,
  baseUrl: "http://aeb160d8d5ea747d880bae8ee6c804ff-885478276.ap-south-1.elb.amazonaws.com:8888/gitfocus/"
  //baseUrl: "http://localhost:8888/gitfocus/",
  //baseUrl: "http://localhost:2100/gitfocus/",
  //baseUrl: "http://ec2-13-126-135-17.ap-south-1.compute.amazonaws.com:2100/gitfocus/"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
