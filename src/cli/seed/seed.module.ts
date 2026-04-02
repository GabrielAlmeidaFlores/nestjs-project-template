import { Logger, Module } from '@nestjs/common';

import { SeedService } from '@cli/seed/seed.service';
import { AdminSeeder } from '@cli/seed/seeder/admin.seeder';
import { AffiliateCustomerConfigSeeder } from '@cli/seed/seeder/affiliate-customer-config.seeder';
import { CidTenSeeder } from '@cli/seed/seeder/cid-ten.seeder';
import { CustomerTermsSeeder } from '@cli/seed/seeder/customer-terms.seeder';
import { OrganizationCustomizationDocumentFooterTemplateSeeder } from '@cli/seed/seeder/organization-customization-document-footer-template.seeder';
import { OrganizationCustomizationDocumentHeaderTemplateSeeder } from '@cli/seed/seeder/organization-customization-document-header-template.seeder';
import { PaymentPlanPaidResourceIaConfigSeeder } from '@cli/seed/seeder/payment-plan-paid-resource-ia-config.seeder';
import { PaymentPlanPaidResourceSeeder } from '@cli/seed/seeder/payment-plan-paid-resource.seeder';
import { PaymentPlanSeeder } from '@cli/seed/seeder/payment-plan.seeder';
import { RegulatoryUpdateMonitoredSourceSeeder } from '@cli/seed/seeder/regulatory-update-monitored-source.seeder';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    SeedService,
    AdminSeeder,
    AffiliateCustomerConfigSeeder,
    CidTenSeeder,
    CustomerTermsSeeder,
    PaymentPlanPaidResourceSeeder,
    PaymentPlanPaidResourceIaConfigSeeder,
    PaymentPlanSeeder,
    OrganizationCustomizationDocumentHeaderTemplateSeeder,
    OrganizationCustomizationDocumentFooterTemplateSeeder,
    RegulatoryUpdateMonitoredSourceSeeder,
    Logger,
  ],
})
export class SeedModule {
  protected readonly _type = SeedModule.name;
}
