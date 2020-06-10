import { createAction, props } from '@ngrx/store';

export const GetLoadingRestaurants = createAction(
    "GET_LOADING_RESTAURANTS",
    props<{ "payload": any }>()
);

export const GetLoadingRestaurantsSuccess = createAction(
    "GET_LOADING_RESTAURANTS_SUCCESS",
    props<{ "payload": any }>()
);

export const GetLocationList = createAction(
    "GET_LOCATION_LIST",
    props<{ "payload": any }>()
);

export const GetLocationListSuccess = createAction(
    "GET_LOCATION_LIST_SUCCESS",
    props<{ "payload": any }>()
);

export const GetSearchResults = createAction(
    "GET_SEARCH_RESULTS",
    props<{"payload": any}> ()
);

export const GetSearchResultsSuccess = createAction(
    "GET_SEARCH_RESULTS_SUCCESS",
    props<{"payload": any}> ()
);