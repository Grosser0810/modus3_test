import { useFormik } from 'formik';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Home.module.css';
import { HTTP } from '../sevices'
import {LOGIN_FORM} from "../constants/form";
import {FormikTextInput} from "../components/formikTextInput";
import { LoginSchema } from "../constants/validate";
import { Button } from "../components/Button";

export default function Home() {
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            axios.post('http://localhost:5000/auth/login', values, {withCredentials: true})
                .then(() => {
                    toast.success('You are successfully logged in')
                    // Router.replace('/profile')
                })
                .catch((error) => {
                    console.log(error)
                    // toast.error(error.response.data.message)
                })
        }
    })

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginBlock}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            {LOGIN_FORM.map(({ type, name, placeholder }) => (
                <FormikTextInput
                    key={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    error={formik.touched[name] ? formik.errors[name] : undefined}
                />
            ))}
           <Button disabled={false} isSubmit={true} label="Login" />
        </form>
        <span>If you do not have an account, you can</span>
        <Link href='registration'> register</Link>
      </div>
      <ToastContainer />
    </div>
  )
}
