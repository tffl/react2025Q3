import "./PagePagination.css";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const PagePagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pagesLimit = 10;
    const pagesCount = Math.min(totalPages, pagesLimit);

    return (
        <div className="pagination">
            {Array.from({ length: pagesCount }, (_: undefined, i: number) => {
                const page = i + 1;
                return (
                    <button
                        key={page}
                        disabled={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >

                        {page}
                    </button>
                );
            })}
        </div>
    );
}
export default PagePagination;
