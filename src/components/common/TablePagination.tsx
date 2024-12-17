import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {useSearchParams} from "react-router";

type TablePaginationProps = {
    pages: number;
    siblingCount?: number;
}

function TablePagination({pages, siblingCount = 1}: TablePaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage: number = Number(searchParams.get("page") ?? 1);

    const setPage = (page: number) => {
        setSearchParams({page: page.toString()})
    }
    const prevPage = () => {
        setSearchParams({page: (currentPage - 1).toString()})
    };
    const nextPage = () => {
        setSearchParams({page: (currentPage + 1).toString()})
    };

    const generatePaginationRange = () => {
        const totalNumbers = siblingCount * 2 + 3; // Pages around current + 2 for start and end
        const totalBlocks = totalNumbers + 2; // Including start and end ellipsis

        if (pages <= totalBlocks) {
            return Array.from({length: pages}, (_, i) => i + 1);
        }

        const startPage = Math.max(currentPage - siblingCount, 2);
        const endPage = Math.min(currentPage + siblingCount, pages - 1);

        const hasLeftEllipsis = startPage > 2;
        const hasRightEllipsis = endPage < pages - 1;

        const paginationRange: (number | string)[] = [1];

        if (hasLeftEllipsis) paginationRange.push("ellipsis");
        for (let i = startPage; i <= endPage; i++) {
            paginationRange.push(i);
        }
        if (hasRightEllipsis) paginationRange.push("ellipsis");
        paginationRange.push(pages);

        return paginationRange;
    };

    const paginationRange = generatePaginationRange();

    return (
        <Pagination className="flex justify-end px-4">
            <PaginationContent>
                <PaginationItem className={currentPage === 1 ? "cursor-not-allowed" : ""}>
                    <PaginationPrevious onClick={currentPage === 1 ? undefined : prevPage}/>
                </PaginationItem>
                {paginationRange.map((page, i) => (
                    <PaginationItem key={i} className={currentPage === page ? 'bg-gray-200 rounded-md' : ''}>
                        {page === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink onClick={() => setPage(Number(page))}>{page}</PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem className={currentPage === pages ? "cursor-not-allowed" : ""}>
                    <PaginationNext onClick={currentPage === pages ? undefined : nextPage}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default TablePagination;