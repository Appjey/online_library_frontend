import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ReaderPage from './pages/ReaderPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/reader/:bookId" element={<ReaderPage />} /> {/* Маршрут для чтения книги */}
            </Routes>
        </Router>
    );
}

export default App;
