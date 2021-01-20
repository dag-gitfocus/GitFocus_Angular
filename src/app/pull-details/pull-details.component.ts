import { Component, OnInit, ViewChild,Inject, Renderer2 } from '@angular/core';
import { Color } from 'ng2-charts';
import { GitserviceModule } from '../gitservice/gitservice.module';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { PullReviewDetailsComponent } from '../pull-review-details/pull-review-details.component';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../DialogData';
import { PullCommitDetailsComponent } from '../pull-commit-details/pull-commit-details.component';
@Component({
  selector: 'app-pull-details',
  templateUrl: './pull-details.component.html',
  styleUrls: ['./pull-details.component.css']
})
export class PullDetailsComponent implements OnInit {

  Commitcount: any;
  userName: string;
  Commitcount_data: any;
  userlist: any;
  BarChart: any;
  barChartOptions: any;
  today :any;
  user: string;
  time: string;
  repo: string;
  repoList: any;
  result: any;
  barChartLabels: any[];
  barChartType: string;
  barChartLegend: boolean;

  flag: string;
  bubbleflag: string;
  commDate: string;
  selectedValue: string;
  @ViewChild('mychart', { static: true }) mychart;
  branch:string='';
  map=new Map<String, String[]>();
  branchList:any;
  userList:any;

  
  public barChartData: any[] = [
    //{ data: [], label: "Commit" },
    { data: [], label: "Pull Request" },
  ]
  
  public barChartColors: Color[] = [
    // { backgroundColor: 'red' },
    { backgroundColor: 'blue' }
  ]

  barflag: any;
  
  endDate: string;
  fromDate:string;

  name: string;
  color: string;
  thisDialogRef: any;
  // dialog: any;
  dialogResult: any;
  pullCommit: any;
  pullCommitDate: any;
  pullCommitDetails: any;
  pullCommitDetailsByStatus: {};
  totalFilesAdded: any;
  totalLegacy: any;
  sum: any;

    constructor( public dialog: MatDialog,public dialogRef: MatDialogRef<PullDetailsComponent,PullCommitDetailsComponent>,private router:Router,private route:ActivatedRoute,private gitService:GitserviceModule,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private ren:Renderer2) {
        let el = document.getElementsByClassName('mat-dialog-container').item(0);
        ren.setStyle(el, 'overflow-y', 'scroll')
      }
  
      close() {
        this.dialogRef.close();
      }
  

  ngOnInit() {
    
     

    this.gitService.getRepoList().subscribe((repodata) => {
      this.repoList = repodata;    
    });

    this.flag = this.route.snapshot.paramMap.get('flag');
    if (this.flag != null) {
      
      this.repo=this.route.snapshot.paramMap.get('repo');  
      this.fromDate = this.route.snapshot.paramMap.get('fromDate');  
      this.endDate = this.route.snapshot.paramMap.get('endDate');
      
    }

  this.bubbleflag = this.route.snapshot.paramMap.get('bubbleflag');
    if (this.bubbleflag != null) {
      this.user = this.route.snapshot.paramMap.get('user');
      this.repo = this.route.snapshot.paramMap.get('repo');
      // this.getUserList();
      // this.getBranchListSpecificToRepo();
      // this.commDate = this.route.snapshot.paramMap.get('commDate');
      
      // this.branch = this.route.snapshot.paramMap.get('branch');*/
      // this.getCommitCountDetailsWeek();
    }
    

  }
  
  getToday(): string {
    return new Date().toISOString().split('T')[0]
    }
  
  getUserList() {
    this.gitService.getUserList(this.repo).subscribe((res) => {
      this.userlist = res;
    });
  }

  setRepo(selectedrepo: string) {
    this.repo = selectedrepo;
  }

  showDailyActivity() {
    // this.commDate = this.result[this.selectedValue].day;
    this.router.navigate(['pulldetails', this.repo,this.fromDate,this.endDate]);

  } 


  
  createArray(count = 0) {
    return new Array(Number(count));
  }

  
  commitClick(prNo,branch,repo,commitID,user){
    console.log("branch****",branch);
    this.gitService.getPullCommitdetails(prNo,branch,repo,commitID).subscribe((out) => {
      console.log("OUT",out)
      console.log("branch****",branch);
      this.pullCommit=out;
      this.pullCommitDate=this.pullCommit[0].commitDate;
      this.totalFilesAdded=this.pullCommit[0].totalFilesAdded;
      this.totalLegacy=this.ConvertToInt(this.pullCommit[0].totalLinesAdded)+this.ConvertToInt(this.pullCommit[0].totalLinesRemoved)
      this.sum=this.totalFilesAdded+this.totalLegacy;
      
      let pullCommitDetailsByStatus = {};
    
    this.pullCommit[0].fileNameArray.forEach((file, index) => {
      if(pullCommitDetailsByStatus[this.pullCommit[0].fileStatusArray[index]]) {
        pullCommitDetailsByStatus[this.pullCommit[0].fileStatusArray[index]].push({
          file,
          lineAdded: this.pullCommit[0].linesAddedArray[index],
          linesRemoved: this.pullCommit[0].linesRemovedArray[index]
        })
      } else {
        pullCommitDetailsByStatus[this.pullCommit[0].fileStatusArray[index]] = [{
          file,
          lineAdded: this.pullCommit[0].linesAddedArray[index],
          linesRemoved: this.pullCommit[0].linesRemovedArray[index]
        }]
      }
    })
      console.log("pullCommitDetailsByStatus",pullCommitDetailsByStatus);
      this.pullCommitDetailsByStatus = pullCommitDetailsByStatus;
      
    this.openPullCommitDialog(user,branch,this.pullCommitDate,this.pullCommitDetailsByStatus,this.totalFilesAdded,this.totalLegacy,this.sum);
    });
  }

  openPullCommitDialog(user,branch,pullCommitDate,pullCommitDetailsByStatus,totalFilesAdded,totalLegacy,sum) {
   
    const dialogRef = this.dialog.open(PullCommitDetailsComponent, {
      
      height:'500px',width: '800px',
     
      data: {
        user,branch,pullCommitDate,pullCommitDetailsByStatus,totalFilesAdded,totalLegacy,sum

      }
    });
   
    dialogRef.afterClosed().subscribe(result => {
     
      this.dialogResult = result;
    });
  }

  ConvertToInt(val){
    return parseInt(val);
  }


}

