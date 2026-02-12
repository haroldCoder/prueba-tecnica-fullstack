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
import { useUserRole } from "@/common/infrastructure/users/hooks"
import { navMenuItems } from "./data/nav-menu-items"
import { UserRole } from "@/common/domain/users/entities"
import { SkeletonGeneral } from "@/common/components"

interface NavMenuMainProps {
    userId: string;
}

export function NavMenuMain({ userId }: NavMenuMainProps) {
    const { data, isLoading } = useUserRole(userId);

    return (
        <div className="flex w-full justify-between px-8 py-5">
            <Image src={logoPrevalent} alt="Logo" width={250} height={150} />
            {
                isLoading ?
                    <SkeletonGeneral />
                    :
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-2">
                            {
                                navMenuItems.filter((item) => item.roles.includes(data?.role! as UserRole)).map((item) => (
                                    <NavigationMenuItem key={item.href}>
                                        <Link href={item.href} legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                <p className="text-lg">{item.label}</p>
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                ))
                            }
                        </NavigationMenuList>
                    </NavigationMenu>
            }
        </div>
    )
}
