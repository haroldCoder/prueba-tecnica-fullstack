import { Column } from "@/common/components/DataTable";
import { UserTableDTO } from "@/features/users/application/dto/user-table.dto";

export const DataTableUserColumns: Column<UserTableDTO>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
        testId: "name"
    },
    {
        accessorKey: "email",
        header: "Correo",
        testId: "email"
    },
    {
        accessorKey: "phone",
        header: "Teléfono",
        testId: "phone"
    },
    {
        accessorKey: "edit",
        header: "",
        testId: "edit"
    }
];