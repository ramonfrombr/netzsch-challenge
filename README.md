# Task Management App

This is a task management app application built for Netzsch admission process coding challenge.

## Demo

[Deployed on Vercel (frontend+api) & MongoDB (database)](https://netzsch-challenge.vercel.app/)

## Built using

#### Frontend

- [TypeScript](https://www.typescriptlang.org/) - JavaScript with Data Types
- [ReactJS](https://react.dev/) - Frontend library
- [NextJS](https://nextjs.org/) - Frontend framework
- [MaterialUI](https://mui.com/) - UI Library
- [TailwindCSS](https://tailwindcss.com/) - CSS utility library
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Prisma](https://www.prisma.io/) - Database ORM
- [zod](https://zod.dev/) - Schema validation tool
- [React Hook Form](https://react-hook-form.com/) - Form validation
- [react-hot-toast](https://react-hot-toast.com/) - React toast notifications

## Features

- CRUD tasks
- Display task statistics with pie charts
- Filter tasks by name
- Group task groups in tabs (all tasks, upcoming tasks, and overdue tasks) for easier navigation

## Screenshots

![Desktop-1](https://github.com/ramonfrombr/netzsch-challenge/blob/main/screenshots/image01.png)
![Desktop-2](https://github.com/ramonfrombr/netzsch-challenge/blob/main/screenshots/image02.png)
![Desktop-2](https://github.com/ramonfrombr/netzsch-challenge/blob/main/screenshots/image03.png)

## Usage

#### Env variable:

Create a .env file in the root folder and add the following:

```
DATABASE_URL="Your mongodb database URI"
```

Run the development server:

```
npm install
npm run dev
```

Visit `http://localhost:3000/` to open the application
