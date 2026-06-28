This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Strapi Keep-Alive

To keep a free Strapi instance awake, the Next.js server starts a background ping loop on boot.

Set these environment variables:

```bash
STRAPI_URL=https://your-strapi-instance.example.com
STRAPI_PING_PATH=/
STRAPI_PING_INTERVAL_MS=240000
```

Notes:

- `STRAPI_URL` is required.
- `STRAPI_PING_PATH` is optional and defaults to `/`.
- `STRAPI_PING_INTERVAL_MS` is optional and defaults to `240000` (4 minutes).
- This works when your Next.js app runs as a long-lived Node server. If you deploy the frontend on a serverless platform, use an external cron/uptime service instead.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
