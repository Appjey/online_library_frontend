import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import axios from 'axios';
import { BASE_URL } from './AuthPage';

interface Book {
    id: string;
    title: string;
    url: string;
    description: string;
    authors: { id: string; name: string }[];
    genres: { id: string; name: string }[];
}

interface BookWithRating {
    book: Book;
    average_rating: number;
}

const HomePage = () => {
    const [booksWithRating, setBooksWithRating] = useState<BookWithRating[]>([]);
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 20;

    const navigate = useNavigate(); // Хук для навигации

    // Рассчитываем количество страниц
    const totalPages = Math.ceil(booksWithRating.length / booksPerPage);

    // Получаем книги для текущей страницы
    const currentBooks = booksWithRating.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    // Получение всех книг
    useEffect(() => {
        const token = localStorage.getItem('token');

        // Запрашиваем список всех книг с бэкенда
        axios
            .get(`${BASE_URL}/books/list`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setBooksWithRating(response.data.books_with_average_rating))
            .catch((error) => console.error('Ошибка при получении книг:', error));
    }, []);

    // Получение списка рекомендуемых книг
    useEffect(() => {
        const token = localStorage.getItem('token');

        // Запрос на получение рекомендуемых книг
        axios
            .get(`${BASE_URL}/recommendation/list`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setRecommendedBooks(response.data))
            .catch((error) => console.error('Ошибка при получении рекомендаций:', error));
    }, []);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/auth'; // Перенаправление на страницу авторизации
    };

    // Функция для перехода на страницу чтения книги
    const handleBookClick = (bookId: string) => {
        navigate(`/reader/${bookId}`);
    };

    return (
        <div>
            {/* Рекомендуемые книги */}
            <h2>Рекомендуемые товары</h2>
            <div className="recommended-books">
                {recommendedBooks.length > 0 ? (
                    <div className="scrollable-books">
                        {recommendedBooks.map((book) => (
                            <div
                                key={book.id}
                                className="book-card"
                                onClick={() => handleBookClick(book.id)} // Переход по клику
                            >
                                <img src={book.url} alt={book.title} className="book-cover" />
                                <h3>{book.title}</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Рекомендации не найдены</p>
                )}
            </div>

            {/* Список всех книг */}
            <h2>Все товары</h2>
            <div className="books-grid">
                {currentBooks.length > 0 ? (
                    currentBooks.map((item) => (
                        <div
                            key={item.book.id}
                            className="book-card"
                            onClick={() => handleBookClick(item.book.id)} // Переход по клику
                        >
                            <img src={item.book.url} alt={item.book.title} className="book-cover" />
                            <h3>{item.book.title}</h3>
                            <p>Средняя оценка: {item.average_rating.toFixed(1)} / 5</p>
                        </div>
                    ))
                ) : (
                    <p>Книги не найдены</p>
                )}
            </div>

            <div className="pagination">
                <button disabled={currentPage === 1} onClick={handlePreviousPage}>
                    Назад
                </button>
                <span>Страница {currentPage} из {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={handleNextPage}>
                    Вперёд
                </button>
            </div>

            {/* Кнопка выхода из системы */}
            <button className="logout" onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
    );
};

export default HomePage;
