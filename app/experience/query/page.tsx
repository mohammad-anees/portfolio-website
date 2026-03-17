'use client';

import {
    Card,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Loader, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { ConversationHistory, ConversationItem, ConversationItemState } from "./conversationHistory";

const Query = () => {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState<ConversationItem[]>([])

    useEffect(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, [conversation])


    const onSubmitHandler = async () => {
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
            console.log(data);

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
    }

    return (
        <>
            <ConversationHistory conversationHistory={conversation} />
            <div className="pb-2 md:pb-10 px-2 self-center w-full max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardDescription>Ask an LLM about my professional experience.</CardDescription>
                        <form onSubmit={(e) => { e.preventDefault(); onSubmitHandler() }}>
                            <ButtonGroup className="w-full">
                                <Input placeholder="" value={query} onChange={(e) => setQuery(e.target.value)} />
                                <Button
                                    type="submit"
                                    variant="default"
                                    disabled={loading || query.length === 0}
                                >
                                    {loading ? <Loader className="animate-spin" /> : <SendHorizonal />}
                                </Button>
                            </ButtonGroup>
                        </form>
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}

export default Query;