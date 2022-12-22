import React from 'react';
import { GetServerSideProps } from 'next'
import { requireAuth } from "../../utils/utils";

const Profile = () => {
    return (
        <div>
            PROFILE
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    return requireAuth(true, context)
}


export default Profile;