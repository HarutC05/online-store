import "../styles/componentStyles/CategorySidebarMenu.css";

export default function CategorySidebarMenu({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="categories-sidebar-container">
            <ul className="categories-sidebar-list-container">
                {categories.map((category) => (
                    <li key={category} className="category-sidebar-list-item">
                        <button
                            className={selectedCategory === category ? "activeCategory" : "inactiveCategory"}
                            onClick={() => onSelectCategory(category)}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
