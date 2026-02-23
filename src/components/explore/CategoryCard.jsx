import { useNavigate } from "react-router-dom";

export default function CategoryCard({ title }) {
    const navigate = useNavigate();

    return (
        <div
            className="category"
            onClick={() => navigate(`/search?q=${title}`)}
        >
            {title}
        </div>
    );
}
