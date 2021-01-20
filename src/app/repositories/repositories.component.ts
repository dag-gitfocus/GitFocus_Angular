import { Component, OnInit } from '@angular/core';
import { GitserviceModule } from '../gitservice/gitservice.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
  repoDetails: any;
  constructor(private gitService:GitserviceModule,private route:Router) { }

  ngOnInit() {
    this.gitService.getRepoList().subscribe((out)=>{
      this.repoDetails=out;
       });
  
  }

  showUserDetails(repoName:string){

  this.route.navigate(['dashboard',repoName,'true']);

  }

}
