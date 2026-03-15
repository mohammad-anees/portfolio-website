import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Circle } from "lucide-react"
import Markdown from "react-markdown"

export enum ConversationItemState {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning'
}

export interface ConversationItem {
    query: string,
    response: string,
    state: ConversationItemState
}

export const ConversationHistory = ({ conversationHistory }: { conversationHistory: ConversationItem[] }) => {
    const getStatusIconColorClass = (conversationItem: ConversationItem) => {
        const { state } = conversationItem

        switch (state) {
            case ConversationItemState.ERROR:
                return 'text-red-600 fill-red-600'
            case ConversationItemState.WARNING:
                return 'text-yellow-600 fill-yellow-600'
            case ConversationItemState.SUCCESS:
                return 'text-green-600 fill-green-600'
            case ConversationItemState.LOADING:
            default:
                return ''
        }
    }

    return (
        <div className="py-5 px-2 flex-1 self-center w-xs sm:w-full max-w-2xl">
            <div className="flex flex-col h-full justify-end space-y-4">
                {conversationHistory.map((convo, index) => (
                    <div key={index}>
                        <div className="flex space-x-1">
                            <Circle size='8' className={getStatusIconColorClass(convo) + " my-auto"} />
                            <h1 className="font-bold uppercase text-xs text-gray-400">
                                {convo.query}
                            </h1>
                        </div>
                        {convo.state === 'loading' ?
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