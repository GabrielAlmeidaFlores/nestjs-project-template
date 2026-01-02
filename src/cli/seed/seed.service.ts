import { Inject, Injectable, Logger } from '@nestjs/common';

import { SeederInterface } from '@cli/seed/interface/seeder.interface';
import { AdminSeeder } from '@cli/seed/seeder/admin.seeder';
import { CidTenSeeder } from '@cli/seed/seeder/cid-ten.seeder';
import { CustomerTermsSeeder } from '@cli/seed/seeder/customer-terms.seeder';
import { PaymentPlanPaidResourceIaConfigSeeder } from '@cli/seed/seeder/payment-plan-paid-resource-ia-config.seeder';
import { PaymentPlanPaidResourceSeeder } from '@cli/seed/seeder/payment-plan-paid-resource.seeder';
import { PaymentPlanSeeder } from '@cli/seed/seeder/payment-plan.seeder';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

@Injectable()
export class SeedService {
  protected readonly _type = SeedService.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    private readonly logger: Logger,
    private readonly adminSeeder: AdminSeeder,
    private readonly cidTenSeeder: CidTenSeeder,
    private readonly customerTermsSeeder: CustomerTermsSeeder,
    private readonly paymentPlanPaidResourceSeeder: PaymentPlanPaidResourceSeeder,
    private readonly paymentPlanPaidResourceIaConfigSeeder: PaymentPlanPaidResourceIaConfigSeeder,
    private readonly paymentPlanSeeder: PaymentPlanSeeder,
  ) {}

  public async seed(): Promise<void> {
    const seeders: Array<SeederInterface> = [
      this.adminSeeder,
      this.customerTermsSeeder,
      this.paymentPlanPaidResourceSeeder,
      this.paymentPlanPaidResourceIaConfigSeeder,
      this.paymentPlanSeeder,
      this.cidTenSeeder,
    ];

    const transactions: Array<TransactionType> = [];

    for (const seeder of seeders) {
      const seederTransactions = await seeder.execute();

      if (Array.isArray(seederTransactions)) {
        this.logger.log(
          `transactions to be executed: ${seederTransactions.length}`,
          seeder.constructor.name,
        );
        transactions.push(...seederTransactions);
      } else {
        this.logger.log(
          `itens created: ${seederTransactions}`,
          seeder.constructor.name,
        );
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();
  }
}
