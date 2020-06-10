import { createReducer, on } from '@ngrx/store'
import * as VariableActions from './../actions/VariableActions';

export const initialState = {
    location: { "lat": "", "lon": "" },
    suggestionsHidden: true,
    loadingCollapsed: false
}

export const VariableReducer = createReducer(initialState,
    on(VariableActions.SetLocation, (state, {lat, lon}) => {
        return {
            "location": {
                "lat": lat,
                "lon": lon
            },
            "suggestionsHidden": state.suggestionsHidden,
            "loadingCollapsed": state.loadingCollapsed
        }
    }),
    on(VariableActions.SetSuggestionsHidden, (state, {suggestionsHidden}) => {
        return {
            "location": state.location,
            "suggestionsHidden": suggestionsHidden,
            "loadingCollapsed": state.loadingCollapsed
        };
    }),
    on(VariableActions.SetLoadingCollapsed, (state, {loadingCollapsed}) => {
        return {
            "location": state.location,
            "suggestionsHidden": state.suggestionsHidden,
            "loadingCollapsed": loadingCollapsed
        }
    })
);