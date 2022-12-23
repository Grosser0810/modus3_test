import React from 'react';
import { requireAuth } from "../../utils/utils";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchUser } from "../../store/actions-creators/user";
import { InfoLine } from "../../components/infoLine";
import styles from '../../styles/profile.module.css'
import { AvatarUpload } from "../../components/AvatarUpload";
import axios from "axios";
import {useActions} from "../../hooks/useActions";



const Profile = () => {
    const { fetchUser } = useActions()
    const { _id, email, firstName, lastName, avatar_url } = useTypedSelector(state => state.user);
    const fullName = firstName || lastName ? `${firstName || ''} ${lastName || ''}` : 'none';

    const setAvatar = (formData: FormData) => {
        axios.patch(`http://localhost:5000/user`, formData).then(response => {
            console.log(formData);
            // fetchUser()
        })
    }

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.infoWrapper}>
                <AvatarUpload id={_id} setFile={setAvatar} avatarUrl={avatar_url} />
                <InfoLine value={fullName} label="Name" />
                <InfoLine value={email} label="Email" />
            </div>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const cookies = context.req.headers.cookie || ''
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(await fetchUser(context))
        return requireAuth(true, context)

    }
)

export default Profile;