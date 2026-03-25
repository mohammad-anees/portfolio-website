'use client';

import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Boxes } from "lucide-react"
import { navigation } from "./navigation.data"
import { usePathname } from "next/navigation"

export function AppSidebar() {
    const pathname = usePathname()

    const isActivePath = (url: string) => (pathname === url)

    return (
        <Sidebar>
            <SidebarHeader className="py-4 bg-secondary">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex gap-2 px-2 text-gray-300">
                            <Boxes />
                            <h1 className="text-md font-bold uppercase">Mohammad Anees</h1>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {navigation.map((navSection) => (
                    <SidebarGroup key={navSection.sectionTitle} className="list-none">
                        <SidebarGroupLabel>{navSection.sectionTitle}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            {navSection.links.map((link) => (
                                <SidebarMenuItem key={link.name}>
                                    <SidebarMenuButton asChild isActive={isActivePath(link.url)}>
                                        <a href={link.url} target={link.newWindow ? '_blank' : undefined}>
                                            {link.icon}
                                            <span>{link.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}