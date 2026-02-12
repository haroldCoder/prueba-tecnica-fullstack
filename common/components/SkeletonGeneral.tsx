import React from 'react'
import { Skeleton } from '@/common/components/ui/skeleton'

export const SkeletonGeneral = () => {
    return (
        <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full bg-blueCyan" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gray-500" />
                <Skeleton className="h-4 w-[200px] bg-gray-500" />
            </div>
        </div>
    )
}