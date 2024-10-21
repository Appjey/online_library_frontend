import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../pages/AuthPage';

interface StarRatingProps {
    bookId: string; // ID книги для отправки рейтинга
    bookRating: string; // Рейтинг с сервера (изначально строка)
}

const StarRating = ({ bookId, bookRating }: StarRatingProps) => {
    const [rating, setRating] = useState<number>(0); // Текущий рейтинг
    const [hover, setHover] = useState<number>(0); // Текущий элемент hover

    // Инициализация рейтинга при первой загрузке компонента
    useEffect(() => {
        setRating(parseFloat(bookRating)); // Преобразуем строку в число
    }, [bookRating]);

    // Функция для отправки рейтинга на сервер
    const submitRating = async (newRating: number) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `${BASE_URL}/rating/rate`,
                { rating: newRating, book_id: bookId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log('Оценка отправлена успешно:', response.data);
        } catch (error) {
            console.error('Ошибка при отправке оценки:', error);
        }
    };

    const handleClick = (newRating: number) => {
        setRating(newRating); // Обновляем локальный рейтинг
        submitRating(newRating); // Отправляем оценку на сервер
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleClick(ratingValue)}
                        />
                        <span
                            className={`star ${ratingValue <= (hover || rating) ? 'filled' : ''}`}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        >
              ★
            </span>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
