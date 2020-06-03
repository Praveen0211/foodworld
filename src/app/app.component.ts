import { Component, OnInit } from '@angular/core';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  navbarExpanded: boolean;
  faChevronCircleRightIcon = faChevronCircleRight;
  faChevronCircleLeftIcon = faChevronCircleLeft;
  constructor() { }

  ngOnInit() {
    this.varInit();
  }

  varInit = function () {
    this.navbarExpanded = true;
  }

  querySelector = function (classString) {
    return (document.getElementById(classString) as HTMLElement);
  }

  querySelectorAll = function (classString) {
    return document.getElementsByClassName(classString);
  }

  toggleNavbar = function () {
    if (this.navbarExpanded == true) {
      this.collapse();
    }
    else {
      this.expand();
    }
  }

  collapse = function () {
    var navbarElement = this.querySelector("appNavbar");
    var bodyElement = this.querySelector("appBody");
    navbarElement.style.width = "5vw";
    bodyElement.style.width = "95vw";
    this.navbarExpanded = false;
  }

  expand = function () {
    var navbarElement = this.querySelector("appNavbar");
    var bodyElement = this.querySelector("appBody");
    navbarElement.style.width = "13vw";
    bodyElement.style.width = "87vw";
    this.navbarExpanded = true;
  }
}
