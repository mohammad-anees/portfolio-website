import ExperienceCard, { ExperienceCardProps } from "@/app/components/shared/experienceCard"
import { ExperienceDataProps } from "@/app/components/shared/experienceData"

const gmAchievementsData: ExperienceDataProps[] = [
    {
        title: "Shared Internal Component Library",
        summary: "Built a shared internal component library to accelerate application development and enforce UI consistency across teams.",
    },
    {
        title: "Legacy Application Maintenance",
        summary: "Maintained and improved legacy manufacturing applications, triaging and resolving production issues to minimize plant disruptions.",
    },
]

const gmTechnologies: string[] = [
    'TypeScript', 'JavaScript', 'Angular', 'HTML', 'CSS', 'LESS', '.NET', '.NET Core'
]

const gmJob = {
    companyName: 'General Motors',
    title: 'Software Engineer',
    start: new Date('2016-06-01'),
    end: new Date('2018-10-01'),
    website: 'https://www.gm.com/',
}

const experiencePageDetails: ExperienceCardProps = {
    job: gmJob,
    experience: {
        summary: 'Software Engineer in the Manufacturing Quality department, developing software solutions to improve vehicle quality across GM plants. Primarily worked on front-end systems using Angular, TypeScript, JavaScript, HTML, and CSS/LESS, with some .NET and .NET Core.',
        achievements: gmAchievementsData
    },
    tech: {
        technologies: gmTechnologies,
        variant: 'default'
    }
}

const GMExperience = () => {
    return (
        <div className="py-6 self-center w-md md:w-full max-w-2xl">
            <ExperienceCard {...experiencePageDetails} />
        </div>
    )
}

export default GMExperience
