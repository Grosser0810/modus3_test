import { Dispatch } from 'react';
import axios from 'axios';
import { IUserState, UserAction, UserActionTypes } from '../../types/user';
import { toast } from 'react-toastify';

export const user = (payload: IUserState): UserAction => {
    return { type: UserActionTypes.SET_USER, payload}
}

export const fetchUser = (cookies: string, serverSideHost?: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const accessCookie = cookies.split(';').find(item => item.includes('accessToken'));
            const token =  accessCookie?.split("=")[1];

            const { data } = await axios.get(
              serverSideHost ? `http://${serverSideHost}/api/user` : '/api/user',
                {
                    withCredentials: true,
                    headers: { 'Authorization': 'Bearer ' + `${token}` }
                }
            );

            dispatch({ type:UserActionTypes.SET_USER, payload: data })
        } catch (e) {
            toast.error('Something went wrong try again')
        }
    }
}
