import { Logger, Module } from '@nestjs/common';

import { SeedService } from '@cli/seed/seed.service';
import { AdminSeeder } from '@cli/seed/seeder/admin.seeder';
import { CustomerTermsSeeder } from '@cli/seed/seeder/customer-terms.seeder';
import { OrganizationMemberCrossJoinSeeder } from '@cli/seed/seeder/organization-member-cross-join.seeder';
import { PaymentPlanPaidResourceIaConfigSeeder } from '@cli/seed/seeder/payment-plan-paid-resource-ia-config.seeder';
import { PaymentPlanPaidResourceSeeder } from '@cli/seed/seeder/payment-plan-paid-resource.seeder';
import { PaymentPlanSeeder } from '@cli/seed/seeder/payment-plan.seeder';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    SeedService,
    AdminSeeder,
    CustomerTermsSeeder,
    OrganizationMemberCrossJoinSeeder,
    PaymentPlanPaidResourceSeeder,
    PaymentPlanPaidResourceIaConfigSeeder,
    PaymentPlanSeeder,
    Logger,
  ],
})
export class SeedModule {
  protected readonly _type = SeedModule.name;
}
