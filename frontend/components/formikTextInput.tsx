import React, {ChangeEventHandler} from "react";
import styles from '../styles/textInput.module.css';

interface IInputProps {
    name: string;
    type: 'text' | 'password';
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    error?: string;
}

export const FormikTextInput = ({ name, onChange, placeholder, error, type }: IInputProps) => {
    return (
        <div className={styles.inputWrapper}>
            <input
                className={error ? styles.textInputError : styles.textInput}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <span className={styles.textError}>{error}</span>}
        </div>

    )
}