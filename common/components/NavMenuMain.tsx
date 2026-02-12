"use client"

import * as React from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/common/components/ui/navMenu"
import Image from "next/image"
import logoPrevalent from "@/common/assets/logoprevalent.svg"
import { routes } from "../constants/routes"

export function NavMenuMain() {
    return (
        <div className="flex w-full justify-between px-8 py-5">
            <Image src={logoPrevalent} alt="Logo" width={250} height={150} />

            <NavigationMenu>
                <NavigationMenuList className="flex gap-2">
                    <NavigationMenuItem>
                        <Link href={routes.movements} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <p className="text-lg">Ingresos y Egresos</p>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={routes.users} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <p className="text-lg">Usuarios</p>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={routes.reports} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <p className="text-lg">Reportes</p>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
