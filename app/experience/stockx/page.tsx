import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import ExperienceData, { ExperienceDataProps } from "@/app/components/shared/experienceData"

const stockxAchievementsData: ExperienceDataProps[] = [
    {
        title: "Market Pipeline Rebuild",
        summary: "Lead the design, implementation, and migration of major architecture at the heart of the StockX marketplace and critical to creating orders:",
        bulletedDetails: [
            "Built leveraging event based design (Kafka), data-streaming frameworks (Flink), containerized microservices (K8s/Node/Typescript), and AWS Infrastructure.",
            <>Migrated <b>10,000 req/s</b> API traffic without incident, while maintaining <b>15ms p99 SLA</b>.</>,
            "80% reduction in latency for bid/ask time to market through optimizations on caching strategy and Kafka consumers.",
            <>Reduced an <b>8+ hour</b> market recalculation process to 2 hours, while simultaneously <b>removing the 15% and 20%</b> increase in sell/buy now failures during that time.</>,
            <>
                Necessary for the launch of <Link className="text-blue-400" href="https://stockx.com/lp/xpress-ship/">StockX Express Shipping</Link> Initiative,
                successfully scaled for the <Link className="text-blue-400" href="https://stockx.com/news/introducing-the-stockx-verified-seller-program/">Verified Seller Program</Link> which now account for <b>50% of all StockX orders</b>.
            </>
        ]
    },
    {
        title: "Dynamic Matching",
        summary: `
        Implemented a dynamic matching system that let business teams configure special bid to ask matching
        ranges across a variety of attributes. With the patterns and services built for this project being
        eventually re-used as part of larger initiatives.
        `
    },
    {
        title: "Buy Fee Configuration",
        summary: "Delivered an upgraded fee configuration system bringing in $6.5M revenue in Q4 2021, and est. $37.5M in 2022."
    },
    {
        title: "Launch Readiness Analytical Service",
        summary: "Developed analytical service to guide launch decisions of legacy vs decomposed systems leveraging custom Datadog metrics, monitors, and dashboards."
    }
]

const stockxTechnologies: string[] = ['NodeJs', 'Kafka', 'AWS', 'Postgres', 'Redis', 'Spring Boot', 'Kotlin', 'Php', 'Go']


const StockXExperience = () => {
    return (
        <div className="mt-4 self-center w-md md:w-full max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-3xl pb-1">StockX</h1>
                        <div className="space-x-2">
                            <Badge variant="secondary">Nov 2020 - Present</Badge>
                            <Badge variant="secondary">Senior Software Engineer</Badge>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        <p>
                            Engineer on the Core Services Team, responsible for the state of the StockX global market, ensuring
                            successful matches, and order creation and management.
                        </p>
                    </CardDescription>
                    <CardAction>
                        <Button variant="secondary"><ExternalLink /></Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <h1 className="text-xl font-bold">Achievements</h1>
                        {stockxAchievementsData.map((achievement, index) => <ExperienceData key={index} {...achievement} />)}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold mb-1.5">Technologies</h1>
                        <div className="space-x-2">
                            {stockxTechnologies.map((tech, index) => <Badge className="bg-blue-950 text-blue-300" key={index}>{tech}</Badge>)}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="justify-end">
                    <Button variant="ghost" size="sm">Get More Details</Button>
                    <Button variant="outline" size="sm">View Full Resume</Button>
                </CardFooter>
            </Card>
        </div >
    )
}

export default StockXExperience
