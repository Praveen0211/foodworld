import { createAction, props } from '@ngrx/store';

export const GetLoadingRestaurants = createAction(
    "GET_LOADING_RESTAURANTS",
    props<{"payload": any}>()
);

export const GetLoadingRestaurantsSuccess = createAction(
    "GET_LOADING_RESTAURANTS_SUCCESS",
    props<{"payload": any}>()
);