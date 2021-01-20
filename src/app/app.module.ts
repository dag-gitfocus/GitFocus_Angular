import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { KeycloakAngularModule } from 'keycloak-angular';

// import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftnavmenuComponent } from './leftnavmenu/leftnavmenu.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { CommitDetailsComponent } from './commit-details/commit-details.component';
import { BubbleComponent } from './bubble/bubble.component';
import { ChartsModule } from 'ng2-charts';
import { UsersComponent } from './users/users.component';
import { PullDetailsComponent } from './pull-details/pull-details.component';
import { PullReviewDetailsComponent } from './pull-review-details/pull-review-details.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material';
import { WorklogComponent } from './worklog/worklog.component';
import { HomeComponent } from './home/home.component';
import { PullCommitDetailsComponent } from './pull-commit-details/pull-commit-details.component';
// import { KeycloakService } from './utils/keycloak.service';
// import { TokenInterceptor } from './interceptors/token.interceptor';
import { utils } from 'protractor';
import { AppConfigService } from 'src/environments/app-config.service';

// export function initializeAppConfig() {
//   // return () => initKeyCloak.init().then();
// }

export function initializeAppConfig(appConfigService: AppConfigService) {
  return () => appConfigService.load().then();
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftnavmenuComponent,
    FooterComponent,
    ErrorComponent,
    RepositoriesComponent,
    CommitDetailsComponent,
    BubbleComponent,
    UsersComponent,
    PullDetailsComponent,
    PullReviewDetailsComponent,
    WorklogComponent,
    HomeComponent,
    PullCommitDetailsComponent

  ],
  entryComponents: [CommitDetailsComponent, PullDetailsComponent, PullCommitDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule

  ],

  providers: [AppConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeAppConfig,
        deps: [AppConfigService],
        multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
