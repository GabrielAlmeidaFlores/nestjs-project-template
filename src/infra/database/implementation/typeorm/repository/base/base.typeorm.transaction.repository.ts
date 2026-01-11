import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

@Injectable()
export class BaseTypeormTransactionRepository implements BaseTransactionRepositoryGateway {
  protected readonly _type = BaseTypeormTransactionRepository.name;

  public constructor(private readonly dataSource: DataSource) {}

  public async execute(
    events: TransactionType | TransactionType[],
  ): Promise<TransactionOutputModel> {
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
    const timeoutInMilliseconds = 200_000;
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

      return new TransactionOutputModel(commit, rollback);
    } catch (error) {
      await rollback();
      throw error;
    }
  }
}
