import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem('token');

    // Если токена нет, перенаправляем на страницу авторизации
    if (!token) {
        return <Navigate to="/auth" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
