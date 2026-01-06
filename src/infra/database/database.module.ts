import { ClassProvider, Module } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AdminTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.command.repository';
import { AdminTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.query.repository';
import { AnalysisToolClientInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.typeorm.command.repository';
import { AnalysisToolClientLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.typeorm.command.repository';
import { AnalysisToolClientLegalProceedingTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.typeorm.query.repository';
import { AnalysisToolClientTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.command.repository';
import { AnalysisToolClientTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.query.repository';
import { AnalysisToolRecordTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.command.repository';
import { AnalysisToolRecordTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.query.repository';
import { AuthIdentityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.command.repository';
import { AuthIdentityTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.query.repository';
import { BankPaymentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/bank-payment/bank-payment.typeorm.command.repository';
import { BankPaymentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/bank-payment/bank-payment.typeorm.query.repository';
import { BaseTypeormTransactionRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.transaction.repository';
import { CidTenTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cid-ten/cid-ten.typeorm.command.repository';
import { CidTenTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/cid-ten/cid-ten.typeorm.query.repository';
import { CnisFastAnalysisInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.typeorm.command.repository';
import { CnisFastAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.typeorm.command.repository';
import { CnisFastAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-result/cnis-fast-analysis-result.typeorm.command.repository';
import { CnisFastAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.command.repository';
import { CnisFastAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.query.repository';
import { ConversationEventTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/conversation-event/conversation-event.typeorm.command.repository';
import { ConversationEventTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/conversation-event/conversation-event.typeorm.query.repository';
import { ConversationMessageTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/conversation-message/conversation-message.typeorm.command.repository';
import { ConversationMessageTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/conversation-message/conversation-message.typeorm.query.repository';
import { ConversationToolPolicyTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/conversation-tool-policy/conversation-tool-policy.typeorm.command.repository';
import { ConversationToolPolicyTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/conversation-tool-policy/conversation-tool-policy.typeorm.query.repository';
import { ConversationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/conversation/conversation.typeorm.command.repository';
import { ConversationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/conversation/conversation.typeorm.query.repository';
import { CustomerAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.command.repository';
import { CustomerAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.query.repository';
import { CustomerTermsAcceptanceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.command.repository';
import { CustomerTermsAcceptanceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.query.repository';
import { CustomerTermsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.command.repository';
import { CustomerTermsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.query.repository';
import { CustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.command.repository';
import { CustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.query.repository';
import { LegalPleadingResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address-result/legal-pleading-result.typeorm.command.repository';
import { LegalPleadingResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address-result/legal-pleading-result.typeorm.query.repository';
import { LegalPleadingAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address/legal-pleading-address.typeorm.command.repository';
import { LegalPleadingAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address/legal-pleading-address.typeorm.query.repository';
import { LegalPleadingDocumentAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.command.repository';
import { LegalPleadingDocumentAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.query.repository';
import { LegalPleadingDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.command.repository';
import { LegalPleadingDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.query.repository';
import { LegalPleadingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading/legal-pleading.typeorm.command.repository';
import { LegalPleadingTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading/legal-pleading.typeorm.query.repository';
import { LegalProceedingDetailTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-proceeding-detail/legal-proceeding-detail.typeorm.command.repository';
import { LegalProceedingDetailTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-proceeding-detail/legal-proceeding-detail.typeorm.query.repository';
import { OrganizationCreditPurchaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-purchase.typeorm.command.repository';
import { OrganizationCreditPurchaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-purchase.typeorm.query.repository';
import { OrganizationCreditUsageTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-usage.typeorm.command.repository';
import { OrganizationCreditUsageTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-usage.typeorm.query.repository';
import { OrganizationMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.command.repository';
import { OrganizationMemberTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.query.repository';
import { OrganizationPaymentPlanBankPaymentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.typeorm.command.repository';
import { OrganizationPaymentPlanBankPaymentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.typeorm.query.repository';
import { OrganizationPaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan/organization-payment-plan.typeorm.command.repository';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.typeorm.query.repository';
import { OrganizationPaymentPlanTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan/organization-payment-plan.typeorm.query.repository';
import { OrganizationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.command.repository';
import { OrganizationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.query.repository';
import { PaymentPlanEnabledPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource.typeorm.command.repository';
import { PaymentPlanEnabledPaidResourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource.typeorm.query.repository';
import { PaymentPlanPaidResourceIaConfigTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource-ia-config/payment-plan-paid-resource-ia-config.typeorm.command.repository';
import { PaymentPlanPaidResourceIaConfigTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource-ia-config/payment-plan-paid-resource-ia-config.typeorm.query.repository';
import { PaymentPlanPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.command.repository';
import { PaymentPlanPaidResourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.query.repository';
import { PaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan/payment-plan.typeorm.command.repository';
import { PaymentPlanTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan/payment-plan.typeorm.query.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.typeorm.command.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps.typeorm.query.repository';
import { RetirementPlanningRgpsInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-inss-benefit/retirement-planning-rgps-inss-benefit.typeorm.command.repository';
import { RetirementPlanningRgpsLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding.typeorm.command.repository';
import { RetirementPlanningRgpsPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.typeorm.command.repository';
import { RetirementPlanningRgpsPeriodDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.typeorm.query.repository';
import { RetirementPlanningRgpsPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-period/retirement-planning-rgps-period.typeorm.command.repository';
import { RetirementPlanningRgpsPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-period/retirement-planning-rgps-period.typeorm.query.repository';
import { RetirementPlanningRgpsResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-result/retirement-planning-rgps-result.typeorm.command.repository';
import { RetirementPlanningRgpsSpecialPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period.typeorm.command.repository';
import { RetirementPlanningRgpsSpecialPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period.typeorm.query.repository';
import { RetirementPlanningRgpsTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator.typeorm.command.repository';
import { RetirementPlanningRgpsTimeAcceleratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator.typeorm.query.repository';
import { RetirementPlanningRgpsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps/retirement-planning-rgps.typeorm.command.repository';
import { RetirementPlanningRgpsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps/retirement-planning-rgps.typeorm.query.repository';
import { RetirementPlanningRppsInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.typeorm.command.repository';
import { RetirementPlanningRppsLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.typeorm.command.repository';
import { RetirementPlanningRppsPeriodDisabilityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.typeorm.command.repository';
import { RetirementPlanningRppsPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.typeorm.command.repository';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.typeorm.command.repository';
import { RetirementPlanningRppsPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period/retirement-planning-rpps-period.typeorm.command.repository';
import { RetirementPlanningRppsRemunerationCalculationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.typeorm.command.repository';
import { RetirementPlanningRppsRemunerationCalculationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.typeorm.query.repository';
import { RetirementPlanningRppsRemunerationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.typeorm.command.repository';
import { RetirementPlanningRppsRemunerationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.typeorm.query.repository';
import { RetirementPlanningRppsResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-result/retirement-planning-rpps-result.typeorm.command.repository';
import { RetirementPlanningRppsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps/retirement-planning-rpps.typeorm.command.repository';
import { RetirementPlanningRppsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps/retirement-planning-rpps.typeorm.query.repository';
import { TypeormModule } from '@infra/database/implementation/typeorm/typeorm.module';
import { MapperModule } from '@lib/mapper/mapper.module';
import { AdminCommandRepositoryGateway } from '@module/admin/account/domain/repository/admin/command/admin.command.repository.gateway';
import { AdminQueryRepositoryGateway } from '@module/admin/account/domain/repository/admin/query/admin.query.repository.gateway';
import { ConversationEventCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-event/command/conversation-message.command.repository.gateway';
import { ConversationEventQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-event/query/conversation.query.repository.gateway';
import { ConversationMessageCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-message/command/conversation-message.command.repository.gateway';
import { ConversationMessageQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-message/query/conversation-message.query.repository.gateway';
import { ConversationToolPolicyCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-tool-policy/command/conversation-message.command.repository.gateway';
import { ConversationToolPolicyQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-tool-policy/query/conversation.query.repository.gateway';
import { ConversationCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation/command/conversation.command.repository.gateway';
import { ConversationQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation/query/conversation.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { CustomerAddressQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/query/customer-address.query.repository.gateway';
import { CustomerTermsAcceptanceCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/command/customer-terms-acceptance.command.repository.gateway';
import { CustomerTermsAcceptanceQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/customer-terms-acceptance.query.repository.gateway';
import { CustomerTermsCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/command/customer-terms.command.repository.gateway';
import { CustomerTermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/query/customer-terms.query.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization/command/organization.command.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/command/analysis-tool-client-inss-benefit.command.repository.gateway';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CidTenCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/command/cid-ten.command.repository.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { CnisFastAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/command/cnis-fast-analysis-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/command/cnis-fast-analysis-legal-proceeding.command.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { LegalPleadingAddressCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/command/legal-pleading-address.repository.gateway';
import { LegalPleadingAddressQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/query/legal-pleading-address.query.repository.gateway';
import { LegalPleadingDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/command/legal-pleading-document-analysis.repository.gateway';
import { LegalPleadingDocumentAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/query/legal-pleading-document-analysis.query.repository.gateway';
import { LegalPleadingDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/command/legal-pleading-document.repository.gateway';
import { LegalPleadingDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/legal-pleading-document.query.repository.gateway';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingResultQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/query/legal-pleading-result.query.repository.gateway';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/command/retirement-planning-rgps-analysis-result.repository.gateway';
import { RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/query/retirement-planning-rgps-analysis-result.query.repository.gateway.ts';
import { RetirementPlanningRgpsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-inss-benefit/command/retirement-planning-rgps-inss-benefit.command.repository.gateway';
import { RetirementPlanningRgpsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-legal-proceeding/command/retirement-planning-rgps-legal-proceeding.command.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period-document/command/retirement-planning-rgps-period-document.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period-document/query/retirement-planning-rgps-period-document.query.repository.gateway';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { RetirementPlanningRgpsSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-special-period/command/retirement-planning-rgps-special-period.repository.gateway';
import { RetirementPlanningRgpsSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-special-period/query/retirement-planning-rgps-special-period.query.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/command/retirement-planning-rgps-time-accelerator.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/retirement-planning-rgps-time-accelerator.query.repository.gateway';
import { RetirementPlanningRgpsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/command/retirement-planning-rgps.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRppsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-inss-benefit/command/retirement-planning-rpps-inss-benefit.command.repository.gateway';
import { RetirementPlanningRppsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-legal-proceeding/command/retirement-planning-rpps-legal-proceeding.command.repository.gateway';
import { RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-disability/command/retirement-planning-rpps-period-disability.command.repository.gateway';
import { RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/command/retirement-planning-rpps-period-document.command.repository.gateway';
import { RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-special-time/command/retirement-planning-rpps-period-special-time.command.repository.gateway';
import { RetirementPlanningRppsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period/command/retirement-planning-rpps-period.command.repository.gateway';
import { RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration-calculation/command/retirement-planning-rpps-remuneration-calculation.command.repository.gateway';
import { RetirementPlanningRppsRemunerationCalculationQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration-calculation/query/retirement-planning-rpps-remuneration-calculation.query.repository.gateway';
import { RetirementPlanningRppsRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/command/retirement-planning-rpps-remuneration.command.repository.gateway';
import { RetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.query.repository.gateway';
import { RetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-result/command/retirement-planning-rpps-result.command.repository.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { LegalProceedingDetailCommandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { OrganizationCreditPurchaseCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/command/organization-credit-purchase.command.repository.gateway';
import { OrganizationCreditPurchaseQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/organization-credit-purchase.query.repository.gateway';
import { OrganizationCreditUsageCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/command/organization-credit-usage.command.repository.gateway';
import { OrganizationCreditUsageQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/query/organization-credit-usage.query.repository.gateway';
import { OrganizationPaymentPlanBankPaymentCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/command/organization-payment-plan-bank-payment.command.repository.gateway';
import { OrganizationPaymentPlanBankPaymentQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/organization-payment-plan-bank-payment.query.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/command/organization-payment-plan-enabled-paid-resource.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/query/organization-payment-plan-enabled-paid-resource.query.repository.gateway';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { PaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/command/payment-plan-enabled-paid-resource.command.repository.gateway';
import { PaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/payment-plan-enabled-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceIaConfigCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/command/payment-plan-paid-resource-ia-config.command.repository.gateway';
import { PaymentPlanPaidResourceIaConfigQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/payment-plan-paid-resource-ia-config.query.repository.gateway';
import { PaymentPlanPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/command/payment-plan-paid-resource.command.repository.gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository.gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.typeorm.command.repository';

const classProvider: ClassProvider[] = [
  {
    provide: BaseTransactionRepositoryGateway,
    useClass: BaseTypeormTransactionRepository,
  },
  {
    provide: AuthIdentityCommandRepositoryGateway,
    useClass: AuthIdentityTypeormCommandRepository,
  },
  {
    provide: AuthIdentityQueryRepositoryGateway,
    useClass: AuthIdentityTypeormQueryRepository,
  },
  {
    provide: CustomerCommandRepositoryGateway,
    useClass: CustomerTypeormCommandRepository,
  },
  {
    provide: CustomerQueryRepositoryGateway,
    useClass: CustomerTypeormQueryRepository,
  },
  {
    provide: CustomerAddressCommandRepositoryGateway,
    useClass: CustomerAddressTypeormCommandRepository,
  },
  {
    provide: CustomerAddressQueryRepositoryGateway,
    useClass: CustomerAddressTypeormQueryRepository,
  },
  {
    provide: OrganizationCommandRepositoryGateway,
    useClass: OrganizationTypeormCommandRepository,
  },
  {
    provide: OrganizationQueryRepositoryGateway,
    useClass: OrganizationTypeormQueryRepository,
  },
  {
    provide: OrganizationMemberCommandRepositoryGateway,
    useClass: OrganizationMemberTypeormCommandRepository,
  },
  {
    provide: OrganizationMemberQueryRepositoryGateway,
    useClass: OrganizationMemberTypeormQueryRepository,
  },
  {
    provide: CnisFastAnalysisCommandRepositoryGateway,
    useClass: CnisFastAnalysisTypeormCommandRepository,
  },
  {
    provide: AnalysisToolClientCommandRepositoryGateway,
    useClass: AnalysisToolClientTypeormCommandRepository,
  },
  {
    provide: CnisFastAnalysisInssBenefitCommandRepositoryGateway,
    useClass: CnisFastAnalysisInssBenefitTypeormCommandRepository,
  },
  {
    provide: CnisFastAnalysisLegalProceedingCommandRepositoryGateway,
    useClass: CnisFastAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide: CnisFastAnalysisResultCommandRepositoryGateway,
    useClass: CnisFastAnalysisResultTypeormCommandRepository,
  },
  {
    provide: CnisFastAnalysisQueryRepositoryGateway,
    useClass: CnisFastAnalysisTypeormQueryRepository,
  },
  {
    provide: AnalysisToolClientQueryRepositoryGateway,
    useClass: AnalysisToolClientTypeormQueryRepository,
  },

  {
    provide: LegalPleadingCommandRepositoryGateway,
    useClass: LegalPleadingTypeormCommandRepository,
  },
  {
    provide: LegalPleadingQueryRepositoryGateway,
    useClass: LegalPleadingTypeormQueryRepository,
  },
  {
    provide: LegalPleadingAddressCommandRepositoryGateway,
    useClass: LegalPleadingAddressTypeormCommandRepository,
  },
  {
    provide: LegalPleadingAddressQueryRepositoryGateway,
    useClass: LegalPleadingAddressTypeormQueryRepository,
  },
  {
    provide: LegalPleadingDocumentCommandRepositoryGateway,
    useClass: LegalPleadingDocumentTypeormCommandRepository,
  },
  {
    provide: LegalPleadingDocumentQueryRepositoryGateway,
    useClass: LegalPleadingDocumentTypeormQueryRepository,
  },

  {
    provide: LegalPleadingDocumentAnalysisCommandRepositoryGateway,
    useClass: LegalPleadingDocumentAnalysisTypeormCommandRepository,
  },
  {
    provide: LegalPleadingDocumentAnalysisQueryRepositoryGateway,
    useClass: LegalPleadingDocumentAnalysisTypeormQueryRepository,
  },
  {
    provide: LegalPleadingResultCommandRepositoryGateway,
    useClass: LegalPleadingResultTypeormCommandRepository,
  },
  {
    provide: LegalPleadingResultQueryRepositoryGateway,
    useClass: LegalPleadingResultTypeormQueryRepository,
  },
  {
    provide: AnalysisToolRecordCommandRepositoryGateway,
    useClass: AnalysisToolRecordTypeormCommandRepository,
  },
  {
    provide: AnalysisToolRecordQueryRepositoryGateway,
    useClass: AnalysisToolRecordTypeormQueryRepository,
  },
  {
    provide: CustomerTermsQueryRepositoryGateway,
    useClass: CustomerTermsTypeormQueryRepository,
  },
  {
    provide: CustomerTermsCommandRepositoryGateway,
    useClass: CustomerTermsTypeormCommandRepository,
  },
  {
    provide: CustomerTermsAcceptanceQueryRepositoryGateway,
    useClass: CustomerTermsAcceptanceTypeormQueryRepository,
  },
  {
    provide: CustomerTermsAcceptanceCommandRepositoryGateway,
    useClass: CustomerTermsAcceptanceTypeormCommandRepository,
  },
  {
    provide: AnalysisToolClientInssBenefitCommandRepositoryGateway,
    useClass: AnalysisToolClientInssBenefitTypeormCommandRepository,
  },
  {
    provide: AnalysisToolClientLegalProceedingCommandRepositoryGateway,
    useClass: AnalysisToolClientLegalProceedingTypeormCommandRepository,
  },
  {
    provide: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
    useClass: AnalysisToolClientLegalProceedingTypeormQueryRepository,
  },
  {
    provide: CidTenCommandRepositoryGateway,
    useClass: CidTenTypeormCommandRepository,
  },
  {
    provide: CidTenQueryRepositoryGateway,
    useClass: CidTenTypeormQueryRepository,
  },

  {
    provide: AdminCommandRepositoryGateway,
    useClass: AdminTypeormCommandRepository,
  },
  {
    provide: AdminQueryRepositoryGateway,
    useClass: AdminTypeormQueryRepository,
  },
  {
    provide: LegalProceedingDetailCommandRepositoryGateway,
    useClass: LegalProceedingDetailTypeormCommandRepository,
  },
  {
    provide: LegalProceedingDetailQueryRepositoryGateway,
    useClass: LegalProceedingDetailTypeormQueryRepository,
  },
  {
    provide: ConversationQueryRepositoryGateway,
    useClass: ConversationTypeormQueryRepository,
  },
  {
    provide: ConversationCommandRepositoryGateway,
    useClass: ConversationTypeormCommandRepository,
  },
  {
    provide: ConversationEventQueryRepositoryGateway,
    useClass: ConversationEventTypeormQueryRepository,
  },
  {
    provide: ConversationEventCommandRepositoryGateway,
    useClass: ConversationEventTypeormCommandRepository,
  },
  {
    provide: ConversationMessageQueryRepositoryGateway,
    useClass: ConversationMessageTypeormQueryRepository,
  },
  {
    provide: ConversationMessageCommandRepositoryGateway,
    useClass: ConversationMessageTypeormCommandRepository,
  },
  {
    provide: ConversationToolPolicyQueryRepositoryGateway,
    useClass: ConversationToolPolicyTypeormQueryRepository,
  },
  {
    provide: ConversationToolPolicyCommandRepositoryGateway,
    useClass: ConversationToolPolicyTypeormCommandRepository,
  },

  {
    provide: RetirementPlanningRgpsCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsResultCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsResultTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsAnalysisResultTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway,
    useClass: RetirementPlanningRgpsAnalysisResultTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsTimeAcceleratorTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsPeriodDocumentTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsPeriodCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsPeriodTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsPeriodQueryRepositoryGateway,
    useClass: RetirementPlanningRgpsPeriodTypeormQueryRepository,
  },
  {
    provide: BankPaymentQueryRepositoryGateway,
    useClass: BankPaymentTypeormQueryRepository,
  },
  {
    provide: BankPaymentCommandRepositoryGateway,
    useClass: BankPaymentTypeormCommandRepository,
  },
  {
    provide: OrganizationPaymentPlanQueryRepositoryGateway,
    useClass: OrganizationPaymentPlanTypeormQueryRepository,
  },
  {
    provide: OrganizationPaymentPlanBankPaymentQueryRepositoryGateway,
    useClass: OrganizationPaymentPlanBankPaymentTypeormQueryRepository,
  },
  {
    provide: OrganizationPaymentPlanBankPaymentCommandRepositoryGateway,
    useClass: OrganizationPaymentPlanBankPaymentTypeormCommandRepository,
  },
  {
    provide: OrganizationCreditPurchaseQueryRepositoryGateway,
    useClass: OrganizationCreditPurchaseTypeormQueryRepository,
  },
  {
    provide: OrganizationCreditPurchaseCommandRepositoryGateway,
    useClass: OrganizationCreditPurchaseTypeormCommandRepository,
  },
  {
    provide: OrganizationCreditUsageQueryRepositoryGateway,
    useClass: OrganizationCreditUsageTypeormQueryRepository,
  },
  {
    provide: PaymentPlanCommandRepositoryGateway,
    useClass: PaymentPlanTypeormCommandRepository,
  },
  {
    provide: PaymentPlanEnabledPaidResourceCommandRepositoryGateway,
    useClass: PaymentPlanEnabledPaidResourceTypeormCommandRepository,
  },
  {
    provide: PaymentPlanQueryRepositoryGateway,
    useClass: PaymentPlanTypeormQueryRepository,
  },
  {
    provide: PaymentPlanPaidResourceQueryRepositoryGateway,
    useClass: PaymentPlanPaidResourceTypeormQueryRepository,
  },
  {
    provide: PaymentPlanPaidResourceIaConfigQueryRepositoryGateway,
    useClass: PaymentPlanPaidResourceIaConfigTypeormQueryRepository,
  },
  {
    provide: PaymentPlanPaidResourceCommandRepositoryGateway,
    useClass: PaymentPlanPaidResourceTypeormCommandRepository,
  },
  {
    provide: PaymentPlanPaidResourceIaConfigCommandRepositoryGateway,
    useClass: PaymentPlanPaidResourceIaConfigTypeormCommandRepository,
  },
  {
    provide: OrganizationCreditUsageCommandRepositoryGateway,
    useClass: OrganizationCreditUsageTypeormCommandRepository,
  },
  {
    provide: PaymentPlanEnabledPaidResourceQueryRepositoryGateway,
    useClass: PaymentPlanEnabledPaidResourceTypeormQueryRepository,
  },
  {
    provide: OrganizationPaymentPlanCommandRepositoryGateway,
    useClass: OrganizationPaymentPlanTypeormCommandRepository,
  },
  {
    provide: OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway,
    useClass:
      OrganizationPaymentPlanEnabledPaidResourceTypeormCommandRepository,
  },
  {
    provide: OrganizationPaymentPlanEnabledPaidResourceQueryRepositoryGateway,
    useClass: OrganizationPaymentPlanEnabledPaidResourceTypeormQueryRepository,
  },
  {
    provide: OrganizationPaymentPlanEnabledPaidResourceQueryRepositoryGateway,
    useClass: OrganizationPaymentPlanEnabledPaidResourceTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRgpsInssBenefitCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsInssBenefitTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsLegalProceedingCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsLegalProceedingTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsQueryRepositoryGateway,
    useClass: RetirementPlanningRgpsTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRgpsPeriodDocumentQueryRepositoryGateway,
    useClass: RetirementPlanningRgpsPeriodDocumentTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway,
    useClass: RetirementPlanningRgpsTimeAcceleratorTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRgpsSpecialPeriodCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsSpecialPeriodTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsSpecialPeriodQueryRepositoryGateway,
    useClass: RetirementPlanningRgpsSpecialPeriodTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRppsCommandRepositoryGateway,
    useClass: RetirementPlanningRppsTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsQueryRepositoryGateway,
    useClass: RetirementPlanningRppsTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRppsRemunerationQueryRepositoryGateway,
    useClass: RetirementPlanningRppsRemunerationTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRppsPeriodCommandRepositoryGateway,
    useClass: RetirementPlanningRppsPeriodTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway,
    useClass: RetirementPlanningRppsPeriodDocumentTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway,
    useClass: RetirementPlanningRppsPeriodDisabilityTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway,
    useClass: RetirementPlanningRppsPeriodSpecialTimeTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsRemunerationCommandRepositoryGateway,
    useClass: RetirementPlanningRppsRemunerationTypeormCommandRepository,
  },
  {
    provide:
      RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway,
    useClass:
      RetirementPlanningRppsRemunerationCalculationTypeormCommandRepository,
  },
  {
    provide:
      RetirementPlanningRppsRemunerationCalculationQueryRepositoryGateway,
    useClass:
      RetirementPlanningRppsRemunerationCalculationTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRppsResultCommandRepositoryGateway,
    useClass: RetirementPlanningRppsResultTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsInssBenefitCommandRepositoryGateway,
    useClass: RetirementPlanningRppsInssBenefitTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsLegalProceedingCommandRepositoryGateway,
    useClass: RetirementPlanningRppsLegalProceedingTypeormCommandRepository,
  },
];

@Module({
  imports: [MapperModule, TypeormModule],
  providers: classProvider.flatMap((p) => [p, p.useClass]),
  exports: classProvider.map((p) => p.provide),
})
export class DatabaseModule {
  protected readonly _type = DatabaseModule.name;
}
