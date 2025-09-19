# LocalAssistant 
## Features

- **ChatGPT-like interface**
- **Persistent conversations**
  - All messages are stored in a PostgreSQL database.
  - Each chat has its own unique ID and timestamp.
  - Supports multiple chats with history.
- **Future: Local document search**
  - Worker to search all documents on your PC using regex patterns.
  - Returns matched text along with file paths.
  - Integrates with chat so you can query your own files conversationally.


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


## Docker:

to connect the database-container in docker:

```
docker exec -it <container_name> psql -U <POSTGRES_USER> -d <POSTGRES_DB>
```

to connect the nextjs-container in docker:

```
docker exec -it localAssistant_nextjs sh
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


## Learn More

To learn more about Next.js, Postgres and Docker, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [PostgresSQL Documentation](https://www.postgresql.org/docs/current/) 
- [Docker Documentation](https://docs.docker.com)