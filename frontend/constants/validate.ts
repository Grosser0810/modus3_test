import { string, object } from 'yup';

export const LoginSchema = object().shape({
    email: string().email('Email must be a valid email').required('Required field'),
    password: string().required('Required field')
});