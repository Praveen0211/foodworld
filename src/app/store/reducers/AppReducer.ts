import { ActionReducerMap  } from '@ngrx/store';
import { RestaurantReducer } from './RestaurantReducer';

export const reducer:ActionReducerMap<any> = {
    restaurants: RestaurantReducer
}

export const AppReducer: ActionReducerMap<any, any> = {
    restaurants:RestaurantReducer
}