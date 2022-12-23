import React, { FC, useRef, ChangeEvent, useState } from 'react';
import styles from '../styles/avatarUpload.module.css';
import Image from "next/image";
import {ImageLoaderProps} from "next/dist/shared/lib/image-config";
import FormData from "form-data";

interface IAvatarUploadProps {
    setFile: Function;
    avatarUrl: string;
    id: string
}

export const AvatarUpload: FC<IAvatarUploadProps> = ({ id, setFile, avatarUrl }) => {
    const ref = useRef<HTMLInputElement>(null);

    const avatarLoader = ({ src }: ImageLoaderProps) => avatarUrl ? `http://localhost:5000/${avatarUrl}` : src

    const handleClick = () => {
        ref.current?.click()
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if (e.target.files?.length) {
            const formData = new FormData();

            formData.append('avatar', e?.target.files[0])
            formData.append('id', id)
            setFile(formData)
        }

    }

    return (
        <div onClick={handleClick} className={styles.avatarWrapper}>
            <input
                type="file"
                accept="image/png, image/jpeg"
                ref={ref}
                className={styles.fileInput}
                onChange={onChange}
            />
            <Image
                loader={avatarLoader}
                src={`/no-avatar.png`}
                alt="avatar" width={200}
                height={200}
                className={styles.avatar}

            />
        </div>
    );
};