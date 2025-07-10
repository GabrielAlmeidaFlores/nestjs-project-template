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

    const commit = async (): Promise<void> => {
      await queryRunner.commitTransaction();
      await queryRunner.release();
    };
    const rollback = async (): Promise<void> => {
      if (queryRunner.isReleased) {
        return;
      }

      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      await queryRunner.release();
    };

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
