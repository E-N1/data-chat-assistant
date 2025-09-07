This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
Make sure you have Docker desktop on your PC.

1. Make it executable:
```bash
chmod +x start.sh
```
2. Start development (default):
```bash
./start.sh dev
```

3. Start production:
```bash
./start.sh prod
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## Database:

to connect database in docker:

```
docker exec -it <container_name> psql -U postgres -d <database_name>
```


# PGAdmin
Connect pgAdmin to your PostgreSQL container:

Name: (anything you like)  
Host name/address: ai_db (the container name of your Postgres service)  
Port: 5432
Username: (from POSTGRES_USER, .env)  
Password: (from POSTGRES_PASSWORD, .env)  
Maintenance database / Database: (from POSTGRES_DB, .env)

```
http://localhost:8080
```

