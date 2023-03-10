import React from 'react';
import Router from "next/router";
import axios from "axios";
import { GetServerSideProps } from 'next';
import { useFormik } from 'formik';
import { toast } from "react-toastify";

import { REGISTRATION_FORM } from '../../constants/form';
import styles from '../../styles/registration.module.css';
import { Button } from '../../components/Button';
import { FormikTextInput } from '../../components/formikTextInput';
import { RegistrationSchema } from '../../constants/validate';
import { requireAuth } from '../../utils/utils';

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
            axios.post('/api/user', rest)
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
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) =>
    requireAuth(false, context)

export default Registration;
