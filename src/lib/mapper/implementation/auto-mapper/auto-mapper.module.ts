import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AutoMapperService } from '@lib/mapper/implementation/auto-mapper/auto-mapper.service';
import { AdminEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/admin/admin-entity.auto-mapper.profile';
import { GetAdminQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/admin/get-admin-query-result.auto-mapper.profile';
import { AnalysisToolClientEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client/analysis-tool-client-entity.auto-mapper.profile';
import { GetAnalysisToolClientQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client/get-analysis-tool-client-query-result.auto-mapper.profile';
import { GetAnalysisToolClientWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client/get-analysis-tool-client-with-relations-query-result.auto-mapper.profile';
import { AnalysisToolClientInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit-entity.auto-mapper.profile';
import { GetAnalysisToolClientInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client-inss-benefit/get-analysis-tool-client-inss-benefit-query-result.auto-mapper.profile';
import { AnalysisToolClientLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding-entity.auto-mapper.profile';
import { GetAnalysisToolClientLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client-legal-proceeding/get-analysis-tool-client-legal-proceeding-query-result.auto-mapper.profile';
import { AnalysisToolRecordEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-record/analysis-tool-record-entity.auto-mapper.profile';
import { GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-record/get-analysis-tool-record-with-relations-query-result.auto-mapper.profile';
import { AuthIdentityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/auth-identity-entity.auto-mapper.profile';
import { GetAuthIdentityQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/get-auth-identity-query-result.auto-mapper.profile';
import { GetAuthIdentityWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/get-auth-identity-with-relations-query-result.auto-mapper.profile';
import { CnisFastAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis/cnis-fast-analysis-entity.auto-mapper.profile';
import { GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis/get-cnis-fast-analysis-with-relations-query-result.auto-mapper.profile';
import { GetCnisFastAnalysisWithResponsibleAndClientRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis/get-cnis-fast-analysis-with-responsible-and-client-relations-query-result.auto-mapper.profile';
import { CnisFastAnalysisInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit-entity.auto-mapper.profile';
import { GetCnisFastAnalysisInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-inss-benefit/get-cnis-fast-analysis-inss-benefit-query-result.auto-mapper.profile';
import { CnisFastAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetCnisFastAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-legal-proceeding/get-cnis-fast-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { CnisFastAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-result/cnis-fast-analysis-result-entity.auto-mapper.profile';
import { GetCnisFastAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-result/get-cnis-fast-analysis-result-query-result.auto-mapper.profile';
import { CustomerEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/customer-entity.auto-mapper.profile';
import { GetCustomerQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-query-result.auto-mapper.profile';
import { GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-with-auth-identity-relation-query-result.auto-mapper.profile';
import { GetCustomerWithCustomerAddressRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-with-customer-address-relation-query-result.auto-mapper.profile';
import { CustomerAddressEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-address/customer-address-entity.auto-mapper.profile';
import { GetCustomerAddressQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-address/get-customer-query-result.auto-mapper.profile';
import { CustomerTermsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-terms/customer-terms-entity.auto-mapper.profile';
import { GetCustomerTermsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-terms/get-customer-terms-query-result.auto-mapper.profile';
import { CustomerTermsAcceptanceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-terms-acceptance/customer-terms-acceptance-entity.auto-mapper.profile';
import { GetCustomerTermsAcceptanceQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-terms-acceptance/get-customer-terms-acceptance-query-result.auto-mapper.profile';
import { GetLegalPleadingWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading/get-legal-pleading-with-relations-query-result.auto-mapper.profile';
import { GetLegalPleadingWithResponsibleAndClientRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading/get-legal-pleading-with-responsible-and-client-relations-query-result.auto-mapper.profile';
import { LegalPleadingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading/legal-pleading-entity.auto-mapper.profile';
import { GetLegalPleadingAddressQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-address/get-legal-pleading-address-query-result.auto-mapper.profile';
import { LegalPleadingAddressEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-address/legal-pleading-address-entity.auto-mapper.profile';
import { GetLegalPleadingDocumentWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-document/get-legal-pleading-document-with-relations-query-result.auto-mapper.profile';
import { LegalPleadingDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-document/legal-pleading-document-entity.auto-mapper.profile';
import { GetLegalPleadingDocumentAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-document-analysis/get-legal-pleading-document-analysis-query-result.auto-mapper.profile';
import { LegalPleadingDocumentAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-document-analysis/legal-pleading-document-analysis-entity.auto-mapper.profile';
import { GetLegalPleadingResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-result/get-legal-pleading-result-query-result.auto-mapper.profile';
import { LegalPleadingResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-result/legal-pleading-result-entity.auto-mapper.profile';
import { GetOrganizationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization/get-organization-query-result.auto-mapper.profile';
import { OrganizationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization/organization-entity.auto-mapper.profile';
import { GetOrganizationMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-with-customer-and-organization-relations-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithCustomerRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-with-customer-relation-query-result.auto-mapper.profile';
import { OrganizationMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/organization-member-entity.auto-mapper.profile';
import { OrganizationPaymentPlanEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan/organization-payment-plan-entity.auto.mapper.profile';
import { OrganizationPaymentPlanEnablePaidResourceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan-enable-paid-resource/organization-payment-plan-enable-paid-resource-entity.auto.mapper.profile';
import { PaymentPlanEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan/payment-plan-entity.auto.mapper.profile';
import { PaymentPlanEnablePaidResourceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan-enable-paid-resource/payment-plan-enable-paid-resource-entity.auto.mapper.profile';
import { PaymentPlanPaidResourceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan-paid-resource/payment-plan-paid-resource-entity.auto-mapper.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [
    AutoMapperService,
    GetAuthIdentityQueryResultAutoMapperProfile,
    GetCustomerQueryResultAutoMapperProfile,
    GetCustomerAddressQueryResultAutoMapperProfile,
    GetOrganizationQueryResultAutoMapperProfile,
    GetOrganizationMemberQueryResultAutoMapperProfile,
    GetCustomerWithCustomerAddressRelationQueryResultAutoMapperProfile,
    GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResultAutoMapperProfile,
    GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile,
    CustomerEntityAutoMapperProfile,
    CustomerAddressEntityAutoMapperProfile,
    OrganizationEntityAutoMapperProfile,
    OrganizationMemberEntityAutoMapperProfile,
    AuthIdentityEntityAutoMapperProfile,
    CnisFastAnalysisEntityAutoMapperProfile,
    AnalysisToolClientEntityAutoMapperProfile,
    CnisFastAnalysisInssBenefitEntityAutoMapperProfile,
    CnisFastAnalysisLegalProceedingEntityAutoMapperProfile,
    CnisFastAnalysisResultEntityAutoMapperProfile,
    GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile,
    GetCnisFastAnalysisResultQueryResultAutoMapperProfile,
    GetAnalysisToolClientWithRelationsQueryResultAutoMapperProfile,
    GetCnisFastAnalysisInssBenefitQueryResultAutoMapperProfile,
    GetCnisFastAnalysisLegalProceedingQueryResultAutoMapperProfile,
    GetOrganizationMemberWithCustomerRelationQueryResultAutoMapperProfile,
    LegalPleadingEntityAutoMapperProfile,
    LegalPleadingAddressEntityAutoMapperProfile,
    LegalPleadingDocumentEntityAutoMapperProfile,
    GetLegalPleadingWithRelationsQueryResultAutoMapperProfile,
    GetLegalPleadingAddressQueryResultAutoMapperProfile,
    GetLegalPleadingDocumentWithRelationsQueryResultAutoMapperProfile,
    GetLegalPleadingDocumentAnalysisQueryResultAutoMapperProfile,
    LegalPleadingDocumentAnalysisEntityAutoMapperProfile,
    LegalPleadingResultEntityAutoMapperProfile,
    GetLegalPleadingResultQueryResultAutoMapperProfile,
    GetLegalPleadingWithResponsibleAndClientRelationsQueryResultAutoMapperProfile,
    GetCnisFastAnalysisWithResponsibleAndClientRelationsQueryResultAutoMapperProfile,
    GetAnalysisToolClientQueryResultAutoMapperProfile,
    AnalysisToolRecordEntityAutoMapperProfile,
    GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile,
    CustomerTermsEntityAutoMapperProfile,
    CustomerTermsAcceptanceEntityAutoMapperProfile,
    GetCustomerTermsQueryResultAutoMapperProfile,
    GetCustomerTermsAcceptanceQueryResultAutoMapperProfile,
    GetAnalysisToolClientInssBenefitQueryResultAutoMapperProfile,
    AnalysisToolClientInssBenefitEntityAutoMapperProfile,
    GetAnalysisToolClientLegalProceedingQueryResultAutoMapperProfile,
    AnalysisToolClientLegalProceedingEntityAutoMapperProfile,
    GetAuthIdentityWithRelationsQueryResultAutoMapperProfile,
    AdminEntityAutoMapperProfile,
    GetAdminQueryResultAutoMapperProfile,
    PaymentPlanPaidResourceEntityAutoMapperProfile,
    PaymentPlanEntityAutoMapperProfile,
    OrganizationPaymentPlanEntityAutoMapperProfile,
    PaymentPlanEnablePaidResourceEntityAutoMapperProfile,
    OrganizationPaymentPlanEnablePaidResourceEntityAutoMapperProfile,
  ],
  exports: [AutoMapperService],
})
export class AutoMapperModule {
  protected readonly _type = AutoMapperModule.name;
}
