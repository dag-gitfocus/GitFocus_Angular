import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogData } from '../DialogData';
import { GitserviceModule } from '../gitservice/gitservice.module';

@Component({
  selector: 'app-pull-commit-details',
  templateUrl: './pull-commit-details.component.html',
  styleUrls: ['./pull-commit-details.component.css']
})
export class PullCommitDetailsComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<PullCommitDetailsComponent>,private router:Router,private route:ActivatedRoute,private gitService:GitserviceModule,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private ren:Renderer2) {
      let el = document.getElementsByClassName('mat-dialog-container').item(0);
      ren.setStyle(el, 'overflow-y', 'scroll')
    }

  ngOnInit() {

  }

  
  close() {
    this.dialogRef.close();
  }

  
}
