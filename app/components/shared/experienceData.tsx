import { ReactNode } from "react"
import Link from "next/link"

type BulletedDetail = string | ReactNode

export interface ExperienceDataProps {
    title: string,
    summary: string | ReactNode,
    bulletedDetails?: BulletedDetail[]
}

const ExperienceData = ({
    title, summary, bulletedDetails = []
}: ExperienceDataProps) => {
    return (
        <div className="mt-1.5">
            <h2 className="font-bold">{title}</h2>
            <span className="">
                {summary}
                <ul className="list-disc pl-6 mt-1 space-y-1">
                    {bulletedDetails.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
            </span>
        </div>
    )
}

export default ExperienceData