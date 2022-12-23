import { Dispatch } from 'react';
import axios from 'axios';
import { IUserState, UserAction, UserActionTypes } from '../../types/user';

export const user = (payload: IUserState): UserAction => {
    return { type: UserActionTypes.SET_USER, payload}
}

export const fetchUser = (cookies: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const accessCookie = cookies.split(';').find(item => item.includes('accessToken'));
            const some =  accessCookie?.split("=")[1]
            const { data } = await axios.get(
                'http://localhost:5000/user',
                {
                    withCredentials: true,
                    headers: { 'Authorization': 'Bearer ' + `${some}` }
                }
            );
            dispatch({ type:UserActionTypes.SET_USER, payload: data })
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
