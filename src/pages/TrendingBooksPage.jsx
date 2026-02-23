import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Framer Motion
import "./TrendingBooksPage.css";
import PageWrapper from "../components/PageWrapper";

const API_URL =
    "https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=12";

/* 🔥 Animation Variants */
const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function TrendingBooksPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                setBooks(data.items || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <PageWrapper>
            {/* PAGE ANIMATION */}
            <motion.div
                className="trending-page"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
            >
                <h1>🔥 Trending Books</h1>
                <p className="subtitle">Most read and popular books right now</p>

                {loading ? (
                    <div className="loader">Loading trending books...</div>
                ) : (
                    /* GRID ANIMATION */
                    <motion.div
                        className="book-grid"
                        variants={gridVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {books.map((book) => {
                            const info = book.volumeInfo;

                            return (
                                /* CARD ANIMATION */
                                <motion.div
                                    className="book-card"
                                    key={book.id}
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.06 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    onClick={() => navigate(`/book/${book.id}`)}
                                >
                                    <img
                                        src={
                                            info?.imageLinks?.thumbnail ||
                                            "https://via.placeholder.com/150x220?text=No+Cover"
                                        }
                                        alt={info?.title || "Book"}
                                    />
                                    <h3>{info?.title}</h3>
                                    <p>{info?.authors?.join(", ") || "Unknown Author"}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </motion.div>
        </PageWrapper>
    );
}
