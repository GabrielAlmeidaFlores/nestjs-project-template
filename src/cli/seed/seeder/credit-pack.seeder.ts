import { Inject } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CreditPackCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/command/credit-pack.command.repository.gateway';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { CreditPackEntity } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

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

    const packs = [
      new CreditPackEntity({
        price: new DecimalValue('49.9'),
        creditAmount: 50,
        active: true,
      }),
      new CreditPackEntity({
        price: new DecimalValue('129.9'),
        creditAmount: 150,
        active: true,
      }),
      new CreditPackEntity({
        price: new DecimalValue('399.9'),
        creditAmount: 500,
        active: true,
      }),
    ];

    return packs.map((pack) =>
      this.creditPackCommandRepositoryGateway.createCreditPack(pack),
    );
  }
}
