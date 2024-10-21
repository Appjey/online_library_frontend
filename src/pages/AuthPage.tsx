import { useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';

export const BASE_URL = 'http://26.33.252.138:8080/api/v1';

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleAuth = async () => {
        const url = isLogin
            ? `${BASE_URL}/auth/sign-in`
            : `${BASE_URL}/auth/sign-up`
        const data = isLogin ? { username, password } : { username, email, password };

        try {
            const response = await axios.post(url, data);
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (error) {
            // Обрабатываем ошибку и отображаем сообщение
            setErrorMessage('Ошибка авторизации. Проверьте данные и попробуйте снова.');
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {!isLogin && (
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            )}
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAuth}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>

            {/* Отображение уведомления об ошибке */}
            {errorMessage && (
                <Notification message={errorMessage} type="error" />
            )}
        </div>
    );
};

export default AuthPage;
