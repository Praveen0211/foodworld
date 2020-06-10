import { createAction, props } from '@ngrx/store';

export const SignIn = createAction(
    "SIGN_IN",
    props<{ "payload": any }>()
);

export const SignUp = createAction(
    "SIGN_UP",
    props<{ "payload": any }>()
);

export const SignOut = createAction(
    "SIGN_OUT"
);