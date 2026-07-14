OdmioJs is a high-level, strictly type-safe ODM (Object-Document Mapper) for MongoDB written in TypeScript. Built with SOLID architectural design patterns in mind, it implements the Data Mapper pattern and provides complete separation of business logic from the database layer through driver abstraction.

## Key Features

* **Monorepo Architecture:** Powered by Yarn 4 (Berry) workspaces. The ecosystem is split into isolated, loosely coupled packages (`core`, `types`, `drivers`) maximizing scalability and maintainability.
* **Driver Agnostic (Dependency Inversion):** Core logic and repositories interact solely via abstractions. This allows seamless switching between the production-ready `MongoDriver` and an `InMemoryMongoDriver` for unit/integration testing.
* **Data Mapper Pattern:** Clear separation of concerns. Domain entities remain completely oblivious to persistence details, which are entirely encapsulated within specialized repositories.
* **Type-Safe Queries:** Leverages advanced TypeScript capabilities to ensure compile-time type safety for schemas, documents, and database queries.

## Project Structure

The project is organized as a monorepo with the following package breakdown:

* `packages/core` - The central engine of the ODM managing client state, lifecycle, and repository orchestration.
* `packages/types` - Shared TypeScript definitions, domain interfaces, and driver contracts.
* `packages/drivers` - Concrete database adapter implementations (including native MongoDB client wrapper and an In-Memory engine).

## Architectural Overview

Unlike the traditional Active Record pattern (commonly seen in Mongoose) where models contain both data and persistence state, OdmioJs relies heavily on the **Data Mapper** pattern:

1.  **Driver Contracts:** The `core` defines strict interfaces that any underlying driver must satisfy.
2.  **Repositories:** All collection-specific CRUD activities are hidden behind a `Repository` layer, decoupling your business workflows from specific DB APIs.
3.  **Testability:** The inclusion of `InMemoryMongoDriver` ensures integration tests run blazingly fast entirely in memory without requiring Docker or a running MongoDB server instance.

## Quick Start Example

```typescript
import { OdmioClient } from '@odmiojs/core';
import { MongoDriver } from '@odmiojs/mongo-driver';

// 1. Initialize the client with the chosen driver
const client = new OdmioClient({
  driver: new MongoDriver({ uri: 'mongodb://localhost:27017/mydb' })
});

await client.connect();

// 2. Obtain a repository for a collection
interface User {
  id: string;
  name: string;
  email: string;
}

const userRepository = client.getRepository<User>('users');

// 3. Perform data operations
const newUser = await userRepository.create({
  name: 'Egor',
  email: 'egor@example.com'
});

const user = await userRepository.findOne({ name: 'Egor' });
console.log(user);

await client.disconnect();
```