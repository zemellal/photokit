# PhotoKit

PhotoKit is a web dashboard to add and analyze your camera gear. It adds up your costs, weights, keeps track of your serial numbers and when you bought each prized piece of gear. It also lets you create kits to organize the gear depending on your needs.

It is built with [Next.JS](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/). Authentication is handled with [Auth.JS](https://authjs.dev/). [Prisma](https://www.prisma.io/) for ORM and schema models connected to a SQLite database.

## Getting Started

Install packages

```bash
npm install
# or
bun i
```

#### Prisma

Push the schema model to the database and generate a client

```bash
# pull schema from DB
npx prisma db pull
# push schema to DB
npx prisma db push
# generate the Prisma client with types
npx prisma generate
```

Seed the database:

```bash
npx prisma db seed
```

Or run packages with `bunx`

## Development

Run the development server:

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

You can sign in with the seeded user.

Email: ansel@adams.com
Password: password
