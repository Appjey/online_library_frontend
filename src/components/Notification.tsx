import { useEffect, useState } from 'react';

interface NotificationProps {
    message: string;
    type: 'error' | 'success'; // Тип уведомления: ошибка или успех
    duration?: number; // Продолжительность показа уведомления
}

const Notification = ({ message, type, duration = 3000 }: NotificationProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Скрываем уведомление через указанное время (по умолчанию 3 секунды)
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }, [duration]);

    if (!isVisible) return null;

    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
        </div>
    );
};

export default Notification;
