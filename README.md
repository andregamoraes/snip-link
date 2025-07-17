# SnipLink

**SnipLink** is a fullstack URL shortener built with **Next.js** and **NestJS**. Users can generate short links and track visit statistics in real time.

## Features

- Shorten long URLs into simple slugs (e.g. `/abc123`)
- Dashboard with top 5 most visited links and total visits
- Instant redirect from slug to original URL
- Optimized production build using Docker Compose
- Persistent postgres database for visit tracking

## Project Structure

```bash
sniplink/
├── backend/       # NestJS API
│   ├── src/
│   └── Dockerfile
├── frontend/      # Next.js App
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```


## Technologies

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) installed

Before starting the application, make sure to configure the environment variables for the backend.
You can do this by copying the provided example file:

```bash
cp backend/.env.example backend/.env
```

### Run the App

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000


## API Endpoints

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | `/api/urls`            | Create short URL                  |
| GET    | `/api/url-visits`      | Get top 5 links + total visits    |
| GET    | `/:slug`               | Redirect to original URL          |


## License

This project is for demonstration and educational purposes only.

