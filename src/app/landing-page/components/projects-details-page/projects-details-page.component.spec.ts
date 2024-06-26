import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDetailsPageComponent } from './projects-details-page.component';

describe('ProjectsDetailsPageComponent', () => {
  let component: ProjectsDetailsPageComponent;
  let fixture: ComponentFixture<ProjectsDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
