import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BookDetailsPage.css";
import { saveToLibrary } from "../utils/library";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";



function BookDetailsPage() {
    const { id } = useParams();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookDetails();
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            const res = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${id}`
            );
            const data = await res.json();
            setBook(data.volumeInfo);
        } catch (err) {
            console.error("Book details error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="details-loading">Loading book details...</p>;
    }

    if (!book) {
        return <p className="details-loading">Book not found</p>;
    }

    return (
        <PageWrapper>

            <motion.div
                className="book-details"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >


                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>

                <div className="details-container">

                    <motion.img
                        src={
                            book.imageLinks?.thumbnail ||
                            "https://via.placeholder.com/200x300?text=No+Cover"
                        }
                        alt={book.title}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    />


                    <motion.div
                        className="details-info"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.35 }}
                        >
                            {book.title}
                        </motion.h1>

                        <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {book.authors?.join(", ") || "Unknown Author"}
                        </motion.h3>

                        <motion.p
                            className="meta"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                        >
                            {book.publishedDate} · {book.pageCount || "N/A"} pages
                        </motion.p>

                        <motion.p
                            className="description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {book.description || "No description available."}
                        </motion.p>


                        <motion.button
                            className="save-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => {
                                saveToLibrary({
                                    id,
                                    title: book.title,
                                    authors: book.authors,
                                    image: book.imageLinks?.thumbnail,
                                });
                                showToast("Added to library!");
                            }}

                        >
                            Save to My Library
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </PageWrapper>
    );
}
export default BookDetailsPage;