import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullReviewDetailsComponent } from './pull-review-details.component';

describe('PullReviewDetailsComponent', () => {
  let component: PullReviewDetailsComponent;
  let fixture: ComponentFixture<PullReviewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullReviewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullReviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
