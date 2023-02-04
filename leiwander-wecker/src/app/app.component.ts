import { Component } from '@angular/core';
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private meta:Meta) {

  this.meta.updateTag({name:'viewport', content:'width=device-width, initial-scale=0.70, user-scalable=yes'})
  }
  title = 'leiwander-wecker';
}
