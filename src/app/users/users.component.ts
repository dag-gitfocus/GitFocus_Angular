import { Component, OnInit } from '@angular/core';
import { GitserviceModule } from '../gitservice/gitservice.module';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user:string='';
  repo:string='';
  branch:string='';
  userList:any;
  map=new Map<String, String[]>();
  branchList:any;
  datas:any;
  public pieChartLabels= [];
  public pieChartData =[];
  dataArray=[];
  labelArray=[];
  buChartData=false;
  public pieChartLabels1= [];
  public pieChartData1 =[];
  dataArray1=[];
  labelArray1=[];
  buChartData1=false;
  constructor(private gitService:GitserviceModule) { 
  }
  ngOnInit() {
    this.gitService.getDistinctUsers().subscribe((out)=>{
      this.userList = out;
     });
  }

  getRepoAndBranchListSpecificToUser(){
    this.repo='';
    this.branch='';
    this.gitService.getRepoAndBranchListSpecificToUser(this.user).subscribe((output)=>{
      this.map = output;
    });
  }

  getBranchDetails(){
    this.branch='';
 this.branchList=this.map[this.repo];

  }
  public pieChartType = 'pie';
  chartOptions = {
    responsive: true
   
  };
  public Colors=   [
    {
      backgroundColor: [
        //'rgba(0, 148, 97, 1)',
        'rgba(46, 149, 28,1)',
        'rgba(167, 10, 34,1)',
        'rgba(255,165,0,1)',
        'rgba(241, 39, 160,1)'
    ]
    }
  ];
  public pieChartType1 = 'pie';
  chartOptions1 = {
    responsive: true
   
  };
  public Colors1=   [
    {
      backgroundColor: [
        'rgb(49, 231, 13,1)',
        'rgba(218, 21, 24,1)'
    ]
    }
  ];
  getUserCommitDetails(){
    this.buChartData = false;
    this.dataArray=[];
    this.labelArray =[];

    this.buChartData1 = false;
    this.dataArray1=[];
    this.labelArray1 =[];
   
    if(this.branch!=''){  
      this.gitService.getUserCommitDetails(this.user,this.repo,this.branch).subscribe((result)=>{
        this.datas  = result;

      for (let data of this.datas.datas) {
        this.dataArray.push(data);
      }
      this.pieChartData = this.dataArray;
      for (let data of this.datas.lables) {
        this.labelArray.push(data);
      }
      this.pieChartLabels = this.labelArray;
      this.buChartData = true;

      for (let data1 of this.datas.datas1) {
        this.dataArray1.push(data1);
      }
      this.pieChartData1 = this.dataArray1;
      for (let data1 of this.datas.lables1) {
        this.labelArray1.push(data1);
      }
      this.pieChartLabels1 = this.labelArray1;
      this.buChartData1 = true;
      });
    }
  }
}
