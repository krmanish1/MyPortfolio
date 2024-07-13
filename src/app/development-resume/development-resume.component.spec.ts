import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentResumeComponent } from './development-resume.component';

describe('DevelopmentResumeComponent', () => {
  let component: DevelopmentResumeComponent;
  let fixture: ComponentFixture<DevelopmentResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevelopmentResumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevelopmentResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
