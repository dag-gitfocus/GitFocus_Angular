import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { GitserviceModule } from '../gitservice/gitservice.module';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../DialogData';

@Component({
  selector: 'app-pull-review-details',
  templateUrl: './pull-review-details.component.html',
  styleUrls: ['./pull-review-details.component.css']
})
export class PullReviewDetailsComponent implements OnInit {
  
  color: any;
  thisDialogRef: any;
  team: string;
  repoList: any;
  teamMembers: any;
    constructor( private dialogRef: MatDialogRef<PullReviewDetailsComponent>,private router:Router,private route:ActivatedRoute,private gitService:GitserviceModule,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private ren:Renderer2) {
        let el = document.getElementsByClassName('mat-dialog-container').item(0);
        ren.setStyle(el, 'overflow-y', 'scroll')
      }
     

  ngOnInit() {    
    this.getTeamMembers();
    this.getTeamRepoDetails();

   
 }
 close() {
  this.dialogRef.close();
}
  


  back(){
    //this.router.navigate(['dailyusercommitlist',this.user,this.repo,this.commDate,this.time,this.endDate,this.branch]);
    } 


getTeamRepoDetails() {
    
  this.gitService.getTeamRepo(this.team).subscribe((repodata) => {
   
     this.repoList = repodata;
     console.log("getTeamRepoDetails - repolist",this.repoList);
   
  });

  this.getTeamMembers();


}

getTeamMembers(){
this.gitService.getTeamMember(this.team).subscribe((memberdata)=>{

  this.teamMembers=memberdata
  console.log("teamMembers",this.teamMembers);
});
}

 

}

