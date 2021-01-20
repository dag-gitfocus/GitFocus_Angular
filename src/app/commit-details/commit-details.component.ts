import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GitserviceModule } from '../gitservice/gitservice.module';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogData } from '../DialogData';

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.component.html',
  styleUrls: ['./commit-details.component.css']
})
export class CommitDetailsComponent implements OnInit {
  commitDetails:any;
  commDate:string;
  user:string;
  repo:string='TRDashboardUI_NormalizedDB';
  time:string;
  showDetail=false;
  isDetailPage =false;
  isBriefPage=false;
  public linesModifiedSum=0;
  public linesAddedSum=0;
  public linesRemovedSum=0;
  public fileModifiedSum=0;
  public fileAddedSum=0;
  public fileRenamedSum=0;
  public fileRemovedSum=0;
  public userName;
  public commitMessage;
  endDate;
  public muniqs;
  public auniqs;
  public runiqs;
  public renamedArray: Array<string> = [];
  public modifiedArray: Array<string> = [];
  public addedArray: Array<string> = [];
  public mlinesAddedArray:Array<string> = [];
  public mlinesRemovedArray:Array<string> = [];
  public alinesAddedArray:Array<string> = [];
  public alinesRemovedArray:Array<string> = [];
  public addedfile;
  public addedlines;
  public removedlines;
  public modified="modified";
  public added="added";
  public renamed="renamed";
  public value=0;
  branch: any;
  commitList: any;
  team:string='frontend';
  repoList: any;
  teamMembers: any;
 abc:any;
 
  color: any;
  thisDialogRef: any;
    constructor( private dialogRef: MatDialogRef<CommitDetailsComponent>,private router:Router,private route:ActivatedRoute,private gitService:GitserviceModule,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private ren:Renderer2) {
        let el = document.getElementsByClassName('mat-dialog-container').item(0);
        ren.setStyle(el, 'overflow-y', 'scroll')
      }
     

    // constructor(private router:Router,private route:ActivatedRoute,private gitService:GitserviceModule,public thisDialogRef: MdDialogRef<MyDialogComponent>, @Inject(MD_DIALOG_DATA) public data: string) { }
   
  ngOnInit() {    
    this.getTeamMembers();
    this.getTeamRepoDetails();


    // this.getCommitDetails();
  /*  this.user=this.route.snapshot.paramMap.get('user');
    this.repo=this.route.snapshot.paramMap.get('repo');
    this.commDate=this.route.snapshot.paramMap.get('commDate');
    this.endDate=this.route.snapshot.paramMap.get('endDate');
    this.time=this.route.snapshot.paramMap.get('time');
    this.branch=this.route.snapshot.paramMap.get('branch');
    this.commitDetails=this.gitService.getCommitList();
   
    this.userName=this.commitDetails.userId;
    this.commitMessage=this.commitDetails.commitMessage;
    this.linesAdded();
    this.linesRemoved();
    this.filesModified();
    this.filesAdded()
    this.filesRenamed()
    this.fileModifiedStatus();
    this.fileAddedStatus();
    this.fileRenamedStatus();*/


   
 }
 close() {
  this.dialogRef.close();
}
  


  back(){
    this.router.navigate(['dailyusercommitlist',this.user,this.repo,this.commDate,this.time,this.endDate,this.branch]);
    } 

    onclickMore(){
      this.isDetailPage=true;
      this.showDetail=true;
    
        }

       

        

//         linesRemoved() {       
//             this.linesRemovedSum+=this.commitDetails.linesRemovedArray.reduce((s, t) => Number(s) + Number(t), 0);          
//         }

//         linesAdded() {
        
//           this.linesAddedSum+=this.commitDetails.linesAddedArray.reduce((s, t) => Number(s) + Number(t), 0);
         
  
//         }
      
//         filesModified(){
          
         
          
//           var arr = this.commitDetails.fileStatusArray;
//          this. muniqs = arr.reduce((acc, val) => {
         
//             acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
//             return acc;
//           },
//            {});
//            if(this.muniqs.modified==undefined){
//             this.fileModifiedSum;
           
//           }
//           else{
//           this.fileModifiedSum+=this.muniqs.modified;
         
//            }
       
// }

// filesAdded(){
          
//   var auniqs;
  
//   var arr = this.commitDetails.fileStatusArray;
//  auniqs = arr.reduce((acc, val) => {
//     acc[val] = acc[val] === undefined ? 1 : acc[val] += 1,0;
//     return acc;
//   }, {});
 
//   if(auniqs.added==undefined){
//     this.fileAddedSum;
   
//   }else{
//   this.fileAddedSum+=auniqs.added;
 
//   }


// }
// filesRenamed(){
     
//   var arr = this.commitDetails.fileStatusArray;
//  this.runiqs = arr.reduce((acc, val) => {
//     acc[val] = acc[val] === undefined ? 1 : acc[val] += 1,0;
//     return acc;
//   }, {});
 
//   if(this.runiqs.renamed==undefined){
//     this.fileRenamedSum;
 
//   }else{
//   this.fileRenamedSum+=this.runiqs.renamed;
 
//   }
 


// }

// fileModifiedStatus(){
//   var arr = this.commitDetails.fileStatusArray;
//   this. muniqs = arr.reduce((acc, val) => {
    
//      acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
//      return acc;
//    },
//     {});
   
//       for (var i = 0; i < this.muniqs.modified; i++)
//       {
//         var marra=this.commitDetails.fileNameArray[i];

//   this.modifiedArray.push(marra);       
//   var larra=this.commitDetails.linesAddedArray[i];
//   this.mlinesAddedArray.push(larra);
//   var rarra=this.commitDetails.linesRemovedArray[i];
//   this.mlinesRemovedArray.push(rarra);

//    this.modified;//="modified";  
//       }   
     
// }

// fileAddedStatus(){
//   var arr = this.commitDetails.fileStatusArray;
//   this. auniqs = arr.reduce((acc, val) => {
    
//      acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
//      return acc;
//    },
//     {});
    
//       for (var i = 0; i < this.auniqs.added; i++){
   
//    var aarra=this.commitDetails.fileNameArray[i];

//    this.addedArray.push(aarra);       
//    var larra=this.commitDetails.linesAddedArray[i];
//    this.alinesAddedArray.push(larra);
//    var rarra=this.commitDetails.linesRemovedArray[i];
//    this.alinesRemovedArray.push(rarra);

//    this.added;//="added";
//       }
      
      
     
// }

// fileRenamedStatus(){
//   var arr = this.commitDetails.fileStatusArray;
//   this.runiqs = arr.reduce((acc, val) => {
    
//      acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
//      return acc;
//    },
//     {});

    
//       for (var i = 0; i < this.runiqs.renamed; i++){
   
//    var rarra=this.commitDetails.fileNameArray[i];

//    this.renamedArray.push(rarra);       
  

//    this.renamed;//="renamed";
//       }
      
      
     
// }


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

/*getCommitDetails(){
  this.gitService.getTeamCommitDetails(this.team,this.repo).subscribe((repodata) => {
   
    this.commitList = repodata;
    console.log("getCommitDetails",this.commitList);
    console.log("user",this.commitList.userId[1])
  });
}*/
 

}
