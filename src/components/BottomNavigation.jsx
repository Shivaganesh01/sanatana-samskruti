import { Link, useLocation } from 'react-router-dom';
import { Sun, BookOpen } from 'lucide-react';

const BottomNavigation = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

    return (
        <nav className="bottom-nav">
            <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                <div className="nav-icon-container">
                    <Sun size={24} />
                </div>
                <span>ಸಂಸ್ಕೃತಿ</span>
            </Link>
            <Link to="/gita" className={`nav-item ${isActive('/gita') ? 'active' : ''}`}>
                <div className="nav-icon-container">
                    <BookOpen size={24} />
                </div>
                <span>ಭಗವದ್ಗೀತೆ</span>
            </Link>
        </nav>
    );
};

export default BottomNavigation;
