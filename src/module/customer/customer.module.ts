import { Module } from '@nestjs/common';

import { AccountModule } from '@module/customer/account/account.module';
import { AffiliateCustomerModule } from '@module/customer/affiliate-customer/affiliate-customer.module';
import { AiConversationModule } from '@module/customer/ai-conversation/ai-conversation.module';
import { AnalysisToolModule } from '@module/customer/analysis-tool/analysis-tool.module';
import { CreditPackModule } from '@module/customer/credit-pack/credit-pack.module';
import { DocumentsSentByEmailModule } from '@module/customer/documents-sent-by-email/documents-sent-by-email.module';
import { DocumentsToBeGeneratedModule } from '@module/customer/documents-to-be-generated/documents-to-be-generated.module';
import { LegalProceedingModule } from '@module/customer/legal-proceeding/legal-proceeding.module';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { ServiceDeskModule } from '@module/customer/service-desk/service-desk.module';
import { SystemActivitiesModule } from '@module/customer/system-activities/system-activities.module';
import { TranscriptionModule } from '@module/customer/transcription/transcription.module';
import { CustomerTutorialModule } from '@module/customer/tutorial/tutorial.module';

@Module({
  imports: [
    AccountModule,
    AffiliateCustomerModule,
    AnalysisToolModule,
    TranscriptionModule,
    LegalProceedingModule,
    PaymentPlanModule,
    OrganizationCreditModule,
    AiConversationModule,
    CreditPackModule,
    DocumentsToBeGeneratedModule,
    DocumentsSentByEmailModule,
    SystemActivitiesModule,
    CustomerTutorialModule,
    ServiceDeskModule,
  ],
  controllers: [],
  providers: [],
})
export class CustomerModule {
  protected readonly _type = CustomerModule.name;
}
