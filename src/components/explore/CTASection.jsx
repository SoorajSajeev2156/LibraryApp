import { useNavigate } from "react-router-dom";
import "./CTASection.css";

export default function CTASection() {
    const navigate = useNavigate();

    return (
        <section className="cta">
            <h2>Build Your Personal Library</h2>
            <p>Save, track, and organize your favorite books in one place.</p>


            <button onClick={() => navigate("/search")}>
                Get Started
            </button>
        </section>
    );
}
