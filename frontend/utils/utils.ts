import { GetServerSidePropsContext } from 'next';

export const getAccessToken = (context: GetServerSidePropsContext) => {
    const cookie = context.req.headers.cookie || '';
    const accessCookie = cookie.split(';').find(item => item.includes('accessToken'));
    return accessCookie?.split("=")[1]
}

export const requireAuth = async (isNeedAuth: boolean, context: GetServerSidePropsContext) => {
    const cookies = context.req.headers.cookie || ''
    const accessCookie = getAccessToken(context);
    const isNeedRedirect = isNeedAuth ? !accessCookie : accessCookie;

    if (isNeedRedirect) {
        return {
            redirect: {
                destination: isNeedAuth ? '/' : '/profile',
                permanent: false
            }
        }
    }
    return { props: { cookies } }
}
