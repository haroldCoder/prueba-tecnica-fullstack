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
import { routes } from "../constants/routes"

interface NavMenuMainProps {
    userId: string;
}

export function NavMenuMain({ userId }: NavMenuMainProps) {
    const { data, isLoading } = useUserRole(userId);

    return (
        <div className="flex w-full justify-between px-8 py-5">
            <Link href={routes.home}>
                <Image src={logoPrevalent} alt="Logo" width={250} height={150} />
            </Link>
            {
                isLoading ?
                    <SkeletonGeneral />
                    :
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-2">
                            {navMenuItems
                                .filter((item) =>
                                    item.roles.includes(data?.role as UserRole)
                                )
                                .map((item) => {
                                    const isDocs = item.href === routes.docs;

                                    return (
                                        <NavigationMenuItem key={item.href}>
                                            <Link href={item.href} legacyBehavior passHref>
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    {isDocs ? (
                                                        <div className="py-2 px-4 rounded-full bg-blueCyan">
                                                            <p className="text-md font-semibold text-white">
                                                                {item.label}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-lg">{item.label}</p>
                                                    )}
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem>
                                    );
                                })}
                        </NavigationMenuList>
                    </NavigationMenu>
            }
        </div>
    )
}
