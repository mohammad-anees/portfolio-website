# website-2026

Personal website built with Next.js 16, React 19, and Tailwind CSS v4.

## Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui, Radix UI
- **Icons**: Lucide React
- **AI**: OpenAI SDK
- **Language**: TypeScript

## Environment Variables

Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY="your-openai-api-key"
RESUME_VECTOR_STORE_KEY="your-vector-store-id"
```

- `OPENAI_API_KEY` — OpenAI API key, used for the AI query feature
- `RESUME_VECTOR_STORE_KEY` — OpenAI vector store ID containing resume data for the query agent

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
