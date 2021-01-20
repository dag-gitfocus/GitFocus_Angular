import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { GitserviceModule } from '../gitservice/gitservice.module';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CommitDetailsComponent } from '../commit-details/commit-details.component';
import { PullCommitDetailsComponent } from '../pull-commit-details/pull-commit-details.component';
@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css']
})
export class BubbleComponent implements OnInit {
  repo: string = '';
  clickedUser: string = '';
  commitDate: string = '';
  userCommitDetails: any;
  pullRequestDetails: any;
  showChart: boolean = false;
  All: string = 'All';
  flag: string;
  time: string;
  index: any;
  // fileNameArray:any;
  fileStatusArray:any;
  linesAddedArray:any;
  linesRemovedArray:any
  public fileAddedSum=0;
  public fileRenamedSum=0;
  public fileRemovedSum=0;
  public muniqs;
  public auniqs;
  public renamedArray: Array<string> = [];
  public modifiedArray: Array<string> = [];
  public addedArray: Array<string> = [];
  public mlinesAddedArray:Array<string> = [];
  public mlinesRemovedArray:Array<string> = [];
  public alinesAddedArray:Array<string> = [];
  public alinesRemovedArray:Array<string> = [];
  commitData: {
    x: number;
    y: number;
    commit: number;
    userId: string;
  }[] = [];

  /*pullRequestData: {
    x: number;
    y: number;
    pullRequest: number;
    userId: string;
  }[] = [];*/

  data2: any;

  @ViewChild('myChart', { static: true }) private myChart;

  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;
  endDate: string;
  branch: string;
  pullRequestData: any;
  tPeriod: string;
  clickedDate: any;
  lineAdded: any;
  fileAdded: any;
  linesModified: any;
  linesRemoved: any;
  sumAll: any;
  sumLegacy: any;
  dialogResult: any;
  commitMessageArray: any;
  fileNameArra: any;
  totalLinesAdded: any;
  totalLinesRemoved: any;
  team: string;
  timeperiod: string;
  unit: any;
  teams: string;
  eDate: string;
  
  fileModifiedSum: any;
  
  public modified;
  added: string;
  commitDetailsByStatus: {};
  branchName: any;

  constructor(private gitService: GitserviceModule,public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {

  }

  public bubbleChartData: ChartDataSets[] = [
    { data: [], label: "Commit" }
    //{ data: [], label: "Pull Request" },
  ];

  public bubbleChartOptions: ChartOptions = {

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

    elements: {
      point: {
        hitRadius: 0,
        hoverRadius: 2,
        hoverBorderWidth: 0,
        borderWidth: 2,

        radius: function (context) {
        var index = context.dataIndex;
          var data = context.dataset.data[index];         
          var size = context.chart.width;
          // console.log("data.commit",data.commit);
          var base = Math.abs(data.commit) / 50;
          if (data.commit > 0) {
            base = Math.abs(data.commit) / 50;
          }
          if (data.pullRequest > 0) {
            base = Math.abs(data.pullRequest) / 50;
          }

          if (data.commit == 1 || data.commit == 2 || data.pullRequest == 1 || data.pullRequest == 2) {
            base = 0.05;
          }
          return Math.round((size / 10) * base);
        }
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
        label: function (item, data) {
          var element: string;
          var userName: string;
          var xLabelValue: number;
          var xValue: number;
          var xIntValue;
          var xDecimalValue;
          var fileValueToDisplay: any;
          var commitValueToDisplay: any;
          var userNameToDisplay: any;
          var returnValue: any;
          var xLableStringValue = new Number(item.xLabel);
          xLabelValue = xLableStringValue.valueOf();
          xIntValue = Math.floor(xLabelValue).toFixed(2);
          xDecimalValue = (xLabelValue - xIntValue).toFixed(2);
          var dataPoint = new Object(data.datasets[item.datasetIndex].data[item.index]);
          if (dataPoint.hasOwnProperty('commit')) {
            element = dataPoint['commit'];
            userName = dataPoint['userId'];

            fileValueToDisplay = "Total Files : " + element;
            commitValueToDisplay = "Time : " + Math.round(xIntValue) + ":" + xDecimalValue.substring(xDecimalValue.indexOf(".") + 1, xDecimalValue.length);

            if (userName != '') {
              userNameToDisplay = "User : " + userName;
              returnValue = [userNameToDisplay, fileValueToDisplay, commitValueToDisplay];
            }
            else {
              returnValue = returnValue = [fileValueToDisplay, commitValueToDisplay];
            }
          }

          if (dataPoint.hasOwnProperty('pullRequest')) {
            element = dataPoint['pullRequest'];
            userName = dataPoint['userId'];

            fileValueToDisplay = "Total Commits : " + element;
            commitValueToDisplay = "Time : " + Math.round(xIntValue) + ":" + xDecimalValue.substring(xDecimalValue.indexOf(".") + 1, xDecimalValue.length);

            if (userName != '') {
              userNameToDisplay = "User : " + userName;
              returnValue = [userNameToDisplay, fileValueToDisplay, commitValueToDisplay];
            }
            else {
              returnValue = returnValue = [fileValueToDisplay, commitValueToDisplay];
            }
          }

          return returnValue;
        },
        labelTextColor: function (tooltipItem, chart) {
          if (tooltipItem.datasetIndex == 0) {
            return 'red';
          }
          else {
            return 'blue';
          }

        },
        title: function (tooltipItems, dataValue) {

          var index = tooltipItems[0].index;
          var datasetIndex = tooltipItems[0].datasetIndex;
          var result;
          if (datasetIndex == 0) {
            result = 'Commit Details';
          }
          else {
            result = 'Pull Request Details';
          }
          return result;
        },


      },

    },
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 24,
          stepSize: 1,
          fontSize: 10,
          fontFamily: 'Verdana',
          fontStyle: 'bold',
          autoSkip: false,
          callback: value => {
            if (value == '0') {
              value = '00';
            }
            if (value.toString().length == 1) {
              return '0' + value + ':00';
            }
            else if (value.toString().length == 2) {
              return value + ':00';
            }

          }

        },
        gridLines: {
          color: "#E5E5E5",
          lineWidth: 2,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 8,
          stepSize: 1,
          display: false,
          fontSize: 30,
        },
        gridLines: {
          display: false
        }
      }]

    },

    onClick: (event, item:any) => {
      if (item.length == 0)
        return;

    let clickedItem  = item[0]._chart.config.data.datasets[0].data[item[0]._index];
    console.log('clickedItem',clickedItem);
    this.clickedUser=clickedItem.userId;
    console.log("onclick",this.clickedUser)
 
     var xValue: any;
      var commitValue: any;
      let indexValue = item[0]["_index"];
      let inputData = item[0]["_options"].pointStyle;  
   

      if (inputData == 'circle') {
        xValue = item[0]["_chart"].data.datasets[0].data[indexValue].x;
        commitValue = item[0]["_chart"].data.datasets[0].data[indexValue].commit;
        this.getUserList(indexValue, xValue, commitValue);
      
       
    
      }

    

    }
  };

  public bubbleChartColors: Array<any> = [
    { // grey
      backgroundColor: 'red',
      borderColor: "#fff",
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: 'rgba(255,99,132,1)',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      pointStyle: 'circle',
    },
    { // grey
      backgroundColor: 'blue',
      borderColor: "#fff",
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: 'rgba(255,99,132,1)',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      pointStyle: 'rectRounded',
    },
  ];



  ngOnInit() {
    this.clickedUser = this.route.snapshot.paramMap.get('user');
    this.repo = this.route.snapshot.paramMap.get('repo');
    this.commitDate = this.route.snapshot.paramMap.get('commitDate');
    this.teams=this.route.snapshot.paramMap.get('teams'); 
    this.team=this.route.snapshot.paramMap.get('team'); 
    this.repo=this.route.snapshot.paramMap.get('repo'); 
    this.timeperiod=this.route.snapshot.paramMap.get('timeperiod'); 
    this.endDate=this.route.snapshot.paramMap.get('endDate'); 
    
    this.getDailyUserCommit();
   
  }

  async getDailyUserCommit() {

    const out=await this.gitService.getDailyMemberCommitList(this.repo,this.clickedUser,this.commitDate).toPromise();
    // const out = await this.gitService.getDailyUserCommit(this.user, this.repo, this.commDate, this.branch).toPromise();
    
    this.userCommitDetails = out;
    
    console.log("this.commitDetails",this.userCommitDetails);

    
    /*const out1 = await this.gitService.getDailyUserPull(this.user, this.repo, this.commDate, this.branch).toPromise();
    
    this.pullRequestDetails = out1;*/
   
    // var userName = this.clickedUser.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');      
    this.data2 = [];
    let j = 0;
    let xIntValue;
    let xValueMap = new Map();

    if (this.userCommitDetails != '') {
      
      for (let result of this.userCommitDetails) {
        var xLableStringValue = new Number(result.x);
        var xLabelValue = xLableStringValue.valueOf();
        xIntValue = Math.floor(xLabelValue).toFixed(2);
        if (xValueMap.size == 0) {
          xValueMap.set(xIntValue, j);
        }
        if (xValueMap.has(xIntValue)) {
          j = xValueMap.get(xIntValue);
          j = j + 1;
          xValueMap.set(xIntValue, j);
        }
        else {
          j = 1;
          xValueMap.set(xIntValue, j);
        }
        console.log("x value",result.x)
        console.log("fileNameArray",result.totalFileCount);
        console.log("userId",result.userId);
        // this.commitData.push({  x: 1, y: 1, commit: 4, userId: "fff" });
        this.commitData.push({ x: result.x, y: j, commit:result.totalFileCount, userId: result.userId })
        
      }
    }
    else{
      this.commitData = [{ x: -1, y: -1, commit: 0, userId: "" }];
    }
   
    this.bubbleChartData[0].data = this.commitData;
    console.log("this.commitData*****",this.commitData);
   /* if (this.pullRequestDetails != '') {
      
      for (let result of this.pullRequestDetails) {
        var xLableStringValue = new Number(result.x);
        var xLabelValue = xLableStringValue.valueOf();
        xIntValue = Math.floor(xLabelValue).toFixed(2);
        if (xValueMap.size == 0) {
          xValueMap.set(xIntValue, j);
        }
        if (xValueMap.has(xIntValue)) {
          j = xValueMap.get(xIntValue);
          j = j + 1;
          xValueMap.set(xIntValue, j);
        }
        else {
          j = 1;
          xValueMap.set(xIntValue, j);
        }

        this.pullRequestData.push({ x: result.x, y: j, pullRequest: result.commitCount, userId: result.userId });
      }
    }
    else{
      this.pullRequestData = [{ x: 0, y: 0, pullRequest: 0, userId: "" }];
    }
    this.bubbleChartData[1].data = this.pullRequestData;*/
    this.showChart = true;
    
  }


  
    openDialog(clickedUser,commitDate,sumAll,repo,sumLegacy,commitDetailsByStatus,branchName) {
   
    const dialogRef = this.dialog.open(CommitDetailsComponent, {
      
      height:'500px',width: '800px',
     
      data: {
        clickedUser,commitDate,sumAll,repo,sumLegacy,commitDetailsByStatus,branchName     //muniqs,auniqs,modifiedArray,mlinesAddedArray,mlinesRemovedArray,addedArray,alinesAddedArray,alinesRemovedArray
      }
    });
   
    dialogRef.afterClosed().subscribe(result => {
     
      this.dialogResult = result;
    });
  }




  ConvertToInt(val){
    return parseInt(val);
  }
  
  getUserList(indexValue, xValue, commitValue) {
   
    this.gitService.commitListInfo(this.userCommitDetails[indexValue]);
    console.log("UserCommitDetails",this.userCommitDetails);
    
    console.log("commitDate",this.commitDate);
    this.clickedUser=this.userCommitDetails[indexValue].userId;
    this.lineAdded=this.userCommitDetails[indexValue].linesAddedArray;
    console.log("lines added",this.lineAdded);
    
    this.linesRemoved=this.userCommitDetails[indexValue].linesRemovedArray;
    this.fileNameArra = this.userCommitDetails[indexValue].fileNameArray;
    this.totalLinesAdded = this.userCommitDetails[indexValue].totalLinesAdded;
    this.totalLinesRemoved =this.userCommitDetails[indexValue].totalLinesRemoved;
    this.fileStatusArray=this.userCommitDetails[indexValue].fileStatusArray;
    this.branchName=this.userCommitDetails[indexValue].branchName;
   
    
    this.sumAll=this.ConvertToInt(this.totalLinesAdded)+this.ConvertToInt(this.totalLinesRemoved);
        
    this.sumLegacy=this.ConvertToInt(this.totalLinesAdded)+this.ConvertToInt(this.totalLinesRemoved);
    
    let commitDetailsByStatus = {};
    
    this.userCommitDetails[indexValue].fileNameArray.forEach((file, index) => {
      if(commitDetailsByStatus[this.userCommitDetails[indexValue].fileStatusArray[index]]) {
        commitDetailsByStatus[this.userCommitDetails[indexValue].fileStatusArray[index]].push({
          file,
          lineAdded: this.userCommitDetails[indexValue].linesAddedArray[index],
          linesRemoved: this.userCommitDetails[indexValue].linesRemovedArray[index]
        })
      } else {
        commitDetailsByStatus[this.userCommitDetails[indexValue].fileStatusArray[index]] = [{
          file,
          lineAdded: this.userCommitDetails[indexValue].linesAddedArray[index],
          linesRemoved: this.userCommitDetails[indexValue].linesRemovedArray[index]
        }]
      }
    })
console.log('commitDetailsByStatus' ,commitDetailsByStatus);
this.commitDetailsByStatus = commitDetailsByStatus;

    this.openDialog(this.clickedUser,this.commitDate,this.sumAll,this.repo,this.sumLegacy,this.commitDetailsByStatus,this.branchName);

  }

  back() {
    console.log('back :' ,this.teams,this.team,this.repo,this.timeperiod,this.endDate);
    this.router.navigate(['worklog',this.teams,this.team,this.repo,this.timeperiod,this.endDate,'true']);
  }

 


}