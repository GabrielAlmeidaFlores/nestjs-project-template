import { Inject } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CreditPackCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/command/credit-pack.command.repository.gateway';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { CreditPackEntity } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

const CREDIT_PACK_SEED_DATA: Array<CreditPackEntity> = [
  new CreditPackEntity({
    id: new CreditPackId('c1a00000-0000-0000-0000-000000000001'),
    price: new DecimalValue('49.9'),
    creditAmount: 50,
    active: true,
  }),
  new CreditPackEntity({
    id: new CreditPackId('c1a00000-0000-0000-0000-000000000002'),
    price: new DecimalValue('129.9'),
    creditAmount: 150,
    active: true,
  }),
  new CreditPackEntity({
    id: new CreditPackId('c1a00000-0000-0000-0000-000000000003'),
    price: new DecimalValue('399.9'),
    creditAmount: 500,
    active: true,
  }),
];

export class CreditPackSeeder implements SeederInterface {
  protected readonly _type = CreditPackSeeder.name;

  public constructor(
    @Inject(CreditPackQueryRepositoryGateway)
    private readonly creditPackQueryRepositoryGateway: CreditPackQueryRepositoryGateway,
    @Inject(CreditPackCommandRepositoryGateway)
    private readonly creditPackCommandRepositoryGateway: CreditPackCommandRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const existing =
      await this.creditPackQueryRepositoryGateway.listActiveCreditPacks(
        new ListDataInputModel({ page: 1, limit: 10 }),
      );

    if (existing.totalItems > 0) {
      return [];
    }

    const transactions: Array<TransactionType> = [];

    for (const pack of CREDIT_PACK_SEED_DATA) {
      transactions.push(
        this.creditPackCommandRepositoryGateway.createCreditPack(pack),
      );
    }

    return transactions;
  }
}
