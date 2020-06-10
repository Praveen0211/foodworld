import { createAction, props } from '@ngrx/store';

export const SetLocation = createAction(
    "SET_LOCATION",
    props<{"lat", "lon"}>()
);

export const SetSuggestionsHidden = createAction(
    "SET_SUGGESTIONS_HIDDEN",
    props<{"suggestionsHidden"}>()
);

export const SetLoadingCollapsed = createAction(
    "SET_LOADING_COLLAPSED",
    props<{"loadingCollapsed"}>()
);