# Language Learning

## Getting started

To get started, run the following commands:

1. Install dependencies:

```bash
pnpm install
```

2. Generate a prisma client:

- Create a file called ".env" in the root of the folder
- Put our secret key in that file (if you ask nicely, maybe we'll tell you)

```bash
pnpm run prisma:generate
```

3. Start the development server:

```bash
pnpm run dev
```

## Sprint 1

### Main goals

- [x] Create GitLab/GitHub Repo - https://github.com/kevinzunigacuellar/lang-learn
- [x] Setup Firebase Account - we ended up not using firebase because we found an easier platform to host our database and site. PlanetScale and Vercel
- [x] Setup a database schema in PlanetScale - veiw prisma/schema.prisma
- [x] Setup Vercel hosting - https://lang-learn-a35pdonlm-kevinzunigacuellar.vercel.app/
- [x] Create markup for the dashboard/index page - on our google drive
- [x] Create a login page - https://lang-learn-a35pdonlm-kevinzunigacuellar.vercel.app/login

### Secondary goals

- [x] Create question asking page - https://lang-learn-a35pdonlm-kevinzunigacuellar.vercel.app/question
- [ ] Create a profile Page - press profile button or https://lang-learn-a35pdonlm-kevinzunigacuellar.vercel.app/profile
