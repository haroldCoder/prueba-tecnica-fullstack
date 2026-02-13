import { Column } from "@/common/components/DataTable";

interface MovementData {
    concept: string
    amount: number
    date: string
    user: string
}

export const dataTableColumns: Column<MovementData>[] = [
    {
        accessorKey: "concept",
        header: "Concepto",
    },
    {
        accessorKey: "amount",
        header: "Monto",
    },
    {
        accessorKey: "date",
        header: "Fecha",
    },
    {
        accessorKey: "user",
        header: "Usuario",
    },
]
