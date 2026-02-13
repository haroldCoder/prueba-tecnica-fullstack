import { Column } from "@/common/components/DataTable";
import { UserTableDTO } from "@/features/users/application/dto/user-table.dto";

export const DataTableUserColumns: Column<UserTableDTO>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "email",
        header: "Correo",
    },
    {
        accessorKey: "phone",
        header: "Teléfono",
    },
    {
        accessorKey: "edit",
        header: "",
    }
];