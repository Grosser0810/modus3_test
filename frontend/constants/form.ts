import { ILoginForm, IRegistrationForm } from "../types/form";

export const LOGIN_FORM: ILoginForm[] = [
    { name: 'email', placeholder: 'Please enter your email', type: 'text' },
    { name: 'password', placeholder: 'Please enter your password', type: 'password' }
]

export const REGISTRATION_FORM: IRegistrationForm[] = [
    { name: 'email', placeholder: 'Please enter your email', type: 'text' },
    { name: 'firstName', placeholder: 'Please enter your name', type: 'text' },
    { name: 'lastName', placeholder: 'Please enter your surname', type: 'text' },
    { name: 'password', placeholder: 'Please enter password', type: 'password' },
    { name: 'confirmPassword', placeholder: 'Please confirm password', type: 'password' },
]