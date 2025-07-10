// src/infra/database/implementation/typeorm/transaction/typeorm.transaction-manager.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TransactionEventOutputModel } from '@core/domain/repository/base/model/output/transaction-event.output.model';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/repository/base.transaction.repository.gateway';

import type { TransactionEventType } from '@core/domain/repository/base/type/transaction-event.interface';

@Injectable()
export class BaseTypeormTransactionRepository
  implements BaseTransactionRepositoryGateway
{
  protected readonly _type = BaseTypeormTransactionRepository.name;

  public constructor(private readonly dataSource: DataSource) {}

  public async execute(
    events: TransactionEventType[],
  ): Promise<TransactionEventOutputModel> {
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
}
