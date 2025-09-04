import "../styles/componentStyles/Pagination.css"

export default function Pagination({ currentPage, filteredProducts, productsPerPage, setCurrentPage }) {
    return (
        <div className="pagination">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : "nonActive"}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    )
}