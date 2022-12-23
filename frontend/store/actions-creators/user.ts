import { Dispatch } from "react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getAccessToken } from "../../utils/utils";
import { IUserState, UserAction, UserActionTypes } from "../../types/user";

export const user = (payload: IUserState): UserAction => {
    return { type: UserActionTypes.SET_USER, payload}
}

export const fetchUser = (context: GetServerSidePropsContext) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const accessCookie = getAccessToken(context);

            const { data } = await axios.get(
                'http://localhost:5000/user',
                {
                    withCredentials: true,
                    headers: { 'Authorization': 'Bearer ' + `${accessCookie}` }
                }
            );
            dispatch({ type:UserActionTypes.SET_USER, payload: data })
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}