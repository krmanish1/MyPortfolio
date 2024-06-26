import { Component, Input, OnInit } from '@angular/core';
import { ProjectsSectionComponent } from "../projects-section/projects-section.component";

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

  constructor() {

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
    // return `https://modmind-server.onrender.com/${imagePath}`;
    return `http://localhost:3000/${imagePath}`;
  }

}
