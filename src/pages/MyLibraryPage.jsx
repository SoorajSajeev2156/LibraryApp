import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLibrary, removeFromLibrary } from "../utils/library";
import "./MyLibraryPage.css";
import PageWrapper from "../components/PageWrapper";
import { useToast } from "../context/ToastContext";



export default function MyLibraryPage() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const { showToast } = useToast();


    useEffect(() => {
        setBooks(getLibrary());
    }, []);

    const removeBook = (id) => {
        removeFromLibrary(id);
        setBooks(getLibrary());
        showToast("Removed from library");
    };


    if (books.length === 0) {
        return (
            <div className="library-empty">
                <h2>Your library is empty 📭</h2>
                <p>Save books to see them here</p>
            </div>
        );
    }

    return (
        <PageWrapper>
            <div className="library-page">
                <h1>My Library</h1>

                <div className="library-grid">
                    {books.map((book) => (
                        <div className="library-card" key={book.id}>
                            <img
                                src={book.image || "https://via.placeholder.com/150x220"}
                                alt={book.title}
                                onClick={() => navigate(`/book/${book.id}`)}
                            />

                            <h3>{book.title}</h3>
                            <p>{book.authors?.join(", ")}</p>

                            <button onClick={() => removeBook(book.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div></PageWrapper>
    );
}
