import React from 'react';
import styles from '../styles/infoLine.module.css';

interface IInfoLineProps {
    label: string;
    value: string;
}

export const InfoLine = ({ label, value }: IInfoLineProps) => {
    return(
        <div className={styles.lineWrapper}>
            <div className={styles.lineLabel}>{label}</div>
            <div className={styles.lineData}>{value}</div>
        </div>
    )
}
