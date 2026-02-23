import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HeroSlider.css";

const images = [
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
];

export default function HeroSlider() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate(); // ✅ ADD

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero">
            <img src={images[index]} alt="Books" />

            <div className="hero-overlay">
                <h1>Explore Your Next Read</h1>
                <p>Discover books, authors, and knowledge from around the world</p>

                {/* ✅ FUNCTIONAL BUTTON */}
                <button onClick={() => navigate("/search")}>
                    Browse Collection
                </button>
            </div>
        </section>
    );
}
