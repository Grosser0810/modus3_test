import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/home.module.css';
import { LOGIN_FORM } from '../constants/form';
import { FormikTextInput } from '../components/formikTextInput';
import { LoginSchema } from '../constants/validate';
import { Button } from '../components/Button';
import { requireAuth } from '../utils/utils';

export default function Home() {
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            axios.post('/api/auth/login', values, {withCredentials: true})
                .then(() => {
                    Router.replace('/profile').then(() => toast.success('You are successfully logged in'))
                })
                .catch((error) => {
                    toast.error(error.response.data.message)
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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
    requireAuth(false, context)
