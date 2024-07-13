import { Component, Input, OnInit } from '@angular/core';
import { ProjectsSectionComponent } from "../projects-section/projects-section.component";
import { LandingpageService } from '../../services/landingpage.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DevelopmentResumeComponent } from '../../../development-resume/development-resume.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ProjectsSectionComponent]
})
export class HomeComponent implements OnInit {

  profileData: any;
  callSource!: string;


  dataToShow: any = {};

  constructor(
    private landingpageservices: LandingpageService,
    private serviceModal: NgbModal,
  ) {

  }

  ngOnInit(): void {


  }

  @Input('childData') set childData({ callSource, profileData }: { callSource: string; profileData: any }) {
    this.profileData = profileData,
      this.callSource = callSource,
      this.dataSource();
    // console.log("profileData:-", this.profileData);

  }

  dataSource() {
    this.dataToShow = {
      bio: this.profileData.shortBio,
      profileImg: this.profileData.profilePhoto,
      socialLinks: this.profileData.socialLinks
    }

    console.log(" this.dataToShow:-", this.dataToShow);


  }

  getImageUrl(imagePath: string): string {
    return `https://modmind-server.onrender.com/${imagePath}`;
    // return `http://localhost:3000/${imagePath}`;
  }



  getResume() {
    this.landingpageservices.modalInstance = this.serviceModal.open(
      DevelopmentResumeComponent,
      {
        windowClass: "modal-35",
        // backdrop: "static", // Disables closing the modal by clicking the backdrop
        keyboard: true, // Disables closing the modal by pressing the ESC key
        centered: true
      },
    );

    this.landingpageservices.modalInstance.result.then(
      () => {
        // Handle modal dismissal here
        console.log('Modal dismissed with OK');
      },
      (reason) => {
        if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          // Handle backdrop click here
          console.log('Modal dismissed by clicking outside');
        } else {
          // Handle other dismissal reasons here
          console.log('Modal dismissed with other reason:', reason);
        }
      }
    );
  }
}

