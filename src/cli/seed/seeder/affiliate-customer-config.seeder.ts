import { Inject } from '@nestjs/common';

import { AffiliateCustomerConfigCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/command/affiliate-customer-config.command.repository.gateway';
import { AffiliateCustomerConfigQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/query/affiliate-customer-config.query.repository.gateway';
import { AffiliateCustomerConfigEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/affiliate-customer-config.entity';
import { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';
import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

const DEFAULT_TRANSFER_DAY_OF_MONTH = '5';

export class AffiliateCustomerConfigSeeder implements SeederInterface {
  protected readonly _type = AffiliateCustomerConfigSeeder.name;

  public constructor(
    @Inject(AffiliateCustomerConfigQueryRepositoryGateway)
    private readonly configQueryRepository: AffiliateCustomerConfigQueryRepositoryGateway,
    @Inject(AffiliateCustomerConfigCommandRepositoryGateway)
    private readonly configCommandRepository: AffiliateCustomerConfigCommandRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const transactions: Array<TransactionType> = [];

    const existing = await this.configQueryRepository.findOneByConfig(
      AffiliateCustomerConfigConfigEnum.TRANSFER_DAY_OF_MONTH,
    );

    if (existing !== null) {
      return transactions;
    }

    const config = new AffiliateCustomerConfigEntity({
      config: AffiliateCustomerConfigConfigEnum.TRANSFER_DAY_OF_MONTH,
      value: DEFAULT_TRANSFER_DAY_OF_MONTH,
    });

    transactions.push(
      this.configCommandRepository.createAffiliateCustomerConfig(config),
    );

    return transactions;
  }
}
