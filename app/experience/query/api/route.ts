import OpenAI from "openai";

const VECTOR_STORE = process.env.RESUME_VECTOR_STORE_KEY
const QUERY_INSTRUCTIONS = `
You are an agent that answers queries for a portofolio website for Mohammad Anees.

The only queries you should respond to are those relevant to his experience. This can be found in the file you have access too.
Queries related to his experience such as more details on companies in the document, technologies outlined etc can be responded to.

Queries irrelevant to his experience should not be processed and you should respond with "Please keep all queries relevant to Mr. Anees and his experience."

format your responses in simple markdown.
`


export const POST = async (req: Request) => {
    const { query } = await req.json()
    if (query.length === 0 || typeof query != 'string') return Response.error()
    if (!VECTOR_STORE) return Response.error()

    const client = new OpenAI();

    const response = await client.responses.create({
        model: "gpt-4.1",
        input: query,
        instructions: QUERY_INSTRUCTIONS,
        tools: [{
            "type": "file_search",
            "vector_store_ids": [VECTOR_STORE],
            "max_num_results": 1,
        }]
    });

    return Response.json({ query, response: response.output_text })
}