import { Spinner } from "@/common/components/ui/spinner";

export const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <Spinner />
        </div>
    )
}