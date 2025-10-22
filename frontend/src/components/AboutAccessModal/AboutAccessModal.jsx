import React, { useState } from 'react';
import MyInput from "../UI/MyInput";
import MyButton from "../UI/MyButton";
import { useAbout } from '../../context/AboutContext';
import styles from './AboutAccessModal.module.css';

const AboutAccessModal = () => {
    const { grantAboutAccess } = useAbout();
    const [secretPhrase, setSecretPhrase] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (secretPhrase.toLowerCase() === 'beer') {
            grantAboutAccess();
            setError('');
        } else {
            setError('Неверная секретная фраза');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Доступ к странице About</h2>
                <p>Для доступа к этой странице введите секретную фразу:</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <MyInput
                        value={secretPhrase}
                        onChange={(e) => {
                            setSecretPhrase(e.target.value);
                            setError('');
                        }}
                        type="text"
                        placeholder="Введите секретную фразу"
                        className={styles.input}
                        autoFocus
                    />

                    {error && <div className={styles.error}>{error}</div>}

                    <MyButton
                        type="submit"
                        className={styles.submitButton}
                    >
                        Подтвердить
                    </MyButton>
                </form>
            </div>
        </div>
    );
};

export default AboutAccessModal;