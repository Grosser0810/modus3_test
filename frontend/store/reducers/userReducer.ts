import {IUserState, UserAction, UserActionTypes} from "../../types/user";

const initialState: IUserState = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar_url: '',
}

export const userReducer = (state = initialState, action: UserAction): IUserState => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}