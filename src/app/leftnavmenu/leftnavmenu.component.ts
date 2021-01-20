import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// declare var setNavigation:any;


@Component({
  selector: 'app-leftnavmenu',
  templateUrl: './leftnavmenu.component.html',
  styleUrls: ['./leftnavmenu.component.css']
})
export class LeftnavmenuComponent implements OnInit {
  private isCollapsed: boolean = false;
  private isSelected: boolean = false;

  @Output() sideNavChange = new EventEmitter();
  

  constructor(private router : Router){ }
  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.sideNavChange.emit(this.isCollapsed);
  }
 
 
  ngOnInit() {
   
   
  }

}
