import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AutoMapperService } from '@lib/mapper/implementation/auto-mapper/auto-mapper.service';
import { noopStrategy } from '@lib/mapper/implementation/auto-mapper/noop-strategy';
import { AccidentAssistanceGrantEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-grant/accident-assistance-grant-entity.auto-mapper.profile';
import { GetAccidentAssistanceGrantWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-grant/get-accident-assistance-grant-with-relations-query-result.auto-mapper.profile';
import { AccidentAssistanceGrantDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-grant-document/accident-assistance-grant-document-entity.auto-mapper.profile';
import { AccidentAssistanceGrantResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-grant-result/accident-assistance-grant-result-entity.auto-mapper.profile';
import { AccidentAssistanceTerminatedEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated/accident-assistance-terminated-entity.auto-mapper.profile';
import { GetAccidentAssistanceTerminatedQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated/get-accident-assistance-terminated-query-result.auto-mapper.profile';
import { GetAccidentAssistanceTerminatedWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated/get-accident-assistance-terminated-with-relations-query-result.auto-mapper.profile';
import { AccidentAssistanceTerminatedBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit-entity.auto-mapper.profile';
import { GetAccidentAssistanceTerminatedBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-benefit/get-accident-assistance-terminated-benefit-query-result.auto-mapper.profile';
import { AccidentAssistanceTerminatedDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-document/accident-assistance-terminated-document-entity.auto-mapper.profile';
import { GetAccidentAssistanceTerminatedDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-document/get-accident-assistance-terminated-document-query-result.auto-mapper.profile';
import { AccidentAssistanceTerminatedLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding-entity.auto-mapper.profile';
import { GetAccidentAssistanceTerminatedLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-legal-proceeding/get-accident-assistance-terminated-legal-proceeding-query-result.auto-mapper.profile';
import { AccidentAssistanceTerminatedPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-period/accident-assistance-terminated-period-entity.auto-mapper.profile';
import { GetAccidentAssistanceTerminatedPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-period/get-accident-assistance-terminated-period-query-result.auto-mapper.profile';
import { AccidentAssistanceTerminatedPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-period-document/accident-assistance-terminated-period-document-entity.auto-mapper.profile';
import { AccidentAssistanceTerminatedResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-result/accident-assistance-terminated-result-entity.auto-mapper.profile';
import { GetAccidentAssistanceTerminatedResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-assistance-terminated-result/get-accident-assistance-terminated-result-query-result.auto-mapper.profile';
import { AccidentBenefitRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection/accident-benefit-rejection-entity.auto-mapper.profile';
import { GetAccidentBenefitRejectionWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection/get-accident-benefit-rejection-with-relations-query-result.auto-mapper.profile';
import { AccidentBenefitRejectionDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection-document/accident-benefit-rejection-document-entity.auto-mapper.profile';
import { AccidentBenefitRejectionEventEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection-event/accident-benefit-rejection-event-entity.auto-mapper.profile';
import { AccidentBenefitRejectionEventDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document-entity.auto-mapper.profile';
import { AccidentBenefitRejectionInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit-entity.auto-mapper.profile';
import { AccidentBenefitRejectionResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection-result/accident-benefit-rejection-result-entity.auto-mapper.profile';
import { AccidentBenefitRejectionWorkPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period-entity.auto-mapper.profile';
import { AccidentBenefitRejectionWorkPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document-entity.auto-mapper.profile';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history-entity.auto-mapper.profile';
import { AdminEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/admin/admin-entity.auto-mapper.profile';
import { GetAdminQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/admin/get-admin-query-result.auto-mapper.profile';
import { AdministrativeProcedureInssAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis-entity.auto-mapper.profile';
import { GetAdministrativeProcedureInssAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis/get-administrative-procedure-inss-analysis-query-result.auto-mapper.profile';
import { GetAdministrativeProcedureInssAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis/get-administrative-procedure-inss-analysis-with-relations-query-result.auto-mapper.profile';
import { AdministrativeProcedureInssAnalysisBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit-entity.auto-mapper.profile';
import { GetAdministrativeProcedureInssAnalysisBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis-benefit/get-administrative-procedure-inss-analysis-benefit-query-result.auto-mapper.profile';
import { AdministrativeProcedureInssAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document-entity.auto-mapper.profile';
import { GetAdministrativeProcedureInssAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis-document/get-administrative-procedure-inss-analysis-document-query-result.auto-mapper.profile';
import { AdministrativeProcedureInssAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis-legal-proceeding/get-administrative-procedure-inss-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { AdministrativeProcedureInssAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result-entity.auto-mapper.profile';
import { GetAdministrativeProcedureInssAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-procedure-inss-analysis-result/get-administrative-procedure-inss-analysis-result-query-result.auto-mapper.profile';
import { AdministrativeRequestGeneratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/administrative-request-generator-analysis-result/administrative-request-generator-analysis-result-entity.auto-mapper.profile';
import { AffiliateBankTransferEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/affiliate-bank-transfer/affiliate-bank-transfer-entity.auto-mapper.profile';
import { GetAffiliateBankTransferQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/affiliate-bank-transfer/get-affiliate-bank-transfer-query-result.auto-mapper.profile';
import { AffiliateCustomerEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/affiliate-customer/affiliate-customer-entity.auto-mapper.profile';
import { GetAffiliateCustomerQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/affiliate-customer/get-affiliate-customer-query-result.auto-mapper.profile';
import { AffiliateCustomerConfigAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/affiliate-customer-config/affiliate-customer-config.auto-mapper.profile';
import { AffiliateCustomerPaymentPlanEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/affiliate-customer-payment-plan/affiliate-customer-payment-plan-entity.auto-mapper.profile';
import { GetAffiliateCustomerPaymentPlanQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/affiliate-customer-payment-plan/get-affiliate-customer-payment-plan-query-result.auto-mapper.profile';
import { AnalysisToolClientEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client/analysis-tool-client-entity.auto-mapper.profile';
import { GetAnalysisToolClientQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client/get-analysis-tool-client-query-result.auto-mapper.profile';
import { GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client/get-analysis-tool-client-with-limited-relations-query-result.auto-mapper.profile';
import { GetAnalysisToolClientWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client/get-analysis-tool-client-with-relations-query-result.auto-mapper.profile';
import { AnalysisToolClientInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit-entity.auto-mapper.profile';
import { GetAnalysisToolClientInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client-inss-benefit/get-analysis-tool-client-inss-benefit-query-result.auto-mapper.profile';
import { AnalysisToolClientLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding-entity.auto-mapper.profile';
import { GetAnalysisToolClientLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client-legal-proceeding/get-analysis-tool-client-legal-proceeding-query-result.auto-mapper.profile';
import { GetAnalysisToolClientLegalProceedingWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-client-legal-proceeding/get-analysis-tool-client-legal-proceeding-with-relations-query-result.auto-mapper.profile';
import { AnalysisToolRecordEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-record/analysis-tool-record-entity.auto-mapper.profile';
import { GetAnalysisToolRecordWithFullRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-record/get-analysis-tool-record-with-full-relations-query-result.auto-mapper.profile';
import { GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/analysis-tool-record/get-analysis-tool-record-with-relations-query-result.auto-mapper.profile';
import { AudienceQuestionGeneratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator/audience-question-generator-entity.auto-mapper.profile';
import { GetAudienceQuestionGeneratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator/get-audience-question-generator-query-result.auto-mapper.profile';
import { GetAudienceQuestionGeneratorWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator/get-audience-question-generator-with-relations-query-result.auto-mapper.profile';
import { AudienceQuestionGeneratorBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator-benefit/audience-question-generator-benefit-entity.auto-mapper.profile';
import { GetAudienceQuestionGeneratorBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator-benefit/get-audience-question-generator-benefit-query-result.auto-mapper.profile';
import { AudienceQuestionGeneratorDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator-document/audience-question-generator-document-entity.auto-mapper.profile';
import { GetAudienceQuestionGeneratorDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator-document/get-audience-question-generator-document-query-result.auto-mapper.profile';
import { AudienceQuestionGeneratorLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding-entity.auto-mapper.profile';
import { GetAudienceQuestionGeneratorLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator-legal-proceeding/get-audience-question-generator-legal-proceeding-query-result.auto-mapper.profile';
import { AudienceQuestionGeneratorResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator-result/audience-question-generator-result-entity.auto-mapper.profile';
import { GetAudienceQuestionGeneratorResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/audience-question-generator-result/get-audience-question-generator-result-query-result.auto-mapper.profile';
import { AuthIdentityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/auth-identity-entity.auto-mapper.profile';
import { GetAuthIdentityQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/get-auth-identity-query-result.auto-mapper.profile';
import { GetAuthIdentityWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/get-auth-identity-with-relations-query-result.auto-mapper.profile';
import { BankPaymentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bank-payment/bank-payment-entity.auto-mapper.profile';
import { GetBankPaymentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bank-payment/get-bank-payment-query-result.auto-mapper.profile';
import { BankTransferEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bank-transfer/bank-transfer-entity.auto-mapper.profile';
import { GetBankTransferQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bank-transfer/get-bank-transfer-query-result.auto-mapper.profile';
import { BpcDisabilityDenialEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial/bpc-disability-denial-entity.auto-mapper.profile';
import { GetBpcDisabilityDenialQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial/get-bpc-disability-denial-query-result.auto-mapper.profile';
import { GetBpcDisabilityDenialWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial/get-bpc-disability-denial-with-relations-query-result.auto-mapper.profile';
import { BpcDisabilityDenialDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-document/bpc-disability-denial-document-entity.auto-mapper.profile';
import { GetBpcDisabilityDenialDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-document/get-bpc-disability-denial-document-query-result.auto-mapper.profile';
import { BpcDisabilityDenialFamilyMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-family-member/bpc-disability-denial-family-member-entity.auto-mapper.profile';
import { GetBpcDisabilityDenialFamilyMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-family-member/get-bpc-disability-denial-family-member-query-result.auto-mapper.profile';
import { BpcDisabilityDenialFamilyMemberDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-family-member-document/bpc-disability-denial-family-member-document-entity.auto-mapper.profile';
import { GetBpcDisabilityDenialFamilyMemberDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-family-member-document/get-bpc-disability-denial-family-member-document-query-result.auto-mapper.profile';
import { BpcDisabilityDenialInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit-entity.auto-mapper.profile';
import { GetBpcDisabilityDenialInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-inss-benefit/get-bpc-disability-denial-inss-benefit-query-result.auto-mapper.profile';
import { BpcDisabilityDenialLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding-entity.auto-mapper.profile';
import { GetBpcDisabilityDenialLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-legal-proceeding/get-bpc-disability-denial-legal-proceeding-query-result.auto-mapper.profile';
import { BpcDisabilityDenialResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-result/bpc-disability-denial-result-entity.auto-mapper.profile';
import { GetBpcDisabilityDenialResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-denial-result/get-bpc-disability-denial-result-query-result.auto-mapper.profile';
import { BpcDisabilityGrantEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant/bpc-disability-grant-entity.auto-mapper.profile';
import { GetBpcDisabilityGrantQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant/get-bpc-disability-grant-query-result.auto-mapper.profile';
import { GetBpcDisabilityGrantWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant/get-bpc-disability-grant-with-relations-query-result.auto-mapper.profile';
import { BpcDisabilityGrantDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-document/bpc-disability-grant-document-entity.auto-mapper.profile';
import { GetBpcDisabilityGrantDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-document/get-bpc-disability-grant-document-query-result.auto-mapper.profile';
import { BpcDisabilityGrantFamilyMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-family-member/bpc-disability-grant-family-member-entity.auto-mapper.profile';
import { GetBpcDisabilityGrantFamilyMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-family-member/get-bpc-disability-grant-family-member-query-result.auto-mapper.profile';
import { BpcDisabilityGrantFamilyMemberDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-family-member-document/bpc-disability-grant-family-member-document-entity.auto-mapper.profile';
import { GetBpcDisabilityGrantFamilyMemberDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-family-member-document/get-bpc-disability-grant-family-member-document-query-result.auto-mapper.profile';
import { BpcDisabilityGrantInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-inss-benefit/bpc-disability-grant-inss-benefit-entity.auto-mapper.profile';
import { GetBpcDisabilityGrantInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-inss-benefit/get-bpc-disability-grant-inss-benefit-query-result.auto-mapper.profile';
import { BpcDisabilityGrantLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-legal-proceeding/bpc-disability-grant-legal-proceeding-entity.auto-mapper.profile';
import { GetBpcDisabilityGrantLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-legal-proceeding/get-bpc-disability-grant-legal-proceeding-query-result.auto-mapper.profile';
import { BpcDisabilityGrantResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-result/bpc-disability-grant-result-entity.auto-mapper.profile';
import { GetBpcDisabilityGrantResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-grant-result/get-bpc-disability-grant-result-query-result.auto-mapper.profile';
import { BpcDisabilityTerminationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination/bpc-disability-termination-entity.auto-mapper.profile';
import { GetBpcDisabilityTerminationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination/get-bpc-disability-termination-query-result.auto-mapper.profile';
import { GetBpcDisabilityTerminationWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination/get-bpc-disability-termination-with-relations-query-result.auto-mapper.profile';
import { BpcDisabilityTerminationDisabilityAssessmentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment-entity.auto-mapper.profile';
import { GetBpcDisabilityTerminationDisabilityAssessmentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-disability-assessment/get-bpc-disability-termination-disability-assessment-query-result.auto-mapper.profile';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-disability-assessment-document/bpc-disability-termination-disability-assessment-document-entity.auto-mapper.profile';
import { GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-disability-assessment-document/get-bpc-disability-termination-disability-assessment-document-query-result.auto-mapper.profile';
import { BpcDisabilityTerminationDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-document/bpc-disability-termination-document-entity.auto-mapper.profile';
import { GetBpcDisabilityTerminationDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-document/get-bpc-disability-termination-document-query-result.auto-mapper.profile';
import { BpcDisabilityTerminationFamilyMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-family-member/bpc-disability-termination-family-member-entity.auto-mapper.profile';
import { GetBpcDisabilityTerminationFamilyMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-family-member/get-bpc-disability-termination-family-member-query-result.auto-mapper.profile';
import { BpcDisabilityTerminationFamilyMemberDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-family-member-document/bpc-disability-termination-family-member-document-entity.auto-mapper.profile';
import { GetBpcDisabilityTerminationFamilyMemberDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-family-member-document/get-bpc-disability-termination-family-member-document-query-result.auto-mapper.profile';
import { BpcDisabilityTerminationInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit-entity.auto-mapper.profile';
import { GetBpcDisabilityTerminationInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-inss-benefit/get-bpc-disability-termination-inss-benefit-query-result.auto-mapper.profile';
import { BpcDisabilityTerminationLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding-entity.auto-mapper.profile';
import { GetBpcDisabilityTerminationLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-legal-proceeding/get-bpc-disability-termination-legal-proceeding-query-result.auto-mapper.profile';
import { BpcDisabilityTerminationResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-result/bpc-disability-termination-result-entity.auto-mapper.profile';
import { GetBpcDisabilityTerminationResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-disability-termination-result/get-bpc-disability-termination-result-query-result.auto-mapper.profile';
import { BpcElderlyAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis/bpc-elderly-analysis-entity.auto-mapper.profile';
import { GetBpcElderlyAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis/get-bpc-elderly-analysis-query-result.auto-mapper.profile';
import { GetBpcElderlyAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis/get-bpc-elderly-analysis-with-relations-query-result.auto-mapper.profile';
import { BpcElderlyAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-document/bpc-elderly-analysis-document-entity.auto-mapper.profile';
import { GetBpcElderlyAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-document/get-bpc-elderly-analysis-document-query-result.auto-mapper.profile';
import { BpcElderlyAnalysisFamilyMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member-entity.auto-mapper.profile';
import { GetBpcElderlyAnalysisFamilyMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-family-member/get-bpc-elderly-analysis-family-member-query-result.auto-mapper.profile';
import { BpcElderlyAnalysisFamilyMemberDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document-entity.auto-mapper.profile';
import { GetBpcElderlyAnalysisFamilyMemberDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-family-member-document/get-bpc-elderly-analysis-family-member-document-query-result.auto-mapper.profile';
import { BpcElderlyAnalysisInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-inss-benefit/bpc-elderly-analysis-inss-benefit-entity.auto-mapper.profile';
import { GetBpcElderlyAnalysisInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-inss-benefit/get-bpc-elderly-analysis-inss-benefit-query-result.auto-mapper.profile';
import { BpcElderlyAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-legal-proceeding/bpc-elderly-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetBpcElderlyAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-legal-proceeding/get-bpc-elderly-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { BpcElderlyAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-result/bpc-elderly-analysis-result-entity.auto-mapper.profile';
import { GetBpcElderlyAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-analysis-result/get-bpc-elderly-analysis-result-query-result.auto-mapper.profile';
import { BpcElderlyCessationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation/bpc-elderly-cessation-entity.auto-mapper.profile';
import { GetBpcElderlyCessationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation/get-bpc-elderly-cessation-query-result.auto-mapper.profile';
import { GetBpcElderlyCessationWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation/get-bpc-elderly-cessation-with-relations-query-result.auto-mapper.profile';
import { BpcElderlyCessationDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-document/bpc-elderly-cessation-document-entity.auto-mapper.profile';
import { GetBpcElderlyCessationDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-document/get-bpc-elderly-cessation-document-query-result.auto-mapper.profile';
import { BpcElderlyCessationFamilyMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member-entity.auto-mapper.profile';
import { GetBpcElderlyCessationFamilyMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-family-member/get-bpc-elderly-cessation-family-member-query-result.auto-mapper.profile';
import { BpcElderlyCessationFamilyMemberDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-family-member-document/bpc-elderly-cessation-family-member-document-entity.auto-mapper.profile';
import { GetBpcElderlyCessationFamilyMemberDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-family-member-document/get-bpc-elderly-cessation-family-member-document-query-result.auto-mapper.profile';
import { BpcElderlyCessationInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit-entity.auto-mapper.profile';
import { GetBpcElderlyCessationInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-inss-benefit/get-bpc-elderly-cessation-inss-benefit-query-result.auto-mapper.profile';
import { BpcElderlyCessationLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-legal-proceeding/bpc-elderly-cessation-legal-proceeding-entity.auto-mapper.profile';
import { GetBpcElderlyCessationLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-legal-proceeding/get-bpc-elderly-cessation-legal-proceeding-query-result.auto-mapper.profile';
import { BpcElderlyCessationResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-result/bpc-elderly-cessation-result-entity.auto-mapper.profile';
import { GetBpcElderlyCessationResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/bpc-elderly-cessation-result/get-bpc-elderly-cessation-result-query-result.auto-mapper.profile';
import { CidTenEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cid-ten/cid-ten-entity.auto-mapper.profile';
import { GetCidTenQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cid-ten/get-cid-ten-query-result.auto-mapper.profile';
import { CnisFastAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis/cnis-fast-analysis-entity.auto-mapper.profile';
import { GetCnisFastAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis/get-cnis-fast-analysis-query-result.auto-mapper.profile';
import { GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis/get-cnis-fast-analysis-with-relations-query-result.auto-mapper.profile';
import { CnisFastAnalysisInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit-entity.auto-mapper.profile';
import { GetCnisFastAnalysisInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-inss-benefit/get-cnis-fast-analysis-inss-benefit-query-result.auto-mapper.profile';
import { CnisFastAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetCnisFastAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-legal-proceeding/get-cnis-fast-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { CnisFastAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-result/cnis-fast-analysis-result-entity.auto-mapper.profile';
import { GetCnisFastAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/cnis-fast-analysis-result/get-cnis-fast-analysis-result-query-result.auto-mapper.profile';
import { CreditPackEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/credit-pack/credit-pack-entity.auto-mapper.profile';
import { CustomerEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/customer-entity.auto-mapper.profile';
import { GetCustomerProfileQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-profile-query-result.auto-mapper.profile';
import { GetCustomerQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-query-result.auto-mapper.profile';
import { GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-with-auth-identity-relation-query-result.auto-mapper.profile';
import { GetCustomerWithCustomerAddressRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-with-customer-address-relation-query-result.auto-mapper.profile';
import { GetCustomerWithOrganizationForListQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer/get-customer-with-organization-for-list-query-result.auto-mapper.profile';
import { CustomerAddressEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-address/customer-address-entity.auto-mapper.profile';
import { GetCustomerAddressQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-address/get-customer-query-result.auto-mapper.profile';
import { CustomerEmailSentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-email-sent/customer-email-sent-entity.auto-mapper.profile';
import { CustomerEmailSentAttachmentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-email-sent-attachment/customer-email-sent-attachment-entity.auto-mapper.profile';
import { CustomerTermsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-terms/customer-terms-entity.auto-mapper.profile';
import { GetCustomerTermsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-terms/get-customer-terms-query-result.auto-mapper.profile';
import { CustomerTermsAcceptanceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-terms-acceptance/customer-terms-acceptance-entity.auto-mapper.profile';
import { GetCustomerTermsAcceptanceQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/customer-terms-acceptance/get-customer-terms-acceptance-query-result.auto-mapper.profile';
import { DeathBenefitGrantEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant/death-benefit-grant-entity.auto-mapper.profile';
import { GetDeathBenefitGrantWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant/get-death-benefit-grant-with-relations-query-result.auto-mapper.profile';
import { DeathBenefitGrantDependentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-dependent/death-benefit-grant-dependent-entity.auto-mapper.profile';
import { DeathBenefitGrantDependentDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-dependent-document/death-benefit-grant-dependent-document-entity.auto-mapper.profile';
import { DeathBenefitGrantDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-document/death-benefit-grant-document-entity.auto-mapper.profile';
import { DeathBenefitGrantInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit-entity.auto-mapper.profile';
import { DeathBenefitGrantInstitorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-institutor/death-benefit-grant-institutor-entity.auto-mapper.profile';
import { DeathBenefitGrantLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding-entity.auto-mapper.profile';
import { DeathBenefitGrantLegalRepresentativeEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative-entity.auto-mapper.profile';
import { DeathBenefitGrantPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-period/death-benefit-grant-period-entity.auto-mapper.profile';
import { GetDeathBenefitGrantPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-period/get-death-benefit-grant-period-query-result.auto-mapper.profile';
import { DeathBenefitGrantPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-period-document/death-benefit-grant-period-document-entity.auto-mapper.profile';
import { DeathBenefitGrantPeriodEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-period-earnings-history/death-benefit-grant-period-earnings-history-entity.auto-mapper.profile';
import { DeathBenefitGrantResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-result/death-benefit-grant-result-entity.auto-mapper.profile';
import { DeathBenefitGrantTimeAcceleratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator-entity.auto-mapper.profile';
import { GetDeathBenefitGrantTimeAcceleratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-grant-time-accelerator/get-death-benefit-grant-time-accelerator-query-result.auto-mapper.profile';
import { DeathBenefitRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection/death-benefit-rejection-entity.auto-mapper.profile';
import { GetDeathBenefitRejectionWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection/get-death-benefit-rejection-with-relations-query-result.auto-mapper.profile';
import { DeathBenefitRejectionDependentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-dependent/death-benefit-rejection-dependent-entity.auto-mapper.profile';
import { DeathBenefitRejectionDependentDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-dependent-document/death-benefit-rejection-dependent-document-entity.auto-mapper.profile';
import { DeathBenefitRejectionDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-document/death-benefit-rejection-document-entity.auto-mapper.profile';
import { DeathBenefitRejectionInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit-entity.auto-mapper.profile';
import { DeathBenefitRejectionInstitorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-institutor/death-benefit-rejection-institutor-entity.auto-mapper.profile';
import { DeathBenefitRejectionLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-legal-proceeding/death-benefit-rejection-legal-proceeding-entity.auto-mapper.profile';
import { DeathBenefitRejectionLegalRepresentativeEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative-entity.auto-mapper.profile';
import { DeathBenefitRejectionPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-period/death-benefit-rejection-period-entity.auto-mapper.profile';
import { GetDeathBenefitRejectionPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-period/get-death-benefit-rejection-period-query-result.auto-mapper.profile';
import { DeathBenefitRejectionPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-period-document/death-benefit-rejection-period-document-entity.auto-mapper.profile';
import { DeathBenefitRejectionPeriodEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-period-earnings-history/death-benefit-rejection-period-earnings-history-entity.auto-mapper.profile';
import { DeathBenefitRejectionResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-result/death-benefit-rejection-result-entity.auto-mapper.profile';
import { DeathBenefitRejectionTimeAcceleratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator-entity.auto-mapper.profile';
import { GetDeathBenefitRejectionTimeAcceleratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/death-benefit-rejection-time-accelerator/get-death-benefit-rejection-time-accelerator-query-result.auto-mapper.profile';
import { DisabilityAssessmentForBpcAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis-entity.auto-mapper.profile';
import { GetDisabilityAssessmentForBpcAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis/get-disability-assessment-for-bpc-analysis-query-result.auto-mapper.profile';
import { GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis/get-disability-assessment-for-bpc-analysis-with-relations-query-result.auto-mapper.profile';
import { DisabilityAssessmentForBpcAnalysisBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit-entity.auto-mapper.profile';
import { GetDisabilityAssessmentForBpcAnalysisBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis-benefit/get-disability-assessment-for-bpc-analysis-benefit-query-result.auto-mapper.profile';
import { DisabilityAssessmentForBpcAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document-entity.auto-mapper.profile';
import { GetDisabilityAssessmentForBpcAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis-document/get-disability-assessment-for-bpc-analysis-document-query-result.auto-mapper.profile';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis-legal-proceeding/get-disability-assessment-for-bpc-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { DisabilityAssessmentForBpcAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result-entity.auto-mapper.profile';
import { GetDisabilityAssessmentForBpcAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-assessment-for-bpc-analysis-result/get-disability-assessment-for-bpc-analysis-result-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning/disability-retirement-planning-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning/get-disability-retirement-planning-with-relations-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-document/disability-retirement-planning-document-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-document/get-disability-retirement-planning-document-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant/disability-retirement-planning-grant-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningGrantWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant/get-disability-retirement-planning-grant-with-relations-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantDisabilityPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-disability-period/get-disability-retirement-planning-grant-disability-period-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-disability-period-document/disability-retirement-planning-grant-disability-period-document-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-inss-benefit/disability-retirement-planning-grant-inss-benefit-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningGrantPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-period/get-disability-retirement-planning-grant-period-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-period-document/disability-retirement-planning-grant-period-document-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningGrantTimeAcceleratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-grant-time-accelerator/get-disability-retirement-planning-grant-time-accelerator-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-inss-benefit/disability-retirement-planning-inss-benefit-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-inss-benefit/get-disability-retirement-planning-inss-benefit-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-legal-proceeding/disability-retirement-planning-legal-proceeding-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-legal-proceeding/get-disability-retirement-planning-legal-proceeding-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period/disability-retirement-planning-period-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period/get-disability-retirement-planning-period-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningPeriodDisabilityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningPeriodDisabilityQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period-disability/get-disability-retirement-planning-period-disability-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period-disability-document/disability-retirement-planning-period-disability-document-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period-disability-document/get-disability-retirement-planning-period-disability-document-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningPeriodSpecialTimeEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period-special-time/get-disability-retirement-planning-period-special-time-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period-special-time-document/disability-retirement-planning-period-special-time-document-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-period-special-time-document/get-disability-retirement-planning-period-special-time-document-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-rejection/disability-retirement-planning-rejection-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningRejectionInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-rejection/disability-retirement-planning-rejection-inss-benefit-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-rejection/disability-retirement-planning-rejection-period-earnings-history-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningRejectionPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-rejection/disability-retirement-planning-rejection-period-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningRejectionResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-rejection/disability-retirement-planning-rejection-result-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningRejectionWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-rejection/get-disability-retirement-planning-rejection-with-relations-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningRejectionDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document-entity.auto-mapper.profile';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-rejection-time-accelerator/disability-retirement-planning-rejection-time-accelerator-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-rejection-time-accelerator/get-disability-retirement-planning-rejection-time-accelerator-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningRemunerationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningRemunerationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-remuneration/get-disability-retirement-planning-remuneration-query-result.auto-mapper.profile';
import { DisabilityRetirementPlanningResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-result/disability-retirement-planning-result-entity.auto-mapper.profile';
import { GetDisabilityRetirementPlanningResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/disability-retirement-planning-result/get-disability-retirement-planning-result-query-result.auto-mapper.profile';
import { ElderlyBpcRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/elderly-bpc-rejection/elderly-bpc-rejection-entity.auto-mapper.profile';
import { ElderlyBpcRejectionResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/elderly-bpc-rejection/elderly-bpc-rejection-result-entity.auto-mapper.profile';
import { FullOpinionGeneratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/full-opinion-generator-analysis-result/full-opinion-generator-analysis-result-entity.auto-mapper.profile';
import { GeneralUrbanRetirementAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-analysis/general-urban-retirement-analysis-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-analysis/get-general-urban-retirement-analysis-query-result.auto-mapper.profile';
import { GetGeneralUrbanRetirementAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-analysis/get-general-urban-retirement-analysis-with-relations-query-result.auto-mapper.profile';
import { GetGeneralUrbanRetirementAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-analysis-document/get-general-urban-retirement-analysis-document-query-result.auto-mapper.profile';
import { GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-analysis-legal-proceeding/get-general-urban-retirement-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementAnalysisPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period-entity.auto-mapper.profile';
import { GeneralUrbanRetirementAnalysisRemunerationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-analysis-remuneration/general-urban-retirement-analysis-remuneration-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementAnalysisRemunerationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-analysis-remuneration/get-general-urban-retirement-analysis-remuneration-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result-entity.auto-mapper.profile';
import { GeneralUrbanRetirementDenialEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-denial/general-urban-retirement-denial-entity.auto-mapper.profile';
import { GeneralUrbanRetirementDenialInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-denial/general-urban-retirement-denial-inss-benefit-entity.auto-mapper.profile';
import { GeneralUrbanRetirementDenialPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-denial/general-urban-retirement-denial-period-entity.auto-mapper.profile';
import { GeneralUrbanRetirementDenialResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-denial/general-urban-retirement-denial-result-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementDenialWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-denial/get-general-urban-retirement-denial-with-relations-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementDenialDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-denial-document/general-urban-retirement-denial-document-entity.auto-mapper.profile';
import { GeneralUrbanRetirementDenialTimeAcceleratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-denial-time-accelerator/general-urban-retirement-denial-time-accelerator-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-denial-time-accelerator/get-general-urban-retirement-denial-time-accelerator-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementGrantEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant/general-urban-retirement-grant-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementGrantQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant/get-general-urban-retirement-grant-query-result.auto-mapper.profile';
import { GetGeneralUrbanRetirementGrantWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant/get-general-urban-retirement-grant-with-relations-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementGrantAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-analysis-result/general-urban-retirement-grant-analysis-result-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementGrantAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-analysis-result/get-general-urban-retirement-grant-analysis-result-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementGrantEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-earnings-history/general-urban-retirement-grant-earnings-history-entity.auto-mapper.profile';
import { GeneralUrbanRetirementGrantInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit-entity.auto-mapper.profile';
import { GeneralUrbanRetirementGrantLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding-entity.auto-mapper.profile';
import { GeneralUrbanRetirementGrantPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-period/general-urban-retirement-grant-period-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementGrantPeriodQueryResultWithRelationsAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-period/get-general-urban-retirement-grant-period-query-result-with-relations.auto-mapper.profile';
import { GetGeneralUrbanRetirementGrantPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-period/get-general-urban-retirement-grant-period-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementGrantPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-period-document/general-urban-retirement-grant-period-document-entity.auto-mapper.profile';
import { GeneralUrbanRetirementGrantResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-result/general-urban-retirement-grant-result-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementGrantResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-result/get-general-urban-retirement-grant-result-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementGrantSpecialPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-special-period/general-urban-retirement-grant-special-period-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementGrantSpecialPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-special-period/get-general-urban-retirement-grant-special-period-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementGrantTimeAcceleratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-time-accelerator/general-urban-retirement-grant-time-accelerator-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-grant-time-accelerator/get-general-urban-retirement-grant-time-accelerator-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementReviewEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review/general-urban-retirement-review-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementReviewQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review/get-general-urban-retirement-review-query-result.auto-mapper.profile';
import { GetGeneralUrbanRetirementReviewWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review/get-general-urban-retirement-review-with-relations-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementReviewAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-analysis-result/general-urban-retirement-review-analysis-result-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementReviewAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-analysis-result/get-general-urban-retirement-review-analysis-result-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementReviewEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history-entity.auto-mapper.profile';
import { GeneralUrbanRetirementReviewInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit-entity.auto-mapper.profile';
import { GeneralUrbanRetirementReviewLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding-entity.auto-mapper.profile';
import { GeneralUrbanRetirementReviewPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-period/general-urban-retirement-review-period-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementReviewPeriodQueryResultWithRelationsAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-period/get-general-urban-retirement-review-period-query-result-with-relations.auto-mapper.profile';
import { GetGeneralUrbanRetirementReviewPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-period/get-general-urban-retirement-review-period-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementReviewPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-period-document/general-urban-retirement-review-period-document-entity.auto-mapper.profile';
import { GeneralUrbanRetirementReviewResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-result/general-urban-retirement-review-result-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementReviewResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-result/get-general-urban-retirement-review-result-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementReviewSpecialPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-special-period/general-urban-retirement-review-special-period-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementReviewSpecialPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-special-period/get-general-urban-retirement-review-special-period-query-result.auto-mapper.profile';
import { GeneralUrbanRetirementReviewTimeAcceleratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator-entity.auto-mapper.profile';
import { GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/general-urban-retirement-review-time-accelerator/get-general-urban-retirement-review-time-accelerator-query-result.auto-mapper.profile';
import { InitialPetitionGeneratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/initial-petition-generator-analysis-result/initial-petition-generator-analysis-result-entity.auto-mapper.profile';
import { GetInsuranceQualityAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis/get-insurance-quality-analysis-with-relations-query-result.auto-mapper.profile';
import { InsuranceQualityAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis/insurance-quality-analysis-entity.auto-mapper.profile';
import { GetInsuranceQualityAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis-document/get-insurance-quality-analysis-document-query-result.auto-mapper.profile';
import { InsuranceQualityAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis-document/insurance-quality-analysis-document-entity.auto-mapper.profile';
import { GetInsuranceQualityAnalysisInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis-inss-benefit/get-insurance-quality-analysis-inss-benefit-query-result.auto-mapper.profile';
import { InsuranceQualityAnalysisInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis-inss-benefit/insurance-quality-analysis-inss-benefit-entity.auto-mapper.profile';
import { GetInsuranceQualityAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis-legal-proceeding/get-insurance-quality-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { InsuranceQualityAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis-legal-proceeding/insurance-quality-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetInsuranceQualityAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis-result/get-insurance-quality-analysis-result-query-result.auto-mapper.profile';
import { InsuranceQualityAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/insurance-quality-analysis-result/insurance-quality-analysis-result-entity.auto-mapper.profile';
import { GetJudicialCaseAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis/get-judicial-case-analysis-query-result.auto-mapper.profile';
import { GetJudicialCaseAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis/get-judicial-case-analysis-with-relations-query-result.auto-mapper.profile';
import { JudicialCaseAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis/judicial-case-analysis-entity.auto-mapper.profile';
import { GetJudicialCaseAnalysisBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis-benefit/get-judicial-case-analysis-benefit-query-result.auto-mapper.profile';
import { JudicialCaseAnalysisBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis-benefit/judicial-case-analysis-benefit-entity.auto-mapper.profile';
import { GetJudicialCaseAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis-document/get-judicial-case-analysis-document-query-result.auto-mapper.profile';
import { JudicialCaseAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis-document/judicial-case-analysis-document-entity.auto-mapper.profile';
import { GetJudicialCaseAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis-legal-proceeding/get-judicial-case-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { JudicialCaseAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetJudicialCaseAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis-result/get-judicial-case-analysis-result-query-result.auto-mapper.profile';
import { JudicialCaseAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/judicial-case-analysis-result/judicial-case-analysis-result-entity.auto-mapper.profile';
import { GetLegalPleadingWithFullRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading/get-legal-pleading-with-full-relations-query-result.auto-mapper.profile';
import { GetLegalPleadingWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading/get-legal-pleading-with-relations-query-result.auto-mapper.profile';
import { GetLegalPleadingWithResponsibleAndClientRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading/get-legal-pleading-with-responsible-and-client-relations-query-result.auto-mapper.profile';
import { LegalPleadingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading/legal-pleading-entity.auto-mapper.profile';
import { GetLegalPleadingAddressQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-address/get-legal-pleading-address-query-result.auto-mapper.profile';
import { LegalPleadingAddressEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-address/legal-pleading-address-entity.auto-mapper.profile';
import { GetLegalPleadingDocumentWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-document/get-legal-pleading-document-with-relations-query-result.auto-mapper.profile';
import { LegalPleadingDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-document/legal-pleading-document-entity.auto-mapper.profile';
import { GetLegalPleadingDocumentAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-document-analysis/get-legal-pleading-document-analysis-query-result.auto-mapper.profile';
import { LegalPleadingDocumentAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-document-analysis/legal-pleading-document-analysis-entity.auto-mapper.profile';
import { LegalPleadingHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-history/legal-pleading-history-entity.auto-mapper.profile';
import { LegalPleadingHistoryQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-history/legal-pleading-history-query-result.auto-mapper.profile';
import { GetLegalPleadingResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-result/get-legal-pleading-result-query-result.auto-mapper.profile';
import { LegalPleadingResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-pleading-result/legal-pleading-result-entity.auto-mapper.profile';
import { GetLegalProceedingDetailQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-proceeding-detail/get-legal-proceeding-detail-query-result.auto-mapper.profile';
import { GetLegalProceedingDetailWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-proceeding-detail/get-legal-proceeding-detail-with-relations-query-result.auto-mapper.profile';
import { LegalProceedingDetailEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/legal-proceeding-detail/legal-proceeding-detail-entity.auto-mapper.profile';
import { GetMaternityPayGrantWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant/get-maternity-pay-grant-with-relations-query-result.auto-mapper.profile';
import { MaternityPayGrantEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant/maternity-pay-grant-entity.auto-mapper.profile';
import { MaternityPayGrantDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant-document/maternity-pay-grant-document-entity.auto-mapper.profile';
import { MaternityPayGrantEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history-entity.auto-mapper.profile';
import { MaternityPayGrantInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit-entity.auto-mapper.profile';
import { MaternityPayGrantLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding-entity.auto-mapper.profile';
import { GetMaternityPayGrantPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant-period/get-maternity-pay-grant-period-query-result.auto-mapper.profile';
import { MaternityPayGrantPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant-period/maternity-pay-grant-period-entity.auto-mapper.profile';
import { MaternityPayGrantPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant-period-document/maternity-pay-grant-period-document-entity.auto-mapper.profile';
import { MaternityPayGrantResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-grant-result/maternity-pay-grant-result-entity.auto-mapper.profile';
import { GetMaternityPayRejectionWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-rejection/get-maternity-pay-rejection-with-relations-query-result.auto-mapper.profile';
import { MaternityPayRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-rejection/maternity-pay-rejection-entity.auto-mapper.profile';
import { MaternityPayRejectionDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-rejection-document/maternity-pay-rejection-document-entity.auto-mapper.profile';
import { MaternityPayRejectionInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-rejection-inss-benefit/maternity-pay-rejection-inss-benefit-entity.auto-mapper.profile';
import { MaternityPayRejectionLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-rejection-legal-proceeding/maternity-pay-rejection-legal-proceeding-entity.auto-mapper.profile';
import { MaternityPayRejectionResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-rejection-result/maternity-pay-rejection-result-entity.auto-mapper.profile';
import { MaternityPayRejectionWorkPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period-entity.auto-mapper.profile';
import { MaternityPayRejectionWorkPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document-entity.auto-mapper.profile';
import { MaternityPayRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history-entity.auto-mapper.profile';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis/get-medical-and-social-report-objection-generator-analysis-query-result.auto-mapper.profile';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis/get-medical-and-social-report-objection-generator-analysis-with-relations-query-result.auto-mapper.profile';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis-entity.auto-mapper.profile';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis-benefit/get-medical-and-social-report-objection-generator-analysis-benefit-query-result.auto-mapper.profile';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit-entity.auto-mapper.profile';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis-document/get-medical-and-social-report-objection-generator-analysis-document-query-result.auto-mapper.profile';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document-entity.auto-mapper.profile';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis-legal-proceeding/get-medical-and-social-report-objection-generator-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis-result/get-medical-and-social-report-objection-generator-analysis-result-query-result.auto-mapper.profile';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result-entity.auto-mapper.profile';
import { GetMedicalQuestionGeneratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator/get-medical-question-generator-query-result.auto-mapper.profile';
import { GetMedicalQuestionGeneratorWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator/get-medical-question-generator-with-relations-query-result.auto-mapper.profile';
import { MedicalQuestionGeneratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator/medical-question-generator-entity.auto-mapper.profile';
import { GetMedicalQuestionGeneratorDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator-document/get-medical-question-generator-document-query-result.auto-mapper.profile';
import { MedicalQuestionGeneratorDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator-document/medical-question-generator-document-entity.auto-mapper.profile';
import { GetMedicalQuestionGeneratorInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator-inss-benefit/get-medical-question-generator-inss-benefit-query-result.auto-mapper.profile';
import { MedicalQuestionGeneratorInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit-entity.auto-mapper.profile';
import { GetMedicalQuestionGeneratorLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator-legal-proceeding/get-medical-question-generator-legal-proceeding-query-result.auto-mapper.profile';
import { MedicalQuestionGeneratorLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding-entity.auto-mapper.profile';
import { GetMedicalQuestionGeneratorResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator-result/get-medical-question-generator-result-query-result.auto-mapper.profile';
import { MedicalQuestionGeneratorResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/medical-question-generator-result/medical-question-generator-result-entity.auto-mapper.profile';
import { GetMiniAdvisorWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/mini-advisor/get-mini-advisor-with-relations-query-result.auto-mapper.profile';
import { MiniAdvisorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/mini-advisor/mini-advisor-entity.auto-mapper.profile';
import { GetMiniAdvisorResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/mini-advisor-result/get-mini-advisor-result-query-result.auto-mapper.profile';
import { MiniAdvisorResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/mini-advisor-result/mini-advisor-result-entity.auto-mapper.profile';
import { GetOrganizationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization/get-organization-query-result.auto-mapper.profile';
import { OrganizationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization/organization-entity.auto-mapper.profile';
import { GetOrganizationCreditPurchaseQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-credit/get-organization-credit-purchase-query-result.auto-mapper.profile';
import { GetOrganizationCreditUsageQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-credit/get-organization-credit-usage-query-result.auto-mapper.profile';
import { OrganizationCreditPurchaseEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-credit/organization-credit-purchase-entity.auto-mapper.profile';
import { OrganizationCreditUsageEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-credit/organization-credit-usage-entity.auto-mapper.profile';
import { GetOrganizationCustomizationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-customization/get-organization-customization-query-result.auto-mapper.profile';
import { OrganizationCustomizationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-customization/organization-customization-entity.auto-mapper.profile';
import { GetOrganizationCustomizationDocumentFooterTemplateQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-customization-document-footer-template/get-organization-customization-document-footer-template-query-result.auto-mapper.profile';
import { OrganizationCustomizationDocumentFooterTemplateEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-customization-document-footer-template/organization-customization-document-footer-template-entity.auto-mapper.profile';
import { GetOrganizationCustomizationDocumentHeaderTemplateQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-customization-document-header-template/get-organization-customization-document-header-template-query-result.auto-mapper.profile';
import { OrganizationCustomizationDocumentHeaderTemplateEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-customization-document-header-template/organization-customization-document-header-template-entity.auto-mapper.profile';
import { GetOrganizationMemberCollaboratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-collaborator-query-result.auto-mapper.profile';
import { GetOrganizationMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-with-customer-and-organization-relations-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithCustomerRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-with-customer-relation-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithOrganizationRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-with-organization-relations-query-result.auto-mapper.profile';
import { OrganizationMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/organization-member-entity.auto-mapper.profile';
import { OrganizationPaymentPlanEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan/organization-payment-plan-entity.auto-mapper.profile';
import { OrganizationPaymentPlanQueryResultWithRelationsAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan/organization-payment-plan-query-result-with-relations.auto-mapper.profile';
import { OrganizationPaymentPlanQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan/organization-payment-plan-query-result.auto-mapper.profile';
import { GetOrganizationPaymentPlanAffiliateCommissionQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan-affiliate-commission/get-organization-payment-plan-affiliate-commission-query-result.auto-mapper.profile';
import { OrganizationPaymentPlanAffiliateCommissionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission-entity.auto-mapper.profile';
import { GetOrganizationPaymentPlanBankPaymentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan-bank-payment/get-organization-payment-plan-bank-payment-query-result.auto-mapper.profile';
import { OrganizationPaymentPlanBankPaymentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment-entity.auto-mapper.profile';
import { GetOrganizationPaymentPlanEnabledPaidResourceQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan-enabled-paid-resource/get-organization-payment-plan-enabled-paid-resource-query-result.auto-mapper.profile';
import { OrganizationPaymentPlanEnabledPaidResourceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource-entity.auto-mapper.profile';
import { GetPaymentPlanQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan/get-payment-plan-query-result.auto-mapper.profile';
import { PaymentPlanEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan/payment-plan-entity.auto.mapper.profile';
import { GetPaymentPlanEnabledPaidResourceQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan-enabled-paid-resource/get-payment-plan-enabled-paid-resource-query-result.auto-mapper.profile';
import { PaymentPlanEnabledPaidResourceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource-entity.auto-mapper.profile';
import { PaymentPlanEnabledPaidResourceToEnabledQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource-to-enabled-query-result.auto.mapper.profile';
import { GetPaymentPlanPaidResourceQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan-paid-resource/get-payment-plan-paid-resource-query-result.auto-mapper.profile';
import { PaymentPlanPaidResourceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan-paid-resource/payment-plan-paid-resource-entity.auto-mapper.profile';
import { GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan-paid-resource-ia-config/get-payment-plan-paid-resource-ia-config-with-relations-query-result.auto-mapper.profile';
import { PaymentPlanPaidResourceIaConfigEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/payment-plan-paid-resource-ia-config/payment-plan-paid-resource-ia-config-entity.auto-mapper.profile';
import { GetPerCapitaIncomeForBpcAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis/get-per-capita-income-for-bpc-analysis-query-result.auto-mapper.profile';
import { GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis/get-per-capita-income-for-bpc-analysis-with-relations-query-result.auto-mapper.profile';
import { PerCapitaIncomeForBpcAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis-entity.auto-mapper.profile';
import { GetPerCapitaIncomeForBpcAnalysisBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-benefit/get-per-capita-income-for-bpc-analysis-benefit-query-result.auto-mapper.profile';
import { PerCapitaIncomeForBpcAnalysisBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit-entity.auto-mapper.profile';
import { GetPerCapitaIncomeForBpcAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-document/get-per-capita-income-for-bpc-analysis-document-query-result.auto-mapper.profile';
import { PerCapitaIncomeForBpcAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document-entity.auto-mapper.profile';
import { GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-family-member/get-per-capita-income-for-bpc-analysis-family-member-query-result.auto-mapper.profile';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member-entity.auto-mapper.profile';
import { GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-family-member-document/get-per-capita-income-for-bpc-analysis-family-member-document-query-result.auto-mapper.profile';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-family-member-document/per-capita-income-for-bpc-analysis-family-member-document-entity.auto-mapper.profile';
import { GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-legal-proceeding/get-per-capita-income-for-bpc-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetPerCapitaIncomeForBpcAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-result/get-per-capita-income-for-bpc-analysis-result-query-result.auto-mapper.profile';
import { PerCapitaIncomeForBpcAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result-entity.auto-mapper.profile';
import { RegulatoryUpdateEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/regulatory-update/regulatory-update-entity.auto-mapper.profile';
import { RegulatoryUpdateEmailPreferenceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/regulatory-update-email-preference/regulatory-update-email-preference-entity.auto-mapper.profile';
import { RegulatoryUpdateMonitoredSourceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/regulatory-update-monitored-source/regulatory-update-monitored-source-entity.auto-mapper.profile';
import { GetRetirementPermanentDisabilityRejectionWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection/get-retirement-permanent-disability-rejection-with-relations-query-result.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection-result-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-document/retirement-permanent-disability-rejection-document-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionIncapacityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-incapacity/retirement-permanent-disability-rejection-incapacity-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionIncapacityCidEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-incapacity-cid/retirement-permanent-disability-rejection-incapacity-cid-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-incapacity-document/retirement-permanent-disability-rejection-incapacity-document-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-incapacity-previous-benefit/retirement-permanent-disability-rejection-incapacity-previous-benefit-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionInsuredQualityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-insured-quality/retirement-permanent-disability-rejection-insured-quality-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-insured-quality-document/retirement-permanent-disability-rejection-insured-quality-document-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-period/retirement-permanent-disability-rejection-period-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-period-document/retirement-permanent-disability-rejection-period-document-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-rejection-period-earnings-history/retirement-permanent-disability-rejection-period-earnings-history-entity.auto-mapper.profile';
import { GetRetirementPermanentDisabilityRevisionQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/get-retirement-permanent-disability-revision-query-result.auto-mapper.profile';
import { GetRetirementPermanentDisabilityRevisionWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/get-retirement-permanent-disability-revision-with-relations-query-result.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/retirement-permanent-disability-revision-disability-analysis-associated-cid-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/retirement-permanent-disability-revision-disability-analysis-benefit-declaration-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/retirement-permanent-disability-revision-disability-analysis-benefit-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/retirement-permanent-disability-revision-disability-analysis-document-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/retirement-permanent-disability-revision-disability-analysis-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/retirement-permanent-disability-revision-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/retirement-permanent-disability-revision-work-periods-earnings-history-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision/retirement-permanent-disability-revision-work-periods-entity.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision-concession-letter-breakdown/retirement-permanent-disability-revision-concession-letter-breakdown-entity.auto-mapper.profile';
import { GetRetirementPermanentDisabilityRevisionDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision-document/get-retirement-permanent-disability-revision-document-query-result.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision-document/retirement-permanent-disability-revision-document-entity.auto-mapper.profile';
import { GetRetirementPermanentDisabilityRevisionInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision-inss-benefit/get-retirement-permanent-disability-revision-inss-benefit-query-result.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision-inss-benefit/retirement-permanent-disability-revision-inss-benefit-entity.auto-mapper.profile';
import { GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision-legal-proceeding/get-retirement-permanent-disability-revision-legal-proceeding-query-result.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision-legal-proceeding/retirement-permanent-disability-revision-legal-proceeding-entity.auto-mapper.profile';
import { GetRetirementPermanentDisabilityRevisionResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision-result/get-retirement-permanent-disability-revision-result-query-result.auto-mapper.profile';
import { RetirementPermanentDisabilityRevisionResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-permanent-disability-revision-result/retirement-permanent-disability-revision-result-entity.auto-mapper.profile';
import { GetRetirementPlanningRgpsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps/get-retirement-planning-rgps-query-result.auto-mapper.profile';
import { GetRetirementPlanningRgpsWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps/get-retirement-planning-rgps-with-relations-query-result.auto-mapper.profile';
import { RetirementPlanningRgpsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps/retirement-planning-rgps-entity.auto-mapper.profile';
import { GetRetirementPlanningRgpsAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-analysis/get-retirement-planning-rgps-analysis-result-query-result.auto-mapper.profile';
import { RetirementPlanningRgpsAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-analysis/retirement-planning-rgps-analysis-result-entity.auto-mapper.profile';
import { RetirementPlanningRgpsEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history-entity.auto-mapper.profile';
import { RetirementPlanningRgpsInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-inss-benefit/retirement-planning-rgps-inss-benefit-entity.auto-mapper.profile';
import { RetirementPlanningRgpsLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding-entity.auto-mapper.profile';
import { GetRetirementPlanningRgpsPeriodQueryResultWithRelationsAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-period/get-retirement-planning-rgps-period-query-result-with-relations.auto-mapper.profile';
import { GetRetirementPlanningRgpsPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-period/get-retirement-planning-rgps-period-query-result.auto-mapper.profile';
import { RetirementPlanningRgpsPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-period/retirement-planning-rgps-period-entity.auto-mapper.profile';
import { RetirementPlanningRgpsPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document-entity.auto-mapper.profile';
import { RetirementPlanningRgpsResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-result/retirement-planning-rgps-result-entity.auto-mapper.profile';
import { GetRetirementPlanningRgpsSpecialPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-special-period/get-retirement-planning-rgps-special-period-query-result.auto-mapper.profile';
import { RetirementPlanningRgpsSpecialPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period-entity.auto-mapper.profile';
import { GetRetirementPlanningRgpsTimeAcceleratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-time-accelerator/get-retirement-planning-rgps-time-accelerator-query-result.auto-mapper.profile';
import { RetirementPlanningRgpsTimeAcceleratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps/get-retirement-planning-rpps-query-result.auto-mapper.profile';
import { GetRetirementPlanningRppsWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps/get-retirement-planning-rpps-with-relations-query-result.auto-mapper.profile';
import { RetirementPlanningRppsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps/retirement-planning-rpps-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-inss-benefit/get-retirement-planning-rpps-inss-benefit-query-result.auto-mapper.profile';
import { RetirementPlanningRppsInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-legal-proceeding/get-retirement-planning-rpps-legal-proceeding-query-result.auto-mapper.profile';
import { RetirementPlanningRppsLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-period/get-retirement-planning-rpps-period-query-result.auto-mapper.profile';
import { RetirementPlanningRppsPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-period/retirement-planning-rpps-period-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsPeriodDisabilityQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-period-disability/get-retirement-planning-rpps-period-disability-query-result.auto-mapper.profile';
import { RetirementPlanningRppsPeriodDisabilityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsPeriodDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-period-document/get-retirement-planning-rpps-period-document-query-result.auto-mapper.profile';
import { RetirementPlanningRppsPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsPeriodSpecialTimeQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-period-special-time/get-retirement-planning-rpps-period-special-time-query-result.auto-mapper.profile';
import { RetirementPlanningRppsPeriodSpecialTimeEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsRemunerationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-remuneration/get-retirement-planning-rpps-remuneration-query-result.auto-mapper.profile';
import { RetirementPlanningRppsRemunerationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsRemunerationCalculationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-remuneration-calculation/get-retirement-planning-rpps-remuneration-calculation-query-result.auto-mapper.profile';
import { RetirementPlanningRppsRemunerationCalculationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation-entity.auto-mapper.profile';
import { GetRetirementPlanningRppsResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-result/get-retirement-planning-rpps-result-query-result.auto-mapper.profile';
import { RetirementPlanningRppsResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/retirement-planning-rpps-result/retirement-planning-rpps-result-entity.auto-mapper.profile';
import { RuralOrHybridRetirementAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis-entity.auto-mapper.profile';
import { RuralOrHybridRetirementRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis/get-rural-timeline-analysis-with-relations-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis/rural-timeline-analysis-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisCnisContributionPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-cnis-contribution-period/get-rural-timeline-analysis-cnis-contribution-period-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisCnisContributionPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period-entity.auto-mapper.profile';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-cnis-contribution-period-under-minimum/get-rural-timeline-analysis-cnis-contribution-period-under-minimum-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-document/get-rural-timeline-analysis-document-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-document/rural-timeline-analysis-document-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-inss-benefit/get-rural-timeline-analysis-inss-benefit-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-inss-benefit/rural-timeline-analysis-inss-benefit-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-legal-proceeding/get-rural-timeline-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-legal-proceeding/rural-timeline-analysis-legal-proceeding-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period/get-rural-timeline-analysis-period-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period/rural-timeline-analysis-period-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisPeriodDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-document/get-rural-timeline-analysis-period-document-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-economic-aspects/get-rural-timeline-analysis-period-economic-aspects-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisPeriodEconomicAspectsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-family-group-member/get-rural-timeline-analysis-period-family-group-member-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisPeriodPendingExitDateQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-pending-exit-date/get-rural-timeline-analysis-period-pending-exit-date-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisPeriodPendingExitDateEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisPeriodPropertyQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-property/get-rural-timeline-analysis-period-property-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisPeriodPropertyEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisPeriodResidenceQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-residence/get-rural-timeline-analysis-period-residence-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisPeriodResidenceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence-entity.auto-mapper.profile';
import { RuralTimelineCnisContributionPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document-entity.auto-mapper.profile';
import { GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-cnis-contribution-period-overdue-contribution/get-rural-timeline-cnis-contribution-period-overdue-contribution-query-result.auto-mapper.profile';
import { RuralTimelineCnisContributionPeriodOverdueContributionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution-entity.auto-mapper.profile';
import { GetSpecialActivityAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity/get-special-activity-analysis-with-relations-query-result.auto-mapper.profile';
import { SpecialActivityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity/special-activity-entity.auto-mapper.profile';
import { GetSpecialActivityAnalysisDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity-document/get-special-activity-analysis-document-query-result.auto-mapper.profile';
import { SpecialActivityDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity-document/special-activity-document-entity.auto-mapper.profile';
import { GetSpecialActivityAnalysisInssBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity-inss-benefit/get-special-activity-analysis-inss-benefit-query-result.auto-mapper.profile';
import { SpecialActivityInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity-inss-benefit/special-activity-inss-benefit-entity.auto-mapper.profile';
import { GetSpecialActivityAnalysisLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity-legal-proceeding/get-special-activity-analysis-legal-proceeding-query-result.auto-mapper.profile';
import { SpecialActivityLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity-legal-proceeding/special-activity-legal-proceeding-entity.auto-mapper.profile';
import { GetSpecialActivityAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity-result/get-special-activity-analysis-result-query-result.auto-mapper.profile';
import { SpecialActivityResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-activity-result/special-activity-result-entity.auto-mapper.profile';
import { SpecialCategoryRetirementAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-category-retirement-analysis/special-category-retirement-analysis-entity.auto-mapper.profile';
import { SpecialCategoryRetirementAnalysisPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-category-retirement-analysis-period-document/special-category-retirement-analysis-period-document-entity.auto-mapper.profile';
import { SpecialCategoryRetirementAnalysisRemunerationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration-entity.auto-mapper.profile';
import { SpecialCategoryRetirementAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-category-retirement-analysis-result/special-category-retirement-analysis-result-entity.auto-mapper.profile';
import { SpecialCategoryRetirementAnalysisResultConversionItemEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-category-retirement-analysis-result-conversion-item/special-category-retirement-analysis-result-conversion-item-entity.auto-mapper.profile';
import { SpecialCategoryRetirementAnalysisResultRuleItemEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-category-retirement-analysis-result-rule-item/special-category-retirement-analysis-result-rule-item-entity.auto-mapper.profile';
import { SpecialCategoryRetirementAnalysisWorkPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period-entity.auto-mapper.profile';
import { GetSpecialRetirementGrantQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant/get-special-retirement-grant-query-result.auto-mapper.profile';
import { GetSpecialRetirementGrantWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant/get-special-retirement-grant-with-relations-query-result.auto-mapper.profile';
import { SpecialRetirementGrantEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant/special-retirement-grant-entity.auto-mapper.profile';
import { GetSpecialRetirementGrantBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant-benefit/get-special-retirement-grant-benefit-query-result.auto-mapper.profile';
import { SpecialRetirementGrantBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant-benefit/special-retirement-grant-benefit-entity.auto-mapper.profile';
import { GetSpecialRetirementGrantDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant-document/get-special-retirement-grant-document-query-result.auto-mapper.profile';
import { SpecialRetirementGrantDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant-document/special-retirement-grant-document-entity.auto-mapper.profile';
import { GetSpecialRetirementGrantLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant-legal-proceeding/get-special-retirement-grant-legal-proceeding-query-result.auto-mapper.profile';
import { SpecialRetirementGrantLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding-entity.auto-mapper.profile';
import { SpecialRetirementGrantPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant-period-document/special-retirement-grant-period-document-entity.auto-mapper.profile';
import { GetSpecialRetirementGrantResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant-result/get-special-retirement-grant-result-query-result.auto-mapper.profile';
import { SpecialRetirementGrantResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-grant-result/special-retirement-grant-result-entity.auto-mapper.profile';
import { GetSpecialRetirementRejectionWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-rejection/get-special-retirement-rejection-with-relations-query-result.auto-mapper.profile';
import { SpecialRetirementRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/special-retirement-rejection/special-retirement-rejection-entity.auto-mapper.profile';
import { GetSpeechGeneratorQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator/get-speech-generator-query-result.auto-mapper.profile';
import { GetSpeechGeneratorWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator/get-speech-generator-with-relations-query-result.auto-mapper.profile';
import { SpeechGeneratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator/speech-generator-entity.auto-mapper.profile';
import { GetSpeechGeneratorBenefitQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator-benefit/get-speech-generator-benefit-query-result.auto-mapper.profile';
import { SpeechGeneratorBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator-benefit/speech-generator-benefit-entity.auto-mapper.profile';
import { GetSpeechGeneratorDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator-document/get-speech-generator-document-query-result.auto-mapper.profile';
import { SpeechGeneratorDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator-document/speech-generator-document-entity.auto-mapper.profile';
import { GetSpeechGeneratorLegalProceedingQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator-legal-proceeding/get-speech-generator-legal-proceeding-query-result.auto-mapper.profile';
import { SpeechGeneratorLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator-legal-proceeding/speech-generator-legal-proceeding-entity.auto-mapper.profile';
import { GetSpeechGeneratorResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator-result/get-speech-generator-result-query-result.auto-mapper.profile';
import { SpeechGeneratorResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/speech-generator-result/speech-generator-result-entity.auto-mapper.profile';
import { SupportAttendantEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/support-attendant/support-attendant-entity.auto-mapper.profile';
import { SupportTicketEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/support-ticket/support-ticket-entity.auto-mapper.profile';
import { SupportTicketAttachmentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/support-ticket-attachment/support-ticket-attachment-entity.auto-mapper.profile';
import { SupportTicketMessageEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/support-ticket-message/support-ticket-message-entity.auto-mapper.profile';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-benefit-originator-identification-document-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-benefit-originator-identification-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-customer-profile-identification-document-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-customer-profile-identification-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-deceased-benefit-dependents-document-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-deceased-benefit-dependents-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-deceased-work-history-period-document-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-deceased-work-history-period-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-deceased-work-history-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-result-dependent-pension-analysis-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisResultQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-result-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisResultRetirementRuleQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-result-retirement-rule-query-result.auto-mapper.profile';
import { GetSurvivorPensionAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/get-survivor-pension-analysis-with-relations-query-result.auto-mapper.profile';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-benefit-originator-identification-document-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-benefit-originator-identification-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-customer-profile-identification-document-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisCustomerProfileIdentificationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-customer-profile-identification-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-deceased-benefit-dependents-document-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-deceased-benefit-dependents-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisDeceasedWorkHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-deceased-work-history-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-deceased-work-history-period-document-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-deceased-work-history-period-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-result-dependent-pension-analysis-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-result-entity.auto-mapper.profile';
import { SurvivorPensionAnalysisResultRetirementRuleEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/survivor-pension-analysis/survivor-pension-analysis-result-retirement-rule-entity.auto-mapper.profile';
import { SystemActivityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/system-activity/system-activity-entity.auto-mapper.profile';
import { GetTeacherRetirementPlanningWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning/get-teacher-retirement-planning-with-relations-query-result.auto-mapper.profile';
import { GetTeacherRetirementPlanningRejectionWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection/get-teacher-retirement-planning-rejection-with-relations-query-result.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection-entity.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection-document/teacher-retirement-planning-rejection-document-entity.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection-inss-benefit/teacher-retirement-planning-rejection-inss-benefit-entity.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection-result/teacher-retirement-planning-rejection-result-entity.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionTeachingPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection-teaching-period/teacher-retirement-planning-rejection-teaching-period-entity.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection-teaching-period-document/teacher-retirement-planning-rejection-teaching-period-document-entity.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionTimeAcceleratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection-time-accelerator/teacher-retirement-planning-rejection-time-accelerator-entity.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionWorkPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection-work-period/teacher-retirement-planning-rejection-work-period-entity.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection-work-period-document/teacher-retirement-planning-rejection-work-period-document-entity.auto-mapper.profile';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/teacher-retirement-planning-rejection-work-period-earnings-history/teacher-retirement-planning-rejection-work-period-earnings-history-entity.auto-mapper.profile';
import { GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant/get-temporary-disability-benefits-grant-with-relations-query-result.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant/temporary-disability-benefits-grant-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-inss-benefit/temporary-disability-benefits-grant-inss-benefit-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantInsuredStatusEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantLegalProceedingEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-legal-proceeding/temporary-disability-benefits-grant-legal-proceeding-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history-entity.auto-mapper.profile';
import { GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated/get-temporary-disability-benefits-terminated-with-relations-query-result.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-disability-analysis/temporary-disability-benefits-terminated-disability-analysis-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-disability-analysis-cid/temporary-disability-benefits-terminated-disability-analysis-cid-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-disability-analysis-document/temporary-disability-benefits-terminated-disability-analysis-document-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-document/temporary-disability-benefits-terminated-document-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-inss-benefit/temporary-disability-benefits-terminated-inss-benefit-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-insured-status/temporary-disability-benefits-terminated-insured-status-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-insured-status-document/temporary-disability-benefits-terminated-insured-status-document-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-previous-benefit/temporary-disability-benefits-terminated-previous-benefit-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-previous-benefit-document/temporary-disability-benefits-terminated-previous-benefit-document-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-result/temporary-disability-benefits-terminated-result-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-work-period-document/temporary-disability-benefits-terminated-work-period-document-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-work-periods/temporary-disability-benefits-terminated-work-periods-entity.auto-mapper.profile';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-disability-benefits-terminated-work-periods-earnings-history/temporary-disability-benefits-terminated-work-periods-earnings-history-entity.auto-mapper.profile';
import { GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection/get-temporary-incapacity-benefit-rejection-with-relations-query-result.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-disability-analysis/temporary-incapacity-benefit-rejection-disability-analysis-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-disability-analysis-cid/temporary-incapacity-benefit-rejection-disability-analysis-cid-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-disability-analysis-document/temporary-incapacity-benefit-rejection-disability-analysis-document-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-document/temporary-incapacity-benefit-rejection-document-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-inss-benefit/temporary-incapacity-benefit-rejection-inss-benefit-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionInsuredStatusEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-insured-status/temporary-incapacity-benefit-rejection-insured-status-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-insured-status-document/temporary-incapacity-benefit-rejection-insured-status-document-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-result/temporary-incapacity-benefit-rejection-result-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-work-periods/temporary-incapacity-benefit-rejection-work-periods-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-rejection-work-periods-earnings-history/temporary-incapacity-benefit-rejection-work-periods-earnings-history-entity.auto-mapper.profile';
import { GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination/get-temporary-incapacity-benefit-termination-with-relations-query-result.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination/temporary-incapacity-benefit-termination-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-disability-analysis/temporary-incapacity-benefit-termination-disability-analysis-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-disability-analysis-cid/temporary-incapacity-benefit-termination-disability-analysis-cid-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-disability-analysis-document/temporary-incapacity-benefit-termination-disability-analysis-document-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-document/temporary-incapacity-benefit-termination-document-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationInssBenefitEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-inss-benefit/temporary-incapacity-benefit-termination-inss-benefit-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationInsuredStatusEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-insured-status/temporary-incapacity-benefit-termination-insured-status-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-insured-status-document/temporary-incapacity-benefit-termination-insured-status-document-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationResultEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-result/temporary-incapacity-benefit-termination-result-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-work-periods/temporary-incapacity-benefit-termination-work-periods-entity.auto-mapper.profile';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/temporary-incapacity-benefit-termination-work-periods-earnings-history/temporary-incapacity-benefit-termination-work-periods-earnings-history-entity.auto-mapper.profile';
import { GetTutorialQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/tutorial/get-tutorial-query-result.auto-mapper.profile';
import { TutorialEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/tutorial/tutorial-entity.auto-mapper.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: noopStrategy(),
    }),
  ],
  providers: [
    GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResultAutoMapperProfile,
    GetOrganizationMemberWithOrganizationRelationQueryResultAutoMapperProfile,
    AutoMapperService,
    GetAuthIdentityQueryResultAutoMapperProfile,
    GetCustomerQueryResultAutoMapperProfile,
    GetCustomerAddressQueryResultAutoMapperProfile,
    GetCnisFastAnalysisQueryResultAutoMapperProfile,
    GetOrganizationQueryResultAutoMapperProfile,
    GetOrganizationMemberQueryResultAutoMapperProfile,
    GetOrganizationMemberCollaboratorQueryResultAutoMapperProfile,
    GetCustomerWithCustomerAddressRelationQueryResultAutoMapperProfile,
    GetCustomerWithOrganizationForListQueryResultAutoMapperProfile,
    GetCustomerProfileQueryResultAutoMapperProfile,
    GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResultAutoMapperProfile,
    GetCustomerWithAuthIdentityRelationQueryResultAutoMapperProfile,
    CustomerEntityAutoMapperProfile,
    CustomerAddressEntityAutoMapperProfile,
    OrganizationEntityAutoMapperProfile,
    OrganizationMemberEntityAutoMapperProfile,
    AuthIdentityEntityAutoMapperProfile,
    AffiliateCustomerEntityAutoMapperProfile,
    GetAffiliateCustomerQueryResultAutoMapperProfile,
    AffiliateCustomerConfigAutoMapperProfile,
    AffiliateBankTransferEntityAutoMapperProfile,
    GetAffiliateBankTransferQueryResultAutoMapperProfile,
    AffiliateCustomerPaymentPlanEntityAutoMapperProfile,
    GetAffiliateCustomerPaymentPlanQueryResultAutoMapperProfile,
    CnisFastAnalysisEntityAutoMapperProfile,
    AnalysisToolClientEntityAutoMapperProfile,
    CnisFastAnalysisInssBenefitEntityAutoMapperProfile,
    CnisFastAnalysisLegalProceedingEntityAutoMapperProfile,
    CnisFastAnalysisResultEntityAutoMapperProfile,
    GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile,
    GetCnisFastAnalysisResultQueryResultAutoMapperProfile,
    InsuranceQualityAnalysisEntityAutoMapperProfile,
    InsuranceQualityAnalysisDocumentEntityAutoMapperProfile,
    InsuranceQualityAnalysisResultEntityAutoMapperProfile,
    GetInsuranceQualityAnalysisWithRelationsQueryResultAutoMapperProfile,
    GetInsuranceQualityAnalysisDocumentQueryResultAutoMapperProfile,
    GetInsuranceQualityAnalysisResultQueryResultAutoMapperProfile,
    InsuranceQualityAnalysisInssBenefitEntityAutoMapperProfile,
    GetInsuranceQualityAnalysisInssBenefitQueryResultAutoMapperProfile,
    InsuranceQualityAnalysisLegalProceedingEntityAutoMapperProfile,
    GetInsuranceQualityAnalysisLegalProceedingQueryResultAutoMapperProfile,
    GetSpeechGeneratorDocumentQueryResultAutoMapperProfile,
    SpeechGeneratorDocumentEntityAutoMapperProfile,
    GetSpeechGeneratorResultQueryResultAutoMapperProfile,
    SpeechGeneratorResultEntityAutoMapperProfile,
    GetSpeechGeneratorBenefitQueryResultAutoMapperProfile,
    SpeechGeneratorBenefitEntityAutoMapperProfile,
    GetSpeechGeneratorLegalProceedingQueryResultAutoMapperProfile,
    SpeechGeneratorLegalProceedingEntityAutoMapperProfile,
    SpeechGeneratorEntityAutoMapperProfile,
    GetSpeechGeneratorQueryResultAutoMapperProfile,
    GetSpeechGeneratorWithRelationsQueryResultAutoMapperProfile,
    GetTeacherRetirementPlanningWithRelationsQueryResultAutoMapperProfile,
    TeacherRetirementPlanningRejectionEntityAutoMapperProfile,
    TeacherRetirementPlanningRejectionDocumentEntityAutoMapperProfile,
    TeacherRetirementPlanningRejectionInssBenefitEntityAutoMapperProfile,
    TeacherRetirementPlanningRejectionResultEntityAutoMapperProfile,
    TeacherRetirementPlanningRejectionTeachingPeriodEntityAutoMapperProfile,
    TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntityAutoMapperProfile,
    TeacherRetirementPlanningRejectionTimeAcceleratorEntityAutoMapperProfile,
    TeacherRetirementPlanningRejectionWorkPeriodEntityAutoMapperProfile,
    TeacherRetirementPlanningRejectionWorkPeriodDocumentEntityAutoMapperProfile,
    TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile,
    GetTeacherRetirementPlanningRejectionWithRelationsQueryResultAutoMapperProfile,
    GetAnalysisToolClientWithRelationsQueryResultAutoMapperProfile,
    GetCnisFastAnalysisInssBenefitQueryResultAutoMapperProfile,
    GetCnisFastAnalysisLegalProceedingQueryResultAutoMapperProfile,
    GetOrganizationMemberWithCustomerRelationQueryResultAutoMapperProfile,
    LegalPleadingEntityAutoMapperProfile,
    LegalPleadingAddressEntityAutoMapperProfile,
    LegalPleadingDocumentEntityAutoMapperProfile,
    LegalPleadingHistoryEntityAutoMapperProfile,
    LegalPleadingHistoryQueryResultAutoMapperProfile,
    GetLegalPleadingWithFullRelationsQueryResultAutoMapperProfile,
    GetLegalPleadingWithRelationsQueryResultAutoMapperProfile,
    GetLegalPleadingAddressQueryResultAutoMapperProfile,
    GetLegalPleadingDocumentWithRelationsQueryResultAutoMapperProfile,
    GetLegalPleadingDocumentAnalysisQueryResultAutoMapperProfile,
    LegalPleadingDocumentAnalysisEntityAutoMapperProfile,
    LegalPleadingResultEntityAutoMapperProfile,
    GetLegalPleadingResultQueryResultAutoMapperProfile,
    GetLegalPleadingWithResponsibleAndClientRelationsQueryResultAutoMapperProfile,
    GetAnalysisToolClientQueryResultAutoMapperProfile,
    AnalysisToolRecordEntityAutoMapperProfile,
    GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile,
    GetAnalysisToolRecordWithFullRelationsQueryResultAutoMapperProfile,
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
    AudienceQuestionGeneratorEntityAutoMapperProfile,
    GetAudienceQuestionGeneratorQueryResultAutoMapperProfile,
    GetAudienceQuestionGeneratorWithRelationsQueryResultAutoMapperProfile,
    AudienceQuestionGeneratorResultEntityAutoMapperProfile,
    GetAudienceQuestionGeneratorResultQueryResultAutoMapperProfile,
    AudienceQuestionGeneratorDocumentEntityAutoMapperProfile,
    GetAudienceQuestionGeneratorDocumentQueryResultAutoMapperProfile,
    AudienceQuestionGeneratorBenefitEntityAutoMapperProfile,
    GetAudienceQuestionGeneratorBenefitQueryResultAutoMapperProfile,
    AudienceQuestionGeneratorLegalProceedingEntityAutoMapperProfile,
    GetAudienceQuestionGeneratorLegalProceedingQueryResultAutoMapperProfile,
    GetLegalProceedingDetailQueryResultAutoMapperProfile,
    LegalProceedingDetailEntityAutoMapperProfile,
    GetAnalysisToolClientLegalProceedingWithRelationsQueryResultAutoMapperProfile,
    GetLegalProceedingDetailWithRelationsQueryResultAutoMapperProfile,
    PaymentPlanPaidResourceEntityAutoMapperProfile,
    GetPaymentPlanPaidResourceQueryResultAutoMapperProfile,
    PaymentPlanEntityAutoMapperProfile,
    GetPaymentPlanQueryResultAutoMapperProfile,
    GetOrganizationCreditPurchaseQueryResultAutoMapperProfile,
    OrganizationCreditPurchaseEntityAutoMapperProfile,
    GetOrganizationCreditUsageQueryResultAutoMapperProfile,
    OrganizationCreditUsageEntityAutoMapperProfile,
    OrganizationPaymentPlanEntityAutoMapperProfile,
    OrganizationPaymentPlanQueryResultAutoMapperProfile,
    OrganizationPaymentPlanQueryResultWithRelationsAutoMapperProfile,
    PaymentPlanEnabledPaidResourceEntityAutoMapperProfile,
    PaymentPlanEnabledPaidResourceToEnabledQueryResultAutoMapperProfile,
    GetPaymentPlanEnabledPaidResourceQueryResultAutoMapperProfile,
    OrganizationPaymentPlanEnabledPaidResourceEntityAutoMapperProfile,
    GetOrganizationPaymentPlanEnabledPaidResourceQueryResultAutoMapperProfile,
    GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResultAutoMapperProfile,
    PaymentPlanPaidResourceIaConfigEntityAutoMapperProfile,
    BankPaymentEntityAutoMapperProfile,
    GetBankPaymentQueryResultAutoMapperProfile,
    BankTransferEntityAutoMapperProfile,
    GetBankTransferQueryResultAutoMapperProfile,
    OrganizationPaymentPlanBankPaymentEntityAutoMapperProfile,
    GetOrganizationPaymentPlanBankPaymentQueryResultAutoMapperProfile,
    OrganizationPaymentPlanAffiliateCommissionEntityAutoMapperProfile,
    GetOrganizationPaymentPlanAffiliateCommissionQueryResultAutoMapperProfile,
    RetirementPlanningRppsResultEntityAutoMapperProfile,
    GetRetirementPlanningRppsResultQueryResultAutoMapperProfile,
    RetirementPlanningRppsEntityAutoMapperProfile,
    GetRetirementPlanningRppsQueryResultAutoMapperProfile,
    GetRetirementPlanningRppsWithRelationsQueryResultAutoMapperProfile,
    RetirementPlanningRppsPeriodEntityAutoMapperProfile,
    GetRetirementPlanningRppsPeriodQueryResultAutoMapperProfile,
    RetirementPlanningRppsPeriodDocumentEntityAutoMapperProfile,
    GetRetirementPlanningRppsPeriodDocumentQueryResultAutoMapperProfile,
    RetirementPlanningRppsRemunerationEntityAutoMapperProfile,
    GetRetirementPlanningRppsRemunerationQueryResultAutoMapperProfile,
    RetirementPlanningRppsRemunerationCalculationEntityAutoMapperProfile,
    GetRetirementPlanningRppsRemunerationCalculationQueryResultAutoMapperProfile,
    RetirementPlanningRppsPeriodDisabilityEntityAutoMapperProfile,
    GetRetirementPlanningRppsPeriodDisabilityQueryResultAutoMapperProfile,
    RetirementPlanningRppsPeriodSpecialTimeEntityAutoMapperProfile,
    GetRetirementPlanningRppsPeriodSpecialTimeQueryResultAutoMapperProfile,
    CidTenEntityAutoMapperProfile,
    GetCidTenQueryResultAutoMapperProfile,
    RetirementPlanningRppsInssBenefitEntityAutoMapperProfile,
    GetRetirementPlanningRppsInssBenefitQueryResultAutoMapperProfile,
    RetirementPlanningRppsLegalProceedingEntityAutoMapperProfile,
    GetRetirementPlanningRppsLegalProceedingQueryResultAutoMapperProfile,
    RetirementPlanningRgpsPeriodEntityAutoMapperProfile,
    GetRetirementPlanningRgpsPeriodQueryResultAutoMapperProfile,
    GetRetirementPlanningRgpsPeriodQueryResultWithRelationsAutoMapperProfile,
    RetirementPlanningRgpsSpecialPeriodEntityAutoMapperProfile,
    RetirementPlanningRgpsPeriodDocumentEntityAutoMapperProfile,
    RetirementPlanningRgpsEntityAutoMapperProfile,
    RetirementPlanningRgpsInssBenefitEntityAutoMapperProfile,
    RetirementPlanningRgpsLegalProceedingEntityAutoMapperProfile,
    RetirementPlanningRgpsAnalysisResultEntityAutoMapperProfile,
    GetRetirementPlanningRgpsAnalysisResultQueryResultAutoMapperProfile,
    RetirementPlanningRgpsTimeAcceleratorEntityAutoMapperProfile,
    GetRetirementPlanningRgpsTimeAcceleratorQueryResultAutoMapperProfile,
    GetRetirementPlanningRgpsSpecialPeriodQueryResultAutoMapperProfile,
    RetirementPlanningRgpsResultEntityAutoMapperProfile,
    GetRetirementPlanningRgpsQueryResultAutoMapperProfile,
    GetRetirementPlanningRgpsWithRelationsQueryResultAutoMapperProfile,
    RetirementPlanningRgpsEarningsHistoryEntityAutoMapperProfile,
    SpecialActivityEntityAutoMapperProfile,
    GetSpecialActivityAnalysisWithRelationsQueryResultAutoMapperProfile,
    SpecialActivityResultEntityAutoMapperProfile,
    GetSpecialActivityAnalysisResultQueryResultAutoMapperProfile,
    SpecialActivityDocumentEntityAutoMapperProfile,
    GetSpecialActivityAnalysisDocumentQueryResultAutoMapperProfile,
    SpecialActivityInssBenefitEntityAutoMapperProfile,
    GetSpecialActivityAnalysisInssBenefitQueryResultAutoMapperProfile,
    SpecialActivityLegalProceedingEntityAutoMapperProfile,
    GetSpecialActivityAnalysisLegalProceedingQueryResultAutoMapperProfile,
    SpecialCategoryRetirementAnalysisEntityAutoMapperProfile,
    SpecialCategoryRetirementAnalysisPeriodDocumentEntityAutoMapperProfile,
    SpecialCategoryRetirementAnalysisRemunerationEntityAutoMapperProfile,
    SpecialCategoryRetirementAnalysisResultEntityAutoMapperProfile,
    SpecialCategoryRetirementAnalysisResultConversionItemEntityAutoMapperProfile,
    SpecialCategoryRetirementAnalysisResultRuleItemEntityAutoMapperProfile,
    SpecialCategoryRetirementAnalysisWorkPeriodEntityAutoMapperProfile,
    AdministrativeProcedureInssAnalysisEntityAutoMapperProfile,
    AdministrativeProcedureInssAnalysisDocumentEntityAutoMapperProfile,
    GetAdministrativeProcedureInssAnalysisDocumentQueryResultAutoMapperProfile,
    GetAdministrativeProcedureInssAnalysisQueryResultAutoMapperProfile,
    GetAdministrativeProcedureInssAnalysisWithRelationsQueryResultAutoMapperProfile,
    AdministrativeProcedureInssAnalysisBenefitEntityAutoMapperProfile,
    GetAdministrativeProcedureInssAnalysisBenefitQueryResultAutoMapperProfile,
    AdministrativeProcedureInssAnalysisLegalProceedingEntityAutoMapperProfile,
    GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResultAutoMapperProfile,
    AdministrativeProcedureInssAnalysisResultEntityAutoMapperProfile,
    GetAdministrativeProcedureInssAnalysisResultQueryResultAutoMapperProfile,
    SpecialRetirementGrantEntityAutoMapperProfile,
    GetSpecialRetirementGrantQueryResultAutoMapperProfile,
    GetSpecialRetirementGrantWithRelationsQueryResultAutoMapperProfile,
    SpecialRetirementGrantBenefitEntityAutoMapperProfile,
    GetSpecialRetirementGrantBenefitQueryResultAutoMapperProfile,
    SpecialRetirementGrantLegalProceedingEntityAutoMapperProfile,
    GetSpecialRetirementGrantLegalProceedingQueryResultAutoMapperProfile,
    SpecialRetirementGrantDocumentEntityAutoMapperProfile,
    GetSpecialRetirementGrantDocumentQueryResultAutoMapperProfile,
    SpecialRetirementGrantResultEntityAutoMapperProfile,
    GetSpecialRetirementGrantResultQueryResultAutoMapperProfile,
    SpecialRetirementGrantPeriodDocumentEntityAutoMapperProfile,
    SpecialRetirementRejectionEntityAutoMapperProfile,
    GetSpecialRetirementRejectionWithRelationsQueryResultAutoMapperProfile,
    DisabilityAssessmentForBpcAnalysisEntityAutoMapperProfile,
    GetDisabilityAssessmentForBpcAnalysisQueryResultAutoMapperProfile,
    DisabilityAssessmentForBpcAnalysisBenefitEntityAutoMapperProfile,
    GetDisabilityAssessmentForBpcAnalysisBenefitQueryResultAutoMapperProfile,
    DisabilityAssessmentForBpcAnalysisDocumentEntityAutoMapperProfile,
    GetDisabilityAssessmentForBpcAnalysisDocumentQueryResultAutoMapperProfile,
    DisabilityAssessmentForBpcAnalysisLegalProceedingEntityAutoMapperProfile,
    GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResultAutoMapperProfile,
    DisabilityAssessmentForBpcAnalysisResultEntityAutoMapperProfile,
    GetDisabilityAssessmentForBpcAnalysisResultQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRevisionEntityAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionQueryResultAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionWithRelationsQueryResultAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionInssBenefitQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRevisionInssBenefitEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionResultEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionWorkPeriodsEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntityAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionDocumentQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDocumentEntityAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRevisionLegalProceedingEntityAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionResultQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntityAutoMapperProfile,
    GeneralUrbanRetirementGrantAnalysisResultEntityAutoMapperProfile,
    GetGeneralUrbanRetirementGrantAnalysisResultQueryResultAutoMapperProfile,
    GetGeneralUrbanRetirementGrantResultQueryResultAutoMapperProfile,
    GeneralUrbanRetirementGrantResultEntityAutoMapperProfile,
    GetGeneralUrbanRetirementGrantQueryResultAutoMapperProfile,
    GeneralUrbanRetirementGrantPeriodEntityAutoMapperProfile,
    GetGeneralUrbanRetirementGrantPeriodQueryResultAutoMapperProfile,
    GetGeneralUrbanRetirementGrantPeriodQueryResultWithRelationsAutoMapperProfile,
    GeneralUrbanRetirementGrantEarningsHistoryEntityAutoMapperProfile,
    GeneralUrbanRetirementGrantInssBenefitEntityAutoMapperProfile,
    GeneralUrbanRetirementGrantLegalProceedingEntityAutoMapperProfile,
    GeneralUrbanRetirementGrantPeriodDocumentEntityAutoMapperProfile,
    GeneralUrbanRetirementGrantSpecialPeriodEntityAutoMapperProfile,
    GetGeneralUrbanRetirementGrantSpecialPeriodQueryResultAutoMapperProfile,
    GeneralUrbanRetirementGrantTimeAcceleratorEntityAutoMapperProfile,
    GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResultAutoMapperProfile,
    GetGeneralUrbanRetirementGrantWithRelationsQueryResultAutoMapperProfile,
    GeneralUrbanRetirementGrantEntityAutoMapperProfile,
    GeneralUrbanRetirementReviewAnalysisResultEntityAutoMapperProfile,
    GetGeneralUrbanRetirementReviewAnalysisResultQueryResultAutoMapperProfile,
    GetGeneralUrbanRetirementReviewResultQueryResultAutoMapperProfile,
    GeneralUrbanRetirementReviewResultEntityAutoMapperProfile,
    GetGeneralUrbanRetirementReviewQueryResultAutoMapperProfile,
    GeneralUrbanRetirementReviewPeriodEntityAutoMapperProfile,
    GetGeneralUrbanRetirementReviewPeriodQueryResultAutoMapperProfile,
    GetGeneralUrbanRetirementReviewPeriodQueryResultWithRelationsAutoMapperProfile,
    GeneralUrbanRetirementReviewEarningsHistoryEntityAutoMapperProfile,
    GeneralUrbanRetirementReviewInssBenefitEntityAutoMapperProfile,
    GeneralUrbanRetirementReviewLegalProceedingEntityAutoMapperProfile,
    GeneralUrbanRetirementReviewPeriodDocumentEntityAutoMapperProfile,
    GeneralUrbanRetirementReviewSpecialPeriodEntityAutoMapperProfile,
    GetGeneralUrbanRetirementReviewSpecialPeriodQueryResultAutoMapperProfile,
    GeneralUrbanRetirementReviewTimeAcceleratorEntityAutoMapperProfile,
    GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResultAutoMapperProfile,
    GetGeneralUrbanRetirementReviewWithRelationsQueryResultAutoMapperProfile,
    GeneralUrbanRetirementReviewEntityAutoMapperProfile,
    GeneralUrbanRetirementDenialDocumentEntityAutoMapperProfile,
    GeneralUrbanRetirementDenialEntityAutoMapperProfile,
    GeneralUrbanRetirementDenialInssBenefitEntityAutoMapperProfile,
    GeneralUrbanRetirementDenialResultEntityAutoMapperProfile,
    GeneralUrbanRetirementDenialPeriodEntityAutoMapperProfile,
    GetGeneralUrbanRetirementDenialWithRelationsQueryResultAutoMapperProfile,
    GeneralUrbanRetirementDenialTimeAcceleratorEntityAutoMapperProfile,
    GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResultAutoMapperProfile,
    AccidentBenefitRejectionEntityAutoMapperProfile,
    AccidentBenefitRejectionResultEntityAutoMapperProfile,
    AccidentBenefitRejectionDocumentEntityAutoMapperProfile,
    AccidentBenefitRejectionInssBenefitEntityAutoMapperProfile,
    AccidentBenefitRejectionEventEntityAutoMapperProfile,
    AccidentBenefitRejectionEventDocumentEntityAutoMapperProfile,
    AccidentBenefitRejectionWorkPeriodEntityAutoMapperProfile,
    AccidentBenefitRejectionWorkPeriodDocumentEntityAutoMapperProfile,
    AccidentBenefitRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile,
    GetAccidentBenefitRejectionWithRelationsQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningRejectionEntityAutoMapperProfile,
    DisabilityRetirementPlanningRejectionResultEntityAutoMapperProfile,
    DisabilityRetirementPlanningRejectionPeriodEntityAutoMapperProfile,
    DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntityAutoMapperProfile,
    DisabilityRetirementPlanningRejectionInssBenefitEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningRejectionWithRelationsQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningRejectionDocumentEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionResultEntityAutoMapperProfile,
    GetRetirementPermanentDisabilityRejectionWithRelationsQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRejectionDocumentEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionIncapacityEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionIncapacityCidEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionIncapacityDocumentEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionInsuredQualityEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionPeriodEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionPeriodDocumentEntityAutoMapperProfile,
    RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntityAutoMapperProfile,
    DisabilityRetirementPlanningRejectionTimeAcceleratorEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningGrantResultEntityAutoMapperProfile,
    DisabilityRetirementPlanningGrantInssBenefitEntityAutoMapperProfile,
    DisabilityRetirementPlanningGrantLegalProceedingEntityAutoMapperProfile,
    DisabilityRetirementPlanningGrantPeriodEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningGrantPeriodQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningGrantPeriodDocumentEntityAutoMapperProfile,
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntityAutoMapperProfile,
    DisabilityRetirementPlanningGrantDocumentEntityAutoMapperProfile,
    DisabilityRetirementPlanningGrantDisabilityPeriodEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntityAutoMapperProfile,
    DisabilityRetirementPlanningGrantTimeAcceleratorEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResultAutoMapperProfile,
    GetDisabilityRetirementPlanningGrantWithRelationsQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningGrantEntityAutoMapperProfile,
    DeathBenefitGrantEntityAutoMapperProfile,
    GetDeathBenefitGrantWithRelationsQueryResultAutoMapperProfile,
    DeathBenefitGrantResultEntityAutoMapperProfile,
    DeathBenefitGrantDocumentEntityAutoMapperProfile,
    DeathBenefitGrantInssBenefitEntityAutoMapperProfile,
    DeathBenefitGrantLegalProceedingEntityAutoMapperProfile,
    DeathBenefitGrantLegalRepresentativeEntityAutoMapperProfile,
    DeathBenefitGrantInstitorEntityAutoMapperProfile,
    DeathBenefitGrantDependentEntityAutoMapperProfile,
    DeathBenefitGrantDependentDocumentEntityAutoMapperProfile,
    DeathBenefitGrantPeriodEntityAutoMapperProfile,
    GetDeathBenefitGrantPeriodQueryResultAutoMapperProfile,
    DeathBenefitGrantPeriodEarningsHistoryEntityAutoMapperProfile,
    DeathBenefitGrantPeriodDocumentEntityAutoMapperProfile,
    DeathBenefitGrantTimeAcceleratorEntityAutoMapperProfile,
    GetDeathBenefitGrantTimeAcceleratorQueryResultAutoMapperProfile,
    DeathBenefitRejectionEntityAutoMapperProfile,
    GetDeathBenefitRejectionWithRelationsQueryResultAutoMapperProfile,
    DeathBenefitRejectionResultEntityAutoMapperProfile,
    DeathBenefitRejectionDocumentEntityAutoMapperProfile,
    DeathBenefitRejectionInssBenefitEntityAutoMapperProfile,
    DeathBenefitRejectionInstitorEntityAutoMapperProfile,
    DeathBenefitRejectionLegalProceedingEntityAutoMapperProfile,
    DeathBenefitRejectionLegalRepresentativeEntityAutoMapperProfile,
    DeathBenefitRejectionDependentEntityAutoMapperProfile,
    DeathBenefitRejectionDependentDocumentEntityAutoMapperProfile,
    DeathBenefitRejectionPeriodEntityAutoMapperProfile,
    GetDeathBenefitRejectionPeriodQueryResultAutoMapperProfile,
    DeathBenefitRejectionPeriodEarningsHistoryEntityAutoMapperProfile,
    DeathBenefitRejectionPeriodDocumentEntityAutoMapperProfile,
    DeathBenefitRejectionTimeAcceleratorEntityAutoMapperProfile,
    GetDeathBenefitRejectionTimeAcceleratorQueryResultAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantEntityAutoMapperProfile,
    GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResultAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantResultEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantDocumentEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantPeriodEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantPeriodDocumentEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantPreviousBenefitsEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantInsuredStatusEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantWorkPeriodsEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantInssBenefitEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsGrantLegalProceedingEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionResultEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionDocumentEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionInssBenefitEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionInsuredStatusEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionWorkPeriodsEntityAutoMapperProfile,
    TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntityAutoMapperProfile,
    GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResultAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedResultEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedDocumentEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedInssBenefitEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedInsuredStatusEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntityAutoMapperProfile,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntityAutoMapperProfile,
    GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResultAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationResultEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationDocumentEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationInssBenefitEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationInsuredStatusEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationWorkPeriodsEntityAutoMapperProfile,
    TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntityAutoMapperProfile,
    GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResultAutoMapperProfile,
    GeneralUrbanRetirementAnalysisEntityAutoMapperProfile,
    GetGeneralUrbanRetirementAnalysisDocumentQueryResultAutoMapperProfile,
    GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResultAutoMapperProfile,
    GeneralUrbanRetirementAnalysisRemunerationEntityAutoMapperProfile,
    GetGeneralUrbanRetirementAnalysisRemunerationQueryResultAutoMapperProfile,
    GetGeneralUrbanRetirementAnalysisQueryResultAutoMapperProfile,
    GetGeneralUrbanRetirementAnalysisWithRelationsQueryResultAutoMapperProfile,
    GeneralUrbanRetirementAnalysisPeriodEntityAutoMapperProfile,
    GeneralUrbanRetirementAnalysisResultEntityAutoMapperProfile,
    GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResultAutoMapperProfile,
    PerCapitaIncomeForBpcAnalysisEntityAutoMapperProfile,
    GetPerCapitaIncomeForBpcAnalysisQueryResultAutoMapperProfile,
    GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResultAutoMapperProfile,
    GetPerCapitaIncomeForBpcAnalysisBenefitQueryResultAutoMapperProfile,
    PerCapitaIncomeForBpcAnalysisBenefitEntityAutoMapperProfile,
    PerCapitaIncomeForBpcAnalysisDocumentEntityAutoMapperProfile,
    GetPerCapitaIncomeForBpcAnalysisDocumentQueryResultAutoMapperProfile,
    PerCapitaIncomeForBpcAnalysisFamilyMemberEntityAutoMapperProfile,
    GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResultAutoMapperProfile,
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntityAutoMapperProfile,
    GetPerCapitaIncomeForBpcAnalysisFamilyMemberDocumentQueryResultAutoMapperProfile,
    GetPerCapitaIncomeForBpcAnalysisLegalProceedingQueryResultAutoMapperProfile,
    PerCapitaIncomeForBpcAnalysisLegalProceedingEntityAutoMapperProfile,
    PerCapitaIncomeForBpcAnalysisResultEntityAutoMapperProfile,
    GetPerCapitaIncomeForBpcAnalysisResultQueryResultAutoMapperProfile,
    BpcDisabilityDenialEntityAutoMapperProfile,
    GetBpcDisabilityDenialQueryResultAutoMapperProfile,
    GetBpcDisabilityDenialWithRelationsQueryResultAutoMapperProfile,
    BpcDisabilityDenialDocumentEntityAutoMapperProfile,
    GetBpcDisabilityDenialDocumentQueryResultAutoMapperProfile,
    BpcDisabilityDenialResultEntityAutoMapperProfile,
    GetBpcDisabilityDenialResultQueryResultAutoMapperProfile,
    BpcDisabilityDenialInssBenefitEntityAutoMapperProfile,
    GetBpcDisabilityDenialInssBenefitQueryResultAutoMapperProfile,
    BpcDisabilityDenialLegalProceedingEntityAutoMapperProfile,
    GetBpcDisabilityDenialLegalProceedingQueryResultAutoMapperProfile,
    BpcDisabilityDenialFamilyMemberEntityAutoMapperProfile,
    GetBpcDisabilityDenialFamilyMemberQueryResultAutoMapperProfile,
    BpcDisabilityDenialFamilyMemberDocumentEntityAutoMapperProfile,
    GetBpcDisabilityDenialFamilyMemberDocumentQueryResultAutoMapperProfile,
    BpcDisabilityTerminationEntityAutoMapperProfile,
    GetBpcDisabilityTerminationQueryResultAutoMapperProfile,
    GetBpcDisabilityTerminationWithRelationsQueryResultAutoMapperProfile,
    BpcDisabilityTerminationDisabilityAssessmentEntityAutoMapperProfile,
    GetBpcDisabilityTerminationDisabilityAssessmentQueryResultAutoMapperProfile,
    BpcDisabilityTerminationDisabilityAssessmentDocumentEntityAutoMapperProfile,
    GetBpcDisabilityTerminationDisabilityAssessmentDocumentQueryResultAutoMapperProfile,
    BpcDisabilityTerminationDocumentEntityAutoMapperProfile,
    GetBpcDisabilityTerminationDocumentQueryResultAutoMapperProfile,
    BpcDisabilityTerminationResultEntityAutoMapperProfile,
    GetBpcDisabilityTerminationResultQueryResultAutoMapperProfile,
    BpcDisabilityTerminationInssBenefitEntityAutoMapperProfile,
    GetBpcDisabilityTerminationInssBenefitQueryResultAutoMapperProfile,
    BpcDisabilityTerminationLegalProceedingEntityAutoMapperProfile,
    GetBpcDisabilityTerminationLegalProceedingQueryResultAutoMapperProfile,
    BpcDisabilityTerminationFamilyMemberEntityAutoMapperProfile,
    GetBpcDisabilityTerminationFamilyMemberQueryResultAutoMapperProfile,
    BpcDisabilityTerminationFamilyMemberDocumentEntityAutoMapperProfile,
    GetBpcDisabilityTerminationFamilyMemberDocumentQueryResultAutoMapperProfile,
    BpcElderlyAnalysisEntityAutoMapperProfile,
    AccidentAssistanceTerminatedEntityAutoMapperProfile,
    AccidentAssistanceTerminatedBenefitEntityAutoMapperProfile,
    GetAccidentAssistanceTerminatedQueryResultAutoMapperProfile,
    GetAccidentAssistanceTerminatedBenefitQueryResultAutoMapperProfile,
    AccidentAssistanceTerminatedDocumentEntityAutoMapperProfile,
    GetAccidentAssistanceTerminatedDocumentQueryResultAutoMapperProfile,
    AccidentAssistanceTerminatedLegalProceedingEntityAutoMapperProfile,
    GetAccidentAssistanceTerminatedLegalProceedingQueryResultAutoMapperProfile,
    GetAccidentAssistanceTerminatedResultQueryResultAutoMapperProfile,
    GetAccidentAssistanceTerminatedWithRelationsQueryResultAutoMapperProfile,
    AccidentAssistanceTerminatedPeriodEntityAutoMapperProfile,
    GetAccidentAssistanceTerminatedPeriodQueryResultAutoMapperProfile,
    AccidentAssistanceTerminatedPeriodDocumentEntityAutoMapperProfile,
    GetBpcElderlyAnalysisQueryResultAutoMapperProfile,
    GetBpcElderlyAnalysisWithRelationsQueryResultAutoMapperProfile,
    BpcElderlyAnalysisDocumentEntityAutoMapperProfile,
    GetBpcElderlyAnalysisDocumentQueryResultAutoMapperProfile,
    BpcElderlyAnalysisResultEntityAutoMapperProfile,
    GetBpcElderlyAnalysisResultQueryResultAutoMapperProfile,
    BpcElderlyAnalysisInssBenefitEntityAutoMapperProfile,
    GetBpcElderlyAnalysisInssBenefitQueryResultAutoMapperProfile,
    BpcElderlyAnalysisLegalProceedingEntityAutoMapperProfile,
    GetBpcElderlyAnalysisLegalProceedingQueryResultAutoMapperProfile,
    BpcElderlyAnalysisFamilyMemberEntityAutoMapperProfile,
    GetBpcElderlyAnalysisFamilyMemberQueryResultAutoMapperProfile,
    BpcElderlyAnalysisFamilyMemberDocumentEntityAutoMapperProfile,
    GetBpcElderlyAnalysisFamilyMemberDocumentQueryResultAutoMapperProfile,
    BpcElderlyCessationEntityAutoMapperProfile,
    GetBpcElderlyCessationQueryResultAutoMapperProfile,
    GetBpcElderlyCessationWithRelationsQueryResultAutoMapperProfile,
    BpcElderlyCessationDocumentEntityAutoMapperProfile,
    GetBpcElderlyCessationDocumentQueryResultAutoMapperProfile,
    BpcElderlyCessationResultEntityAutoMapperProfile,
    GetBpcElderlyCessationResultQueryResultAutoMapperProfile,
    BpcDisabilityGrantEntityAutoMapperProfile,
    BpcDisabilityGrantDocumentEntityAutoMapperProfile,
    BpcDisabilityGrantFamilyMemberEntityAutoMapperProfile,
    BpcDisabilityGrantFamilyMemberDocumentEntityAutoMapperProfile,
    BpcDisabilityGrantInssBenefitEntityAutoMapperProfile,
    BpcDisabilityGrantLegalProceedingEntityAutoMapperProfile,
    BpcDisabilityGrantResultEntityAutoMapperProfile,
    GetBpcDisabilityGrantQueryResultAutoMapperProfile,
    GetBpcDisabilityGrantWithRelationsQueryResultAutoMapperProfile,
    GetBpcDisabilityGrantDocumentQueryResultAutoMapperProfile,
    GetBpcDisabilityGrantFamilyMemberQueryResultAutoMapperProfile,
    GetBpcDisabilityGrantFamilyMemberDocumentQueryResultAutoMapperProfile,
    GetBpcDisabilityGrantInssBenefitQueryResultAutoMapperProfile,
    GetBpcDisabilityGrantLegalProceedingQueryResultAutoMapperProfile,
    GetBpcDisabilityGrantResultQueryResultAutoMapperProfile,
    BpcElderlyCessationInssBenefitEntityAutoMapperProfile,
    GetBpcElderlyCessationInssBenefitQueryResultAutoMapperProfile,
    BpcElderlyCessationLegalProceedingEntityAutoMapperProfile,
    GetBpcElderlyCessationLegalProceedingQueryResultAutoMapperProfile,
    BpcElderlyCessationFamilyMemberEntityAutoMapperProfile,
    GetBpcElderlyCessationFamilyMemberQueryResultAutoMapperProfile,
    BpcElderlyCessationFamilyMemberDocumentEntityAutoMapperProfile,
    GetBpcElderlyCessationFamilyMemberDocumentQueryResultAutoMapperProfile,
    JudicialCaseAnalysisEntityAutoMapperProfile,
    GetJudicialCaseAnalysisQueryResultAutoMapperProfile,
    GetJudicialCaseAnalysisWithRelationsQueryResultAutoMapperProfile,
    JudicialCaseAnalysisResultEntityAutoMapperProfile,
    GetJudicialCaseAnalysisResultQueryResultAutoMapperProfile,
    JudicialCaseAnalysisBenefitEntityAutoMapperProfile,
    GetJudicialCaseAnalysisBenefitQueryResultAutoMapperProfile,
    JudicialCaseAnalysisLegalProceedingEntityAutoMapperProfile,
    GetJudicialCaseAnalysisLegalProceedingQueryResultAutoMapperProfile,
    JudicialCaseAnalysisDocumentEntityAutoMapperProfile,
    GetJudicialCaseAnalysisDocumentQueryResultAutoMapperProfile,
    MedicalQuestionGeneratorEntityAutoMapperProfile,
    GetMedicalQuestionGeneratorQueryResultAutoMapperProfile,
    GetMedicalQuestionGeneratorWithRelationsQueryResultAutoMapperProfile,
    MedicalQuestionGeneratorResultEntityAutoMapperProfile,
    GetMedicalQuestionGeneratorResultQueryResultAutoMapperProfile,
    MedicalQuestionGeneratorInssBenefitEntityAutoMapperProfile,
    GetMedicalQuestionGeneratorInssBenefitQueryResultAutoMapperProfile,
    MedicalQuestionGeneratorLegalProceedingEntityAutoMapperProfile,
    GetMedicalQuestionGeneratorLegalProceedingQueryResultAutoMapperProfile,
    MedicalQuestionGeneratorDocumentEntityAutoMapperProfile,
    GetMedicalQuestionGeneratorDocumentQueryResultAutoMapperProfile,
    MedicalAndSocialReportObjectionGeneratorAnalysisEntityAutoMapperProfile,
    MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntityAutoMapperProfile,
    GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResultAutoMapperProfile,
    GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResultAutoMapperProfile,
    GetMedicalAndSocialReportObjectionGeneratorAnalysisWithRelationsQueryResultAutoMapperProfile,
    MedicalAndSocialReportObjectionGeneratorAnalysisResultEntityAutoMapperProfile,
    InitialPetitionGeneratorEntityAutoMapperProfile,
    AdministrativeRequestGeneratorEntityAutoMapperProfile,
    FullOpinionGeneratorEntityAutoMapperProfile,
    GetMedicalAndSocialReportObjectionGeneratorAnalysisResultQueryResultAutoMapperProfile,
    MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntityAutoMapperProfile,
    GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResultAutoMapperProfile,
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntityAutoMapperProfile,
    GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResultAutoMapperProfile,
    RuralTimelineAnalysisEntityAutoMapperProfile,
    GetRuralTimelineAnalysisCnisContributionPeriodQueryResultAutoMapperProfile,
    RuralTimelineAnalysisCnisContributionPeriodEntityAutoMapperProfile,
    GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResultAutoMapperProfile,
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntityAutoMapperProfile,
    GetRuralTimelineAnalysisDocumentQueryResultAutoMapperProfile,
    RuralTimelineAnalysisDocumentEntityAutoMapperProfile,
    GetRuralTimelineAnalysisPeriodQueryResultAutoMapperProfile,
    RuralTimelineAnalysisPeriodPendingExitDateEntityAutoMapperProfile,
    GetRuralTimelineAnalysisPeriodPendingExitDateQueryResultAutoMapperProfile,
    RuralTimelineCnisContributionPeriodOverdueContributionEntityAutoMapperProfile,
    GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResultAutoMapperProfile,
    RuralTimelineCnisContributionPeriodDocumentEntityAutoMapperProfile,
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntityAutoMapperProfile,
    RuralTimelineAnalysisPeriodEntityAutoMapperProfile,
    GetRuralTimelineAnalysisPeriodDocumentQueryResultAutoMapperProfile,
    RuralTimelineAnalysisPeriodDocumentEntityAutoMapperProfile,
    GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResultAutoMapperProfile,
    RuralTimelineAnalysisPeriodEconomicAspectsEntityAutoMapperProfile,
    GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResultAutoMapperProfile,
    RuralTimelineAnalysisPeriodFamilyGroupMemberEntityAutoMapperProfile,
    GetRuralTimelineAnalysisPeriodPropertyQueryResultAutoMapperProfile,
    RuralTimelineAnalysisPeriodPropertyEntityAutoMapperProfile,
    GetRuralTimelineAnalysisPeriodResidenceQueryResultAutoMapperProfile,
    RuralTimelineAnalysisPeriodResidenceEntityAutoMapperProfile,
    GetRuralTimelineAnalysisInssBenefitQueryResultAutoMapperProfile,
    RuralTimelineAnalysisInssBenefitEntityAutoMapperProfile,
    GetRuralTimelineAnalysisLegalProceedingQueryResultAutoMapperProfile,
    RuralTimelineAnalysisLegalProceedingEntityAutoMapperProfile,
    GetRuralTimelineAnalysisWithRelationsQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningWithRelationsQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningRemunerationEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningRemunerationQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningResultEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningResultQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningDocumentEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningDocumentQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningLegalProceedingEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningLegalProceedingQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningInssBenefitEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningInssBenefitQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningPeriodEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningPeriodQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningPeriodDisabilityEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningPeriodDisabilityQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningPeriodDisabilityDocumentEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningPeriodSpecialTimeEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResultAutoMapperProfile,
    DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntityAutoMapperProfile,
    GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResultAutoMapperProfile,
    MiniAdvisorEntityAutoMapperProfile,
    GetMiniAdvisorWithRelationsQueryResultAutoMapperProfile,
    MiniAdvisorResultEntityAutoMapperProfile,
    GetMiniAdvisorResultQueryResultAutoMapperProfile,
    CustomerEmailSentEntityAutoMapperProfile,
    CustomerEmailSentAttachmentEntityAutoMapperProfile,
    SystemActivityEntityAutoMapperProfile,
    TutorialEntityAutoMapperProfile,
    GetTutorialQueryResultAutoMapperProfile,
    CreditPackEntityAutoMapperProfile,
    OrganizationCustomizationEntityAutoMapperProfile,
    GetOrganizationCustomizationQueryResultAutoMapperProfile,
    OrganizationCustomizationDocumentHeaderTemplateEntityAutoMapperProfile,
    GetOrganizationCustomizationDocumentHeaderTemplateQueryResultAutoMapperProfile,
    OrganizationCustomizationDocumentFooterTemplateEntityAutoMapperProfile,
    GetOrganizationCustomizationDocumentFooterTemplateQueryResultAutoMapperProfile,
    RegulatoryUpdateEntityAutoMapperProfile,
    RegulatoryUpdateEmailPreferenceEntityAutoMapperProfile,
    RegulatoryUpdateMonitoredSourceEntityAutoMapperProfile,
    SupportAttendantEntityAutoMapperProfile,
    SupportTicketEntityAutoMapperProfile,
    SupportTicketAttachmentEntityAutoMapperProfile,
    SupportTicketMessageEntityAutoMapperProfile,
    SurvivorPensionAnalysisEntityAutoMapperProfile,
    SurvivorPensionAnalysisCustomerProfileIdentificationEntityAutoMapperProfile,
    SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntityAutoMapperProfile,
    SurvivorPensionAnalysisBenefitOriginatorIdentificationEntityAutoMapperProfile,
    SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntityAutoMapperProfile,
    SurvivorPensionAnalysisDeceasedWorkHistoryEntityAutoMapperProfile,
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntityAutoMapperProfile,
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntityAutoMapperProfile,
    SurvivorPensionAnalysisDeceasedBenefitDependentsEntityAutoMapperProfile,
    SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntityAutoMapperProfile,
    SurvivorPensionAnalysisResultEntityAutoMapperProfile,
    SurvivorPensionAnalysisResultRetirementRuleEntityAutoMapperProfile,
    SurvivorPensionAnalysisResultDependentPensionAnalysisEntityAutoMapperProfile,
    GetSurvivorPensionAnalysisWithRelationsQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisResultQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisResultRetirementRuleQueryResultAutoMapperProfile,
    GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResultAutoMapperProfile,
    RuralOrHybridRetirementRejectionEntityAutoMapperProfile,
    MaternityPayRejectionEntityAutoMapperProfile,
    GetMaternityPayRejectionWithRelationsQueryResultAutoMapperProfile,
    MaternityPayRejectionResultEntityAutoMapperProfile,
    MaternityPayRejectionInssBenefitEntityAutoMapperProfile,
    MaternityPayRejectionLegalProceedingEntityAutoMapperProfile,
    MaternityPayRejectionDocumentEntityAutoMapperProfile,
    MaternityPayRejectionWorkPeriodEntityAutoMapperProfile,
    MaternityPayRejectionWorkPeriodDocumentEntityAutoMapperProfile,
    MaternityPayRejectionWorkPeriodEarningsHistoryEntityAutoMapperProfile,
    RuralOrHybridRetirementAnalysisEntityAutoMapperProfile,
    MaternityPayGrantEntityAutoMapperProfile,
    GetMaternityPayGrantWithRelationsQueryResultAutoMapperProfile,
    MaternityPayGrantDocumentEntityAutoMapperProfile,
    MaternityPayGrantEarningsHistoryEntityAutoMapperProfile,
    MaternityPayGrantInssBenefitEntityAutoMapperProfile,
    MaternityPayGrantLegalProceedingEntityAutoMapperProfile,
    MaternityPayGrantPeriodEntityAutoMapperProfile,
    GetMaternityPayGrantPeriodQueryResultAutoMapperProfile,
    MaternityPayGrantPeriodDocumentEntityAutoMapperProfile,
    MaternityPayGrantResultEntityAutoMapperProfile,
    AccidentAssistanceTerminatedResultEntityAutoMapperProfile,
    ElderlyBpcRejectionEntityAutoMapperProfile,
    ElderlyBpcRejectionResultEntityAutoMapperProfile,
    AccidentAssistanceGrantEntityAutoMapperProfile,
    GetAccidentAssistanceGrantWithRelationsQueryResultAutoMapperProfile,
    AccidentAssistanceGrantDocumentEntityAutoMapperProfile,
    AccidentAssistanceGrantResultEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionEntityAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionQueryResultAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionWithRelationsQueryResultAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionInssBenefitQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRevisionInssBenefitEntityAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionDocumentQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDocumentEntityAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRevisionLegalProceedingEntityAutoMapperProfile,
    GetRetirementPermanentDisabilityRevisionResultQueryResultAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntityAutoMapperProfile,
    RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntityAutoMapperProfile,
  ],
  exports: [AutoMapperService],
})
export class AutoMapperModule {
  protected readonly _type = AutoMapperModule.name;
}
