import { Inject, Injectable, Logger } from '@nestjs/common';

import { SeederInterface } from '@cli/seed/interface/seeder.interface';
import { AdminSeeder } from '@cli/seed/seeder/admin.seeder';
import { AffiliateCustomerConfigSeeder } from '@cli/seed/seeder/affiliate-customer-config.seeder';
import { CidTenSeeder } from '@cli/seed/seeder/cid-ten.seeder';
import { CreditPackSeeder } from '@cli/seed/seeder/credit-pack.seeder';
import { CustomerTermsSeeder } from '@cli/seed/seeder/customer-terms.seeder';
import { OrganizationCustomizationDocumentFooterTemplateSeeder } from '@cli/seed/seeder/organization-customization-document-footer-template.seeder';
import { OrganizationCustomizationDocumentHeaderTemplateSeeder } from '@cli/seed/seeder/organization-customization-document-header-template.seeder';
import { PaymentPlanPaidResourceIaConfigSeeder } from '@cli/seed/seeder/payment-plan-paid-resource-ia-config.seeder';
import { PaymentPlanPaidResourceSeeder } from '@cli/seed/seeder/payment-plan-paid-resource.seeder';
import { PaymentPlanSeeder } from '@cli/seed/seeder/payment-plan.seeder';
import { RegulatoryUpdateMonitoredSourceSeeder } from '@cli/seed/seeder/regulatory-update-monitored-source.seeder';
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
    private readonly affiliateCustomerConfigSeeder: AffiliateCustomerConfigSeeder,
    private readonly cidTenSeeder: CidTenSeeder,
    private readonly customerTermsSeeder: CustomerTermsSeeder,
    private readonly paymentPlanPaidResourceSeeder: PaymentPlanPaidResourceSeeder,
    private readonly paymentPlanPaidResourceIaConfigSeeder: PaymentPlanPaidResourceIaConfigSeeder,
    private readonly paymentPlanSeeder: PaymentPlanSeeder,
    private readonly creditPackSeeder: CreditPackSeeder,
    private readonly organizationCustomizationDocumentHeaderTemplateSeeder: OrganizationCustomizationDocumentHeaderTemplateSeeder,
    private readonly organizationCustomizationDocumentFooterTemplateSeeder: OrganizationCustomizationDocumentFooterTemplateSeeder,
    private readonly regulatoryUpdateMonitoredSourceSeeder: RegulatoryUpdateMonitoredSourceSeeder,
  ) {}

  private readonly batchSize = 50;

  public async seed(): Promise<void> {
    const seeders: Array<SeederInterface> = [
      this.adminSeeder,
      this.affiliateCustomerConfigSeeder,
      this.customerTermsSeeder,
      this.paymentPlanPaidResourceSeeder,
      this.paymentPlanPaidResourceIaConfigSeeder,
      this.paymentPlanSeeder,
      this.creditPackSeeder,
      this.cidTenSeeder,
      this.organizationCustomizationDocumentHeaderTemplateSeeder,
      this.organizationCustomizationDocumentFooterTemplateSeeder,
      this.regulatoryUpdateMonitoredSourceSeeder,
    ];

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
            `itens created: ${seederTransactions}`,
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
