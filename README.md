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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Database Setup Guide

This guide shows you how to create the database schema locally using the provided `schema.sql` file.

---

## Prerequisites

- PostgreSQL installed and running locally  
- Access to the `psql` command-line tool  
- Database username and password  

---

## Step 1: Create a New Database

Create a new empty database, for example `assistant_template`:

```bash
createdb assistant_template
```

If this command doesn’t work, you can create the database inside psql:
```sql
CREATE DATABASE assistant_template;
```

## Step 2: Import the Schema
Import the database schema from the schema.sql file:
```sql
psql -d assistant_template -f database/schema.sql
```

## Step 3: Verify Connection
Connect to your database to verify everything is set up correctly:
```sql
psql -d assistant_template
```
To check if the tables were created successfully, run:
```sql
\dt
```

### Database

**Default Credentials:**  
- Username: `data_chat_assistant`  
- Password: `1234567890`

---

### How to change the password

1. Connect to PostgreSQL as the `postgres` superuser:

```bash
psql -U postgres
```

in ```psql```run:
```sql
ALTER USER data_chat_assistant WITH PASSWORD 'your_new_password';
```

### Check connection:
To connect to the database assistant_template with the default user:
```sql
psql -U data_chat_assistant -d assistant_template
```


## Prisma:
```
npx prisma migrate dev --name init
```