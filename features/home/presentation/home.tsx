import React from 'react'
import CardsView from './cardsView'

const Home = () => {
    return (
        <main>
            <section className="flex flex-row justify-around overflow-auto">
                <div className="w-10 mt-8">
                    <h1 className="text-4xl md:text-5xl font-semibold text-foreground">
                        Bienvenido al aplicativo de
                        <span className="bg-gradient-to-r m-4 from-blueCyan via-gray-300 to-blueCyan bg-clip-text text-transparent">
                            PrevalentWare
                        </span>
                    </h1>
                </div>
                <div className='h-screen flex flex-col gap-6 items-center justify-end'>
                    <span className='text-gray-400 text-start text-lg'>Elije una accion para iniciar.</span>
                    <CardsView />
                </div>
            </section>
        </main>
    )
}

export default Home