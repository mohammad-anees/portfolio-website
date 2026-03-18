import { Baby, BotMessageSquare, Car, Fuel, X } from "lucide-react";

interface Navigation {
    sectionTitle: string,
    links: NavigationConfiguration[]
}

interface NavigationConfiguration {
    name: string,
    url: string,
    icon?: React.ReactElement
    active?: boolean
}

export const navigation: Navigation[] = [
    {
        sectionTitle: "Experience",
        links: [
            { name: 'Ask AI', url: '/experience/query', icon: <BotMessageSquare /> },
            { name: 'StockX', url: '/experience/stockx', icon: <X /> },
            { name: 'RigUp', url: '/experience/rigup', icon: <Fuel /> },
            { name: 'General Motors', url: '/experience/gm', icon: <Car /> },
        ]
    },
    {
        sectionTitle: "Yusra Mags",
        links: [
            { name: 'Year 1', url: '/yusra-mag/year-one', icon: <Baby /> },
            { name: 'Year 2', url: '/yusra-mag/year-two', icon: <Baby /> },
        ]
    }
]