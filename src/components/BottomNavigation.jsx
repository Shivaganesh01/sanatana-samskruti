import { Link, useLocation } from 'react-router-dom';
import { Sun, BookOpen, Search, Heart, Activity } from 'lucide-react';

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

            <Link to="/explore" className={`nav-item ${isActive('/explore') ? 'active' : ''}`}>
                <div className="nav-icon-container">
                    <Search size={22} />
                </div>
                <span>ಅನ್ವೇಷಿಸಿ</span>
            </Link>

            <Link to="/gita" className={`nav-item ${isActive('/gita') ? 'active' : ''}`}>
                <div className="nav-icon-container">
                    <BookOpen size={24} />
                </div>
                <span>ಭಗವದ್ಗೀತೆ</span>
            </Link>

            <Link to="/favorites" className={`nav-item ${isActive('/favorites') ? 'active' : ''}`}>
                <div className="nav-icon-container">
                    <Heart size={22} />
                </div>
                <span>ಮೆಚ್ಚಿನವು</span>
            </Link>

            <Link to="/japa" className={`nav-item ${isActive('/japa') ? 'active' : ''}`}>
                <div className="nav-icon-container">
                    <Activity size={22} />
                </div>
                <span>ಜಪ</span>
            </Link>
        </nav>
    );
};


export default BottomNavigation;
