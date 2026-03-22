import ExperienceCard, { ExperienceCardProps } from "@/app/components/shared/experienceCard"
import { ExperienceDataProps } from "@/app/components/shared/experienceData"

const rigupAchievementsData: ExperienceDataProps[] = [
    {
        title: "Mobile Location Tracking & Geofencing",
        summary: "Built the mobile location tracking and geofencing infrastructure for RigUp's workforce management platform.",
        bulletedDetails: [
            "Gave customers real-time visibility into contracted worker locations and job site activity.",
            "Improved offline tracking fault tolerance to ensure accurate data collection during extended work in low-connectivity regions.",
        ]
    },
    {
        title: "Marketing Site Decomposition",
        summary: "Served as tech lead on the Growth team, leading the effort to decompose the RigUp marketing site and homegrown CMS out of the web application monolith.",
        bulletedDetails: [
            "Decoupled marketing deployments from the primary web app release cycle, reducing cross-team coordination overhead.",
        ]
    },
]

const rigupTechnologies: string[] = [
    'TypeScript', 'JavaScript', 'React', 'React Native', 'Angular', 'Ruby on Rails', 'Node.js', 'GraphQL', 'AWS', 'PostgreSQL', 'Redis'
]

const rigupJob = {
    companyName: 'RigUp',
    title: 'Full Stack Engineer',
    start: new Date('2018-10-01'),
    end: new Date('2020-11-01'),
    website: 'https://www.rigup.com/',
}

const experiencePageDetails: ExperienceCardProps = {
    job: rigupJob,
    experience: {
        summary: 'Full Stack Engineer delivering features across web and mobile spanning work contracting, onboarding, time tracking, invoice submission, and data visualizations. Supported front-end clients through a Ruby on Rails monolith and Node.js microservices.',
        achievements: rigupAchievementsData,
        experienceQuery: 'short summary of rigup experience'
    },
    tech: {
        technologies: rigupTechnologies,
        variant: 'darkblue'
    }
}

const RigUpExperience = () => {
    return (
        <div className="py-6 self-center px-1.5 w-full max-w-2xl">
            <ExperienceCard {...experiencePageDetails} />
        </div>
    )
}

export default RigUpExperience
