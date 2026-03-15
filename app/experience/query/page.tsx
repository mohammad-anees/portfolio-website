'use client';

import {
    Card,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Loader } from "lucide-react";
import { useState } from "react";
import { ConversationHistory, ConversationItem } from "./conversationHistory";

const Query = () => {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState<ConversationItem[]>([])

    const onSubmitHandler = async () => {
        const currentQuery = query
        const conversationItem = { query: currentQuery, response: '', loading: true }
        setLoading(true)
        setQuery('')
        setConversation(prev => [...prev, conversationItem])

        try {
            const res = await fetch('/experience/query/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: currentQuery })
            })
            const data: { query: string, response: string } = await res.json()
            conversationItem.response = data.response
        } catch (e) {
            conversationItem.response = 'Error'
        } finally {
            setLoading(false)
            conversationItem.loading = false
            setConversation(prev => [...prev.slice(0, -1), conversationItem])
        }
    }

    return (
        <>
            <ConversationHistory conversationHistory={conversation} />
            <div className="pb-10 px-2 self-center w-xs md:w-full max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardDescription>Ask an AI agent about my professional experience.</CardDescription>
                        <form onSubmit={(e) => { e.preventDefault(); onSubmitHandler() }}>
                            <InputGroup className="rounded font-bold">
                                <InputGroupInput placeholder="" value={query} onChange={(e) => setQuery(e.target.value)} />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        type="submit"
                                        variant="secondary"
                                        disabled={loading || query.length === 0}
                                    >
                                        {loading ? <Loader className="animate-spin" /> : <>Submit</>}
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </form>
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}

export default Query;