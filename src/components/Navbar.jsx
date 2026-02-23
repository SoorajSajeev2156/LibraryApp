import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`navbar ${theme}`}>
            <div className="navbar-logo">📚 MyLibrary</div>

            <div className="navbar-links">
                <Link to="/">Explore</Link>
                <Link to="/trending">Trending</Link>
                <Link to="/library">My Library</Link>
            </div>

            <div className="navbar-actions">
                <span
                    className="icon search-icon"
                    onClick={() => navigate("/search")}
                    title="Search books"
                >
                    🔍
                </span>

                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    title="Toggle theme"
                >
                    {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </button>
            </div>
        </nav>
    );
}
