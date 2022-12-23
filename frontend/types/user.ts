export interface IUserState {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar_url: string;
}

export enum UserActionTypes {
    SET_USER = "SET_USER"
}

interface SetUser {
    type: UserActionTypes.SET_USER;
    payload: IUserState;
}

export type UserAction = SetUser;