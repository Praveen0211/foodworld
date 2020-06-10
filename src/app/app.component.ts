import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faChevronCircleRight, fas } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as AuthActions from './store/actions/AuthActions';
import * as RestaurantActions from './store/actions/RestaurantActions';
import * as VariableActions from './store/actions/VariableActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  faChevronCircleRightIcon = faChevronCircleRight;
  faChevronCircleLeftIcon = faChevronCircleLeft;
  faSearchIcon = faSearch;

  signInComponentHidden: boolean;
  signUpComponentHidden: boolean;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  navbarExpanded: boolean;
  locationSearchInput: string;
  usersList;
  signedInUser;
  locationList;
  selectedLocation;
  signInErrorMessage: string;
  signUpErrorMessage: string;
  suggestionsHidden: boolean;
  loadingCollapsed: boolean;
  // latitude;
  // longitude;

  constructor(private formBuilder: FormBuilder, private store: Store<{ auth, restaurants, variables }>, private router: Router) { }

  ngOnInit() {
    this.varInit();
    this.store.subscribe((result) => {
      this.usersList = result.auth.usersList;
      this.signedInUser = result.auth.signedInUser;
      this.locationList = result.restaurants.locationList;
      this.loadingCollapsed = result.variables.loadingCollapsed;
    });
    // navigator.geolocation.getCurrentPosition((result) => {
    //   this.latitude = result.coords.latitude.toString();
    //   this.longitude = result.coords.longitude.toString();
    // });
  }

  varInit = function () {
    this.navbarExpanded = false;
    this.locationSearchInput = "";
    this.signInComponentHidden = true;
    this.signUpComponentHidden = true;
    this.signInForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
    this.signUpForm = this.formBuilder.group({
      fullname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
    this.signInErrorMessage = undefined;
    this.signUpErrorMessage = undefined;
    this.selectedLocation = undefined;
    this.suggestionsHidden = false;
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

  navbarCollapse = function () {
    var navbarElement = this.querySelector("appNavbar");
    var bodyElement = this.querySelector("appBody");
    navbarElement.style.width = "0vw";
    bodyElement.style.width = "100vw";
    this.navbarExpanded = false;
  }

  navbarExpand = function () {
    var navbarElement = this.querySelector("appNavbar");
    var bodyElement = this.querySelector("appBody");
    navbarElement.style.width = "13vw";
    bodyElement.style.width = "87vw";
    this.navbarExpanded = true;
  }

  toggleSignIn = function () {
    this.signInComponentHidden = !this.signInComponentHidden;
  }

  toggleSignUp = function () {
    this.signUpComponentHidden = !this.signUpComponentHidden;
  }

  hideOverlay = function () {
    this.signInComponentHidden = true;
    this.signUpComponentHidden = true;
  }

  signIn = function () {
    this.signInErrorMessage = undefined;
    var usernameIndex = this.usersList.findIndex(user => user.username == this.signInForm.value.username);
    if (usernameIndex == -1) {
      this.signInErrorMessage = "Invalid User name";
    }
    else {
      var password = this.usersList[usernameIndex].password;
      if (this.signInForm.value.password != password) {
        this.signInErrorMessage = "Incorrect Password. Please try again."
      }
      else {
        this.store.dispatch(AuthActions.SignIn({ "payload": this.signInForm.value }));
        this.hideOverlay();
        this.signInForm.reset();
      }
    }
  }

  signUp = function () {
    this.signUpErrorMessage = undefined;
    if (this.usersList.length != 0) {
      var usernameIndex = this.usersList.findIndex(user => user.username == this.signUpForm.value.username);
      var emailIndex = this.usersList.findIndex(user => user.email == this.signUpForm.value.email);
      if (usernameIndex != -1) {
        this.errorMessage = "User name is already in use";
      }
      else if (emailIndex != -1) {
        this.errorMessage = "Email ID is already in use";
      }
    }
    if (this.errorMessage == undefined) {
      this.store.dispatch(AuthActions.SignUp({ "payload": this.signUpForm.value }));
      this.hideOverlay();
      this.signUpForm.reset();
    }
  }

  signOut = function () {
    this.store.dispatch(AuthActions.SignOut());
  }

  getLocationList = function () {
    this.store.dispatch(RestaurantActions.GetLocationList({ "payload": { "query": this.locationSearchInput } }));
    this.suggestionsHidden = false;
  }

  selectLocation = function (index) {
    this.selectedLocation = this.locationList[index].entity_id;
    this.locationSearchInput = this.locationList[index].title;
    this.store.dispatch(VariableActions.SetLocation({ "lat": this.locationList[index].latitude.toString(), "lon": this.locationList[index].longitude.toString() }));
    this.suggestionsHidden = true;
  }

  showSearchedResults = function () {
    this.collapseLoading();
    this.router.navigate(["restaurants/", this.selectedLocation]);
  }

  collapseLoading = function () {
    var loadingElement = this.querySelector("loadingImage");
    var searchBarElement = this.querySelector("locationSearchBar");
    var signInElement = this.querySelector("signIn");
    var signUpElement = this.querySelector("signUp");
    var appNameElement = this.querySelector("appName");
    var suggestionsElement = this.querySelector("locationSearchSuggestions");
    loadingElement.style.height = "8vh";
    setTimeout(() => {
      loadingElement.style.backgroundImage = "unset";
      loadingElement.style.backgroundImage = "linear-gradient(rgb(17, 55, 100), rgb(70, 85, 105))";
    }, 500);
    searchBarElement.style.top = "1vh";
    searchBarElement.style.left = "35vw";
    suggestionsElement.style.top = "7vh";
    suggestionsElement.style.left = "36vw";
    signInElement.style.left = "88vw";
    signInElement.style.top = "3vh";
    signUpElement.style.left = "93vw";
    signUpElement.style.top = "3vh";
    appNameElement.style.top = "0vh";
    appNameElement.style.left = "5vw";
    appNameElement.style.fontSize = "2.5vw";
    appNameElement.style.textAlign = "left";
    this.store.dispatch(VariableActions.SetLoadingCollapsed({ loadingCollapsed: true }));
  }
}
