import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitserviceModule { 
  baseUrl = environment.baseUrl;
  commitDetails:any;
  userCommitDetails: any;
  constructor(private http : HttpClient) { }
  getRepoList(): Observable<any>
  {  
	  return this.http.get(this.baseUrl + 'getRepoMasterDetails');
  }
  getUserList(repoName: string):Observable<any>
  {  
    return this.http.get(this.baseUrl + 'getUserDetails/'+repoName); 
  }
  getDailyUserCommit(userName: string,repoName: string,commitDate:string,branchName:string):Observable<any>
  {  
    return this.http.get(this.baseUrl + 'getDailyUserCommitList/'+userName+'/'+repoName+'/'+commitDate+'/'+branchName); 
  }
  

 getCommitCountWeek(repoName: string,userName: string,timePeriod :string): Observable<any>
  {  
    return this.http.get(this.baseUrl + 'getCommitCountWeek/'+ repoName +'/' +userName +'/' + timePeriod);
  } 
getDistinctUsers(): Observable<any>
{  
  return this.http.get(this.baseUrl + 'getDistinctUsers');
}
getRepoAndBranchListSpecificToUser(userName: string):Observable<any>
{  
  return this.http.get(this.baseUrl + 'getRepoAndBranchListSpecificToUser/' +userName);
}
/*getUserCommitDetails(userName: string,repoName: string,branchName:string):Observable<any>
{  
  return this.http.get(this.baseUrl + 'getUserCommitDetails/' + userName +'/'+ repoName +'/'+ branchName);
}*/
getCommitCountByEndDate(repoName: string,userName: string,timePeriod :string, toDate :String,branchName:String): Observable<any>
{  
  return this.http.get(this.baseUrl + 'getCommitCountByEndDate/'+ repoName +'/' +userName +'/' + timePeriod +'/'+ toDate + '/'+ branchName); 
}
getBranchListSpecificToRepo(repoName: string):Observable<any>
{  
  return this.http.get(this.baseUrl + 'getBranchListSpecificToRepo/' +repoName);
}
getPullCount(repoName: string,userName: string,timePeriod :string, toDate :String,branchName:String): Observable<any>

{  
  return this.http.get(this.baseUrl + 'getPullCount/'+ repoName +'/' +userName +'/' + timePeriod +'/'+ toDate + '/'+ branchName); 
  
}

getPullRequest(repoName: string,fromDate :string, toDate :string): Observable<any>{
  
  return this.http.get('./assets/pullcount.json');   //  (this.baseUrl + 'getPullRequest/'+ repoName +'/'+'2020-02-14/2020-03-14'); 
//  return this.http.get(this.baseUrl + 'getPullRequest/'+ repoName +'/' + 2020-02-14/2020-03-14 +'/'+ toDate); 
}

getDailyUserPull(userName: string,repoName: string,commitDate:string,branchName:string):Observable<any>
{  
  return this.http.get(this.baseUrl + 'getDailyUserPullList/'+userName+'/'+repoName+'/'+commitDate+'/'+branchName); 
}
//new services below



getTeamList(unit: string):Observable<any>
{  
  return this.http.get(this.baseUrl + 'getTeams/'+unit); 
}

getTeamRepo(team: string):Observable<any>
{  
  return this.http.get(this.baseUrl + 'getRepoNames/'+team); 
}

getTeamMember(teamMember: string):Observable<any>
{  
  return this.http.get(this.baseUrl + 'getTeamMembers/'+teamMember); 
}

getTeamCommitDetails(teamName: string,repoName: string,period: string, endDate: string):Observable<any>{

  return this.http.get(this.baseUrl + 'getDateBasedCommitDetailsForTeamMembers/'+ teamName +'/'+repoName+'/'+period+'/'+endDate); 

}
getUserCommitDetails(repoName: string,userId: string, endDate: string):Observable<any>{
  return this.http.get(this.baseUrl + 'getCommitDetailOnDateForMemebers/'+repoName+'/'+userId+'/'+endDate); 
  // return this.http.get('./assets/commitdetails.json'); 
}


getTeamPullDetails(teamName: string,repoName: string,period: string, endDate: string):Observable<any>{

  return this.http.get(this.baseUrl + 'getpullrequestcount/'+ teamName +'/'+repoName+'/'+period+'/'+endDate); 

}

getUserPullDetails(repoName: string,userId: string, endDate: string):Observable<any>{
  return this.http.get(this.baseUrl + 'getPullDetailsOnDateForTeamMemeber/'+repoName+'/'+userId+'/'+endDate); 
  // return this.http.get('./assets/commitdetails.json'); 
}

getDailyMemberCommitList(repoName: string,userId: string, commitDate: string):Observable<any>{
  return this.http.get(this.baseUrl + 'getDailyMemberCommitList/'+repoName+'/'+userId+'/'+commitDate); 
  
}
commitListInfo(commDetails:any){
  this.userCommitDetails=commDetails;
    }
    getCommitList(){
      return this.userCommitDetails;
    }
    getPullCommitdetails(pullNo: string,branchName: string,repoName: string,id: string):Observable<any>{
      return this.http.get(this.baseUrl + 'getPullCommitDetailBasedOnPR/'+ pullNo+'/'+branchName+'/'+repoName+'/'+id); 
      // return this.http.get(this.baseUrl + 'getPullCommitDetailBasedOnPR/pullNo/sprint5/TRDashboardService_NormalizedDB/id'); 
    }
  //  http://localhost:8080/gitfocus/getPullCommitDetailBasedOnPR/7/sprint5/TRDashboardService_NormalizedDB/1

  getPullReviewCount(teamName: string,repoName: string,period: string, endDate: string):Observable<any>{
    return this.http.get(this.baseUrl + 'getDateBasedReviewDetailsForTeamMembers/'+ teamName+'/'+repoName+'/'+period+'/'+endDate); 
    // return this.http.get(this.baseUrl + 'getPullCommitDetailBasedOnPR/pullNo/sprint5/TRDashboardService_NormalizedDB/id'); 
  }

  getPullReviewDetails(repoName: string,userId: string, endDate: string):Observable<any>{
    return this.http.get(this.baseUrl + 'getReviewDetailOnDateForMemebers/'+repoName+'/'+userId+'/'+endDate); 
    
  }
}

