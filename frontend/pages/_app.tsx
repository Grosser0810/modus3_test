import React, { FC } from "react";
import {Provider} from 'react-redux';
import { AppProps } from "next/app";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css'
import { wrapper } from "../store";

const WrapperApp: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Component {...props.pageProps} />
            <ToastContainer />
        </Provider>
    );
}
export default WrapperApp;
