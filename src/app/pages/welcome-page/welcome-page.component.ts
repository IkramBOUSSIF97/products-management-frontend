import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  constructor(public router: Router){}
  ngOnInit() {
  }

  nextPage() {
    this.router.navigate(["product/list"]);

  }

}
