import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination"
import { usePods } from "@/contexts/PodContext";

function Footer() {
    const { currentPage, setCurrentPage, totalPages, pods } = usePods();

    // Don't show pagination if there are no pods or only one page
    if (pods.length <= 9) {
        return null;
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is small
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink 
                            onClick={() => handlePageChange(i)}
                            isActive={currentPage === i}
                            className="cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:scale-105"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            // Show ellipsis for large page counts
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    items.push(
                        <PaginationItem key={i}>
                            <PaginationLink 
                                onClick={() => handlePageChange(i)}
                                isActive={currentPage === i}
                                className="cursor-pointer transition-all duration-200 hover:bg-blue-50"
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
                if (totalPages > 4) {
                    items.push(<PaginationItem key="ellipsis1"><PaginationEllipsis /></PaginationItem>);
                    items.push(
                        <PaginationItem key={totalPages}>
                            <PaginationLink 
                                onClick={() => handlePageChange(totalPages)}
                                className="cursor-pointer transition-all duration-200 hover:bg-blue-50"
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
            } else if (currentPage >= totalPages - 2) {
                items.push(
                    <PaginationItem key={1}>
                        <PaginationLink 
                            onClick={() => handlePageChange(1)}
                            className="cursor-pointer transition-all duration-200 hover:bg-blue-50"
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>
                );
                items.push(<PaginationItem key="ellipsis2"><PaginationEllipsis /></PaginationItem>);
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    items.push(
                        <PaginationItem key={i}>
                            <PaginationLink 
                                onClick={() => handlePageChange(i)}
                                isActive={currentPage === i}
                                className="cursor-pointer transition-all duration-200 hover:bg-blue-50"
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
            } else {
                items.push(
                    <PaginationItem key={1}>
                        <PaginationLink 
                            onClick={() => handlePageChange(1)}
                            className="cursor-pointer transition-all duration-200 hover:bg-blue-50"
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>
                );
                items.push(<PaginationItem key="ellipsis3"><PaginationEllipsis /></PaginationItem>);
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    items.push(
                        <PaginationItem key={i}>
                            <PaginationLink 
                                onClick={() => handlePageChange(i)}
                                isActive={currentPage === i}
                                className="cursor-pointer transition-all duration-200 hover:bg-blue-50"
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
                items.push(<PaginationItem key="ellipsis4"><PaginationEllipsis /></PaginationItem>);
                items.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink 
                            onClick={() => handlePageChange(totalPages)}
                            className="cursor-pointer transition-all duration-200 hover:bg-blue-50"
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }
        return items;
    };

    return (
        <div className="mx-auto max-w-7xl fixed bottom-0 left-0 right-0 bg-white border-t mt-5 py-2 shadow-lg">
            <Pagination className="justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious 
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`cursor-pointer transition-all duration-200 ${
                                currentPage === 1 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-blue-50 hover:scale-105'
                            }`}
                        />
                    </PaginationItem>
                    {renderPaginationItems()}
                    <PaginationItem>
                        <PaginationNext 
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`cursor-pointer transition-all duration-200 ${
                                currentPage === totalPages 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-blue-50 hover:scale-105'
                            }`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default Footer;
