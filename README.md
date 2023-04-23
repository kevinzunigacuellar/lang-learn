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

## Sprint 3
### Goals
- [ ] Inbox - shows the user information about their posts and responses
- [x] Response to Question page - when a user clicks a question on the home page they are brought to page where they can submit a response
- [x] Plan and implementation of final appearance - pages are styled wusing CSS
- [x] Formatting home page - home page shows posts from the database
- [ ] Correcting page - when a user recieves a response to prompt they posted, they can correct the response and send it back to the user
- [ ] Completed post page in inbox - this is an extensino of the user's inbox which shows the posts they have responded to



## Sprint 2

### Main Goals
 - [x] User Login Flow - The user is sent to a login screen when if they are no logged in. The site uses firebase authenticiation.
 - [ ] Profile Page requests data from database - We were not able to complete this because the authentication wasn't working until very recently. This should not be too difficult to accomplish in sprint 3
 - [x] Home page loads in sample posts from database - once logged in, the posts shown are sample posts from the database
 - [x] Filter sorts posts on the home page - filter is on the left of the homepage
 - [ ] User can make a post - this was not completed because authentication took longer than expected
 - [x] Inbox - click the inbox button in the nav bar to get to this page


### Secondary Goals
 - [ ] Plan for the appearance of the final website - we were still changing around so many elements that it didn't make snes eto get tied to an appearence at this stage of production.



## Sprint 1

### Main Goals

- [x] Create GitLab/GitHub Repo - https://github.com/kevinzunigacuellar/lang-learn
- [x] Setup Firebase Account - we ended up not using firebase because we found an easier platform to host our database and site. PlanetScale and Vercel
- [x] Setup a database schema in PlanetScale - veiw prisma/schema.prisma
- [x] Setup Vercel hosting - https://lang-learn-a35pdonlm-kevinzunigacuellar.vercel.app/
- [x] Create markup for the dashboard/index page - on our google drive
- [x] Create a login page - https://lang-learn-a35pdonlm-kevinzunigacuellar.vercel.app/login

### Secondary goals

- [x] Create question asking page - https://lang-learn-a35pdonlm-kevinzunigacuellar.vercel.app/question
- [ ] Create a profile Page - press profile button or https://lang-learn-a35pdonlm-kevinzunigacuellar.vercel.app/profile
