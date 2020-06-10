import { createReducer, on } from '@ngrx/store';
import * as RestaurantActions from '../actions/RestaurantActions';

export const initialState = {
    restaurantList: [],
    locationList: []
}

export const RestaurantReducer = createReducer(
    initialState,
    on(RestaurantActions.GetLoadingRestaurants, (state, {payload}) => {
        return state;
    }),
    on(RestaurantActions.GetLoadingRestaurantsSuccess, (state, {payload}) => {
        return {
            restaurantList: payload.nearby_restaurants,
            locationList: state.locationList
        };
    }),
    on(RestaurantActions.GetLocationList, (state, {payload}) => {
        return state;
    }),
    on(RestaurantActions.GetLocationListSuccess, (state, {payload}) => {
        return {
            restaurantList: state.restaurantList,
            locationList: payload.location_suggestions
        }
    }),
    on(RestaurantActions.GetSearchResults, (state, {payload}) => {
        return state;
    }),
    on(RestaurantActions.GetSearchResultsSuccess, (state, {payload}) => {
        return {
            restaurantList: payload.restaurants,
            locationList: state.locationList
        };
    })
);
