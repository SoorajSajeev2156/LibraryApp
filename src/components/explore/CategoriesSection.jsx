import CategoryCard from "./CategoryCard";
import "./CategoriesSection.css";

const categories = [
    "Technology",
    "Fiction",
    "Self-Help",
    "Science",
    "Business",
    "History",
];

export default function CategoriesSection() {
    return (
        <section className="categories">
            <h2>Popular Categories</h2>
            <div className="category-grid">
                {categories.map((cat) => (
                    <CategoryCard key={cat} title={cat} />
                ))}
            </div>
        </section>
    );
}
