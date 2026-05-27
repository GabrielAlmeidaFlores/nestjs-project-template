import { Inject, Injectable, Logger } from '@nestjs/common';

import { SeederInterface } from '@cli/seed/interface/seeder.interface';
import { UserSeeder } from '@cli/seed/seeder/user.seeder';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

@Injectable()
export class SeedService {
  protected readonly _type = SeedService.name;
  private readonly batchSize: number;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    private readonly logger: Logger,
    private readonly userSeeder: UserSeeder,
  ) {
    this.batchSize = 50;
  }

  public async seed(): Promise<void> {
    const seeders: Array<SeederInterface> = [this.userSeeder];

    for (const seeder of seeders) {
      let transactions: Array<TransactionType> = [];

      try {
        const seederTransactions = await seeder.execute();

        if (Array.isArray(seederTransactions)) {
          this.logger.log(
            `transactions to be executed: ${seederTransactions.length}`,
            seeder.constructor.name,
          );
          transactions = seederTransactions;
        } else {
          this.logger.log(
            `items created: ${seederTransactions}`,
            seeder.constructor.name,
          );
          continue;
        }
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error(
            `Error in seeder ${seeder.constructor.name}: ${error.message}`,
            error.stack,
          );
        }
        continue;
      }

      for (let i = 0; i < transactions.length; i += this.batchSize) {
        const batch = transactions.slice(i, i + this.batchSize);

        this.logger.log(
          `executing batch ${Math.floor(i / this.batchSize) + 1}/${Math.ceil(transactions.length / this.batchSize)} (${batch.length} transactions)`,
          seeder.constructor.name,
        );

        const transaction =
          await this.baseTransactionRepositoryGateway.execute(batch);

        await transaction.commit();
      }
    }
  }
}
