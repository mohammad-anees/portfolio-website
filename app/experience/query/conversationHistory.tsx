import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Circle } from "lucide-react"
import Markdown from "react-markdown"

export interface ConversationItem {
    query: string,
    response: string,
    loading: boolean,
    error?: boolean,
}

export const ConversationHistory = ({ conversationHistory }: { conversationHistory: ConversationItem[] }) => {
    const getStatusIcon = (conversationItem: ConversationItem) => {
        const { loading, error } = conversationItem

        if (loading) return <Circle size='8' className="my-auto" />
        if (error) return <Circle size='8' className="my-auto text-red-600 fill-red-600" />

        return <Circle size='8' className="my-auto text-green-600 fill-green-600" />
    }

    return (
        <div className="py-5 px-2 flex-1 self-center w-xs sm:w-full max-w-2xl">
            <div className="flex flex-col h-full justify-end space-y-4">
                {conversationHistory.map((convo, index) => (
                    <div key={index}>
                        <div className="flex space-x-1">
                            {getStatusIcon(convo)}
                            <h1 className="font-bold uppercase text-xs text-gray-400">
                                {convo.query}
                            </h1>
                        </div>
                        {convo.loading ?
                            <>
                                <Skeleton className="h-4 mt-2" />
                                <Skeleton className="h-4 mt-2" />
                                <Skeleton className="h-4 mt-2 w-3/4" />
                            </> :
                            <Markdown>{convo.response}</Markdown>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}