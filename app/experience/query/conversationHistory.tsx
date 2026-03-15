import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import Markdown from "react-markdown"

export interface ConversationItem {
    query: string,
    response: string,
    loading: boolean,
}

export const ConversationHistory = ({ conversationHistory }: { conversationHistory: ConversationItem[] }) => {
    return (
        <div className="py-5 px-2 flex-1 self-center w-xs sm:w-full max-w-2xl">
            <div className="flex flex-col h-full justify-end space-y-4">
                {conversationHistory.map((convo, index) => (
                    <div key={index}>
                        <h1 className="font-bold uppercase text-xs text-gray-400">{convo.query}</h1>
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