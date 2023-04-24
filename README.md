# Language Learning

## Getting started

To get started, run the following commands:

1. Install dependencies:

```bash
pnpm install
```

2. Add project credentials:

- Create a file called ".env" in the root folder with the following contents:

```bash
# .env
DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
```

- Replace the values with the credentials provided in the assignment.

3. Generate a prisma client (this creates a client that allows us to interact with the database):

```bash
pnpm run prisma:generate
```

3. Start the development server:

```bash
pnpm run dev
```

