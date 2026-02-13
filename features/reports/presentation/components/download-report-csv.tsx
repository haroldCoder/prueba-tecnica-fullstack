import { Button } from "@/common/components/ui/button"
import { GoDownload } from "react-icons/go"

export const DownloadReportCSV = () => {
    return (
        <Button className='px-4 py-2 rounded-full font-semibold bg-blueCyan text-white flex gap-4'>
            <GoDownload />
            Descargar reporte en CSV
        </Button>
    )
}