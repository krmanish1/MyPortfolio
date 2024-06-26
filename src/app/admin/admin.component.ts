import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PersionalInfoComponent } from "./persional-info/persional-info.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [RouterModule, PersionalInfoComponent]
})
export class AdminComponent {

}
