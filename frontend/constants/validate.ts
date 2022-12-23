import { string, object, ref } from 'yup';

export const LoginSchema = object().shape({
    email: string().email('Email must be a valid email').required('Required field'),
    password: string().required('Required field')
});

export const RegistrationSchema = object().shape({
    email: string().email('Email must be a valid email').required('Required field'),
    password: string().required('Required field'),
    confirmPassword: string().required('Required field').oneOf([ref('password'), null], 'Passwords must match')
});
