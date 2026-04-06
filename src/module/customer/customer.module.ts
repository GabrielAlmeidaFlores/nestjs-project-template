import { Module } from '@nestjs/common';

import { AccountModule } from '@module/customer/account/account.module';
import { AffiliateCustomerModule } from '@module/customer/affiliate-customer/affiliate-customer.module';
import { AiConversationModule } from '@module/customer/ai-conversation/ai-conversation.module';
import { AnalysisToolModule } from '@module/customer/analysis-tool/analysis-tool.module';
import { CreditPackModule } from '@module/customer/credit-pack/credit-pack.module';
import { DocumentsSentByEmailModule } from '@module/customer/documents-sent-by-email/documents-sent-by-email.module';
import { DocumentsToBeGeneratedModule } from '@module/customer/documents-to-be-generated/documents-to-be-generated.module';
import { LegalProceedingModule } from '@module/customer/legal-proceeding/legal-proceeding.module';
import { MiniAdvisorModule } from '@module/customer/mini-advisor/mini-advisor.module';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { OrganizationCustomizationModule } from '@module/customer/organization-customization/organization-customization.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { RegulatoryUpdateModule } from '@module/customer/regulatory-update/regulatory-update.module';
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
    RegulatoryUpdateModule,
    PaymentPlanModule,
    OrganizationCreditModule,
    AiConversationModule,
    CreditPackModule,
    DocumentsToBeGeneratedModule,
    MiniAdvisorModule,
    DocumentsSentByEmailModule,
    ServiceDeskModule,
    SystemActivitiesModule,
    CustomerTutorialModule,
    OrganizationCustomizationModule,
  ],
  controllers: [],
  providers: [],
})
export class CustomerModule {
  protected readonly _type = CustomerModule.name;
}
