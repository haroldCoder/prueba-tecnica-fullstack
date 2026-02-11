import { cn } from '@/common/components/ui/utils/cn';
import { Loader2 } from 'lucide-react';

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

function Spinner({ className, ...props }: SpinnerProps) {
    return (
        <Loader2
            role="status"
            aria-label="Loading"
            className={cn('h-12 w-12 animate-spin text-white', className)}
            {...props}
        />
    );
}

export { Spinner };
