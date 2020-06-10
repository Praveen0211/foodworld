import { ActionReducerMap } from '@ngrx/store';
import { RestaurantReducer } from './RestaurantReducer';
import { AuthReducer } from './AuthReducer';
import { VariableReducer } from './VariableReducers';

export const AppReducer: ActionReducerMap<any, any> = {
    restaurants: RestaurantReducer,
    auth: AuthReducer,
    variables: VariableReducer
}