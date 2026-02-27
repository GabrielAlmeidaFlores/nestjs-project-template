import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import type { DeepPartial, EntityManager, Repository } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseTypeormCommandRepository<
  T extends BaseTypeormEntity,
> {
  protected constructor(private readonly repository: Repository<T>) {}

  protected create(data: DeepPartial<T>): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo = manager.getRepository<T>(this.repository.target);
      const newData = repo.create(data);
      await repo.save(newData);
    };
  }

  protected update(
    id: string,
    data: QueryDeepPartialEntity<T>,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo = manager.getRepository<T>(this.repository.target);

      const entityMetadata = repo.metadata;

      const immutableFields = new Set(['createdAt', 'id']);

      const validPropertyNames = entityMetadata.columns
        .map((column) => column.propertyName)
        .filter((name) => !immutableFields.has(name));

      (data as T)['updatedAt'] = new Date();

      const sanitizedData: QueryDeepPartialEntity<T> = {};
      for (const key in data) {
        if (validPropertyNames.includes(key)) {
          sanitizedData[key] = data[key];
        }
      }

      await repo.update(id, sanitizedData);
    };
  }

  protected delete(id: string): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo = manager.getRepository<T>(this.repository.target);
      await repo.softDelete(id);
    };
  }

  protected async _upsertWithNoTransaction(
    data: DeepPartial<T>,
    conflictPaths: string[],
  ): Promise<void> {
    await this.repository.upsert(data as QueryDeepPartialEntity<T>, {
      conflictPaths,
    });
  }
}
