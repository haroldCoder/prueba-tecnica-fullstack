import { Column } from "@/common/components/DataTable";
import { MovementTableDTO } from "../../application/dto/movement-table.dto";

export const dataTableColumns: Column<MovementTableDTO>[] = [
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
