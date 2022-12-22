import React from 'react';
import { useFormik } from 'formik';

import { REGISTRATION_FORM } from "../../constants/form";
import styles from '../../styles/registration.module.css';
import { Button } from "../../components/Button";
import { FormikTextInput } from "../../components/formikTextInput";
import { RegistrationSchema } from "../../constants/validate";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";

const Registration = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: RegistrationSchema,
        onSubmit: (values) => {
            const { confirmPassword, ...rest } = values;
            axios.post('http://localhost:5000/user', rest)
                .then(() => {
                    Router.push('/').then(() =>toast.success('You have successfully registered'))
                })
                .catch((error) => toast.error(error.response.data.message))
        }
    })

    return (
        <div className={styles.registrationWrapper}>
            <div className={styles.registrationBlock}>
                <form onSubmit={formik.handleSubmit}>
                    {REGISTRATION_FORM.map(({ type, name, placeholder }) => (
                        <FormikTextInput
                            key={name}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            onChange={formik.handleChange}
                            error={formik.touched[name] ? formik.errors[name] : undefined}
                        />
                    ))}
                    <Button disabled={false} isSubmit={true} label="Confirm" />
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Registration;