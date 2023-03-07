# Contributor Manual

## Prerequisites:

```
node: 18
pnpm: 7
```

## Setting up a development environment

1. Clone the repository

```
git clone "repo_url"
```

2. Install dependencies

```
pnpm install
```

3. Generate a prisma client

```
pnpm run prisma:generate
```

4. Start the development server

```
pnpm run dev
```

## Making a Pull Request

1. Create a new branch

```
git switch -c "branch name"
```

2. Make your changes

```
git add "...files"
git commit -m "commit message"
```

3. Push your changes

```
git push -u origin "branch name"
```
