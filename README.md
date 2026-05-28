# NestJS Project Template

A production-ready NestJS backend template built with **Clean Architecture** and **Domain-Driven Design (DDD)** principles.

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | NestJS (Fastify adapter) |
| Language | TypeScript (strict mode) |
| Database | PostgreSQL 16 + TypeORM |
| Validation | class-validator / class-transformer |
| Object mapping | AutoMapper (`@automapper/nestjs`) |
| Email | SendGrid |
| Storage | S3-compatible (AWS S3 or MinIO) |
| Cache | Redis |
| API docs | Scalar UI (OpenAPI) |
| Observability | SigNoz (OpenTelemetry) |
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
- Yarn
- Docker + Docker Compose (for the full local stack)

### Installation

```bash
yarn config set ignore-engines true   # required if running Node 24+
yarn install
```

### Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and adjust the values for your environment. All variables are documented inside `.env.example`.

## Docker Compose — Full Local Stack

Running `docker-compose up -d` brings up the complete local development environment. The file has **11 services** grouped into four concerns: observability, data stores, object storage, and the application itself.

### Dependency chain

```
zookeeper-1
    └── clickhouse
            ├── signoz-migrate  (runs once, then exits)
            │       └── query-service
            │               └── frontend  (SigNoz UI — port 3301)
            └── otel-collector  (ports 4317, 4318)

postgres  ──────────────────────────────────────┐
redis     ──────────────────────────────────────┤──► app  (port $FRAMEWORK_PORT)
otel-collector  ────────────────────────────────┤
minio ──► minio-init (runs once, then exits) ───┘
```

The `app` service only starts after `postgres`, `redis`, and `minio-init` are healthy/completed and after `otel-collector` has started.

---

### Observability stack (SigNoz)

#### `zookeeper-1`

**Image:** `zookeeper:3.8`

ZooKeeper is a distributed coordination service. ClickHouse uses it internally to manage distributed state, leader election, and replicated merge tree metadata — even in single-node mode. It has no user-facing port and is an internal dependency only.

#### `clickhouse`

**Image:** `clickhouse/clickhouse-server:24.3-alpine` | **Ports:** `9000` (native TCP), `8123` (HTTP)

ClickHouse is a column-oriented OLAP database. SigNoz stores all observability data here:

- **Traces** → `signoz_traces` database
- **Metrics** → `signoz_metrics` database
- **Logs** → `signoz_logs` database

ClickHouse is optimized for high-throughput time-series insertions and fast aggregation queries — which is exactly the workload that distributed tracing and metrics produce. A traditional row-store database (like Postgres) would be far too slow for this.

#### `signoz-migrate`

**Image:** `signoz/migrate:latest`

A one-shot container. It runs the SigNoz schema migration — creating tables, indexes, and TTL policies inside ClickHouse — then exits with code `0`. The `query-service` waits for this container to complete successfully before starting, guaranteeing the schema exists before any query is executed.

#### `query-service`

**Image:** `signoz/query-service:latest`

The SigNoz backend API. It connects to ClickHouse and exposes a REST/GraphQL interface consumed by the frontend. Responsible for:

- Querying traces, metrics, and logs
- Alerting rule evaluation
- Dashboard and saved-query storage (in a local SQLite file at `/var/lib/signoz/signoz.db`)

#### `frontend`

**Image:** `signoz/frontend:latest` | **Port:** `3301`

The SigNoz web UI served via nginx. Access it at `http://localhost:3301` to:

- Explore distributed traces (waterfall view)
- Query metrics and build dashboards
- Search logs

#### `otel-collector`

**Image:** `signoz/signoz-otel-collector:latest` | **Ports:** `4317` (gRPC), `4318` (HTTP)

The OpenTelemetry Collector is the pipeline between your application and ClickHouse. It:

1. **Receives** telemetry from the app over OTLP (gRPC on `4317`, HTTP on `4318`)
2. **Processes** data in batches and enforces memory limits
3. **Exports** to the three ClickHouse databases

The SigNoz build uses custom ClickHouse exporters (`clickhousetraces`, `clickhousemetricswrite`, `clickhouselogsexporter`) that are not part of the upstream OTel Collector distribution. The configuration is mounted from `docker/otel-collector-config.yaml`.

The app sends telemetry when `SIGNOZ_ENABLED=true` in `.env`. When disabled, the OTel SDK uses a no-op tracer and nothing is sent — zero overhead.

---

### Data stores

#### `postgres`

**Image:** `postgres:16-alpine` | **Port:** `$DATABASE_PORT` (default `5432`)

The primary relational database for the application. Credentials and database name are read from `.env` via `$DATABASE_NAME`, `$DATABASE_USERNAME`, and `$DATABASE_PASSWORD`. Data is persisted in the `postgres-data` Docker volume.

The app never runs with `DATABASE_SYNCHRONIZE=true` — all schema changes go through TypeORM migrations (`yarn migration:run`). The migrations history table is `tb_migration`.

#### `redis`

**Image:** `redis:7-alpine` | **Port:** `$CACHE_STORAGE_PORT` (default `6379`)

Used as the cache layer. The app stores short-lived data here (e.g. sign-in verification codes and forgot-password codes) encrypted with AES-256-CBC before writing. Password is required (`--requirepass`) and comes from `$CACHE_STORAGE_PASSWORD`. Data is persisted in the `redis-data` volume.

---

### Object storage (MinIO)

#### `minio`

**Image:** `minio/minio:latest` | **Ports:** `9000` (S3 API), `9001` (web console)

MinIO is an S3-compatible object storage server. In local development it replaces AWS S3 entirely — the AWS SDK is pointed at `http://localhost:9000` via `BUCKET_S3_ENDPOINT` and uses `forcePathStyle: true` so URLs follow the `http://host/bucket/key` pattern instead of the AWS virtual-hosted-style `http://bucket.host/key`.

Root credentials come from `$BUCKET_S3_ACCESS_KEY_ID` and `$BUCKET_S3_ACCESS_KEY_CREDENTIAL` (both default to `minioadmin` in `.env.example`).

Access the web console at `http://localhost:9001` to browse buckets, upload files manually, and inspect object metadata.

For production, simply set `BUCKET_S3_ENDPOINT=` (empty) in `.env` — the SDK falls back to the standard AWS endpoint and `forcePathStyle` is not applied.

#### `minio-init`

**Image:** `minio/mc:latest`

Another one-shot container. It uses the MinIO Client (`mc`) to:

1. Register an alias pointing at the `minio` service (`mc alias set local http://minio:9000 ...`)
2. Create the application bucket (`mc mb --ignore-existing local/$BUCKET_S3_BUCKET_NAME`)

`--ignore-existing` makes the command idempotent — on subsequent `docker-compose up` runs the bucket already exists and the container exits cleanly without error. The `app` service depends on this container completing successfully, so the bucket is always ready before the application boots.

---

### Application

#### `app`

**Image:** built from the local `Dockerfile` (multi-stage, `node:22.15.0`)

The NestJS application. It loads all configuration from the `.env` file and starts the Fastify HTTP server on `$FRAMEWORK_PORT` (default `3000`).

API documentation is served at:
- `GET /docs` — Scalar UI (interactive)
- `GET /docs-json` — raw OpenAPI JSON

The container waits for `postgres` (health check), `redis` (health check), `otel-collector` (started), and `minio-init` (completed) before launching.

---

### Starting the stack

```bash
cp .env.example .env
docker-compose up -d
```

To bring up only the data stores (skip observability):

```bash
docker-compose up -d postgres redis minio minio-init
```

To tail logs for a specific service:

```bash
docker-compose logs -f app
docker-compose logs -f otel-collector
```

---

## Development (without Docker)

If you prefer to run the app locally and only use Docker for the supporting services:

```bash
docker-compose up -d postgres redis minio minio-init

yarn dev
```

Hot reload is active via `yarn dev`. The debugger is available on `yarn start:debug`.

## Testing

**Unit tests are mandatory.** Every use case, domain entity, value object, and error MUST have a sibling `*.spec.ts` file. Code without tests is considered incomplete.

### Rules

- Every `*.use-case.ts` → must have a `*.use-case.spec.ts` next to it
- Every error branch (`if (!x) throw`) → must have a corresponding `it('should throw ...')` test
- Write use cases → must verify `transaction.commit()` is called
- No real database connections — all repositories are mocked with `jest.Mocked<T>`

```bash
yarn test
yarn test:watch
yarn test:cov
yarn jest path/to/file.spec.ts
```

## Database Migrations

```bash
yarn migration:run
yarn migration:generate src/migrations/DescriptiveName
yarn migration:revert
```

Always run `yarn migration:run` before deploying. The migrations history table is `tb_migration`.

## Seeding

```bash
yarn seed
```

Creates the default admin user and any required seed data.

## Code Quality

```bash
yarn lint
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
