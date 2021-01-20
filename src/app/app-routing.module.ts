import { NgModule } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { BubbleComponent } from './bubble/bubble.component';
import { CommitDetailsComponent } from './commit-details/commit-details.component';
import { UsersComponent } from './users/users.component';
import { PullDetailsComponent } from './pull-details/pull-details.component';
import { PullReviewDetailsComponent } from './pull-review-details/pull-review-details.component';
import { WorklogComponent } from './worklog/worklog.component';
import { HomeComponent } from './home/home.component';
//import { AuthGuard } from './utils/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'worklog', component: WorklogComponent },
  { path: 'worklog/:unit/:team/:repo/:timeperiod/:endDate/:worklogflag', component: WorklogComponent },
  { path: 'projecttimeline', component: BubbleComponent },
  { path: 'dailyusercommitlist/:teams/:team/:timeperiod/:endDate/:user/:repo/:commitDate', component: BubbleComponent },
  { path: 'repositories', component: RepositoriesComponent },
  { path: 'commitdetails/:user/:repo/:commDate/:time/:endDate/:branch', component: CommitDetailsComponent },
  { path: 'userdetails', component: UsersComponent },
  { path: 'pullrequests', component: PullDetailsComponent },
  { path: 'pullrequests/:repo/:fromDate/:endDate/:flag', component: PullDetailsComponent },
  { path: 'pulldetails/:repo/:fromDate/:endDate', component: PullReviewDetailsComponent},
  { path: 'sessiontimeout', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
