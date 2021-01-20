import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullDetailsComponent } from './pull-details.component';

describe('PullDetailsComponent', () => {
  let component: PullDetailsComponent;
  let fixture: ComponentFixture<PullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
