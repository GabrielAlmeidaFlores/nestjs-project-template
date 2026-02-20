# AGENTS.md - Developer Guide for AI Coding Agents

This guide provides essential information for AI coding agents working in this NestJS backend codebase.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Architectural Rules & Patterns](#architectural-rules--patterns)
4. [Code Organization Guidelines](#code-organization-guidelines)
5. [Development Commands](#development-commands)
6. [Code Style Guidelines](#code-style-guidelines)

---

## Architecture Overview

This project follows **Clean Architecture** principles with **Domain-Driven Design (DDD)** patterns.

### Core Principles

1. **Dependency Rule**: Dependencies point inward. Domain layer has no dependencies on outer layers.
2. **Separation of Concerns**: Each layer has a specific responsibility.
3. **Testability**: Business logic is independent of frameworks and external systems.
4. **Flexibility**: Easy to swap implementations without changing business rules.

### Layer Architecture

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │  Controllers, DTOs, Validators
│  (src/module/*/controller.ts, dto/)     │
├─────────────────────────────────────────┤
│         Application Layer               │  Use Cases (Business Logic)
│     (src/module/*/use-case/)            │
├─────────────────────────────────────────┤
│           Domain Layer                  │  Entities, Value Objects, Errors
│  (src/module/*/domain/, src/core/)      │
├─────────────────────────────────────────┤
│       Infrastructure Layer              │  Database, External Services
│    (src/infra/, implementations)        │
└─────────────────────────────────────────┘
```

---

## Project Structure

```
src/
├── core/                          # Domain core (shared across modules)
│   ├── domain/
│   │   ├── schema/
│   │   │   ├── entity/           # Base entities
│   │   │   ├── value-object/     # Core value objects (UUID, Email, etc.)
│   │   │   └── enum/             # Core enums
│   │   └── repository/           # Base repository gateways
│   └── error/                    # Base error classes
│
├── module/                        # Feature modules (Clean Architecture)
│   ├── customer/                 # Customer-facing features
│   │   └── analysis-tool/
│   │       ├── domain/           # Domain layer
│   │       │   ├── schema/
│   │       │   │   ├── entity/  # Domain entities
│   │       │   │   ├── value-object/  # Domain value objects
│   │       │   │   └── enum/    # Domain enums
│   │       │   └── repository/  # Repository gateways (interfaces)
│   │       │       ├── query/   # Query gateways (read operations)
│   │       │       └── command/ # Command gateways (write operations)
│   │       ├── use-case/        # Application layer (business logic)
│   │       ├── dto/             # Presentation layer
│   │       │   ├── request/     # Input DTOs
│   │       │   └── response/    # Output DTOs
│   │       ├── error/           # Domain-specific errors
│   │       ├── *.controller.ts  # HTTP controllers
│   │       └── *.module.ts      # NestJS module
│   ├── admin/                    # Admin features
│   └── generic/                  # Generic/shared features
│
├── infra/                         # Infrastructure layer
│   ├── database/
│   │   └── implementation/
│   │       └── typeorm/
│   │           ├── schema/       # TypeORM entities
│   │           │   ├── entity/   # Database entities
│   │           │   └── transformer/  # Custom transformers
│   │           └── repository/   # Repository implementations
│   ├── ai/                       # AI integrations
│   ├── email/                    # Email service
│   └── storage/                  # File storage
│
├── lib/                           # Shared libraries
│   ├── mapper/                   # AutoMapper (entity transformations)
│   ├── event/                    # Event bus
│   └── processor/                # Background processors
│
├── shared/                        # Shared utilities
│   ├── api/                      # API utilities (guards, decorators)
│   └── system/                   # System utilities
│
└── cli/                          # CLI scripts and seeders
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

---

## Architectural Rules & Patterns

### 1. Domain Layer Rules

#### Entities

**Location**: `src/module/{domain}/domain/schema/entity/`

**Rules**:

- ✅ Contain business logic and invariants
- ✅ Use value objects for type safety
- ✅ Extend `BaseEntity` from `@core`
- ✅ Immutable properties (`readonly`)
- ✅ Keep entities lightweight - store only primitive data and value objects
- ✅ Use arrays of primitives (strings, numbers) instead of bidirectional entity references
- ❌ NO database concerns (no TypeORM decorators)
- ❌ NO infrastructure dependencies
- ❌ NO DTOs or external service calls
- ❌ NO bidirectional entity relationships (e.g., `childEntity: ChildEntity[]`)

**Entity Relationship Pattern**:

When you need to represent related data in an entity, prefer **lightweight primitives** over heavy entity references:

```typescript
// ❌ WRONG - Heavy bidirectional relationship
export class ParentEntity extends BaseEntity<ParentId> {
  public readonly childEntities: ChildEntity[]; // Loads entire child entities
}

// ✅ CORRECT - Lightweight primitive arrays
export class ParentEntity extends BaseEntity<ParentId> {
  public readonly childIds: string[]; // Just IDs
  public readonly childNames: string[]; // Denormalized data if needed
}
```

**Why avoid bidirectional relationships?**

1. **Performance**: Loading full entity graphs is expensive and slow
2. **Memory**: Entities with nested entities consume excessive memory
3. **Serialization**: Circular references cause serialization issues
4. **Complexity**: Deep object graphs are harder to reason about and test
5. **Domain purity**: Domain entities should represent business concepts, not database structures

**When you need related data**: Use the repository layer to fetch related entities separately, then combine them in use cases or query results.

**Example**:

```typescript
import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisId } from './value-object/analysis-id/analysis-id.value-object';
import { AnalysisStatusEnum } from './enum/analysis-status.enum';

export class AnalysisEntity extends BaseEntity<AnalysisId> {
  public readonly clientId: ClientId;
  public readonly status: AnalysisStatusEnum;
  public readonly completedAt: Date | null;

  protected readonly _type = AnalysisEntity.name;

  public constructor(props: AnalysisEntityPropsInterface) {
    super(AnalysisId, props);
    this.clientId = props.clientId;
    this.status = props.status;
    this.completedAt = props.completedAt ?? null;
  }

  public isCompleted(): boolean {
    return this.status === AnalysisStatusEnum.COMPLETED;
  }
}
```

#### Value Objects

**Location**: `src/module/{domain}/domain/schema/value-object/`

**Rules**:

- ✅ Immutable
- ✅ Validate in constructor
- ✅ Extend `BaseValueObject`
- ✅ Use for domain concepts (IDs, Email, CPF, etc.)
- ❌ NO business logic (only validation)

**Example**:

```typescript
import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';

export class AnalysisId extends BaseValueObject<string> {
  protected readonly _type = AnalysisId.name;

  public constructor(value: string) {
    super(value);
    this.validate();
  }

  private validate(): void {
    if (!this.value || typeof this.value !== 'string') {
      throw new Error('Invalid Analysis ID');
    }
  }
}
```

#### Repository Gateways (Interfaces)

**Location**: `src/module/{domain}/domain/repository/`

**Rules**:

- ✅ Define interfaces only (no implementation)
- ✅ Use `abstract class` (for NestJS DI)
- ✅ Separate Query (read) from Command (write) - CQRS pattern
- ✅ Return domain entities, not DTOs
- ✅ Accept domain entities and value objects
- ❌ NO database/ORM types in signatures
- ❌ NO implementation details

**Example**:

```typescript
// Query Gateway
export abstract class AnalysisQueryRepositoryGateway {
  public abstract findById(id: AnalysisId): Promise<AnalysisEntity | null>;

  public abstract listByClientId(
    clientId: ClientId,
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<AnalysisEntity>>;
}

// Command Gateway
export abstract class AnalysisCommandRepositoryGateway {
  public abstract create(entity: AnalysisEntity): Promise<AnalysisEntity>;

  public abstract update(entity: AnalysisEntity): Promise<AnalysisEntity>;

  public abstract delete(id: AnalysisId): Promise<void>;
}
```

### 2. Application Layer Rules (Use Cases)

**Location**: `src/module/{domain}/use-case/`

**Rules**:

- ✅ ONE use case per file
- ✅ Single responsibility (one business operation)
- ✅ Orchestrate domain entities and gateways
- ✅ Keep ALL business logic within the use case (private methods)
- ✅ Use interfaces defined at the top of the file for internal types
- ✅ Injectable with `@Injectable()` decorator
- ✅ Inject gateways via constructor
- ❌ NO separate `*.util.ts` files for business logic
- ❌ NO direct database/ORM access
- ❌ NO HTTP concerns (req/res objects)
- ❌ NO external service implementation details

**Structure**:

```typescript
import { Inject, Injectable } from '@nestjs/common';
import {} from /* domain imports */ '@module/{domain}/domain/...';
import {} from /* DTO imports */ '@module/{domain}/dto/...';

// Internal interfaces for the use case
interface InternalDataStructure {
  field1: string;
  field2: number;
}

@Injectable()
export class ProcessAnalysisUseCase {
  protected readonly _type = ProcessAnalysisUseCase.name;

  public constructor(
    @Inject(AnalysisQueryRepositoryGateway)
    private readonly analysisQueryRepositoryGateway: AnalysisQueryRepositoryGateway,
    @Inject(AnalysisCommandRepositoryGateway)
    private readonly analysisCommandRepositoryGateway: AnalysisCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: ProcessAnalysisRequestDto,
  ): Promise<ProcessAnalysisResponseDto> {
    // 1. Fetch data
    const analysis = await this.analysisQueryRepositoryGateway.findById(dto.id);

    if (!analysis) {
      throw new AnalysisNotFoundError();
    }

    // 2. Business logic (using private methods)
    const processedData = this.processData(analysis);
    const result = this.calculateResult(processedData);

    // 3. Persist changes
    const updated =
      await this.analysisCommandRepositoryGateway.update(analysis);

    // 4. Return DTO
    return ProcessAnalysisResponseDto.build({
      id: updated.id,
      result,
    });
  }

  private processData(analysis: AnalysisEntity): InternalDataStructure {
    // Complex business logic here
    return {
      field1: this.transformField1(analysis),
      field2: this.calculateField2(analysis),
    };
  }

  private transformField1(analysis: AnalysisEntity): string {
    return analysis.name.toUpperCase();
  }

  private calculateField2(analysis: AnalysisEntity): number {
    return analysis.items.length * 2;
  }

  private calculateResult(data: InternalDataStructure): number {
    return data.field2 * 100;
  }
}
```

**Why keep logic in use cases?**:

- Business logic stays in one place (single responsibility)
- Easy to test (mock gateways, test use case)
- Clear data flow (public execute → private helpers)
- Self-contained (no external dependencies for business rules)
- Easy to understand (read top-to-bottom)

#### ⚠️ CRITICAL: Transaction Pattern (MANDATORY)

**EVERY write operation (create, update, delete) MUST explicitly commit the transaction.**

When using `BaseTransactionRepositoryGateway`, you must ALWAYS:

1. Store the transaction result in a variable
2. Call `.commit()` to persist changes to the database

**❌ WRONG - Transaction Never Commits:**

```typescript
// This looks like it works but NOTHING is saved to the database!
await this.baseTransactionRepositoryGateway.execute(
  this.repository.updateSomething(entity),
);

return response; // ❌ Changes are LOST!
```

**✅ CORRECT - Transaction Commits Properly:**

```typescript
const transaction = await this.baseTransactionRepositoryGateway.execute(
  this.repository.updateSomething(entity),
);

await transaction.commit(); // ✅ Changes are SAVED!

return response;
```

**Multiple Operations Pattern:**

```typescript
const transaction = await this.baseTransactionRepositoryGateway.execute([
  this.repository1.create(entity1),
  this.repository2.update(entity2),
  creditTransaction, // Can mix different transaction types
]);

await transaction.commit(); // All or nothing - atomic transaction
```

**Why This Matters:**

1. **Data Loss Prevention**: Without `.commit()`, ALL changes are silently discarded
2. **False Success**: API returns 200 OK but nothing was saved
3. **Debugging Nightmare**: Changes appear to work but database remains unchanged
4. **User Frustration**: Users see success but data doesn't persist

**Common Symptoms of Missing Commit:**

- ✅ Endpoint returns success (200 OK)
- ✅ No errors in logs
- ✅ Response DTO looks correct
- ❌ Database query shows old data
- ❌ GET request returns unchanged data
- ❌ Changes disappear after request completes

**Transaction Rollback (Optional):**

```typescript
const transaction = await this.baseTransactionRepositoryGateway.execute([...]);

try {
  // Do additional validation or operations
  await someOtherOperation();

  await transaction.commit();  // Only commit if everything succeeds
} catch (error) {
  await transaction.rollback();  // Explicitly rollback on error
  throw error;
}
```

**CRITICAL RULE**: If you call `execute()`, you MUST call `commit()`. No exceptions!

### 3. Infrastructure Layer Rules

#### TypeORM Entities

**Location**: `src/infra/database/implementation/typeorm/schema/entity/`

**Rules**:

- ✅ Use TypeORM decorators (`@Entity`, `@Column`, etc.)
- ✅ Extend `BaseTypeormEntity`
- ✅ Define relationships (`@ManyToOne`, `@OneToMany`, etc.)
- ✅ Use transformers for custom types (dates, decimals)
- ❌ NO business logic
- ❌ NO validation (use domain entities)

**Example**:

```typescript
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis/enum/analysis-status.enum';

@Entity({ name: 'analysis' })
export class AnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'client_id', type: 'uuid' })
  public clientId: string;

  @Column({ name: 'status', type: 'varchar', length: 50 })
  public status: AnalysisStatusEnum;

  @Column({
    name: 'completed_at',
    type: 'timestamp',
    nullable: true,
    transformer: DateTransformer,
  })
  public completedAt: Date | null;

  @ManyToOne(() => ClientTypeormEntity, (entity) => entity.analyses)
  @JoinColumn({ name: 'client_id' })
  public client?: ClientTypeormEntity;

  protected override readonly _type = AnalysisTypeormEntity.name;
}
```

#### Repository Implementations

**Location**: `src/infra/database/implementation/typeorm/repository/`

**Rules**:

- ✅ Implement gateway interfaces
- ✅ Use TypeORM Repository
- ✅ Use AutoMapper to map TypeORM ↔ Domain entities
- ✅ Handle database-specific logic
- ❌ NO business logic
- ❌ NO direct entity exposure to use cases

**Example**:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis/query/analysis.query.repository.gateway';
import { AnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis/analysis.entity';
import { AnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/analysis/value-object/analysis-id/analysis-id.value-object';
import { AnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

@Injectable()
export class AnalysisTypeormQueryRepository implements AnalysisQueryRepositoryGateway {
  protected readonly _type = AnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AnalysisTypeormEntity)
    private readonly repository: Repository<AnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findById(id: AnalysisId): Promise<AnalysisEntity | null> {
    const result = await this.repository.findOne({
      where: { id: id.toString() },
    });

    if (!result) {
      return null;
    }

    return this.mapperGateway.map(
      result,
      AnalysisTypeormEntity,
      AnalysisEntity,
    );
  }
}
```

### 4. Presentation Layer Rules

#### Controllers

**Location**: `src/module/{domain}/*.controller.ts`

**Rules**:

- ✅ Handle HTTP concerns only (routing, status codes)
- ✅ Validate input with DTOs
- ✅ Delegate to use cases
- ✅ Transform use case results to HTTP responses
- ❌ NO business logic
- ❌ NO direct repository access
- ❌ NO database queries

**Example**:

```typescript
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ProcessAnalysisUseCase } from './use-case/process-analysis.use-case';
import { ProcessAnalysisRequestDto } from './dto/request/process-analysis.request.dto';
import { ProcessAnalysisResponseDto } from './dto/response/process-analysis.response.dto';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@ApiTags('Analysis')
@Controller('customer/analysis')
@UseGuards(AuthGuard)
export class AnalysisController {
  public constructor(
    private readonly processAnalysisUseCase: ProcessAnalysisUseCase,
  ) {}

  @Post('process')
  @ApiOperation({ summary: 'Process an analysis' })
  @ApiResponse({ status: 200, type: ProcessAnalysisResponseDto })
  public async process(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: ProcessAnalysisRequestDto,
  ): Promise<ProcessAnalysisResponseDto> {
    return this.processAnalysisUseCase.execute(sessionData, dto);
  }
}
```

#### DTOs (Data Transfer Objects)

**Location**: `src/module/{domain}/dto/`

**Rules**:

- ✅ Use decorators for validation (`@IsString`, `@IsNotEmpty`, etc.)
- ✅ Extend `BaseBuildableDtoObject`
- ✅ Use response decorators for OpenAPI docs
- ✅ Separate Request and Response DTOs
- ✅ **CRITICAL: If a field is a value object or enum in the domain, it MUST remain a value object or enum in the DTO** (do NOT convert to primitives like string)
- ✅ **CRITICAL: DTO property names MUST match the value object/enum class name (camelCase)** to maintain maximum similarity (e.g., `PaymentPlanId` → `paymentPlanId`, NOT `planId`)
- ✅ **CRITICAL: Update/PATCH response DTOs MUST return the entity ID (as a value object), NOT a success boolean or message**
- ✅ **CRITICAL: Value Objects in Request DTOs MUST use `@RequestDtoValueObjectProperty(ValueObjectClass)` decorator, NEVER `@RequestDtoStringProperty` or `@RequestDtoNumberProperty`**
- ❌ NO business logic
- ❌ NO domain entities (only primitive types or value objects)
- ❌ NO success booleans or generic messages in update response DTOs (return the ID instead)
- ❌ NO `@RequestDtoStringProperty` or `@RequestDtoNumberProperty` for Value Object properties (use `@RequestDtoValueObjectProperty` instead)

**Example**:

```typescript
// Request DTO - CORRECT: Using Value Objects
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class ProcessAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(PaymentPlanId) // ✅ CORRECT: Value Object uses dedicated decorator
  public paymentPlanId: PaymentPlanId; // ✅ CORRECT: Type is Value Object, not primitive

  @RequestDtoStringProperty() // ✅ CORRECT: Primitive string uses string decorator
  public description: string;

  protected override readonly _type = ProcessAnalysisRequestDto.name;
}

// ❌ WRONG - Request DTO with incorrect decorator for Value Object
@RequestDto()
export class WrongProcessAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty() // ❌ WRONG: Should use @RequestDtoValueObjectProperty
  public paymentPlanId: string; // ❌ WRONG: Should be PaymentPlanId value object

  protected override readonly _type = WrongProcessAnalysisRequestDto.name;
}

// Response DTO - CORRECT: Using value objects and enums with proper naming
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis/enum/analysis-status.enum';
import { AnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/analysis/value-object/analysis-id/analysis-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ProcessAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisId) // ✅ CORRECT: Value object preserved
  public analysisId: AnalysisId; // ✅ CORRECT: Property name matches class name (camelCase)

  @ResponseDtoValueObjectProperty(PaymentPlanId) // ✅ CORRECT: Value object preserved
  public paymentPlanId: PaymentPlanId; // ✅ CORRECT: Full name "paymentPlanId", NOT shortened "planId"

  @ResponseDtoEnumProperty(AnalysisStatusEnum) // ✅ CORRECT: Enum preserved
  public analysisStatus: AnalysisStatusEnum; // ✅ CORRECT: Property name matches enum name pattern

  @ResponseDtoNumberProperty()
  public result: number; // ✅ CORRECT: Primitive for calculations

  protected override readonly _type = ProcessAnalysisResponseDto.name;
}

// ❌ WRONG - Converting value objects to primitives
@ResponseDto()
export class WrongAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty() // ❌ WRONG: Should be AnalysisId value object
  public id: string;

  @ResponseDtoStringProperty() // ❌ WRONG: Should be AnalysisStatusEnum
  public status: string;

  protected override readonly _type = WrongAnalysisResponseDto.name;
}

// ❌ WRONG - Update response with success boolean
@ResponseDto()
export class WrongUpdateAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty() // ❌ WRONG: Should return the ID, not success
  public success: boolean;

  protected override readonly _type = WrongUpdateAnalysisResponseDto.name;
}

// ✅ CORRECT - Update response with ID value object
@ResponseDto()
export class UpdateAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisId) // ✅ CORRECT: Returns the ID
  public analysisId: AnalysisId;

  protected override readonly _type = UpdateAnalysisResponseDto.name;
}
```

### 5. CQRS Pattern

**Command Query Responsibility Segregation**

Separate read operations from write operations:

```
Query Gateways (Read)                Command Gateways (Write)
├── findById()                       ├── create()
├── findByName()                     ├── update()
├── listByFilter()                   ├── delete()
└── countByStatus()                  └── bulkUpdate()
```

**Benefits**:

- Optimized queries (no write locks)
- Clear separation of concerns
- Easier to scale read/write independently

### 6. Mapper Pattern (AutoMapper)

**Location**: `src/lib/mapper/implementation/auto-mapper/profile/`

**Rules**:

- ✅ Define mappings between layers
- ✅ TypeORM Entity ↔ Domain Entity
- ✅ Domain Entity ↔ DTO (when needed)
- ✅ Use `constructUsing` for complex transformations
- ✅ Explicitly map all properties (DO NOT use spread operator `...source`)
- ✅ Use `IncompleteSourceDataForMappingError` for missing required relations
- ❌ NO business logic in mappers
- ❌ NO spread operator (`...source`) in mappers
- ❌ NO generic `Error` or `throw new Error()` - use `IncompleteSourceDataForMappingError`

**Example**:

```typescript
import { Mapper, createMap, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis/analysis.entity';
import { AnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/analysis/value-object/analysis-id/analysis-id.value-object';
import { ClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/client/client.entity';

@Injectable()
export class AnalysisEntityAutoMapperProfile {
  protected readonly _type = AnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    const convertOrmToDomain = (
      source: AnalysisTypeormEntity,
    ): AnalysisEntity => {
      // ✅ CORRECT: Check for required relations and throw IncompleteSourceDataForMappingError
      if (!source.client) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AnalysisEntity.name,
          sourceClass: AnalysisTypeormEntity.name,
        });
      }

      const client = this.mapper.map(
        source.client,
        ClientTypeormEntity,
        ClientEntity,
      );

      // ✅ CORRECT: Explicitly map each property
      return new AnalysisEntity({
        id: new AnalysisId(source.id),
        clientId: new ClientId(source.clientId),
        status: source.status,
        completedAt: source.completedAt,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        client,
      });
    };

    createMap(
      this.mapper,
      AnalysisTypeormEntity,
      AnalysisEntity,
      constructUsing(convertOrmToDomain),
    );
  }
}
```

**Error Handling in AutoMapper**:

```typescript
// ❌ WRONG - Do NOT use generic Error
if (!source.relation) {
  throw new Error('Relation not loaded');
}

// ✅ CORRECT - Use IncompleteSourceDataForMappingError
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';

if (!source.relation) {
  throw new IncompleteSourceDataForMappingError({
    destinationClass: DestinationEntity.name,
    sourceClass: SourceTypeormEntity.name,
  });
}
```

**Why NO Spread Operator?**

```typescript
// ❌ WRONG - TypeORM entities have internal metadata that shouldn't be spread
return AnalysisEntity.build({
  ...source, // ❌ BAD: Spreads TypeORM metadata and methods
  id: new AnalysisId(source.id),
});

// ✅ CORRECT - Explicitly map only what's needed
return AnalysisEntity.build({
  id: new AnalysisId(source.id),
  name: source.name,
  status: source.status,
  createdAt: source.createdAt,
  // ... all other properties explicitly
});
```

---

## Mandatory Code Patterns

This section documents patterns that **MUST** be followed in all code. These patterns are established throughout the codebase.

### 1. Protected `_type` Pattern ⚠️ MANDATORY

**CRITICAL**: Every class in the codebase MUST include this pattern.

```typescript
// In classes that DON'T extend another class
protected readonly _type = ClassName.name;

// In classes that extend another class
protected override readonly _type = ClassName.name;
```

**Examples**:

```typescript
// Entity
export class AnalysisEntity extends BaseEntity<AnalysisId> {
  protected readonly _type = AnalysisEntity.name;
}

// TypeORM Entity
@Entity({ name: 'customer' })
export class CustomerTypeormEntity extends BaseTypeormEntity {
  protected override readonly _type = CustomerTypeormEntity.name;
}

// DTO
@RequestDto()
export class CreateAnalysisRequestDto extends BaseBuildableDtoObject {
  protected override readonly _type = CreateAnalysisRequestDto.name;
}

// Use Case
@Injectable()
export class CreateAnalysisUseCase {
  protected readonly _type = CreateAnalysisUseCase.name;
}

// Error
export class AnalysisNotFoundError extends NotFoundError {
  protected override readonly _type = AnalysisNotFoundError.name;
}

// Repository
@Injectable()
export class AnalysisTypeormQueryRepository {
  protected readonly _type = AnalysisTypeormQueryRepository.name;
}

// Controller
@GenericControllerRoute('analysis')
export class AnalysisController {
  protected readonly _type = AnalysisController.name;
}

// Module
@Module({})
export class AnalysisModule {
  protected readonly _type = AnalysisModule.name;
}
```

**Purpose**: Runtime type identification for debugging and logging.

### 2. Error Handling Patterns

#### Error Class Hierarchy

```
BaseError (abstract)
├── InvalidInputError (abstract)
├── NotFoundError (abstract)
├── ConflictError (abstract)
├── UnauthorizedError (abstract)
├── ForbiddenError (abstract)
└── UnexpectedError (abstract)
```

#### Error Implementation Pattern

```typescript
import { NotFoundError } from '@core/error/not-found.error';

export class AnalysisNotFoundError extends NotFoundError {
  protected override readonly _type = AnalysisNotFoundError.name;

  public constructor() {
    super('Análise não encontrada. Por favor, verifique o ID informado.');
  }
}
```

**Rules**:

- ✅ Extend from appropriate base error class
- ✅ Override `_type` property
- ✅ Error messages MUST be in **Portuguese**
- ✅ Descriptive, user-friendly messages
- ✅ No constructor parameters (hardcoded message)
- ✅ Error files: `{entity}-{error-type}.error.ts`
- ❌ NO English error messages
- ❌ NO generic error messages

**Available Base Errors**:

- `InvalidInputError` - 400 Bad Request
- `NotFoundError` - 404 Not Found
- `ConflictError` - 409 Conflict
- `UnauthorizedError` - 401 Unauthorized
- `ForbiddenError` - 403 Forbidden
- `UnexpectedError` - 500 Internal Server Error

### 3. Code Organization Pattern ⚠️ MANDATORY

**CRITICAL**: Constants and helper functions MUST be encapsulated inside classes, NOT at module level.

**Why This Matters**:

- **Maintainability**: Keeps related logic together
- **Testability**: Easier to mock and test class behavior
- **Encapsulation**: Prevents global namespace pollution
- **Architecture**: Follows Clean Architecture and OOP principles
- **Performance**: Enables proper lifecycle management (singleton services cache data in instance properties)

**❌ WRONG - Module-Level Constants and Functions:**

```typescript
// ❌ BAD: Constants and functions at module level
const APOSENTADORIA_KEYS = [
  'aposentadoriaPorIdadeUrbana',
  'aposentadoriaPorIdadeRural',
] as const;

const PERCENTUAL_MENORES_CONTRIBUICOES = 0.2;

function humanKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

@Injectable()
export class SomeService {
  public someMethod(): void {
    // Using module-level constants and functions
    for (const key of APOSENTADORIA_KEYS) {
      const formatted = humanKey(key);
      // ...
    }
  }
}
```

**✅ CORRECT - Class-Level Constants and Methods:**

```typescript
@Injectable()
export class SomeService {
  protected readonly _type = SomeService.name;

  // ✅ GOOD: Constants as private readonly properties
  private readonly APOSENTADORIA_KEYS = [
    'aposentadoriaPorIdadeUrbana',
    'aposentadoriaPorIdadeRural',
  ] as const;

  private readonly PERCENTUAL_MENORES_CONTRIBUICOES = 0.2;

  // ✅ GOOD: Helper function as private method
  private humanKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  }

  public someMethod(): void {
    // Using instance properties and methods
    for (const key of this.APOSENTADORIA_KEYS) {
      const formatted = this.humanKey(key);
      // ...
    }
  }
}
```

**Rules**:

- ✅ Constants: Use `private readonly` or `protected readonly` properties
- ✅ Helper functions: Use `private` methods (or `protected` if needed by subclasses)
- ✅ Access via `this`: `this.CONSTANT_NAME`, `this.helperMethod()`
- ✅ Keep related logic inside the class that uses it
- ❌ NO module-level constants (except true global enums or types)
- ❌ NO module-level helper functions
- ❌ NO global utility functions (use class methods instead)

**Exception**: Only use module-level constants for:

- Type definitions and interfaces
- Enums that are used across multiple unrelated modules
- True application-wide configuration (should be in dedicated config files)

### 4. DTO Property Decorators

#### Request DTO Pattern

```typescript
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoEnumProperty(AnalysisTypeEnum)
  public type: AnalysisTypeEnum;

  @RequestDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @RequestDtoStringProperty({ isArray: true })
  public tags: string[];

  protected override readonly _type = CreateAnalysisRequestDto.name;
}
```

#### Response DTO Pattern

```typescript
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoObjectProperty(() => AnalysisDetailsResponseDto, {
    required: false,
  })
  public details?: AnalysisDetailsResponseDto;

  protected override readonly _type = GetAnalysisResponseDto.name;
}
```

#### Available Property Decorators

**Request DTOs**:

- `@RequestDtoStringProperty(props?)`
- `@RequestDtoNumberProperty(props?)`
- `@RequestDtoBooleanProperty(props?)`
- `@RequestDtoEnumProperty(enumType, props?)`
- `@RequestDtoObjectProperty(type, props?)`
- `@RequestDtoDateProperty(props?)`
- `@RequestDtoValueObjectProperty(valueObjectClass, props?)`
- `@RequestDtoFileProperty(props?)`

**Response DTOs**:

- `@ResponseDtoStringProperty(props?)`
- `@ResponseDtoNumberProperty(props?)`
- `@ResponseDtoBooleanProperty(props?)`
- `@ResponseDtoEnumProperty(enumType, props?)`
- `@ResponseDtoObjectProperty(type, props?)`
- `@ResponseDtoDateProperty(props?)`
- `@ResponseDtoValueObjectProperty(valueObjectClass, props?)`
- `@ResponseDtoBase64FileProperty(props?)`

**Property Options**:

```typescript
interface BaseDtoPropertyDecoratorPropsInterface {
  required?: boolean; // Default: true
  isArray?: boolean; // Default: false
  example?: unknown;
  description?: string;
}
```

**Rules**:

- ✅ Use specific decorators (not class-validator directly)
- ✅ Validation messages in Portuguese
- ✅ Extend `BaseBuildableDtoObject`
- ✅ Use `.build()` static method for instantiation

#### Base64 File Upload Pattern ⚠️ CRITICAL

**NEVER use `@RequestDtoFileProperty` with `FileModel` for file uploads in Request DTOs.**

The codebase uses a **base64-first approach** for file uploads to ensure consistency and proper validation.

**❌ WRONG - Using FileModel (Old Pattern):**

```typescript
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class WrongDocumentDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: false,
    isArray: true,
  })
  public files?: FileModel[]; // ❌ WRONG: Should use Base64FileRequestDto

  protected override readonly _type = WrongDocumentDto.name;
}
```

**✅ CORRECT - Using Base64FileRequestDto (Standard Pattern):**

```typescript
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CorrectDocumentDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(DocumentTypeEnum)
  public type: DocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, {
    required: false,
    isArray: true,
  })
  public files?: Base64FileRequestDto[]; // ✅ CORRECT: Uses Base64FileRequestDto

  protected override readonly _type = CorrectDocumentDto.name;
}
```

**Base64FileRequestDto Structure:**

```typescript
// Located at: @shared/api/util/dto/request/base64-file.request.dto
@RequestDto()
export class Base64FileRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(Base64)
  public readonly base64: Base64; // Base64 value object

  @RequestDtoStringProperty({ required: true })
  public readonly originalFileName: string; // Original file name

  protected override readonly _type = Base64FileRequestDto.name;
}
```

**Usage Example:**

```typescript
// Frontend sends:
{
  "type": "CNIS_DOCUMENT",
  "files": [
    {
      "base64": "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MK...",
      "originalFileName": "cnis-document.pdf"
    }
  ]
}
```

**Why Base64 Pattern?**

1. **Consistency**: All file uploads follow the same pattern
2. **Validation**: `Base64` value object validates base64 encoding
3. **Security**: Controlled file types and sizes
4. **Traceability**: Original filename preserved for debugging
5. **API First**: Works seamlessly with REST APIs (no multipart/form-data complexity)

**Migration Notes:**

If you find existing DTOs using `@RequestDtoFileProperty` with `FileModel[]`:

1. Replace `FileModel[]` with `Base64FileRequestDto[]`
2. Import `Base64FileRequestDto` from `@shared/api/util/dto/request/base64-file.request.dto`
3. Remove `@RequestDtoFileProperty` decorator
4. Use `@RequestDtoObjectProperty(() => Base64FileRequestDto)` instead
5. Remove unused imports: `FileModel`, `MimeTypeEnum`, `RequestDtoFileProperty`

### 5. Repository Method Naming Patterns

#### Query Repository (Read Operations)

```typescript
export abstract class AnalysisQueryRepositoryGateway {
  // findOne* - Returns single entity or null
  public abstract findOneAnalysisById(
    id: AnalysisId,
  ): Promise<GetAnalysisQueryResult | null>;

  public abstract findOneAnalysisByName(
    name: string,
  ): Promise<GetAnalysisQueryResult | null>;

  // findOne*WithRelations - Returns entity with TypeORM relations
  public abstract findOneAnalysisByIdWithRelations(
    id: AnalysisId,
  ): Promise<GetAnalysisWithRelationsQueryResult | null>;

  // list* - Returns paginated results
  public abstract listAnalysisByClientId(
    clientId: ClientId,
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<AnalysisEntity>>;

  // count* - Returns count
  public abstract countAnalysisByStatus(
    status: AnalysisStatusEnum,
  ): Promise<number>;
}
```

#### Command Repository (Write Operations)

```typescript
export abstract class AnalysisCommandRepositoryGateway {
  // create* - Returns TransactionType
  public abstract createAnalysis(props: AnalysisEntity): TransactionType;

  // update* - Returns TransactionType
  public abstract updateAnalysis(
    analysisId: AnalysisId,
    props: AnalysisEntity,
  ): TransactionType;

  // Custom update methods
  public abstract updateAnalysisStatus(
    analysisId: AnalysisId,
    status: AnalysisStatusEnum,
  ): TransactionType;

  // delete* - Returns TransactionType (soft delete)
  public abstract deleteAnalysis(analysisId: AnalysisId): TransactionType;
}
```

**TransactionType Pattern**:

```typescript
export type TransactionType = (executor: unknown) => Promise<void>;
```

**Naming Conventions**:

| Operation       | Pattern                                     | Returns                                |
| --------------- | ------------------------------------------- | -------------------------------------- |
| Find single     | `findOne{Entity}By{Criteria}`               | `Promise<Entity \| null>`              |
| Find with joins | `findOne{Entity}By{Criteria}WithRelations`  | `Promise<Entity \| null>`              |
| List paginated  | `list{Entity}By{Criteria}`                  | `Promise<ListDataOutputModel<Entity>>` |
| Count           | `count{Entity}By{Criteria}`                 | `Promise<number>`                      |
| Create          | `create{Entity}`                            | `TransactionType`                      |
| Update          | `update{Entity}` or `update{Entity}{Field}` | `TransactionType`                      |
| Delete          | `delete{Entity}`                            | `TransactionType`                      |

### 6. TypeORM Entity Patterns

#### Column Naming and Transformers

```typescript
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';

@Entity({ name: 'analysis' })
export class AnalysisTypeormEntity extends BaseTypeormEntity {
  // String columns
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  // Nullable columns
  @Column({ name: 'description', type: 'text', nullable: true })
  public description: string | null;

  // Enum columns
  @Column({ name: 'status', type: 'varchar', length: 50 })
  public status: AnalysisStatusEnum;

  // DATE columns - ALWAYS use DateOnlyTransformer
  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public birthDate: Date | null;

  // TIMESTAMP/DATETIME columns - ALWAYS use DateTransformer
  @Column({
    name: 'completed_at',
    type: 'timestamp',
    nullable: true,
    transformer: DateTransformer,
  })
  public completedAt: Date | null;

  // Encrypted columns
  @Column({
    name: 'sensitive_data',
    type: 'varchar',
    length: 255,
    transformer: CryptographyTransformer,
  })
  public sensitiveData: string;

  // ManyToOne relationship (TypeORM creates client_id FK automatically)
  @ManyToOne(() => ClientTypeormEntity, (entity) => entity.analyses)
  @JoinColumn({ name: 'client_id' })
  public client?: ClientTypeormEntity;

  // OneToMany relationship
  @OneToMany(() => AnalysisItemTypeormEntity, (entity) => entity.analysis)
  public items?: AnalysisItemTypeormEntity[];

  protected override readonly _type = AnalysisTypeormEntity.name;
}
```

**CRITICAL Rules**:

- ✅ Database columns: `snake_case` (e.g., `created_at`, `client_id`)
- ✅ TypeScript properties: `camelCase` (e.g., `createdAt`, `clientId`)
- ✅ Always use `@Column({ name: 'snake_case' })`
- ✅ **Date columns (`type: 'date'`) MUST use `DateOnlyTransformer`**
- ✅ **Timestamp/datetime columns (`type: 'timestamp'` or `type: 'datetime'`) MUST use `DateTransformer`**
- ✅ Sensitive data columns MUST use `CryptographyTransformer`
- ✅ Relations are optional: `type?` with `| undefined`
- ✅ Extend `BaseTypeormEntity`
- ❌ NO business logic in TypeORM entities
- ❌ NO validation in TypeORM entities

**Available Transformers**:

- `DateOnlyTransformer` - Formats dates as 'YYYY-MM-DD' for MySQL DATE columns (REQUIRED for `type: 'date'`)
- `DateTransformer` - Formats dates as ISO strings for MySQL TIMESTAMP/DATETIME columns (REQUIRED for `type: 'timestamp'` or `type: 'datetime'`)
- `CryptographyTransformer` - Encrypts/decrypts sensitive data
- `HashTransformer` - One-way password hashing

**⚠️ CRITICAL: Choosing the Correct Date Transformer**

MySQL has different date/time column types that require different transformers:

- **`type: 'date'`** → Use `DateOnlyTransformer` (stores 'YYYY-MM-DD', e.g., '2000-03-10')
- **`type: 'timestamp'` or `type: 'datetime'`** → Use `DateTransformer` (stores full ISO datetime)

Using the wrong transformer will cause database errors like:

```
QueryFailedError: Incorrect date value: '2000-03-10T03:00:00.000Z' for column 'start_date'
```

#### ⚠️ CRITICAL: Foreign Key Relationships Pattern

**NEVER add a separate `@Column` for foreign key IDs when using `@ManyToOne` relations.**

TypeORM automatically creates the foreign key column in the database when you use `@JoinColumn`. Adding a duplicate `@Column` violates TypeORM best practices and breaks the architecture.

**❌ WRONG - DO NOT DO THIS:**

```typescript
@Entity({ name: 'analysis' })
export class AnalysisTypeormEntity extends BaseTypeormEntity {
  // ❌ WRONG: Duplicate column for FK
  @Column({ name: 'client_id', type: 'uuid' })
  public clientId: string;

  // The relation already manages this column!
  @ManyToOne(() => ClientTypeormEntity, (entity) => entity.analyses)
  @JoinColumn({ name: 'client_id' })
  public client?: ClientTypeormEntity;
}
```

**✅ CORRECT - Follow This Pattern:**

```typescript
@Entity({ name: 'analysis' })
export class AnalysisTypeormEntity extends BaseTypeormEntity {
  // ✅ CORRECT: Only define the relation with @JoinColumn
  // TypeORM automatically creates the 'client_id' column in database
  @ManyToOne(() => ClientTypeormEntity, (entity) => entity.analyses)
  @JoinColumn({ name: 'client_id' })
  public client?: ClientTypeormEntity;
}
```

**How to Access Foreign Key IDs:**

**Option 1: Load the relation (RECOMMENDED for this codebase)**

```typescript
// In Repository
const result = await this.findOne({
  where: { id: id.toString() },
  relations: { client: true }, // Load the relation
});

// In AutoMapper - Extract ID from loaded relation
const convert = (source: AnalysisTypeormEntity): AnalysisEntity => {
  return new AnalysisEntity({
    id: new AnalysisId(source.id),
    clientId: source.client?.id ? new ClientId(source.client.id) : null,
    // ...other fields
  });
};
```

**Option 2: Use TypeORM's @RelationId decorator (AVOID in this codebase)**

```typescript
@Entity({ name: 'analysis' })
export class AnalysisTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => ClientTypeormEntity, (entity) => entity.analyses)
  @JoinColumn({ name: 'client_id' })
  public client?: ClientTypeormEntity;

  // TypeORM populates this automatically (without loading relation)
  @RelationId((entity: AnalysisTypeormEntity) => entity.client)
  public clientId?: string;
}
```

**Why This Matters:**

1. **Database Integrity**: TypeORM manages FK constraints properly through relations
2. **Single Source of Truth**: The relation is the authoritative source, not a duplicate column
3. **AutoMapper Dependency**: Domain entities need the ID, which must come from loaded relations
4. **Prevents Sync Issues**: Duplicate columns can get out of sync with the relation
5. **TypeORM Best Practice**: This is the standard recommended pattern

**Common Mistake Scenario:**

```
Problem: Use case gets 404 error when entity exists in database
Root Cause: Repository doesn't load relation → AutoMapper can't extract ID →
           Domain entity has null ID → Validation fails
Solution: Add `relations: { relationName: true }` to repository query
```

### 7. Controller and Endpoint Patterns

#### Controller Route Decorators

```typescript
// Generic routes (no prefix)
@GenericControllerRoute('auth-identity')
export class AuthIdentityController {
  protected readonly _type = AuthIdentityController.name;
}

// Customer routes (prefix: /customer)
@CustomerControllerRoute('analysis')
export class AnalysisController {
  protected readonly _type = AnalysisController.name;
} // Results in: /customer/analysis/*

// Admin routes (prefix: /admin)
@AdminControllerRoute('users')
export class UsersController {
  protected readonly _type = UsersController.name;
} // Results in: /admin/users/*
```

#### BuildEndpointSpecification Pattern

```typescript
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { Body, Param } from '@nestjs/common';
import { RequestMethod, HttpStatus } from '@nestjs/common';

@CustomerControllerRoute('analysis')
export class AnalysisController {
  public constructor(
    private readonly createAnalysisUseCase: CreateAnalysisUseCase,
    private readonly getAnalysisUseCase: GetAnalysisUseCase,
  ) {}

  // POST endpoint with body
  @BuildEndpointSpecification({
    summary: 'Criar nova análise',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateAnalysisRequestDto,
    },
    tag: ['analise'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateAnalysisResponseDto,
    },
    guard: [AuthGuard],
    throttle: {
      limit: 10,
      ttlInMinutes: 1,
    },
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: CreateAnalysisRequestDto,
  ): Promise<CreateAnalysisResponseDto> {
    return this.createAnalysisUseCase.execute(sessionData, dto);
  }

  // GET endpoint with path parameter
  @BuildEndpointSpecification({
    summary: 'Obter análise por ID',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise encontrada com sucesso.',
      type: GetAnalysisResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getById(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('id') id: string,
  ): Promise<GetAnalysisResponseDto> {
    return this.getAnalysisUseCase.execute(sessionData, { id });
  }

  protected readonly _type = AnalysisController.name;
}
```

**BuildEndpointSpecification Options**:

```typescript
{
  summary: string;                  // Short description (Portuguese)
  userLevel: UserLevelEnum[];       // Required user levels for access
  http: {
    path: string;                   // Route path (use :param for params)
    method: RequestMethod;          // GET, POST, PUT, PATCH, DELETE
    type?: DtoClass;                // Request DTO (for POST/PUT/PATCH)
  };
  tag: string[];                    // Swagger tags
  successResponse: {
    statusCode: HttpStatus;         // 200, 201, 204, etc.
    description: string;            // Success message (Portuguese)
    type: DtoClass;                 // Response DTO
  };
  guard?: Type<CanActivate>[];      // Guards (e.g., [AuthGuard])
  throttle?: {
    limit: number;                  // Max requests
    ttlInMinutes: number;           // Time window
  };
  deprecated?: boolean;             // Mark as deprecated
}
```

**Rules**:

- ✅ All summaries and descriptions in Portuguese
- ✅ Use `@GetSessionData()` for authenticated user data
- ✅ Use `@Body()` for request body
- ✅ Use `@Param()` for path parameters
- ✅ Use `@Query()` for query parameters
- ✅ Controller methods should ONLY call use cases (no business logic)

### 8. Value Object Patterns

```typescript
import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidAnalysisIdError } from './error/invalid-analysis-id.error';

export class AnalysisId extends BaseValueObject<string> {
  protected readonly _type = AnalysisId.name;

  public constructor(value: string) {
    super(value);

    if (!AnalysisId.isValid(value)) {
      throw new InvalidAnalysisIdError();
    }
  }

  public static isValid(value: string): boolean {
    // UUID validation
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  public equals(other: AnalysisId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
```

**Rules**:

- ✅ Extend `BaseValueObject<T>`
- ✅ Validate in constructor
- ✅ Static `isValid()` method for validation
- ✅ Implement `equals()` and `toString()`
- ✅ Throw specific error on invalid input
- ✅ Immutable (readonly value)
- ❌ NO business logic (only validation)

#### ⚠️ CRITICAL: ID Value Objects Auto-Generate UUIDs

**NEVER manually generate UUIDs using `crypto.randomUUID()` or similar functions.**

ID value objects that extend `Guid` automatically generate a UUID when no value is provided to the constructor.

**❌ WRONG - Manual UUID Generation:**

```typescript
import { randomUUID } from 'node:crypto';

const entity = new AnalysisEntity({
  id: new AnalysisId(randomUUID()), // ❌ WRONG: Manually generating UUID
  name: 'Test',
});
```

**✅ CORRECT - Auto-Generation:**

```typescript
const entity = new AnalysisEntity({
  id: new AnalysisId(), // ✅ CORRECT: ID class auto-generates UUID
  name: 'Test',
});
```

**Why This Matters:**

1. **DRY Principle**: The `Guid` class already has UUID generation logic (see `@core/domain/schema/value-object/guid/guid.value-object.ts`)
2. **Consistency**: All UUIDs are generated using the same algorithm throughout the codebase
3. **Simplicity**: Less code to write and maintain
4. **Type Safety**: The ID value object handles validation automatically

**How It Works:**

The `Guid` class constructor accepts an optional `value` parameter:

```typescript
public constructor(value?: string) {
  value = value ?? Guid.generate(); // Auto-generates if not provided
  super(value);
  // ... validation
}
```

**When to Provide a Value:**

- ✅ When mapping from database (existing ID): `new AnalysisId(source.id)`
- ✅ When receiving from API/DTO: `new AnalysisId(dto.analysisId)`
- ❌ When creating new entities: `new AnalysisId()` (NO parameter)

### 9. Module Registration Patterns

#### Feature Module Pattern

```typescript
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { AnalysisController } from '@module/customer/analysis/analysis.controller';
import { CreateAnalysisUseCase } from '@module/customer/analysis/use-case/create-analysis.use-case';
import { GetAnalysisUseCase } from '@module/customer/analysis/use-case/get-analysis.use-case';

@Module({
  imports: [
    DatabaseModule, // REQUIRED for repository access
  ],
  controllers: [AnalysisController],
  providers: [
    // Use cases
    CreateAnalysisUseCase,
    GetAnalysisUseCase,

    // Use case gateway registrations (if needed for cross-module usage)
    // {
    //   provide: CreateAnalysisUseCaseGateway,
    //   useClass: CreateAnalysisUseCase,
    // },
  ],
  exports: [
    // Export gateways for use in other modules
    // CreateAnalysisUseCaseGateway,
  ],
})
export class AnalysisModule {
  protected readonly _type = AnalysisModule.name;
}
```

#### DatabaseModule Repository Registration

```typescript
// In src/infra/database/database.module.ts

const providers: ClassProvider[] = [
  // Query repository
  {
    provide: AnalysisQueryRepositoryGateway,
    useClass: AnalysisTypeormQueryRepository,
  },

  // Command repository
  {
    provide: AnalysisCommandRepositoryGateway,
    useClass: AnalysisTypeormCommandRepository,
  },

  // ... more repositories
];
```

**Rules**:

- ✅ Always import `DatabaseModule` for repository access
- ✅ Register use case gateway: `{ provide: Gateway, useClass: Implementation }`
- ✅ Export gateways (not implementations) for cross-module usage
- ✅ Repository gateways registered ONLY in `DatabaseModule`
- ❌ DO NOT register repositories in feature modules

### 10. Build Pattern for Objects

#### Usage in DTOs and TypeORM Entities

```typescript
// Creating DTOs
const dto = CreateAnalysisResponseDto.build({
  id: '123',
  name: 'Analysis 1',
});

// Creating TypeORM entities (for testing/mocking)
const entity = AnalysisTypeormEntity.build({
  id: '123',
  name: 'Analysis 1',
  status: AnalysisStatusEnum.PENDING,
});
```

**Rules**:

- ✅ Use `.build()` static method instead of `new` constructor
- ✅ DTOs extend `BaseBuildableDtoObject`
- ✅ TypeORM entities extend `BaseTypeormEntity` (which extends `BaseBuildableObject`)
- ✅ Build pattern handles automatic property assignment

### 11. Enum Patterns

```typescript
export enum AnalysisStatusEnum {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
```

**Rules**:

- ✅ Enum names: `PascalCase` with `Enum` suffix
- ✅ Enum keys: `UPPER_SNAKE_CASE`
- ✅ Enum values: String format - may use either `lowercase snake_case` or `UPPER_SNAKE_CASE`
- ✅ Store as strings in database (not numbers)
- ✅ When adding values to an existing enum, follow the existing pattern in that file for consistency
- ❌ NO numeric enums
- ❌ NO accents, special symbols, or spaces in enum values (use only alphanumeric and underscores)

### 12. AutoMapper Profile Patterns

```typescript
import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisEntityAutoMapperProfile {
  protected readonly _type = AnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (source: AnalysisTypeormEntity): AnalysisEntity => {
      return new AnalysisEntity({
        id: new AnalysisId(source.id),
        name: source.name,
        status: source.status,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AnalysisTypeormEntity,
      AnalysisEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (source: AnalysisEntity): AnalysisTypeormEntity => {
      return AnalysisTypeormEntity.build({
        id: source.id.toString(),
        name: source.name,
        status: source.status,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AnalysisEntity,
      AnalysisTypeormEntity,
      constructUsing(convert),
    );
  }
}
```

**Rules**:

- ✅ Create bidirectional mappings (ORM ↔ Domain)
- ✅ Use `constructUsing` for complex transformations
- ✅ Convert IDs: `new ValueObjectId(source.id)` → Domain
- ✅ Convert IDs: `source.id.toString()` → ORM
- ✅ Use `.build()` for ORM entities
- ✅ Use `new` constructor for Domain entities

---

## Code Organization Guidelines

### Module Structure

Each feature module follows this structure:

```
module/{feature}/
├── domain/
│   ├── schema/
│   │   ├── entity/
│   │   │   ├── {entity-name}/
│   │   │   │   ├── {entity-name}.entity.ts
│   │   │   │   ├── {entity-name}.entity.props.interface.ts
│   │   │   │   ├── enum/
│   │   │   │   │   └── {enum-name}.enum.ts
│   │   │   │   └── value-object/
│   │   │   │       └── {vo-name}/
│   │   │   │           └── {vo-name}.value-object.ts
│   └── repository/
│       ├── query/
│       │   ├── {entity-name}.query.repository.gateway.ts
│       │   └── result/
│       │       └── {result-name}.query.result.ts
│       └── command/
│           └── {entity-name}.command.repository.gateway.ts
├── use-case/
│   ├── create-{entity}.use-case.ts
│   ├── update-{entity}.use-case.ts
│   ├── delete-{entity}.use-case.ts
│   └── get-{entity}.use-case.ts
├── dto/
│   ├── request/
│   │   ├── create-{entity}.request.dto.ts
│   │   └── update-{entity}.request.dto.ts
│   └── response/
│       ├── create-{entity}.response.dto.ts
│       └── get-{entity}.response.dto.ts
├── error/
│   ├── {entity}-not-found.error.ts
│   └── {entity}-already-exists.error.ts
├── {feature}.controller.ts
└── {feature}.module.ts
```

### File Naming Conventions

| Type                      | Pattern                                 | Example                                |
| ------------------------- | --------------------------------------- | -------------------------------------- |
| Use Case                  | `{action}-{entity}.use-case.ts`         | `create-analysis.use-case.ts`          |
| Entity                    | `{entity-name}.entity.ts`               | `analysis.entity.ts`                   |
| Value Object              | `{vo-name}.value-object.ts`             | `analysis-id.value-object.ts`          |
| Repository Gateway        | `{entity}.{type}.repository.gateway.ts` | `analysis.query.repository.gateway.ts` |
| Repository Implementation | `{entity}.typeorm.{type}.repository.ts` | `analysis.typeorm.query.repository.ts` |
| DTO                       | `{action}-{entity}.{type}.dto.ts`       | `create-analysis.request.dto.ts`       |
| Error                     | `{entity}-{error-type}.error.ts`        | `analysis-not-found.error.ts`          |
| Controller                | `{feature}.controller.ts`               | `analysis.controller.ts`               |
| Module                    | `{feature}.module.ts`                   | `analysis.module.ts`                   |

### Import Order

Always maintain this import order:

1. External libraries (e.g., `@nestjs/common`)
2. NestJS modules
3. Core (`@core/*`)
4. Infrastructure (`@infra/*`)
5. Libraries (`@lib/*`)
6. Modules (`@module/*`)
7. Shared (`@shared/*`)

**Example**:

```typescript
import { Injectable, Inject } from '@nestjs/common';

import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis/analysis.entity';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
```

---

## Development Commands

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

---

## Code Style Guidelines

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

### Naming Conventions

- **Files**: `kebab-case.type.ts` (e.g., `create-analysis.use-case.ts`)
- **Classes**: `PascalCase` with suffix (e.g., `CreateAnalysisUseCase`)
- **Interfaces**: `PascalCase` with `Interface` suffix (e.g., `AnalysisEntityPropsInterface`)
- **Abstract Classes (Gateways)**: `PascalCase` with `Gateway` suffix (e.g., `AnalysisQueryRepositoryGateway`)
- **Errors**: `PascalCase` with `Error` suffix (e.g., `AnalysisNotFoundError`)
- **Enums**: `PascalCase` with `Enum` suffix (e.g., `AnalysisStatusEnum`)
- **Value Objects**: `PascalCase` (e.g., `AnalysisId`, `Email`)
- **Variables/Parameters**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE` or `camelCase` (for readonly class properties)

### Error Messages

- Use **Portuguese** for user-facing messages
- Be specific and actionable
- Example: `'Análise não encontrada'` instead of `'Not found'`

### Comments

- ❌ **NO comments in code** - Code should be self-documenting through clear naming and structure
- ❌ NO inline comments (e.g., `// This is a comment`)
- ❌ NO block comments (e.g., `/* This is a block comment */`)
- ❌ NO JSDoc comments (e.g., `/** Documentation */`)
- ✅ Use descriptive variable/function names instead of comments
- ✅ Break complex logic into well-named private methods
- ✅ Use TypeScript types to document intent

**Why no comments?**:

- Clean Architecture and DDD promote self-documenting code
- Well-named functions, variables, and types provide better documentation
- Comments can become outdated and misleading
- Code structure should explain the "what" and "how"
- Domain concepts should explain the "why"

**Example**:

```typescript
// ❌ BAD - Using comments
public async execute(dto: ProcessAnalysisRequestDto): Promise<ProcessAnalysisResponseDto> {
  // Fetch the analysis from the database
  const analysis = await this.repository.findById(dto.id);

  // Check if analysis exists
  if (!analysis) {
    throw new AnalysisNotFoundError();
  }

  // Process the analysis data
  const result = this.processData(analysis);

  return result;
}

// ✅ GOOD - Self-documenting code
public async execute(dto: ProcessAnalysisRequestDto): Promise<ProcessAnalysisResponseDto> {
  const analysis = await this.fetchAnalysisOrThrow(dto.id);
  const processedData = this.processAnalysisData(analysis);

  return this.buildResponse(processedData);
}

private async fetchAnalysisOrThrow(id: AnalysisId): Promise<AnalysisEntity> {
  const analysis = await this.repository.findById(id);

  if (!analysis) {
    throw new AnalysisNotFoundError();
  }

  return analysis;
}
```

---

## Common Pitfalls & Solutions

### 1. Missing Provider Registration

**Problem**: `Nest can't resolve dependencies` error

**Solution**: Add the gateway-to-implementation mapping in `DatabaseModule` providers array:

```typescript
{
  provide: AnalysisCommandRepositoryGateway,
  useClass: AnalysisTypeormCommandRepository,
}
```

### 2. Circular Dependencies

**Problem**: Module import cycles

**Solution**: Use `forwardRef()` or refactor to break the cycle

### 3. TypeORM Date Fields Returning Strings

**Problem**: Date validation fails because MySQL returns strings

**Solution**: Use `DateTransformer` on date columns:

```typescript
@Column({
  name: 'created_at',
  type: 'timestamp',
  transformer: DateTransformer,
})
public createdAt: Date;
```

### 4. TypeORM Relations

Always specify inverse relations in entities for bidirectional relationships:

```typescript
@Entity()
export class AnalysisTypeormEntity {
  @ManyToOne(() => ClientTypeormEntity, (entity) => entity.analyses)
  @JoinColumn({ name: 'client_id' })
  public client: ClientTypeormEntity;
}

@Entity()
export class ClientTypeormEntity {
  @OneToMany(() => AnalysisTypeormEntity, (entity) => entity.client)
  public analyses: AnalysisTypeormEntity[];
}
```

### 5. Business Logic in Wrong Layer

**Problem**: Business logic scattered across controllers, repositories, or utils

**Solution**: Keep ALL business logic in use cases as private methods

### 6. Domain Entities with Infrastructure Dependencies

**Problem**: Domain entities importing TypeORM or other infrastructure concerns

**Solution**: Domain entities should be pure TypeScript classes with no external dependencies

---

## Testing Guidelines

### Test Structure

- Test files: `*.spec.ts` alongside source files
- Unit tests: Test use cases in isolation
- Integration tests: Test controllers with mocked use cases
- E2E tests: Test full flow

### Use Case Testing

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAnalysisUseCase } from './create-analysis.use-case';
import { AnalysisCommandRepositoryGateway } from '../domain/repository/analysis/command/analysis.command.repository.gateway';

describe('CreateAnalysisUseCase', () => {
  let useCase: CreateAnalysisUseCase;
  let mockRepository: jest.Mocked<AnalysisCommandRepositoryGateway>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAnalysisUseCase,
        {
          provide: AnalysisCommandRepositoryGateway,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateAnalysisUseCase>(CreateAnalysisUseCase);
  });

  it('should create an analysis', async () => {
    const dto = {
      /* test data */
    };
    const expectedEntity = {
      /* expected result */
    };

    mockRepository.create.mockResolvedValue(expectedEntity);

    const result = await useCase.execute(sessionData, dto);

    expect(result).toBeDefined();
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.any(AnalysisEntity),
    );
  });
});
```

### Testing Best Practices

- Mock external dependencies (databases, APIs)
- Focus on use case logic, not infrastructure
- Test business rules and edge cases
- Use meaningful test descriptions
- Arrange-Act-Assert pattern

---

## Additional Notes

- **Node Version**: 22.15.0 (specified in package.json engines)
- **Package Manager**: Yarn (not npm)
- **Database**: MySQL with TypeORM
- **API Framework**: Fastify (not Express)
- **Validation**: class-validator and class-transformer for DTOs
- **Documentation**: OpenAPI/Swagger (via decorators)
- **Language**: Portuguese for user-facing messages

---

## Quick Reference

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

---

## Architecture Checklist

When creating a new feature, follow this checklist:

- [ ] Create domain entity in `domain/schema/entity/`
- [ ] Create value objects for IDs and domain concepts
- [ ] Define repository gateways (Query and Command) in `domain/repository/`
- [ ] Implement TypeORM entity in `infra/database/implementation/typeorm/schema/entity/`
- [ ] Implement repository in `infra/database/implementation/typeorm/repository/`
- [ ] Create AutoMapper profile in `lib/mapper/implementation/auto-mapper/profile/`
- [ ] Register repository in `DatabaseModule`
- [ ] Create use cases in `use-case/`
- [ ] Create DTOs in `dto/request/` and `dto/response/`
- [ ] Create controller in `{feature}.controller.ts`
- [ ] Register use cases and controller in `{feature}.module.ts`
- [ ] Create domain-specific errors in `error/`
- [ ] Write tests for use cases
- [ ] Generate and apply database migration

---

**Remember**: Clean Architecture is about separation of concerns and dependency direction. The domain is the heart of your application, and everything else supports it.
