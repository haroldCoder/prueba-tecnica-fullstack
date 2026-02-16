import { Input } from '@/common/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/ui/select';
import { Button } from '@/common/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useFetchUserById, usersKeys, useUpdateUser } from '@/features/users/infrastructure/hooks';
import { Spinner } from '@/common/components/ui/spinner';
import { roleFormOptions } from '@/features/users/presentation/data';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/common/auth/hooks/use-auth';

const UpdateUser = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.userid as string;

    const { data: user, isLoading } = useFetchUserById(id);
    const { user: userMe } = useAuth();
    const { updateUser, loading: updating } = useUpdateUser();
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            role: '',
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                role: user.role || 'USER',
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: { name: string; role: string }) => {
        updateUser(
            { userId: id, data },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: usersKeys.all });
                    setTimeout(() => {
                        router.push('/users');
                    }, 1500);
                },
                onError: (error) => {
                    console.error(error);
                }
            }
        );
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-[calc(100vh-134px)]'>
                <Spinner />
            </div>
        );
    }

    return (
        <>
            {updating && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md'>
                    <Spinner />
                </div>
            )}
            <div className='flex items-center justify-center h-[calc(100vh-134px)]'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-96'>
                    <div>
                        <label className='block mb-2 text-sm'>Nombre</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input placeholder='Nombre' id='name' {...field} />
                            )}
                        />
                    </div>

                    <div>
                        <label className='block mb-2 text-sm'>Rol</label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    disabled={userMe?.id === id}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roleFormOptions.map((role) => (
                                            <SelectItem key={role.value} value={role.value}>
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className='flex gap-2 mt-12'>
                        <Button type="submit" className='flex-1' disabled={updating}>
                            {updating ? 'Actualizando...' : 'Actualizar'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className='flex-1'
                            onClick={() => router.push('/users')}
                            disabled={updating}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateUser