// src/infra/database/implementation/typeorm/transaction/typeorm.transaction-manager.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/repository/base.transaction.repository.gateway';

import type { TransactionEventType } from '@core/domain/repository/base/type/transaction-event.interface';

@Injectable()
export class BaseTypeormTransactionRepository
  implements BaseTransactionRepositoryGateway
{
  protected readonly _type = BaseTypeormTransactionRepository.name;

  public constructor(private readonly dataSource: DataSource) {}

  public async commit(events: TransactionEventType[]): Promise<void> {
    if (!events.length) {
      return;
    }

    await this.dataSource.transaction(async (manager: EntityManager) => {
      for (const event of events) {
        await event(manager);
      }
    });
  }
}
