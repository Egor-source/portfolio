# Notification Policy Service

A backend service for managing user notification preferences and delivery policies.

The project provides a centralized API responsible for storing user preferences, evaluating notification rules, and deciding whether a notification can be delivered.

The main goal of the service is to create a flexible policy engine that combines:

* global restrictions;
* user preferences;
* notification channels;
* regional rules;
* time-based limitations.

---

# Features

## User Management

The service supports user creation and notification preference management.

User data includes:

* region;
* timezone;
* quiet hours;
* notification preferences.

Example:

```json
{
  "id": 1,
  "region": "EU",
  "timezone": "Europe/Berlin",
  "quietHours": {
    "from": "22:00",
    "to": "08:00"
  }
}
```

---

# Notification Policy Engine

The core functionality is notification policy evaluation.

Before sending a notification, the service checks:

1. Global restrictions.
2. User preferences.
3. Notification channel availability.
4. Time-based limitations.

Example:

> A user is located in the EU region.
> A global policy disables marketing SMS messages for EU users.
> The user enabled marketing notifications.
>
> Result: notification delivery is blocked by the global policy.

---

# Architecture

The application follows a modular architecture.

```
src/
│
├── modules/
│   ├── users/
│   │   ├── controller
│   │   ├── service
│   │   ├── dto
│   │   ├── validation
│   │   └── swagger
│   │
│   └── notificationPolicy/
│       ├── controller
│       ├── service
│       ├── validation
│       └── swagger
│
├── db/
├── middlewares/
├── swagger/
└── utils/
```

---

# Technical Decisions

## Modular Design

Each domain module contains:

* controllers;
* services;
* DTOs;
* validation schemas;
* Swagger documentation.

This keeps business logic isolated and makes the system easier to extend.

---

## Type-safe Validation with Zod

Zod is used for runtime validation and TypeScript type inference.

Example:

```ts
const evaluateSchema = z.object({
  userId: z.number(),
  channel: z.enum([
    'email',
    'sms',
    'push'
  ]),
  notificationType: z.string()
})
```

---

## Database Layer

The project uses:

* PostgreSQL;
* Drizzle ORM;
* Drizzle Kit migrations.

Benefits:

* SQL-first approach;
* strong typing;
* predictable database queries.

---

## Request Context

The application uses `AsyncLocalStorage` for request-scoped context.

It allows services to access request data without manually passing context through every method.

Example:

```ts
const context = requestContext.get()

console.log(context.user)
```

Used for:

* request logging;
* tracing;
* accessing user context.

---

# API

## Create User

### POST `/users/create`

Creates a new user.

Request:

```json
{
  "region": "EU",
  "timezone": "Europe/Berlin"
}
```

---

## Get User Preferences

### GET `/users/:id/preferences`

Returns user notification settings.

Example:

```
GET /users/1/preferences
```

Response:

```json
{
  "email": true,
  "sms": false,
  "push": true
}
```

---

## Update User Preferences

### POST `/users/:id/preferences`

Updates notification preferences.

Request:

```json
{
  "sms": false,
  "marketing": false
}
```

---

# Evaluate Notification Policy

## POST `/evaluate`

The main service endpoint.

Checks whether a notification can be delivered.

Request:

```json
{
  "userId": 1,
  "channel": "sms",
  "notificationType": "marketing"
}
```

Response:

```json
{
  "allowed": false,
  "reason": "Blocked by global policy"
}
```

---

# Middleware

Implemented middleware:

## Validation Middleware

Validates incoming requests using Zod schemas.

---

## Error Middleware

Provides centralized API error handling.

Example:

```json
{
  "message": "User not found",
  "statusCode": 404
}
```

---

## Logger Middleware

Tracks:

* HTTP method;
* request URL;
* request body;
* response status;
* execution time.

---

# Testing

Integration tests run against an isolated PostgreSQL database.

Testing flow:

```
Docker PostgreSQL
        |
        v
Database migrations
        |
        v
Jest integration tests
```

Run:

```bash
npm test
```

Tests cover:

* user creation;
* preference updates;
* policy evaluation;
* validation errors;
* business rules.

---

# Tech Stack

* Node.js
* TypeScript
* Express 5
* PostgreSQL
* Drizzle ORM
* Drizzle Kit
* Zod
* Jest
* Swagger
* Docker Compose

---

# Summary

Notification Policy Service demonstrates a production-oriented backend architecture with domain-driven modules, type-safe validation, database migrations, API documentation, and integration testing.

The project highlights experience with:

* backend architecture;
* REST API design;
* PostgreSQL;
* TypeScript ecosystem;
* automated testing;
* scalable Node.js services.
