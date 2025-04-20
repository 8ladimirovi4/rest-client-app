# REST Client App

Welcome to the REST Client App — a web tool for sending and analyzing HTTP requests. Here, you can create REST requests to your desired APIs, manage headers and parameters, and save used calls to the request history. Everything you need is right at your fingertips for fast and efficient API interaction.

## Technology stack

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-000000?style=for-the-badge&logo=netlify&logoColor=00C7B7)

## Team Members

- [Vladimir Leonov](https://github.com/8ladimirovi4) - Team Lead. Frontend Developer
- [Alexander Chernichkin](https://github.com/alekseng) - Frontend Developer

## Project Overview

REST Client is a lightweight web application inspired by tools like Postman and Thunder Client. It allows users to test and interact with RESTful APIs through a user-friendly interface. The application is built with React 18 and TypeScript, using Next.js to handle CORS and enable server-side request forwarding.

✨ Key Features

🔐 Authentication: User registration and login with secure authentication (Firebase or Supabase).

🌐 REST Client Interface:

HTTP method selection

URL input field

Request body and headers editor

Live response viewer

Auto-generated code snippet for the request

🕓 History: Track and revisit previously sent requests.

🧩 Variables: Define and use environment variables in your requests.

🌍 Internationalization (i18n): Supports multiply languages with a language switcher in the UI.

🎨 Responsive & Accessible Design: Clean, semantic layout with unified styling and interactive UI components.

🧪 Testing: Test coverage with vitest and lint commands integrated in the project pipeline.

✅ Error Handling: Friendly error messages and clear distinction between network errors and API response codes.

🔧 Technical Stack
React 18+

TypeScript

Next.js 15

Firebase / Supabase for auth

ESLint, Prettier, Husky hooks

Vite (optional for Remix)

i18next (for localization)

Deployed via Netlify

1. Clone the repo

```sh
  git clone https://github.com/8ladimirovi4/rest-client-app.git
```

2. Install NPM packages

```sh
  npm install
```

3. Ask team to produce the .env.local file with settings and place it in the project root. 

- Place firebase keys to .env.local. 

- You can find test keys in .env.example file. 

4. Start project

```sh
  npm run dev
```

## Provided scripts

Start local development server

```sh
npm run build
```

Build project in production mode for further deployment

```sh
npm run format:fix
```

Reformat source code & configs to match `Prettier` settings

Check source code with `Prettier`

```sh
npm run lint
```

Automatically fix all auto-fixable errors & warnings with `ESLint`

```sh
npm run prepare
```

Runs automatically after package installation to install Husky hooks

```sh
npm run test
```

Runs tests with Vitest

```sh
npm run test:coverage
```

Runs tests with Vitest and displays coverage of implemented tests

### Happy coding!
