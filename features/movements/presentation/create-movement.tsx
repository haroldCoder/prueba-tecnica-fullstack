import { Input } from '@/common/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/ui/select'
import React from 'react'
import { MovementTypeEnum } from '../domain/entities'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateMovementForm, CreateMovementSchema } from '../application/dto/create-movement-form.schema'
import { Button } from '@base-ui/react'
import { useCreateMovement } from '../infrastructure/hooks/use-create-movement'
import { useAuth } from '@/common/auth/hooks/use-auth'
import { Spinner } from '@/common/components/ui/spinner'

const CreateMovement = () => {
    const form = useForm<CreateMovementForm>({
        resolver: zodResolver(CreateMovementSchema),
        defaultValues: {
            concept: "",
            amount: undefined,
            date: new Date(),
            type: undefined,
        },
    });

    const { user } = useAuth();
    const { createMovementAsync, loading } = useCreateMovement();

    const onSubmit = (data: CreateMovementForm) => {
        createMovementAsync({ ...data, userId: user?.id || "" });
        form.reset();
    };

    return (
        <>
            {
                loading &&
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md'>
                    <Spinner />
                </div>
            }
            <div className='flex items-center justify-center w-full h-[calc(100vh-134px)]'>
                <form className='w-full max-w-4xl flex flex-col' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 items-center grid-rows-2 gap-4'>
                        <Input className='focus:border-2 focus:border-blueCyan' placeholder='Concepto' {...form.register("concept")} />
                        <Controller
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <Input
                                    placeholder="Monto"
                                    inputMode="decimal"
                                    value={
                                        field.value !== undefined && field.value !== null
                                            ? new Intl.NumberFormat("es-CO").format(field.value)
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\./g, "").replace(",", ".");
                                        const numberValue = parseFloat(rawValue);

                                        field.onChange(isNaN(numberValue) ? undefined : numberValue);
                                    }}
                                    className="focus:border-2 focus:border-blueCyan"
                                />
                            )}
                        />
                        <Input className='focus:border-2 focus:border-blueCyan' placeholder='Fecha' type='date' {...form.register("date", {
                            valueAsDate: true,
                        })} />
                        <Controller
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="focus:border-2 focus:border-blueCyan">
                                        <SelectValue placeholder="Tipo de movimiento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={MovementTypeEnum.INCOME}>Ingreso</SelectItem>
                                        <SelectItem value={MovementTypeEnum.EXPENSE}>Egreso</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className='flex justify-center px-16 mt-16'>
                        <Button className='bg-blue-500 hover:bg-blueCyan rounded-full text-white px-6 py-2' type='submit'>Crear movimiento</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateMovement
