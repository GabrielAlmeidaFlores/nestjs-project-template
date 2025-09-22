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

      if ('_type' in data) {
        delete data._type;
      }

      await repo.update(id, data);
    };
  }

  protected delete(id: string): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo = manager.getRepository<T>(this.repository.target);
      await repo.softDelete(id);
    };
  }
}
