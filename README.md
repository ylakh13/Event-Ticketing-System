# 🎟️ Evently — Event Ticketing System

A full-stack event ticketing platform built with Spring Boot and React. Users can discover and book events, organizers can manage ticket sales, and admins can oversee the entire platform.

## ✨ Features

### For Users
- Browse and search events by title, location, and date
- Secure ticket purchase via Stripe
- Receive PDF tickets with QR codes via email
- View purchased tickets in personal dashboard

### For Organizers
- Create and manage events
- Real-time dashboard with revenue and attendance analytics
- View attendee list per event

### For Admins
- Platform-wide analytics (users, events, revenue)
- User and event management
- Role management

## 🛠️ Tech Stack

### Backend
- Java 21 + Spring Boot 4
- Spring Security + JWT authentication
- PostgreSQL + Spring Data JPA
- Stripe API (payments + webhooks)
- iText PDF + ZXing QR code generation
- JavaMail (Gmail SMTP)
- SpringDoc OpenAPI (Swagger UI)

### Frontend
- React 18 + Vite
- Tailwind CSS
- Stripe.js + React Stripe Elements
- Axios + React Router
- React Hot Toast
- Lucide React icons

### DevOps
- Docker + Docker Compose
- Multi-stage builds (Maven + Nginx)
- Spring profiles (dev/prod)

## 🔑 Key Technical Decisions

- **Pessimistic locking** on ticket checkout to prevent overselling under concurrent requests
- **Stripe webhook** handles order creation after payment confirmation — never trust client-side payment status
- **Spring profiles** separate dev and prod configuration cleanly
- **Optional\<User\>** with typed exceptions (`ResourceNotFoundException`, `BusinessRuleException`) for proper HTTP status codes
- **JWT stateless authentication** — no server-side sessions

## 🚀 Getting Started

### Prerequisites
- Docker Desktop
- Stripe account (test mode)
- Gmail account with App Password

### Run with Docker

1. Clone the repository
```bash
git clone https://github.com/ylakh13/Event-Ticketing-System.git
cd Event-Ticketing-System
```

2. Create `.env` file in root (see `.env.example`)
```bash
cp .env.example .env
# Fill in your values
```

3. Start all services
```bash
docker-compose up --build
```

4. Access the app
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui/index.html

### Run Locally (without Docker)

1. Backend — set environment variables and run:
```bash
cd event-ticketing-system
./mvnw spring-boot:run
```

2. Frontend:
```bash
cd frontend
npm install
npm run dev
```

## 📖 API Documentation

Swagger UI available at: `http://localhost:8080/swagger-ui/index.html`

## 🔐 Environment Variables

See `env.example` for required variables including:
- Database connection
- JWT secret
- Stripe API keys
- Gmail SMTP credentials
