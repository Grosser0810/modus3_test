type LoginFields = 'email' | 'password';
type RegistrationFields = 'email' | 'password' | 'firstName' | 'lastName' | 'confirmPassword';

export interface IForm {
    type: 'text' | 'password';
    placeholder: string;
}

export interface ILoginForm extends IForm {
    name: LoginFields
}

export interface IRegistrationForm extends IForm {
    name: RegistrationFields
}