import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

import * as RestaurantActions from './../actions/RestaurantActions';
import { ZomatoService } from 'src/app/services/zomato.service';

@Injectable()
export class RestaurantEffects {
    constructor(private zomatoService: ZomatoService, private actions: Actions) { }

    getLoadingRestaurantsSuccess = createEffect(() => this.actions.pipe(
        ofType(RestaurantActions.GetLoadingRestaurants),
        mergeMap((action) => this.zomatoService.getLoadingRestaurants(action).pipe(
            map((result) => RestaurantActions.GetLoadingRestaurantsSuccess({ payload: result }))
        ))
    ));

    getLocationListSuccess = createEffect(() => this.actions.pipe(
        ofType(RestaurantActions.GetLocationList),
        mergeMap((action) => this.zomatoService.getLocationList(action).pipe(
            map((result) => RestaurantActions.GetLocationListSuccess({ payload: result }))
        ))
    ));

    getSearchResultsSuccess = createEffect(() => this.actions.pipe(
        ofType(RestaurantActions.GetSearchResults),
        mergeMap((action) => this.zomatoService.getSearchResults(action).pipe(
            map((result) => RestaurantActions.GetSearchResultsSuccess({ payload: result }))
        ))
    ));
}

