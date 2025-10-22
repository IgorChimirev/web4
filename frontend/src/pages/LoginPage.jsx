import React, {useContext, useEffect, useState} from 'react';
import MyInput from "../components/UI/MyInput";
import MyButton from "../components/UI/MyButton";
import AuthContext from "../context/AuthContext";
import UserService from "../API/UserService";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const {loggedIn, setLoggedIn} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Now logged in:", loggedIn);
    }, [loggedIn])

    const login = async (e) => {
        e.preventDefault();
        if (!checkUsername()) return;

        setIsLoading(true);
        try {
            const data = await UserService.login(username, password);
            if (data === true) {
                setLoggedIn(true);
                localStorage.setItem("web-lab-4-authorization", "true");
                localStorage.setItem("web-lab-4-username", username);
                setMessage("");
            } else {
                setMessage(data);
            }
        } catch (reason) {
            if (reason.request?.status - 400 < 100) {
                setMessage("Неизвестная ошибка");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const register = async (e) => {
        e.preventDefault();
        if (!checkUsername()) return;

        setIsLoading(true);
        try {
            const data = await UserService.register(username, password);
            if (data === true) {
                setMessage("Регистрация прошла успешно");
            } else {
                setMessage(data);
            }
        } catch (reason) {
            if (reason.request?.status - 400 < 100) {
                setMessage("Неизвестная ошибка");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const checkUsername = () => {
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        return username.match(usernameRegex) != null;
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_card}>
                <div className={styles.login_header}>
                    <h1 className={styles.title}>Вход в систему</h1>
                    <p className={styles.subtitle}>Введите ваши данные для продолжения</p>
                </div>

                <form className={styles.login_form}>
                    <div className={styles.input_group}>
                        <MyInput
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setMessage(null);
                            }}
                            type="text"
                            placeholder="Введите логин"
                            className={styles.input_field}
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.input_group}>
                        <MyInput
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setMessage(null);
                            }}
                            type="password"
                            placeholder="Введите пароль"
                            className={styles.input_field}
                            disabled={isLoading}
                        />
                    </div>

                    {message && (
                        <div className={message === "Регистрация прошла успешно" ? styles.message_success : styles.message_error}>
                            {message}
                        </div>
                    )}

                    <div className={styles.button_group}>
                        {checkUsername() && !isLoading ? (
                            <>
                                <MyButton
                                    onClick={login}
                                    className={styles.login_button}
                                >
                                    Войти
                                </MyButton>
                                <MyButton
                                    onClick={register}
                                    className={styles.register_button}
                                >
                                    Зарегистрироваться
                                </MyButton>
                            </>
                        ) : (
                            <>
                                <MyButton disabled className={styles.disabled_button}>
                                    Войти
                                </MyButton>
                                <MyButton disabled className={styles.disabled_button}>
                                    Зарегистрироваться
                                </MyButton>
                            </>
                        )}
                    </div>

                    {isLoading && (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <span>Загрузка...</span>
                        </div>
                    )}
                </form>

                <div className={styles.login_footer}>
                    <p className={styles.footer_text}>
                        Используйте только латинские буквы, цифры, дефисы и подчеркивания
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;