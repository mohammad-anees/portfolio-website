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
import { BotMessageSquareIcon, ExternalLink } from "lucide-react"
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
    },
    tech: {
        technologies: string[],
        variant: "link" | "default" | "secondary" | "destructive" | "outline" | "ghost" | "darkblue" | "darkgreen" | null | undefined
    }
}

const ExperienceCard = ({ job, experience, tech }: ExperienceCardProps) => {
    const dateFormat: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }
    const startDate = job.start.toLocaleDateString('en-US', dateFormat)
    const endDate = job.end?.toLocaleDateString('en-US', dateFormat) ?? 'Present'

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h1 className="text-3xl pb-1">{job.companyName}</h1>
                    <p>{job.title}</p>
                </CardTitle>
                <CardDescription>
                    <h1 className="text-md font-bold">{startDate} - {endDate}</h1>
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
                    <p className="text-lg">
                        {experience.summary}
                    </p>
                </div>
                <div>
                    <h1 className="text-xl font-bold">Achievements</h1>
                    {experience.achievements.map((achievement, index) => <ExperienceData key={index} {...achievement} />)}
                </div>
                <div>
                    <h1 className="text-xl font-bold mb-1.5">Technologies</h1>
                    <div className="space-x-2 space-y-1">
                        {tech.technologies.map((technology, index) => <Badge variant={tech.variant} key={index}>{technology}</Badge>)}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-end space-x-1">
                <Link href="/experience/query">
                    <Button variant="ghost" size="sm">
                        Get More Details
                        <BotMessageSquareIcon />
                    </Button>
                </Link>
                <Link href="/" target="_blank">
                    <Button variant="outline" size="sm">
                        View Full Resume
                        <ExternalLink />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ExperienceCard
