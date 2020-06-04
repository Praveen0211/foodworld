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
            map((result) => RestaurantActions.GetLoadingRestaurantsSuccess({payload: result}))
       ))
    ))
}

