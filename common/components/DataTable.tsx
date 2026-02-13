import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export type Column<T> = {
    header: string
    accessorKey: keyof T
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    className?: string
}

export const DataTable = <T,>({ columns, data, className }: DataTableProps<T>) => {
    return (
        <Table className={className}>
            <TableHeader>
                <TableRow>
                    {columns.map((column, index) => (
                        <TableHead key={index}>{column.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow key={index}>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{row[column.accessorKey] as React.ReactNode}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}