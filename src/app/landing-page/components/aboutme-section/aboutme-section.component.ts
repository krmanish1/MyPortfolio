import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import Prism from 'prismjs';

@Component({
  selector: 'app-aboutme-section',
  standalone: true,
  imports: [],
  templateUrl: './aboutme-section.component.html',
  styleUrl: './aboutme-section.component.scss'
})
export class AboutmeSectionComponent {

  profileData: any;
  callSource!: string;


  dataToShow: any = {};

  constructor(
    private sanitizer: DomSanitizer
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
      selfinto: this.profileData.SelfIntro
    }

    console.log(" this.dataToShow:-", this.dataToShow);


  }
  parseHTML(value: string) {

    return this.sanitizer.bypassSecurityTrustHtml(value);

  }

}
