# Contributor Manual

## Prerequisites:

```
node: 18
pnpm: 7
```

## Setting up a development environment

1. Clone the repository

```bash
git clone "repo_url"
```

2. Install dependencies

```bash
pnpm install
```

3. Generate a prisma client

```bash
pnpm run prisma:generate
```

4. Start the development server

```bash
pnpm run dev
```

## Making a Pull Request

1. Create a new branch

```bash
git switch -c "branch name"
```

2. Make your changes

```bash
git add "...files"
git commit -m "commit message"
```

3. Push your changes

```bash
git push -u origin "branch name"
```
