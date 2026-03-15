'use client';

import {
    Card,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { BotMessageSquare, Loader } from "lucide-react";
import { useState } from "react";

const Query = () => {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState<
        {
            query: string,
            response: string,
            loading: boolean
        }[]>([])

    const onSubmitHandler = () => {
        setLoading(true)
        setConversation([...conversation, { query, response: '', loading: true }])
        handleQuerySubmission()
        setQuery('')
    }

    const handleQuerySubmission = async () => {
        setLoading(true)
        try {
            const res = await fetch('/experience/query/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query })
            })
            const data: { query: string, response: string } = await res.json()
            setConversation([...conversation, { query: data.query, response: data.response, loading: false }])
            console.log(data)
        } catch (e) {
            setConversation([...conversation, { query, response: 'Error', loading: false }])
        }

        setLoading(false)
    }

    return (
        <>
            <div className="pb-5 flex-1 self-center w-md md:w-full max-w-2xl ">
                <div className="flex flex-col h-full justify-end">
                    {conversation.map((convo, index) => (
                        <div className="py-2" key={index}>
                            <h1 className="font-bold uppercase text-xs text-gray-400">{convo.query}</h1>
                            {convo.loading ?
                                <>
                                    <Skeleton className="h-4 mt-2" />
                                    <Skeleton className="h-4 mt-2" />
                                    <Skeleton className="h-4 mt-2 w-3/4" />
                                </> :
                                <p>{convo.response}</p>
                            }
                        </div>
                    ))}
                </div>
            </div>
            <div className="pb-10 self-center w-md md:w-full max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardDescription>Ask an AI agent about my professional experience.</CardDescription>
                        <form onSubmit={(e) => { e.preventDefault(); onSubmitHandler() }}>
                            <InputGroup className="rounded font-bold">
                                <InputGroupInput placeholder="..." value={query} onChange={(e) => setQuery(e.target.value)} />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        type="submit"
                                        variant="secondary"
                                        disabled={loading}
                                    >
                                        {loading ? <Loader className="animate-spin" /> : (<><BotMessageSquare /> Query</>)}
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