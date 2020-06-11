import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RestaurantActions from '../store/actions/RestaurantActions';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar, faPhone, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  entity;
  zomatoLoadingRestaurants;
  loadingCollapsed;
  lat; lon;

  faStarIcon = faStar;
  faCartIcon = faShoppingCart;
  faCallIcon = faPhone;

  constructor(
    private store: Store<{ restaurants, variables }>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.select(obj => obj).subscribe((result) => {
      this.zomatoLoadingRestaurants = result.restaurants;
      this.loadingCollapsed = result.variables.loadingCollapsed;
      this.lat = result.variables.location.lat;
      this.lon = result.variables.location.lon;
    });
    this.activatedRoute.params.subscribe(params => {
      this.entity = params.locality;
      this.store.dispatch(RestaurantActions.GetSearchResults({ "payload": { "entity_id": this.entity, "lat": this.lat, "lon": this.lon } }));
    });
  }

}
