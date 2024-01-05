# headstart-nextapp-supa-stripe

Your typical Next.js starter project... but more...

## Original

This repo was derived from this [Original Next Starter Kit](https://github.com/vercel/nextjs-subscription-payments) provided by the Vercel team. All credits go to them.

## What's in this Starter Project?

This starter kit aims to keep the initial state of a Next.js create project, but adds the additional features for Supabase and Stripe that uses the latest Next 14 with Server Actions.

> The entire layout and naming conventions are completely "subjective". Please modify to your preferences.

### Configuration

- Next.js (Latest version 14.0.4)
- Typescript
- App Router
- TailwindCSS
- /app directory
- ESLint
- Server Actions
- Zod
- react-icons
- Node (v20.9.0)
- Docker
- Stripe
- Supabase
  - Authentication
  - Database

### A Subjective Folder Directory / File Structure

- actions: for your server actions
- sample pages in /app: for your app routing
- components: contains a example layout + button component
- fixtures: this is used to create sample stripe pricing product options
- public: store your svg images here
- supabase: dedicated supabase database directory to manager migrations and schemas
- types: store your types here
- utils: use these helpers for general 3rd party integrations (i.e stripe & supabase)
- .env.local: for local environment variables

# Your Typical Next.js ReadMe Below...

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
