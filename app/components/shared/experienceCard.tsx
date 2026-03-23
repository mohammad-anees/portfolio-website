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
import { BotMessageSquareIcon, ExternalLink, Paperclip } from "lucide-react"
import Link from "next/link"
import ExperienceData, { ExperienceDataProps } from "@/app/components/shared/experienceData"
import { Separator } from "@/components/ui/separator"
import { ReactNode } from "react"

export interface ExperienceCardProps {
    job: {
        companyName: string,
        title: string,
        start: Date,
        end?: Date,
        website: string,
    }
    experience: {
        summary: string | ReactNode,
        achievements: ExperienceDataProps[],
        experienceQuery?: string
    },
    tech: {
        technologies: string[],
        variant: "link" | "default" | "secondary" | "destructive" | "outline" | "ghost" | "darkblue" | "darkgreen" | null | undefined
    },
}

const ExperienceCard = ({ job, experience, tech, }: ExperienceCardProps) => {
    const dateFormat: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }
    const startDate = job.start.toLocaleDateString('en-US', dateFormat)
    const endDate = job.end?.toLocaleDateString('en-US', dateFormat) ?? 'Present'
    const experiencePath = experience.experienceQuery ? `/experience/query?query=${encodeURIComponent(experience.experienceQuery)}` : '/experience/query'

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h1 className="text-3xl pb-1">{job.companyName}</h1>
                    <p className="uppercase mt-1 text-gray-300">{job.title}</p>
                </CardTitle>
                <CardDescription>
                    <h1 className="text-md font-bold uppercase">{startDate} - {endDate}</h1>
                </CardDescription>
                <CardAction>
                    <Button variant="secondary">
                        <Link href={job.website} target="_blank"><ExternalLink /></Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4">
                <div className="pb-2">
                    <p className="text-md font-medium">
                        {experience.summary}
                    </p>
                </div>
                <div>
                    <h1 className="text-xl font-bold uppercase">Achievements</h1>
                    {experience.achievements.map((achievement, index) => <ExperienceData key={index} {...achievement} />)}
                </div>
                <div>
                    <h1 className="text-xl font-bold mb-1.5 uppercase">Technologies</h1>
                    <div className="space-x-2 space-y-1 px-1.5">
                        {tech.technologies.map((technology, index) => <Badge variant={tech.variant} key={index}>{technology}</Badge>)}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-end space-x-1">
                <div className="rounded-md gradient-border">
                    <Link href={experiencePath}>
                        <Button variant="ghost" size="sm" className="rounded-[calc(var(--radius-md)-1px)]">
                            Get More Details
                            <BotMessageSquareIcon />
                        </Button>
                    </Link>
                </div>
                <div className="rounded-md p-px">
                    <Link href="/resume.pdf" target="_blank">
                        <Button variant="ghost" className="rounded-[calc(var(--radius-md)-1px)]">
                            View Full Resume
                            <Paperclip />
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

export default ExperienceCard
