'use client';

import { useState } from "react";
import { Boxes, Menu, X } from "lucide-react";
import { navigation } from './navigation.data'
import Link from "next/link"
import { usePathname } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export const NavBar = () => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
            <div className="flex items-center gap-2">
                <Boxes size={22} />
                <span className="font-bold uppercase tracking-wide text-base">
                    Mohammad Anees
                </span>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button className="p-2 rounded-md hover:bg-accent transition-colors">
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl px-0 pb-8" aria-describedby={undefined}>
                    <VisuallyHidden><SheetTitle>Navigation</SheetTitle></VisuallyHidden>
                    <nav className="mt-4">
                        {navigation.map(section => (
                            <div key={section.sectionTitle}>
                                <p className="px-6 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                    {section.sectionTitle}
                                </p>
                                {section.links.map(link => (
                                    <Link
                                        key={link.name}
                                        href={link.url}
                                        target={link.newWindow ? '_blank' : undefined}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center gap-4 px-6 py-4 text-base font-medium transition-colors hover:bg-accent ${pathname === link.url ? 'bg-accent text-accent-foreground' : ''}`}
                                    >
                                        <span className="text-muted-foreground [&>svg]:size-5">{link.icon}</span>
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    )
}
