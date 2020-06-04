import { createReducer, on, props } from '@ngrx/store';
import * as RestaurantActions from '../actions/RestaurantActions';

export const initialState = {
    restaurantList: []
}

export const RestaurantReducer = createReducer(
    initialState,
    on(RestaurantActions.GetLoadingRestaurants, (state, {payload}) => {
        return state;
    }),
    on(RestaurantActions.GetLoadingRestaurantsSuccess, (state, {payload}) => {
        console.log(payload.nearby_restaurants);
        return {
            restaurantList: payload.nearby_restaurants
        };
    })
);
