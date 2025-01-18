import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './AuthPage';
import StarRating from '../components/StarRating';

interface Author {
    id: string;
    name: string;
}

interface Genre {
    id: string;
    name: string;
}

interface Book {
    id: string;
    title: string;
    url: string;
    description: string;
    authors: Author[];
    genres: Genre[];
}

interface BookResponse {
    book: Book;
    rating: number;
}

const ReaderPage = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [bookData, setBookData] = useState<BookResponse | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Получение данных о книге
        axios
            .get(`${BASE_URL}/books/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setBookData(response.data))
            .catch((error) => console.error('Ошибка при загрузке книги:', error));
    }, [bookId]);

    if (!bookData) {
        return <div>Загрузка книги...</div>;
    }

    const { book, rating } = bookData;

    return (
        <div className="reader-page-container">
            <div className="book-reader">
                <h2>{book.title}</h2>
                <div className="book-description">{book.description}</div>

                {/* Компонент для оценки книги */}
                <div className="rating-section">
                    <h3>Оценить товар:</h3>
                    <StarRating bookId={bookId!} bookRating={rating!}/>
                </div>
            </div>
        </div>
    );
};

export default ReaderPage;
