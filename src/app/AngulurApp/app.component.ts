import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showFooter:boolean=true
  showNavbar:boolean=true
  title = 'offal-course';
  hideFooter() {
      this.showFooter = false;
  }
  hideNavbar()
  {
    this.showNavbar=false;
  }
}
