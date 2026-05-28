# NestJS Project Template

A production-ready NestJS backend template built with **Clean Architecture** and **Domain-Driven Design (DDD)** principles.

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | NestJS (Fastify adapter) |
| Language | TypeScript (strict mode) |
| Database | PostgreSQL + TypeORM |
| Validation | class-validator / class-transformer |
| Object mapping | AutoMapper (`@automapper/nestjs`) |
| Email | SendGrid |
| Storage | AWS S3 (via `BucketGateway`) |
| Cache | Redis (via `CacheGateway`) |
| API docs | OpenAPI / Swagger |
| Testing | Jest |
| Package manager | Yarn |

## Architecture

This template follows **Clean Architecture** with **CQRS** (Command Query Responsibility Segregation):

```
Presentation  →  Application  →  Domain  ←  Infrastructure
(Controllers)    (Use Cases)    (Entities)   (TypeORM, S3, …)
```

Modules are organized by **user level** under `src/module/`:

```
src/module/
├── admin/     # Admin-only features
├── client/    # Client/user-facing features (includes the social network example)
│   ├── user/
│   ├── post/
│   └── comment/
└── generic/   # Shared across all user levels
    └── auth-identity/
```

For the full architecture reference — including rules, patterns, and examples — see [AGENTS.md](./AGENTS.md).

## Getting Started

### Prerequisites

- Node.js 22.x
- PostgreSQL 16.x
- Yarn

### Installation

```bash
yarn config set ignore-engines true   # required if running Node 24+
yarn install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Key variables:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=nestjs_template
DATABASE_USER=postgres
DATABASE_PASSWORD=secret

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Email (SendGrid)
EMAIL_SEND_GRID_KEY=SG.xxx
EMAIL_SENDER=no-reply@example.com
EMAIL_TEMPLATE_DIR_RELATIVE_PATH=assets/email-template
APP_FRONTEND_URL=http://localhost:3000

# Storage (AWS S3)
BUCKET_NAME=my-bucket
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx

# Cache (Redis, optional)
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Development

```bash
# Start with hot reload
yarn dev

# Start with debugger
yarn start:debug

# Build for production
yarn build

# Run production build
yarn start:prod
```

## Testing

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage report
yarn test:cov

# Single file
yarn jest path/to/file.spec.ts
```

## Database Migrations

```bash
# Apply pending migrations
yarn migration:run

# Generate migration from entity changes
yarn migration:generate src/migrations/DescriptiveName

# Revert last migration
yarn migration:revert
```

> **Important**: Always run `yarn migration:run` before deploying. The migrations table is `tb_migration`.

## Seeding

```bash
# Run the database seeder (creates the default admin + user)
yarn seed
```

## Code Quality

```bash
# Lint and auto-fix
yarn lint

# Format with Prettier
yarn format
```

## Project Structure

```
src/
├── core/           # Shared domain primitives (BaseEntity, BaseValueObject, errors)
├── module/         # Feature modules organized by user level
│   ├── admin/
│   ├── client/
│   └── generic/
├── infra/          # Infrastructure implementations
│   ├── database/   # TypeORM entities & repositories
│   ├── email/
│   ├── bucket/
│   └── cache-storage/
├── lib/            # Shared libraries (AutoMapper profiles, event bus, processors)
├── shared/         # API utilities (guards, decorators, pipes, DTOs)
└── cli/            # CLI scripts & seeders
```

Path aliases:

| Alias | Resolves to |
|---|---|
| `@core/*` | `src/core/*` |
| `@module/*` | `src/module/*` |
| `@infra/*` | `src/infra/*` |
| `@lib/*` | `src/lib/*` |
| `@shared/*` | `src/shared/*` |
| `@cli/*` | `src/cli/*` |

## Architecture Checklist (new feature)

- [ ] Domain entity + value objects + entity props model
- [ ] Repository gateways (query & command)
- [ ] TypeORM entity + repository implementations + AutoMapper profile
- [ ] Register repositories in `DatabaseModule`
- [ ] Use cases + DTOs (request & response) + domain errors
- [ ] Controller + module
- [ ] Unit tests for use cases, entities, value objects
- [ ] Database migration
- [ ] Update `AGENTS.md` if new patterns were introduced

## License

MIT
