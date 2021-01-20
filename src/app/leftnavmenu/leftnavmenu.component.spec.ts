import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftnavmenuComponent } from './leftnavmenu.component';

describe('LeftnavmenuComponent', () => {
  let component: LeftnavmenuComponent;
  let fixture: ComponentFixture<LeftnavmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftnavmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftnavmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
