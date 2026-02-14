import { Button } from "@/common/components/ui/button"
import { GoDownload } from "react-icons/go"
import { downloadCSV } from "@/features/reports/presentation/data"

interface DownloadReportCSVProps {
    data: {
        csv: string
    },
    isLoading: boolean,
    error: Error | null,
    refetch: () => void
}

export const DownloadReportCSV = ({ data, isLoading, error, refetch }: DownloadReportCSVProps) => {
    return (
        <Button onClick={() => downloadCSV(data)} className='px-4 py-2 rounded-full font-semibold bg-blueCyan text-white flex gap-4'>
            <GoDownload />
            Descargar reporte en CSV
        </Button>
    )
}