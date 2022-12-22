import React from 'react';
import Image from 'next/image'
import { requireAuth } from "../../utils/utils";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchUser} from "../../store/actions-creators/user";
import { InfoLine } from "../../components/infoLine";
import styles from '../../styles/profile.module.css'

const Profile = () => {
    const { email, firstName, lastName, avatar_url } = useTypedSelector(state => state.user);

    const fullName = firstName || lastName ? `${firstName || ''} ${lastName || ''}` : 'none'

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.infoWrapper}>
                <Image src='/no-avatar.png' alt="avatar" width={200} height={200} className={styles.avatar}/>
                <InfoLine value={fullName} label="Name" />
                <InfoLine value={email} label="Email" />
            </div>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(await fetchUser(context))
        return requireAuth(true, context)
    }
)

export default Profile;