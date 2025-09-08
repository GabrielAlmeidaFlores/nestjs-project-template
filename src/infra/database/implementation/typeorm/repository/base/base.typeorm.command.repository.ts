import { TransactionEventOutputModel } from '@core/domain/repository/assets/model/output/transaction-event.output.model';

import type { TransactionType } from '@core/domain/repository/assets/type/transaction.type';
import type { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import type {
  DataSource,
  DeepPartial,
  EntityManager,
  Repository,
} from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseTypeormCommandRepository<
  T extends BaseTypeormEntity,
> {
  protected constructor(
    private readonly repository: Repository<T>,
    private readonly dataSource: DataSource,
  ) {}

  public async save(
    events: TransactionType | TransactionType[],
  ): Promise<TransactionEventOutputModel> {
    if (!Array.isArray(events)) {
      events = [events];
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let finalized = false;

    const timeoutPromise = async (): Promise<void> => {
      if (!finalized && queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();

        await queryRunner.release();
      }
    };
    const timeoutInMilliseconds = 30_000;
    const timeout = setTimeout(() => {
      void timeoutPromise();
    }, timeoutInMilliseconds);

    const finalize = async (action: 'commit' | 'rollback'): Promise<void> => {
      if (finalized) {
        return;
      }
      finalized = true;
      clearTimeout(timeout);

      if (action === 'commit') {
        await queryRunner.commitTransaction();
      } else if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    };

    const commit = async (): Promise<void> => finalize('commit');
    const rollback = async (): Promise<void> => finalize('rollback');

    try {
      for (const event of events) {
        await event(queryRunner.manager);
      }

      return new TransactionEventOutputModel(commit, rollback);
    } catch (error) {
      await rollback();
      throw error;
    }
  }

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
