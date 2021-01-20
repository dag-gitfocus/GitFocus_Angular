import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullCommitDetailsComponent } from './pull-commit-details.component';

describe('PullCommitDetailsComponent', () => {
  let component: PullCommitDetailsComponent;
  let fixture: ComponentFixture<PullCommitDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullCommitDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullCommitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
