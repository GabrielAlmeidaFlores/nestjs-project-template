import { Inject, Injectable, Logger } from '@nestjs/common';

import { SeederInterface } from '@cli/seed/interface/seeder.interface';
import { CustomerTermsSeeder } from '@cli/seed/seeder/customer-terms.seeder';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

@Injectable()
export class SeedService {
  protected readonly _type = SeedService.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    private readonly logger: Logger,
    private readonly customerTermsSeeder: CustomerTermsSeeder,
  ) {}

  public async seed(): Promise<void> {
    const seeders: Array<SeederInterface> = [this.customerTermsSeeder];

    const transactions: Array<TransactionType> = [];

    await Promise.all(
      seeders.map(async (seeder) => {
        const seederTransactions = await seeder.execute();

        this.logger.log(
          `transactions to be executed: ${seederTransactions.length}`,
          seeder.constructor.name,
        );

        transactions.push(...seederTransactions);
      }),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();
  }
}
