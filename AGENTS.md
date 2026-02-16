# AGENTS.md - Developer Guide for AI Coding Agents

This guide provides essential information for AI coding agents working in this NestJS backend codebase.

## Build, Lint, and Test Commands

### Development

```bash
yarn install              # Install dependencies
yarn dev                  # Start development server with hot reload
yarn start:dev            # Alternative to yarn dev
yarn start:debug          # Start with debugger attached
```

### Build & Production

```bash
yarn build                # Build the application
yarn start:prod           # Run production build
```

### Testing

```bash
yarn test                 # Run all tests
yarn test:watch           # Run tests in watch mode
yarn test:cov             # Run tests with coverage
yarn test:debug           # Run tests with debugger

# Run a single test file
yarn jest path/to/file.spec.ts

# Run tests matching a pattern
yarn jest --testNamePattern="pattern"

# Run a specific test suite
yarn jest src/module/customer/analysis-tool/module/insurance-quality-analysis
```

### Code Quality

```bash
yarn lint                 # Run ESLint and auto-fix issues
yarn format               # Format code with Prettier
```

### Database Migrations

```bash
yarn migration:generate src/migrations/DescriptiveName  # Generate migration from entity changes
yarn migration:run        # Apply pending migrations
yarn migration:revert     # Revert last migration
```

## Project Structure

```
src/
├── core/                 # Core domain logic, errors, base entities
├── module/               # Feature modules (customer, admin, generic)
├── infra/                # Infrastructure (database, email, storage, AI)
├── lib/                  # Shared libraries (mapper, events, processors)
├── shared/               # Shared utilities, guards, decorators
└── cli/                  # CLI scripts and seeders
```

### Path Aliases (tsconfig paths)

```typescript
@core/*    → ./src/core/*
@module/*  → ./src/module/*
@infra/*   → ./src/infra/*
@lib/*     → ./src/lib/*
@shared/*  → ./src/shared/*
@cli/*     → ./src/cli/*
@base/*    → ./src/*
```

## Architecture Patterns

### Clean Architecture / DDD

- **Domain Layer**: Entities, value objects, domain errors
- **Application Layer**: Use cases (business logic)
- **Infrastructure Layer**: Database, external services, implementations
- **Presentation Layer**: Controllers, DTOs

### Key Patterns

- **Repository Pattern**: Gateway interfaces with TypeORM implementations
- **Dependency Injection**: NestJS DI container with `@Inject()` decorators
- **Use Case Pattern**: Each feature is a `*.use-case.ts` file
- **Gateway Pattern**: Abstract gateways with concrete implementations

## Code Style Guidelines

### Imports

```typescript
// Order: External → NestJS → Core → Infra → Lib → Module → Shared
import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
```

### Naming Conventions

- **Files**: `kebab-case.type.ts` (e.g., `create-analysis.use-case.ts`)
- **Classes**: `PascalCase` with suffix (e.g., `CreateAnalysisUseCase`)
- **Interfaces/Abstracts**: End with `Gateway` for ports (e.g., `AnalysisCommandRepositoryGateway`)
- **Errors**: End with `.error.ts` (e.g., `analysis-not-found.error.ts`)
- **Entities**: End with `.entity.ts`
- **DTOs**: End with `.dto.ts` (e.g., `create-analysis.request.dto.ts`)
- **Value Objects**: End with `.value-object.ts`

### TypeScript Configuration

- **Strict mode enabled**: All strict checks are on
- **No implicit any**: All types must be explicit
- **No unused parameters/locals**: Clean up unused code
- **Exact optional properties**: `{ foo?: string }` requires explicit `undefined`

### Code Formatting

- **Prettier config**:
  - Single quotes
  - Trailing commas: all
  - Line width: Default (80)
- **ESLint**: TypeScript strict rules + import sorting

## NestJS Module Pattern

### Module Registration

```typescript
@Module({
  imports: [
    DatabaseModule, // Import required modules
    EventModule,
  ],
  controllers: [AnalysisController],
  providers: [
    CreateAnalysisUseCase, // Register use cases
    UpdateAnalysisUseCase,
  ],
  exports: [
    CreateAnalysisUseCase, // Export for other modules
  ],
})
export class AnalysisModule {}
```

### Provider Registration in DatabaseModule

When adding new repository implementations:

1. Import the TypeORM implementation from `@infra/database/implementation/typeorm/repository/...`
2. Import the gateway interface from `@module/.../domain/repository/.../...gateway`
3. Add to `classProvider` array:

```typescript
{
  provide: AnalysisCommandRepositoryGateway,
  useClass: AnalysisTypeormCommandRepository,
}
```

## Dependency Injection

### Use Case Pattern

```typescript
@Injectable()
export class CreateAnalysisUseCase {
  protected readonly _type = CreateAnalysisUseCase.name;

  public constructor(
    @Inject(AnalysisCommandRepositoryGateway)
    private readonly analysisCommandRepositoryGateway: AnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: CreateAnalysisRequestDto,
  ): Promise<CreateAnalysisResponseDto> {
    // Implementation
  }
}
```

## Error Handling

### Custom Error Hierarchy

```typescript
// Base errors in @core/error/
BaseError
├── NotFoundError
├── ConflictError
├── InvalidInputError
├── UnauthorizedError
├── ForbiddenError
└── UnexpectedError

// Domain-specific errors extend base errors
export class AnalysisNotFoundError extends NotFoundError {
  protected override readonly _type = AnalysisNotFoundError.name;

  public constructor() {
    super('Análise não encontrada');
  }
}
```

### Error Messages

- Use Portuguese for user-facing messages
- Be specific and actionable

## Common Pitfalls & Solutions

### 1. Missing Provider Registration

**Problem**: `Nest can't resolve dependencies` error
**Solution**: Add the gateway-to-implementation mapping in `DatabaseModule` providers array

### 2. Circular Dependencies

**Problem**: Module import cycles
**Solution**: Use `forwardRef()` or refactor to break the cycle

### 3. Migration Ignored by Lint

**Migrations are excluded from linting** (see package.json: `--ignore-pattern "src/migrations/**"`)

### 4. TypeORM Relations

Always specify inverse relations in entities for bidirectional relationships

## Testing Guidelines

- Test files: `*.spec.ts` alongside source files
- Use `@nestjs/testing` for DI container in tests
- Mock external dependencies (databases, APIs)
- Focus on use case logic, not infrastructure

## Additional Notes

- **Node Version**: 22.15.0 (specified in package.json engines)
- **Package Manager**: Yarn (not npm)
- **Database**: MySQL with TypeORM
- **API Framework**: Fastify (not Express)
- **Validation**: class-validator and class-transformer for DTOs

## Important Commands Quick Reference

```bash
# Start development
yarn dev

# Run single test
yarn jest path/to/test.spec.ts

# Fix lint issues
yarn lint

# Generate migration after entity changes
yarn migration:generate src/migrations/DescriptiveName

# Apply migrations before deploying
yarn migration:run
```
