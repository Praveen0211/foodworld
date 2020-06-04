import { Component, OnInit } from '@angular/core';
import { ZomatoService } from './../services/zomato.service';
import { Store } from '@ngrx/store';
import * as RestaurantActions from '../store/actions/RestaurantActions';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  zomatoLoadingRestaurants;
  constructor(private zomatoService: ZomatoService, private store:Store<{restaurants}>) { }

  ngOnInit() {
    this.store.select(obj => obj.restaurants).subscribe((result) => {
      this.zomatoLoadingRestaurants = result;
      console.log(this.zomatoLoadingRestaurants)
    });
    this.store.dispatch(RestaurantActions.GetLoadingRestaurants({"payload": {"lat": "12.833366", "lon": "77.647140"}}))
  }

}
