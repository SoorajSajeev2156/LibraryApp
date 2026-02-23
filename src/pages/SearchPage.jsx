import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";
import PageWrapper from "../components/PageWrapper";
import { useSearchParams } from "react-router-dom";


const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!query) return;

        const delay = setTimeout(() => {
            fetchBooks();
        }, 500); // debounce

        return () => clearTimeout(delay);
    }, [query]);
    useEffect(() => {
        if (initialQuery) {
            setQuery(initialQuery);
        }
    }, [initialQuery]);


    const fetchBooks = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}${query}&maxResults=12`);
            const data = await res.json();
            setBooks(data.items || []);
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <div className="search-page">
                <h1>Search Books</h1>

                <input
                    type="text"
                    placeholder="Search by title, author, keyword..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {loading && <p className="loading">Searching...</p>}

                <div className="search-grid">
                    {books.map((book) => {
                        const info = book.volumeInfo;
                        return (
                            <div
                                className="book-card"
                                key={book.id}
                                onClick={() => navigate(`/book/${book.id}`)}
                            >
                                <img
                                    src={
                                        info.imageLinks?.thumbnail ||
                                        "https://via.placeholder.com/150x220?text=No+Cover"
                                    }
                                    alt={info.title}
                                />
                                <h3>{info.title}</h3>
                                <p>{info.authors?.join(", ") || "Unknown Author"}</p>
                            </div>
                        );
                    })}
                </div>
            </div></PageWrapper>
    );
}
