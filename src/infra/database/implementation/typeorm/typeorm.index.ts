import { ConversationEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-event.typeorm.entity';
import { ConversationMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-message.typeorm.entity';
import { ConversationToolPolicyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-tool-policy.typeorm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.command.repository';
import { AdminTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.query.repository';
import { AnalysisToolClientTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.command.repository';
import { AnalysisToolClientTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.query.repository';
import { AnalysisToolClientInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.typeorm.command.repository';
import { AnalysisToolClientLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.typeorm.command.repository';
import { AnalysisToolRecordTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.command.repository';
import { AnalysisToolRecordTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.query.repository';
import { AuthIdentityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.command.repository';
import { AuthIdentityTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.query.repository';
import { BaseTypeormTransactionRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.transaction.repository';
import { CnisFastAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.command.repository';
import { CnisFastAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.query.repository';
import { CnisFastAnalysisInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.typeorm.command.repository';
import { CnisFastAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.typeorm.command.repository';
import { CnisFastAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-result/cnis-fast-analysis-result.typeorm.command.repository';
import { ConversationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/conversation/conversation.typeorm.command.repository';
import { ConversationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/conversation/conversation.typeorm.query.repository';
import { ConversationEventTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/conversation-event/conversation-event.typeorm.command.repository';
import { ConversationMessageTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/conversation-message/conversation-message.typeorm.command.repository';
import { ConversationMessageTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/conversation-message/conversation-message.typeorm.query.repository';
import { ConversationToolPolicyTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/conversation-tool-policy/conversation-tool-policy.typeorm.command.repository';
import { ConversationToolPolicyTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/conversation-tool-policy/conversation-tool-policy.typeorm.query.repository';
import { CustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.command.repository';
import { CustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.query.repository';
import { CustomerAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.command.repository';
import { CustomerAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.query.repository';
import { CustomerTermsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.command.repository';
import { CustomerTermsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.query.repository';
import { CustomerTermsAcceptanceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.query.repository';
import { LegalPleadingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading/legal-pleading.typeorm.command.repository';
import { LegalPleadingTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading/legal-pleading.typeorm.query.repository';
import { LegalPleadingAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address/legal-pleading-address.typeorm.command.repository';
import { LegalPleadingAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address/legal-pleading-address.typeorm.query.repository';
import { LegalPleadingDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.command.repository';
import { LegalPleadingDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.query.repository';
import { LegalPleadingDocumentAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.command.repository';
import { LegalPleadingDocumentAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.query.repository';
import { LegalProceedingDetailTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-proceeding-detail/legal-proceeding-detail.typeorm.command.repository';
import { LegalProceedingDetailTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-proceeding-detail/legal-proceeding-detail.typeorm.query.repository';
import { OrganizationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.command.repository';
import { OrganizationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.query.repository';
import { OrganizationMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.command.repository';
import { OrganizationMemberTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.query.repository';
import { OrganizationPaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan/organization-payment-plan.typeorm.command.repository';
import { OrganizationPaymentPlanEnablePaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-enable-paid-resource/organization-payment-plan-enable-paid-resource.typeorm.command.repository';
import { PaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan/payment-plan.typeorm.command.repository';
import { PaymentPlanEnablePaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-enable-paid-resource/payment-plan-enable-paid-resource.typeorm.command.repository';
import { PaymentPlanPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.command.repository';
import { PaymentPlanPaidResourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.query.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.typeorm.command.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps.typeorm.query.repository';
import { RetirementPlanningRppsInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.typeorm.command.repository';
import { RetirementPlanningRppsLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.typeorm.command.repository';
import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { AnalysisToolClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-inss-benefit.typeorm.entity';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { CnisFastAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';
import { CustomerTermsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { LegalPleadingDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document-analysis.typeorm.entity';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';
import { LegalPleadingResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-result.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationPaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enable-paid-resource.typeorm.entity';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { PaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enable-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { RetirementPlanningRgpsAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-analysis-result.typeorm.entity';
import { RetirementPlanningRgpsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-inss-benefit.typeorm.entity';
import { RetirementPlanningRgpsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-legal-proceeding.typeorm.entity';
import { RetirementPlanningRgpsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period-document.typeorm.entity';
import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';
import { RetirementPlanningRgpsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-result.typeorm.entity';
import { RetirementPlanningRgpsSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-special-period.typeorm.entity';
import { RetirementPlanningRgpsTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-time-accelerator.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRppsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-inss-benefit.typeorm.entity';
import { RetirementPlanningRppsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-legal-proceeding.typeorm.entity';
import { RetirementPlanningRppsPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-disability.typeorm.entity';
import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-special-time.typeorm.entity';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { RetirementPlanningRppsRemunerationCalculationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration-calculation.typeorm.entity';
import { RetirementPlanningRppsRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration.typeorm.entity';
import { RetirementPlanningRppsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-result.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { DatabaseApplicationVariable } from '@shared/system/constant/application-variable/source/database.application-variable';

import type { Provider } from '@nestjs/common';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import type { DataSourceOptions } from 'typeorm';
export class TypeormIndex {
  public static readonly entities: EntityClassOrSchema[] = [
    AuthIdentityTypeormEntity,
    CustomerAddressTypeormEntity,
    CustomerTypeormEntity,
    OrganizationMemberTypeormEntity,
    OrganizationTypeormEntity,
    OrganizationTypeormEntity,
    CnisFastAnalysisInssBenefitTypeormEntity,
    AnalysisToolClientInssBenefitTypeormEntity,
    CnisFastAnalysisLegalProceedingTypeormEntity,
    AnalysisToolClientTypeormEntity,
    CnisFastAnalysisResultTypeormEntity,
    CnisFastAnalysisTypeormEntity,
    LegalPleadingTypeormEntity,
    LegalPleadingAddressTypeormEntity,
    LegalPleadingDocumentTypeormEntity,
    LegalPleadingDocumentAnalysisTypeormEntity,
    LegalPleadingResultTypeormEntity,
    AnalysisToolRecordTypeormEntity,
    CustomerTermsTypeormEntity,
    CustomerTermsAcceptanceTypeormEntity,
    AnalysisToolClientLegalProceedingTypeormEntity,
    AdminTypeormEntity,
    LegalProceedingDetailTypeormEntity,
    ConversationTypeormEntity,
    ConversationMessageTypeormEntity,
    ConversationEventTypeormEntity,
    ConversationToolPolicyTypeormEntity,
    RetirementPlanningRgpsTypeormEntity,
    RetirementPlanningRgpsResultTypeormEntity,
    RetirementPlanningRgpsInssBenefitTypeormEntity,
    RetirementPlanningRgpsLegalProceedingTypeormEntity,
    RetirementPlanningRgpsPeriodTypeormEntity,
    RetirementPlanningRgpsPeriodDocumentTypeormEntity,
    RetirementPlanningRgpsAnalysisResultTypeormEntity,
    RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
    RetirementPlanningRgpsSpecialPeriodTypeormEntity,
    RetirementPlanningRppsTypeormEntity,
    RetirementPlanningRppsRemunerationTypeormEntity,
    RetirementPlanningRppsRemunerationCalculationTypeormEntity,
    RetirementPlanningRppsResultTypeormEntity,
    RetirementPlanningRppsPeriodTypeormEntity,
    RetirementPlanningRppsPeriodDisabilityTypeormEntity,
    RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
    RetirementPlanningRppsPeriodDocumentTypeormEntity,
    RetirementPlanningRppsInssBenefitTypeormEntity,
    RetirementPlanningRppsLegalProceedingTypeormEntity,
    CidTenTypeormEntity,
    PaymentPlanTypeormEntity,
    PaymentPlanPaidResourceTypeormEntity,
    OrganizationPaymentPlanTypeormEntity,
    PaymentPlanEnablePaidResourceTypeormEntity,
    OrganizationPaymentPlanEnablePaidResourceTypeormEntity,
  ];

  public static readonly repositories: Provider[] = [
    BaseTypeormTransactionRepository,
    AuthIdentityTypeormQueryRepository,
    AuthIdentityTypeormCommandRepository,
    CustomerTypeormQueryRepository,
    CustomerTypeormCommandRepository,
    CustomerAddressTypeormCommandRepository,
    CustomerAddressTypeormQueryRepository,
    OrganizationTypeormQueryRepository,
    OrganizationTypeormCommandRepository,
    OrganizationMemberTypeormQueryRepository,
    OrganizationMemberTypeormCommandRepository,
    CnisFastAnalysisTypeormCommandRepository,
    AnalysisToolClientTypeormCommandRepository,
    AnalysisToolClientTypeormQueryRepository,
    CnisFastAnalysisResultTypeormCommandRepository,
    CnisFastAnalysisInssBenefitTypeormCommandRepository,
    CnisFastAnalysisLegalProceedingTypeormCommandRepository,
    CnisFastAnalysisTypeormQueryRepository,
    LegalPleadingTypeormCommandRepository,
    LegalPleadingTypeormQueryRepository,
    LegalPleadingDocumentTypeormCommandRepository,
    LegalPleadingDocumentTypeormQueryRepository,
    LegalPleadingAddressTypeormCommandRepository,
    LegalPleadingAddressTypeormQueryRepository,
    LegalPleadingDocumentAnalysisTypeormQueryRepository,
    LegalPleadingDocumentAnalysisTypeormCommandRepository,
    AnalysisToolRecordTypeormQueryRepository,
    AnalysisToolRecordTypeormCommandRepository,
    CustomerTermsTypeormCommandRepository,
    CustomerTermsTypeormQueryRepository,
    CustomerAddressTypeormCommandRepository,
    CustomerTermsAcceptanceTypeormQueryRepository,
    AnalysisToolClientInssBenefitTypeormCommandRepository,
    AnalysisToolClientLegalProceedingTypeormCommandRepository,
    AdminTypeormCommandRepository,
    AdminTypeormQueryRepository,
    LegalProceedingDetailTypeormCommandRepository,
    LegalProceedingDetailTypeormQueryRepository,
    ConversationTypeormQueryRepository,
    ConversationTypeormCommandRepository,
    ConversationEventTypeormCommandRepository,
    ConversationTypeormQueryRepository,
    ConversationMessageTypeormCommandRepository,
    ConversationMessageTypeormQueryRepository,
    ConversationToolPolicyTypeormQueryRepository,
    ConversationToolPolicyTypeormCommandRepository,
    RetirementPlanningRgpsAnalysisResultTypeormCommandRepository,
    RetirementPlanningRgpsAnalysisResultTypeormQueryRepository,
    RetirementPlanningRppsInssBenefitTypeormCommandRepository,
    RetirementPlanningRppsLegalProceedingTypeormCommandRepository,
    PaymentPlanPaidResourceTypeormCommandRepository,
    PaymentPlanPaidResourceTypeormQueryRepository,
    OrganizationPaymentPlanTypeormCommandRepository,
    PaymentPlanTypeormCommandRepository,
    PaymentPlanEnablePaidResourceTypeormCommandRepository,
    OrganizationPaymentPlanEnablePaidResourceTypeormCommandRepository,
  ];

  public static readonly dynamicModule = TypeOrmModule.forFeature(
    TypeormIndex.entities,
  );

  public static readonly dataSourceConfig: DataSourceOptions = {
    type: 'mysql',
    host: DatabaseApplicationVariable.DATABASE_HOST,
    port: DatabaseApplicationVariable.DATABASE_PORT,
    username: DatabaseApplicationVariable.DATABASE_USERNAME,
    password: DatabaseApplicationVariable.DATABASE_PASSWORD,
    database: DatabaseApplicationVariable.DATABASE_NAME,
    entities: TypeormIndex.entities,
    synchronize: DatabaseApplicationVariable.DATABASE_SYNCHRONIZE,
  };

  protected readonly _type = TypeormIndex.name;
}
