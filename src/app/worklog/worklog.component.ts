import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { GitserviceModule } from '../gitservice/gitservice.module';
import { Router, ActivatedRoute, OutletContext } from '@angular/router';
import { CommitDetailsComponent } from '../commit-details/commit-details.component';
import {MatDialog} from '@angular/material/dialog';
import { setupTestingRouter } from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { PullDetailsComponent } from '../pull-details/pull-details.component';
import { PullCommitDetailsComponent } from '../pull-commit-details/pull-commit-details.component';
import { PullReviewDetailsComponent } from '../pull-review-details/pull-review-details.component';


@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css']
})
export class WorklogComponent implements OnInit {
  
  pull:any;
  sumAll:any;
  sumLegacy:any;
  teams:string='1001';
  flag: string;
  teamList: any;
  repoList: any;
  //teamrepo: string='12345';
  tName: string;
  //tMembers:string='12345';
  teamMembers:any=[];
 // teamName:string;
  team:any = "";
  repo:any="";
  tPeriod:any="";
  eDate:any;
  users:any=[];
  dates:any=[];
  commit: any;
  count:any;
  lineAdded:any;
  fileAdded:any;
  linesModified:any;
  linesRemoved:any;
  userId:any;
  userCommit:any;
  cMessage:any;
  branchName:any;
  pullNos:any;
  mergeStatus:any;
  pUser:any;
  pullLength;any;
  pullCommits:any;
  commitDate:any;
  result:any;
  clickedUser:any;
  clickedDate:any;
 
  
  @ViewChild('myChart', { static: true }) private myChart;
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;
  
  color: any;
  dialogResult: any;


  public bubbleChartData: ChartDataSets[] = [
    { data: [], label: "Commit" },
    { data: [], label: "Pull Request" },
  ];
  selectedValue: any;
  commiDate: any;
  bubbleflag: string;
  commitMessageArray: any;
  timeperiod: string;
  endDate: string;
  user: string;
  unit: string;
  worklogflag: string;
  prCount: any;
  commitCount: any;
  reviewCount: any;
  review: any;
  pullNo: any;
  commentDate: any;
  reviewedAt: any;
  reviewedBy: any;
  reviewComment: any;
  state: any;
  reviewDate: any;
 

  constructor(private gitService: GitserviceModule,public dialog: MatDialog, private route: ActivatedRoute, private router: Router){
    
    
  }
 
  
  
 
  ngOnInit() {

   
       this.flag = this.route.snapshot.paramMap.get('flag');
    if (this.flag != null) {
      this.team=this.route.snapshot.paramMap.get('team'); 
      this.repo=this.route.snapshot.paramMap.get('repo'); 
      this.timeperiod=this.route.snapshot.paramMap.get('timeperiod'); 
      this.endDate=this.route.snapshot.paramMap.get('endDate'); 
     
    } 
    this.getTeamList();
    this.getTeamMembers();
     
    this.worklogflag = this.route.snapshot.paramMap.get('worklogflag');
    if (this.worklogflag != null) {
      this.teams = this.route.snapshot.paramMap.get('teams');
      this.getTeamList();
      this.user = this.route.snapshot.paramMap.get('user');
      this.team=this.route.snapshot.paramMap.get('team'); 
      this.getTeamRepoDetails();
      this.repo = this.route.snapshot.paramMap.get('repo');
      this.commitDate = this.route.snapshot.paramMap.get('commDate');
      this.endDate = this.route.snapshot.paramMap.get('endDate');
      this.timeperiod = this.route.snapshot.paramMap.get('timeperiod');
      this.getCommitDetails();
    }
    
   
     }
     getToday(): string {
      return new Date().toISOString().split('T')[0]
      }
  getTeamList(){
    this.gitService.getTeamList(this.teams).subscribe((teamdata) => {
      this.teamList = teamdata.map(item=>item[1]);    
      console.log("teamList",this.teamList);
     
    });
    this.getTeamRepoDetails();

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

  setTeam(selectedteam:string){ 
    this.teamList = selectedteam;
    
    this.getTeamRepoDetails();
    
   

  }
 

  openPullDialog(repo,pullNos,branchName,createdTime,mergeStatus,pUser,pullCommits,pullLength) {
   
    const dialogRef = this.dialog.open(PullDetailsComponent, {
      
      height:'500px',width: '800px',
     
      data: {
        repo,pullNos,branchName,createdTime,mergeStatus,pUser,pullCommits,pullLength
      }
    });
      
    dialogRef.afterClosed().subscribe(result => {
     
      this.dialogResult = result;
    });
  }
   
    openPullReviewDialog(repo,pullNo,reviewDate,reviewedBy,pullLength,reviewComment,state,reviewedAt) {
   
      const dialogRef = this.dialog.open(PullReviewDetailsComponent, {
        
        height:'500px',width: '800px',
       
        data: {
          repo,pullNo,reviewDate,reviewedBy,pullLength,reviewComment,state,reviewedAt
        }
      });

    
    dialogRef.afterClosed().subscribe(result => {
     
      this.dialogResult = result;
    });
  }

 
  public bubbleChartOptions: ChartOptions = {}
  
  elements: {
    point: {
      hitRadius: 0,
      hoverRadius: 2,
      hoverBorderWidth: 0,
      borderWidth: 2,

      
  }
  
  };
 
 
  

async getCommitDetails(){
  if(this.team && this.repo && this.timeperiod && this.endDate){
 
  const out:any= await this.gitService.getTeamCommitDetails(this.team,this.repo,this.timeperiod,this.endDate).toPromise();
  console.log("OUT***",out);
    this.users = ["",...new Set(out.map(item => item.user))];
    this.dates = ["",...new Set(out.map(item => item.commitDate))];
    console.log("this.dates",this.dates);
   

    let commitData = [];
    this.dates.forEach((commitDate, x) => {
      
      this.users.forEach((commitUser, y) => {
      
        let {commitCount=0} = out.find(item => item.user == commitUser && item.commitDate == commitDate) || {};
        this.commitCount=commitCount;
        commitData.push({x, y, r: Number(this.commitCount)*4, commitUser, commitDate,commitCount});
        
     });
    });

   this.bubbleChartData[0]=
      
      {
        
        data:commitData,label: "Commit",
        pointStyle: 'circle',
        backgroundColor:"#ff6384",
        hoverBackgroundColor: "#ff6384",
      };
     
    
   
        
    this.commit = out;  
   
    

    const out1:any=await this.gitService.getTeamPullDetails(this.team,this.repo,this.timeperiod,this.endDate).toPromise();
console.log("pull****",out1);

    
  this.users = ["",...new Set(out1.map(item => item.user))];
  this.dates = ["",...new Set(out1.map(item => item.prCreatedDate))];
  
 

  let pullData = [];
  this.dates.forEach((prCreatedDate, x) => {
   
    this.users.forEach((pullUser, y) => {
     
      let {prCount=0} = out1.find(item => item.user == pullUser && item.prCreatedDate == prCreatedDate) || {};
      console.log("pull****",out1.find(item => item.user == pullUser && item.prCreatedDate == prCreatedDate))
      this.prCount=prCount;
      pullData.push({x, y, r: Number(this.prCount)*4,pullUser,prCreatedDate,prCount });
	  // pullData.push({x, y, r: Number(1)*4,pullUser,prCreatedDate,prCount });
    
   });
  });
  
  this.bubbleChartData[1] = 
    
    
    {
      
      data: pullData,label: "Pull Request",
      pointStyle: 'rect',
      backgroundColor:"#2ECC71",
      hoverBackgroundColor: "#2ECC71",
      
    };
  this.pull = out1;  
 

  
  const out2:any= await this.gitService.getPullReviewCount(this.team,this.repo,this.timeperiod,this.endDate).toPromise();
   console.log("PR Review",out2);
    this.users = ["",...new Set(out.map(item => item.user))];
    this.dates = ["",...new Set(out.map(item => item.commitDate))];
   
   

    let reviewData = [];
    this.dates.forEach((commitDate, x) => {
      
      this.users.forEach((reviewUser, y) => {
      
        let {commitCount=0} = out2.find(item => item.user == reviewUser && item.commitDate == commitDate) || {};
        this.reviewCount=commitCount;
        reviewData.push({x, y, r: Number(this.reviewCount)*4, reviewUser, commitDate,commitCount});
        
     });
    });

   this.bubbleChartData[2]=
      
      {
        
        data:reviewData,label: "PR Review",
        pointStyle: 'triangle',
        backgroundColor:"#1534F7",
        hoverBackgroundColor: "#1534F7",
      };
     
    
   
        
    this.review = out2;  
   
  
this.bubbleChartOptions={
  responsive: true,
  legend: {
    display: true,
    
    labels: {
      fontSize: 12,
      fontFamily: 'Tahoma',
      fontStyle: 'bold',
      boxWidth: 10,
      
    }
  },
  
 tooltips: {
  position: 'nearest',
  backgroundColor: 'white',
  bodyFontColor: 'black',
  borderColor: '#999',
  borderWidth: 1,
  caretPadding: 15,
  displayColors: false,
  enabled: true,
  intersect: false,
  mode: 'single',
  titleFontColor: '#999',
  titleMarginBottom: 10,
  xPadding: 10,
  yPadding: 10,
  callbacks: {
    label: function(tooltipItem, data)  {
      var element: string;
      var userName: string;
      var cDate: string;
      var cCount: string;
      var dateValueToDisplay: any;
      var commitValueToDisplay: any;
      var userNameToDisplay: any;
      var returnValue: any;
      var dataPoint = new Object(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
      
     
      if (dataPoint.hasOwnProperty('commitUser')) {
      cDate = dataPoint['commitDate'];
      userName = dataPoint['commitUser'];
      cCount=dataPoint['commitCount'];
      if (userName != '') {
        userNameToDisplay = "User : " + userName;
        dateValueToDisplay="Date :" +cDate;
        commitValueToDisplay="Commit:"+ cCount;
        returnValue = [userNameToDisplay, dateValueToDisplay, commitValueToDisplay];
      }
      else {
        returnValue = returnValue = [dateValueToDisplay, commitValueToDisplay];
      }
    }
      if (dataPoint.hasOwnProperty('pullUser')) {
        cDate = dataPoint['prCreatedDate'];
        userName = dataPoint['pullUser'];
        cCount=dataPoint['prCount'];
        if (userName != '') {
          userNameToDisplay = "User : " + userName;
          dateValueToDisplay="Date :" +cDate;
          commitValueToDisplay="Pull:"+ cCount;
          returnValue = [userNameToDisplay, dateValueToDisplay, commitValueToDisplay];
        }
        else {
          returnValue = returnValue = [dateValueToDisplay, commitValueToDisplay];
        }
    }

    if (dataPoint.hasOwnProperty('reviewUser')) {
      cDate = dataPoint['commitDate'];
      userName = dataPoint['reviewUser'];
      cCount=dataPoint['commitCount'];
      if (userName != '') {
        console.log('User',userName);
        userNameToDisplay = "User : " + userName;
        dateValueToDisplay="Date :" +cDate;
        commitValueToDisplay="Review:"+ cCount;
        returnValue = [userNameToDisplay, dateValueToDisplay, commitValueToDisplay];
      }
      else {
        returnValue = returnValue = [dateValueToDisplay, commitValueToDisplay];
      }
    }
return returnValue
       
    },
    labelTextColor: function (tooltipItem, chart) {
      if (tooltipItem.datasetIndex == 0) {
        return '#ff6384';
      }
      if(tooltipItem.datasetIndex == 1)  {
        return '#2ECC71';
      }
      if(tooltipItem.datasetIndex == 2){
        return '#1534F7';
       }

    },
    title: function (tooltipItems, dataValue) {

      var index = tooltipItems[0].index;
      var datasetIndex = tooltipItems[0].datasetIndex;
      var result;
      if (datasetIndex == 0) {
        result = 'Commit Details';
      }
       if(datasetIndex == 1){
        result = 'Pull Request Details';
      }
       if(datasetIndex == 2){
        result = 'PR Review Details';
      }
      
      return result;
    },


  },


  },
  elements: {
    point: {
      hitRadius: 0,
      hoverRadius: 2,
      hoverBorderWidth: 0,
      borderWidth: 2,

     radius: function (context) {
        var index = context.dataIndex;
        console.log("var index",index);
        var data = context.dataset.data[index];  
        console.log("var data",data);
        var size = context.chart.width;
        console.log("var size****",size);
        
        var base = Math.abs(data.this.commitCount) / 50;
        if (data.commitCount > 0) {
          base = Math.abs(data.this.commitCount) / 50;
        }
        if (data.prCount > 0) {
          base = Math.abs(data.this.prCount) / 50;
        }

        if (data.this.commitCount == 1 || data.this.commitCount == 2 || data.this.prCount == 1 || data.this.prCount == 2) {
          base = 0.05;
        }
        return Math.round((size / 10) * base);
      }
    }
  },
  onClick: (event, item:any) => {
    if (item.length == 0)
      return;
    let clickedItem  = item[0]._chart.config.data.datasets[0].data[item[0]._index];
    this.clickedUser=clickedItem.commitUser;
    this.clickedDate=clickedItem.commitDate;
   
    let inputData = item[0]["_options"].pointStyle; 

    this.teams = '1001';
    console.log("Click CommitDate",this.result);
    console.log("teams",this.teams);
    console.log("team",this.team);
    console.log("time",this.timeperiod);
    console.log("User",this.clickedUser);
    console.log("Repo",this.repo);
    console.log("Date",this.clickedDate);

    
      
  
  if (inputData == 'circle') {

    this.router.navigate(['dailyusercommitlist',this.teams,this.team,this.timeperiod,this.endDate, this.clickedUser, this.repo, this.clickedDate]);
  
    
    
      }
       
     
      if (inputData == 'rect') {
        this.gitService.getUserPullDetails(this.repo,clickedItem.commitUser,clickedItem.commitDate).subscribe((out) => {
  
          
          this.branchName=out[0].branchName;
          
          this.pullNos=out[0].pullNo;
          
          this.pullLength=out[0].pullNo.length
          
          this.pullCommits=out[0].commitCount
         
          this.pUser=out[0].user;
         
          this.mergeStatus=out[0].merged;
          
       
          this.openPullDialog(this.repo,this.pullNos,this.branchName,out[0].createdTime,this.mergeStatus,this.pUser,this.pullCommits,this.pullLength);
        });
        
        }

    
    if (inputData == 'triangle') {
      this.gitService.getPullReviewDetails(this.repo,clickedItem.commitUser,clickedItem.commitDate).subscribe((out1) => {

        console.log('pull review details',out1)
        
        this.pullNo=out1[0].pullNUmber;
        this.reviewDate = out1[0].reviewDate;
        this.reviewedAt = out1[0].reviewedAt;
        this.reviewedBy = out1[0].userName
        this.reviewComment = out1[0].reviewComment
        this.pullLength=out1[0].pullNUmber.length
        this.state=out1[0].state;
        console.log('this.pullNo',this.pullNo);
        console.log('this.reviewedAt',this.reviewedAt);
        console.log('this.reviewedBy',this.reviewedBy);
        console.log('this.reviewComment',this.reviewComment);
        console.log('this.PullLength',this.pullLength);

        
        this.openPullReviewDialog(this.repo,this.pullNo,this.reviewDate,this.reviewedBy,this.pullLength,this.reviewComment,this.state,this.reviewedAt);
      });
      
      }

    },
  scales: {
    xAxes: [{ 
      ticks: {
        fontFamily: 'Tahoma',
        fontStyle: 'bold',
        stepSize: 1,
        max:this.dates.length,
        callback: value => this.dates[value]
          },
      gridLines: {
        
        display: true
      },
      
     
        
      
    }],
    yAxes: [{
      ticks: {
        fontFamily: 'Tahoma',
        fontStyle: 'bold',
        max:this.users.length,
        
        callback: value => this.users[value]
      },
      gridLines: {
        
        display: true
      }
    }]
  }
};

  }

}

ConvertToInt(val){
  return parseInt(val);
}

 


 

}