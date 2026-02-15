import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/common/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table"
import { useMemo } from "react"
import { DataTablePaginationProps } from "@/common/components/types"
import { Spinner } from "@/common/components/ui/spinner"

export type Column<T> = {
    header: string
    accessorKey: keyof T
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    className?: string
    pagination?: DataTablePaginationProps,
    loading: boolean
}

export const DataTable = <T,>({ columns, data, className, pagination, loading }: DataTableProps<T>) => {
    // Calcular el total de páginas, solo se recalcula con cambios en total o pageSize
    const totalPages = useMemo(() =>
        pagination ? Math.ceil(pagination.total / pagination.pageSize) : 0,
        [pagination?.pageSize, pagination?.total]
    )

    // Generar números de página a mostrar
    const getPageNumbers = useMemo(() => {
        if (!pagination) return []

        const pages: (number | 'ellipsis')[] = []
        const maxVisiblePages = 5
        const { currentPage } = pagination

        if (totalPages <= maxVisiblePages) {
            // Mostrar todas las páginas si son pocas
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Mostrar páginas con ellipsis
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i)
                pages.push('ellipsis')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('ellipsis')
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
            } else {
                pages.push(1)
                pages.push('ellipsis')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
                pages.push('ellipsis')
                pages.push(totalPages)
            }
        }

        return pages
    }, [totalPages, pagination?.currentPage])

    const handlePageChange = (newPage: number | ((prev: number) => number)) => {
        if (!pagination) return

        const page = typeof newPage === 'function'
            ? newPage(pagination.currentPage)
            : newPage

        pagination.onPageChange(page)
    }

    return (
        <>
            <Table className={className}>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead key={index}>{column.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                <div className="flex items-center justify-center h-24">
                                    <Spinner />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column, colIndex) => (
                                    <TableCell key={colIndex}>{row[column.accessorKey] as React.ReactNode}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {pagination && (
                <div className="mt-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handlePageChange(prev => Math.max(1, prev - 1))
                                    }}
                                    className={pagination.currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                    text=""
                                    data-testid="pagination-previous"
                                />
                            </PaginationItem>

                            {getPageNumbers.map((page, index) => (
                                <PaginationItem key={index}>
                                    {page === 'ellipsis' ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            className={pagination.currentPage === page ? 'pointer-events-none bg-blueCyan' : ''}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(page)
                                            }}
                                            isActive={pagination.currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handlePageChange(prev => Math.min(totalPages, prev + 1))
                                    }}
                                    className={pagination.currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                    text=""
                                    data-testid="pagination-next"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </>
    )
}