import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './../actions/AuthActions';

export const initialState = {
    signedInUser: {},
    usersList: [
        {
            "fullname": "Praveen Chandran",
            "username": "Praveen0211",
            "email": "praveen@gmail.com",
            "password": "password"
        }
    ]
}
export const AuthReducer = createReducer(
    initialState,
    on(AuthActions.SignIn, (state, { payload }) => {
        return {
            signedInUser: payload,
            usersList: state.usersList
        };
    }),
    on(AuthActions.SignUp, (state, { payload }) => {
        return {
            signedInUser: state.signedInUser,
            usersList: [ ...state.usersList, payload ]
        };
    }),
    on(AuthActions.SignOut, (state) => {
        return {
            signedInUser: {},
            usersList: state.usersList
        }
    })
);