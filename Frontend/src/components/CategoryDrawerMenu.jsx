import "../styles/componentStyles/CategoryDrawerMenu.css";
import { useNavigate } from "react-router-dom";

export default function CategoryDrawerMenu({ sections, onSelectCategory, closeDrawer }) {
    const navigate = useNavigate();

    const handleClick = (cat) => {
        onSelectCategory(cat);
        navigate("/");
    };

    return (
        <>
            <div className="drawer-overlay" onClick={closeDrawer}></div>
            <div className="drawer-container">
                {Object.entries(sections).map(([sectionName, cats]) => (
                    <div key={sectionName} className="drawer-section">
                        <h4 className="drawer-section-title">{sectionName}</h4>
                        <ul className="drawer-section-list">
                            {cats.map((cat) => (
                                <li key={cat}>
                                    <button onClick={() => handleClick(cat)}>{cat}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
