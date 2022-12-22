import { GetServerSidePropsContext } from "next";

export const requireAuth = async (isNeedAuth: boolean, context: GetServerSidePropsContext) => {
    const cookie = context.req.headers.cookie || '';
    const accessCookie = cookie.split(';').find(item => item.includes('accessToken'));
    const isNeedRedirect = isNeedAuth ? !accessCookie : accessCookie;

    if (isNeedRedirect) {
        return {
            redirect: {
                destination: isNeedAuth ? '/' : '/profile',
                permanent: false
            }
        }
    }
    return { props: { } }
}