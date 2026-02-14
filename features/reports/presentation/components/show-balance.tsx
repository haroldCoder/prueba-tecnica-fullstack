import React, { useMemo } from 'react'
import { IoEyeOffSharp, IoEye } from "react-icons/io5"
import { FaAsterisk } from 'react-icons/fa'

interface ShowBalanceProps {
    balance: number
}

export const ShowBalance = ({ balance }: ShowBalanceProps) => {
    const [showBalance, setShowBalance] = React.useState(true)

    const formattedBalance = useMemo(() => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2,
        }).format(balance)
    }, [balance])

    return (
        <div className='flex text-2xl font-semibold items-center gap-2'>
            <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <IoEyeOffSharp /> : <IoEye />}
            </button>
            {showBalance ? formattedBalance : Array.from({ length: 3 }).map((_, i) => <FaAsterisk key={i} className='text-lg' />)}
        </div>
    )
}
