import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/common/components/ui/card'
import Image from 'next/image'
import React from 'react'
import IconIncome from '@/common/assets/income.svg'
import IconReport from '@/common/assets/report.svg'
import IconUsers from '@/common/assets/users.svg'
import Link from 'next/link'
import { routes } from '@/common/constants/routes'


const CardsView = () => {
    return (
        <div className='flex gap-6 flex-row justify-around items-center overflow-auto py-4'>
            <Link href={routes.movements}>
                <Card className='hover:bg-blue-900'>
                    <CardHeader>
                        <CardTitle className='text-center'>Sistema de gestión de ingresos y gastos</CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-center'>
                        <Image src={IconIncome} width={200} height={200} alt="Icon Income" />
                    </CardContent>
                    <CardFooter>
                        <ol className="list-disc list-inside space-y-1">
                            <li>Vista de Ingresos y Egresos</li>
                            <li>Formulario de Nuevo Ingreso/Egreso</li>
                        </ol>
                    </CardFooter>
                </Card>
            </Link>

            <Link href={routes.users}>
                <Card className='hover:bg-blue-900'>
                    <CardHeader>
                        <CardTitle className='text-center'>Gestión de usuarios</CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-center'>
                        <Image src={IconUsers} width={200} height={200} alt="Icon Users" />
                    </CardContent>
                    <CardFooter className='text-center'>
                        <ol className="list-disc list-inside space-y-1">
                            <li>Vista de Usuarios</li>
                            <li>Edición de Usuario</li>
                        </ol>
                    </CardFooter>
                </Card>
            </Link>

            <Link href={routes.reports}>
                <Card className='hover:bg-blue-900'>
                    <CardHeader>
                        <CardTitle className='text-center'>Reportes</CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-center'>
                        <Image src={IconReport} width={200} height={200} alt="Icon Report" />
                    </CardContent>
                    <CardFooter>
                        <ol className="list-disc list-inside space-y-1">
                            <li>gráfico de movimientos financieros</li>
                            <li>Mostrar el saldo actual</li>
                            <li>descargar el reporte en formato CSV</li>
                        </ol>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    )
}

export default CardsView