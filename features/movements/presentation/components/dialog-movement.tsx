import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/common/components/ui/alert-dialog"
import Link from "next/link"
import { IoMdInformationCircle } from "react-icons/io"

interface DialogMovementProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const DialogMovement = ({ open, onOpenChange }: DialogMovementProps) => {

    const handleCreateMovement = () => {
        onOpenChange(false)
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-center w-full">
                        <div className="bg-white rounded-full">
                            <IoMdInformationCircle className="text-5xl text-blueCyan" />
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center mt-6 mb-2 w-full">
                        ¡Enhorabuena!
                        <br />
                        Elije la acción que deseas realizar
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center w-full gap-5">
                    <AlertDialogCancel onClick={handleCreateMovement}>Crear movimiento</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Link href="/movements">Ver movimientos</Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}