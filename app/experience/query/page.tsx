'use client';

import {
    Card,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Loader, SendHorizonal } from "lucide-react";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { ConversationHistory, ConversationItem, ConversationItemState } from "./conversationHistory";
import { useSearchParams } from "next/navigation";

const Query = () => {
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get('query') ?? ''
    const hasAutoSubmitted = useRef<boolean>(false)
    const [query, setQuery] = useState(initialQuery)
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState<ConversationItem[]>([])

    const onSubmitHandler = useCallback(async () => {
        const currentQuery = query
        const conversationItem = { query: currentQuery, response: '', state: ConversationItemState.LOADING }
        setLoading(true)
        setQuery('')
        setConversation(prev => [...prev, conversationItem])

        try {
            const res = await fetch('/experience/query/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: currentQuery })
            })
            const data: { query: string, response: string, invalidQuery: boolean } = await res.json()

            conversationItem.response = data.response
            conversationItem.state = data.invalidQuery ?
                ConversationItemState.WARNING :
                ConversationItemState.SUCCESS

        } catch (e) {
            conversationItem.state = ConversationItemState.ERROR
        } finally {
            setLoading(false)
            setConversation(prev => [...prev.slice(0, -1), conversationItem])
        }
    }, [query])

    useEffect(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, [conversation])

    useEffect(() => {
        if (initialQuery !== '' && !hasAutoSubmitted.current) {
            hasAutoSubmitted.current = true
            onSubmitHandler()
        }
    }, [onSubmitHandler])

    return (
        <>
            <ConversationHistory conversationHistory={conversation} />
            <div className="pb-2 md:pb-10 px-2 self-center w-full max-w-2xl">
                <div className="rounded-xl gradient-border">
                    <Card className="rounded-xl">
                        <CardHeader>
                            <CardDescription>Ask an LLM about my professional experience.</CardDescription>
                            <form onSubmit={(e) => { e.preventDefault(); onSubmitHandler() }}>
                                <ButtonGroup className="w-full">
                                    <Input placeholder="" value={query} onChange={(e) => setQuery(e.target.value)} />
                                    <Button
                                        type="submit"
                                        disabled={loading || query.length === 0}
                                    >
                                        {loading ? <Loader className="animate-spin" /> : <SendHorizonal />}
                                    </Button>
                                </ButtonGroup>
                            </form>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </>
    )
}

const QueryPage = () => (
    <Suspense fallback={null}>
        <Query />
    </Suspense>
)

export default QueryPage;