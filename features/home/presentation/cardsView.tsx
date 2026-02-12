import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/common/components/ui/card'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useUserRole } from '@/common/infrastructure/users/hooks'
import { cardDashboardFeatures } from './data/card-dashboard-features'
import { UserRole } from '@/common/domain/users/entities'
import { SkeletonGeneral } from '@/common/components'
import { Skeleton } from '@/common/components/ui/skeleton'

interface CardsViewProps {
    userId: string;
}

const CardsView = ({ userId }: CardsViewProps) => {
    const { data, isLoading } = useUserRole(userId);

    if (isLoading) {
        return (
            <div className='flex gap-6 flex-col justify-around items-center overflow-auto py-4'>
                <SkeletonGeneral />
                <Skeleton className='h-28 w-full bg-gray-500' />
            </div>
        );
    }

    return (
        <div className='flex gap-6 flex-row justify-around items-center overflow-auto py-4'>
            {
                cardDashboardFeatures.filter((feature) => feature.roles.includes(data?.role! as UserRole)).map((feature) => (
                    <Link href={feature.href}>
                        <Card className='hover:bg-blue-900'>
                            <CardHeader>
                                <CardTitle className='text-center'>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className='flex justify-center'>
                                <Image src={feature.image} width={200} height={200} alt={feature.alt} />
                            </CardContent>
                            <CardFooter>
                                <ol className="list-disc list-inside space-y-1">
                                    {feature.items.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ol>
                            </CardFooter>
                        </Card>
                    </Link>
                ))
            }
        </div>
    )
}

export default CardsView