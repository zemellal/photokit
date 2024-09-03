# PhotoKit

PhotoKit is a dashboard app to store and analyze your camera gear. It summarizes your costs, weights, keeps track of your serial numbers and when you bought each prized piece of gear. It also lets you create kits to organize the gear depending on your needs.

#### Technical

- Built with [Next.JS](https://nextjs.org/). React server components are used for the DB data fetching and most of the layout building, and server actions for posting new data for creating and updating entities.
- [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) components, [Tanstack Table](https://tanstack.com/table) for data tables, and [React DayPicker](https://daypicker.dev/) for the calendar.
- Authentication is handled with [Auth.JS](https://authjs.dev/). More authentication providers, ie. Google, Apple, can be added to the NextAuth configuration.
- [Prisma](https://www.prisma.io/) for ORM and schema models is currently connected to a SQLite database. Prisma allows easy configuration to other databases such as Postgres, MySQL, etc.
- [React Hook Form](https://react-hook-form.com/) for all form inputs and [Zod](https://zod.dev/) for validation.

## Getting Started

Install packages

```bash
npm install
# or
bun i
```

Copy ENV and provide necessary variables

```bash
cp .env .env.local
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

You can sign in with Github.
