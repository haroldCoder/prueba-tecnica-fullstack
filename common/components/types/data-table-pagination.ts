export interface DataTablePaginationProps {
    currentPage: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}