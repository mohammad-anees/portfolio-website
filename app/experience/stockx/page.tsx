import Link from "next/link"
import { ExperienceDataProps } from "@/app/components/shared/experienceData"
import ExperienceCard, { ExperienceCardProps } from "@/app/components/shared/experienceCard"

const stockxAchievementsData: ExperienceDataProps[] = [
    {
        title: "Core Marketplace Architecture Rebuild",
        summary: "Led the design, implementation, and zero-downtime migration of the core marketplace architecture responsible for all order creation on StockX.",
        bulletedDetails: [
            "Built on event-driven design (Kafka), data-streaming frameworks (Flink), containerized microservices (K8s/Node/Typescript), and AWS infrastructure.",
            <>Migrated <b>10,000 req/s</b> of API traffic without incident while maintaining a <b>15ms p99 latency SLA</b>.</>,
            <>Achieved an <b>80% reduction</b> in bid/ask time-to-market by optimizing caching strategy and Kafka consumer throughput.</>,
            <>Reduced an <b>8+ hour</b> market recalculation process to <b>2 hours</b> while eliminating all trading disruptions and client instability during execution.</>,
            <>
                Enabled the launch of the <Link className="text-blue-400" href="https://stockx.com/lp/xpress-ship/" target="_blank">StockX Express Shipping Initiative</Link>, then successfully scaled to support the <Link className="text-blue-400" href="https://stockx.com/news/introducing-the-stockx-verified-seller-program/" target="_blank">Verified Seller program</Link>. Combined, these two initiatives account for <b>50% of all StockX orders</b> today.
            </>
        ]
    },
    {
        title: "Intelligent Fulfillment",
        summary: "Led the Intelligent Fulfillment initiative, decomposing the automated order reconciliation system to support more complex recovery rules, onboard new inventory sources, and improve operational visibility.",
        bulletedDetails: [
            <>Stabilized order recovery to a consistent <b>60% rate</b> for seller-cancelled, failed-to-ship, and failed verification seller items, recovering approximately <b>$100K per week</b> in net revenue. Replaced a previous process with a recovery rate that fluctuated heavily with market trends.</>
        ]
    },
    {
        title: "Dynamic Bid/Ask Matching",
        summary: "Designed and implemented a dynamic matching system enabling business teams to configure custom bid-to-ask matching ranges across a variety of product attributes. The underlying patterns and services became foundational to subsequent platform-wide initiatives."
    },
    {
        title: "Fee Configuration System",
        summary: <>Delivered an upgraded fee configuration system that generated <b>$6.5M in revenue in Q4 2021</b>, with an estimated <b>$37.5M impact for 2022</b>.</>
    },
]

const stockxTechnologies: string[] = [
    'Typescript', 'Javascript', 'NodeJs', 'Kafka', 'AWS', 'SQL', 'Redis',
    'Apache Flink', 'Kubernetes', 'Spring Boot', 'Kotlin', 'Php', 'Go'
]

const stockxJob = {
    companyName: 'StockX',
    title: 'Senior Software Engineer',
    start: new Date('11-1-2020'),
    website: 'https://stockx.com/',
}

const experiencePageDetails: ExperienceCardProps = {
    job: stockxJob,
    experience: {
        summary: 'Core Services engineer owning the systems that power the StockX global marketplace, including order matching, trade execution, and market state management. Lead projects end-to-end from discovery to delivery against company OKRs, mentor engineers on development best practices, and serve as an incident commander for production issues.',
        achievements: stockxAchievementsData,
        experienceQuery: 'short summary of stockx experience'
    },
    tech: {
        technologies: stockxTechnologies,
        variant: 'darkgreen'
    },
}

const StockXExperience = () => {
    return (
        <div className="py-6 self-center px-1.5 w-full max-w-2xl">
            <ExperienceCard {...experiencePageDetails} />
        </div >
    )
}

export default StockXExperience
