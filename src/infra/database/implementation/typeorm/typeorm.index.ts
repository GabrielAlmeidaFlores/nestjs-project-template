import { TypeOrmModule } from '@nestjs/typeorm';

import { AccidentAssistanceTerminatedTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated/accident-assistance-terminated.typeorm.command.repository';
import { AccidentAssistanceTerminatedTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated/accident-assistance-terminated.typeorm.query.repository';
import { AccidentAssistanceTerminatedBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit.typeorm.command.repository';
import { AccidentAssistanceTerminatedCidTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated-cid/accident-assistance-terminated-cid.typeorm.command.repository';
import { AccidentAssistanceTerminatedDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated-document/accident-assistance-terminated-document.typeorm.command.repository';
import { AccidentAssistanceTerminatedLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding.typeorm.command.repository';
import { AccidentAssistanceTerminatedPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated-period/accident-assistance-terminated-period.typeorm.command.repository';
import { AccidentAssistanceTerminatedPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated-period/accident-assistance-terminated-period.typeorm.query.repository';
import { AccidentAssistanceTerminatedPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated-period-document/accident-assistance-terminated-period-document.typeorm.command.repository';
import { AccidentAssistanceTerminatedResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-assistance-terminated-result/accident-assistance-terminated-result.typeorm.command.repository';
import { AccidentBenefitRejectionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection/accident-benefit-rejection.typeorm.command.repository';
import { AccidentBenefitRejectionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection/accident-benefit-rejection.typeorm.query.repository';
import { AccidentBenefitRejectionDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection-document/accident-benefit-rejection-document.typeorm.command.repository';
import { AccidentBenefitRejectionEventTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection-event/accident-benefit-rejection-event.typeorm.command.repository';
import { AccidentBenefitRejectionEventDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document.typeorm.command.repository';
import { AccidentBenefitRejectionInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit.typeorm.command.repository';
import { AccidentBenefitRejectionResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection-result/accident-benefit-rejection-result.typeorm.command.repository';
import { AccidentBenefitRejectionWorkPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period.typeorm.command.repository';
import { AccidentBenefitRejectionWorkPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document.typeorm.command.repository';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history.typeorm.command.repository';
import { AdminTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.command.repository';
import { AdminTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.query.repository';
import { AdministrativeProcedureInssAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.typeorm.query.repository';
import { AdministrativeProcedureInssAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.typeorm.command.repository';
import { AffiliateBankTransferTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/affiliate-bank-transfer/affiliate-bank-transfer.typeorm.command.repository';
import { AffiliateBankTransferTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/affiliate-bank-transfer/affiliate-bank-transfer.typeorm.query.repository';
import { AffiliateCustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer/affiliate-customer.typeorm.command.repository';
import { AffiliateCustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer/affiliate-customer.typeorm.query.repository';
import { AffiliateCustomerPaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer-payment-plan/affiliate-customer-payment-plan.typeorm.command.repository';
import { AffiliateCustomerPaymentPlanTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer-payment-plan/affiliate-customer-payment-plan.typeorm.query.repository';
import { AnalysisToolClientTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.command.repository';
import { AnalysisToolClientTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.query.repository';
import { AnalysisToolClientInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.typeorm.command.repository';
import { AnalysisToolClientLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.typeorm.command.repository';
import { AnalysisToolRecordTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.command.repository';
import { AnalysisToolRecordTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.query.repository';
import { AudienceQuestionGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/audience-question-generator/audience-question-generator.typeorm.command.repository';
import { AudienceQuestionGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/audience-question-generator/audience-question-generator.typeorm.query.repository';
import { AudienceQuestionGeneratorBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/audience-question-generator-benefit/audience-question-generator-benefit.typeorm.command.repository';
import { AudienceQuestionGeneratorDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/audience-question-generator-document/audience-question-generator-document.typeorm.command.repository';
import { AudienceQuestionGeneratorLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding.typeorm.command.repository';
import { AudienceQuestionGeneratorResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/audience-question-generator-result/audience-question-generator-result.typeorm.command.repository';
import { AuthIdentityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.command.repository';
import { AuthIdentityTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.query.repository';
import { BankPaymentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/bank-payment/bank-payment.typeorm.command.repository';
import { BankPaymentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/bank-payment/bank-payment.typeorm.query.repository';
import { BankTransferTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/bank-transfer/bank-transfer.typeorm.command.repository';
import { BankTransferTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/bank-transfer/bank-transfer.typeorm.query.repository';
import { BaseTypeormTransactionRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.transaction.repository';
import { CnisFastAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.command.repository';
import { CnisFastAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.query.repository';
import { CnisFastAnalysisInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.typeorm.command.repository';
import { CnisFastAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.typeorm.command.repository';
import { CnisFastAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-result/cnis-fast-analysis-result.typeorm.command.repository';
import { CreditPackTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/credit-pack/credit-pack.typeorm.command.repository';
import { CreditPackTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/credit-pack/credit-pack.typeorm.query.repository';
import { CustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.command.repository';
import { CustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.query.repository';
import { CustomerAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.command.repository';
import { CustomerAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.query.repository';
import { CustomerTermsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.command.repository';
import { CustomerTermsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.query.repository';
import { CustomerTermsAcceptanceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.query.repository';
import { DeathBenefitGrantTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant/death-benefit-grant.typeorm.command.repository';
import { DeathBenefitGrantTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant/death-benefit-grant.typeorm.query.repository';
import { DeathBenefitGrantDependentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-dependent/death-benefit-grant-dependent.typeorm.command.repository';
import { DeathBenefitGrantDependentDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-dependent-document/death-benefit-grant-dependent-document.typeorm.command.repository';
import { DeathBenefitGrantDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-document/death-benefit-grant-document.typeorm.command.repository';
import { DeathBenefitGrantInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.typeorm.command.repository';
import { DeathBenefitGrantInstitorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-institutor/death-benefit-grant-institutor.typeorm.command.repository';
import { DeathBenefitGrantLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.typeorm.command.repository';
import { DeathBenefitGrantLegalRepresentativeTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative.typeorm.command.repository';
import { DeathBenefitGrantPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-period/death-benefit-grant-period.typeorm.command.repository';
import { DeathBenefitGrantPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-period/death-benefit-grant-period.typeorm.query.repository';
import { DeathBenefitGrantPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-period-document/death-benefit-grant-period-document.typeorm.command.repository';
import { DeathBenefitGrantPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-period-earnings-history/death-benefit-grant-period-earnings-history.typeorm.command.repository';
import { DeathBenefitGrantResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-result/death-benefit-grant-result.typeorm.command.repository';
import { DeathBenefitGrantTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator.typeorm.command.repository';
import { DeathBenefitGrantTimeAcceleratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator.typeorm.query.repository';
import { DeathBenefitRejectionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection/death-benefit-rejection.typeorm.command.repository';
import { DeathBenefitRejectionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection/death-benefit-rejection.typeorm.query.repository';
import { DeathBenefitRejectionDependentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-dependent/death-benefit-rejection-dependent.typeorm.command.repository';
import { DeathBenefitRejectionDependentDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-dependent-document/death-benefit-rejection-dependent-document.typeorm.command.repository';
import { DeathBenefitRejectionDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-document/death-benefit-rejection-document.typeorm.command.repository';
import { DeathBenefitRejectionInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit.typeorm.command.repository';
import { DeathBenefitRejectionInstitorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-institutor/death-benefit-rejection-institutor.typeorm.command.repository';
import { DeathBenefitRejectionLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-legal-proceeding/death-benefit-rejection-legal-proceeding.typeorm.command.repository';
import { DeathBenefitRejectionLegalRepresentativeTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative.typeorm.command.repository';
import { DeathBenefitRejectionPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-period/death-benefit-rejection-period.typeorm.command.repository';
import { DeathBenefitRejectionPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-period/death-benefit-rejection-period.typeorm.query.repository';
import { DeathBenefitRejectionPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-period-document/death-benefit-rejection-period-document.typeorm.command.repository';
import { DeathBenefitRejectionPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-period-earnings-history/death-benefit-rejection-period-earnings-history.typeorm.command.repository';
import { DeathBenefitRejectionResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-result/death-benefit-rejection-result.typeorm.command.repository';
import { DeathBenefitRejectionTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator.typeorm.command.repository';
import { DeathBenefitRejectionTimeAcceleratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator.typeorm.query.repository';
import { DisabilityAssessmentForBpcAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.typeorm.query.repository';
import { DisabilityAssessmentForBpcAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.typeorm.command.repository';
import { DisabilityRetirementPlanningTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning/disability-retirement-planning.typeorm.command.repository';
import { DisabilityRetirementPlanningTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning/disability-retirement-planning.typeorm.query.repository';
import { DisabilityRetirementPlanningDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-document/disability-retirement-planning-document.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant/disability-retirement-planning-grant.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant/disability-retirement-planning-grant.typeorm.query.repository';
import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.typeorm.query.repository';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-disability-period-document/disability-retirement-planning-grant-disability-period-document.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-inss-benefit/disability-retirement-planning-grant-inss-benefit.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.typeorm.query.repository';
import { DisabilityRetirementPlanningGrantPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-period-document/disability-retirement-planning-grant-period-document.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history.typeorm.query.repository';
import { DisabilityRetirementPlanningGrantResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.typeorm.query.repository';
import { DisabilityRetirementPlanningInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-inss-benefit/disability-retirement-planning-inss-benefit.typeorm.command.repository';
import { DisabilityRetirementPlanningLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-legal-proceeding/disability-retirement-planning-legal-proceeding.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-period/disability-retirement-planning-period.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodDisabilityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-period-disability-document/disability-retirement-planning-period-disability-document.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-period-special-time-document/disability-retirement-planning-period-special-time-document.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection/disability-retirement-planning-rejection.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection/disability-retirement-planning-rejection.typeorm.query.repository';
import { DisabilityRetirementPlanningRejectionDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection-inss-benefit/disability-retirement-planning-rejection-inss-benefit.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection-period/disability-retirement-planning-rejection-period.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection-period-document/disability-retirement-planning-rejection-period-document.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection-period-earnings-history/disability-retirement-planning-rejection-period-earnings-history.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection-time-accelerator/disability-retirement-planning-rejection-time-accelerator.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-rejection-time-accelerator/disability-retirement-planning-rejection-time-accelerator.typeorm.query.repository';
import { DisabilityRetirementPlanningRemunerationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration.typeorm.command.repository';
import { DisabilityRetirementPlanningRemunerationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration.typeorm.query.repository';
import { DisabilityRetirementPlanningResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-result/disability-retirement-planning-result.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis/general-urban-retirement-analysis.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis/general-urban-retirement-analysis.typeorm.query.repository';
import { GeneralUrbanRetirementAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis-document/general-urban-retirement-analysis-document.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis-legal-proceeding/general-urban-retirement-analysis-legal-proceeding.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis-period-disability/general-urban-retirement-analysis-period-disability.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis-period-document/general-urban-retirement-analysis-period-document.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis-period-special-time/general-urban-retirement-analysis-period-special-time.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisRemunerationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis-remuneration/general-urban-retirement-analysis-remuneration.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisRemunerationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis-remuneration/general-urban-retirement-analysis-remuneration.typeorm.query.repository';
import { GeneralUrbanRetirementAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.typeorm.command.repository';
import { GeneralUrbanRetirementDenialTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial/general-urban-retirement-denial.typeorm.command.repository';
import { GeneralUrbanRetirementDenialTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial/general-urban-retirement-denial.typeorm.query.repository';
import { GeneralUrbanRetirementDenialDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial-document/general-urban-retirement-denial-document.typeorm.command.repository';
import { GeneralUrbanRetirementDenialInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial-inss-benefit/general-urban-retirement-denial-inss-benefit.typeorm.command.repository';
import { GeneralUrbanRetirementDenialPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial-period/general-urban-retirement-denial-period.typeorm.command.repository';
import { GeneralUrbanRetirementDenialPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.typeorm.command.repository';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.typeorm.command.repository';
import { GeneralUrbanRetirementDenialResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial-result/general-urban-retirement-denial-result.typeorm.command.repository';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial-time-accelerator/general-urban-retirement-denial-time-accelerator.typeorm.command.repository';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-denial-time-accelerator/general-urban-retirement-denial-time-accelerator.typeorm.query.repository';
import { GeneralUrbanRetirementGrantTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant/general-urban-retirement-grant.typeorm.command.repository';
import { GeneralUrbanRetirementGrantTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant/general-urban-retirement-grant.typeorm.query.repository';
import { GeneralUrbanRetirementGrantAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-analysis-result/general-urban-retirement-grant-analysis-result.typeorm.command.repository';
import { GeneralUrbanRetirementGrantAnalysisResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-analysis-result/general-urban-retirement-grant-analysis-result.typeorm.query.repository';
import { GeneralUrbanRetirementGrantEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-earnings-history/general-urban-retirement-grant-earnings-history.typeorm.command.repository';
import { GeneralUrbanRetirementGrantEarningsHistoryTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-earnings-history/general-urban-retirement-grant-earnings-history.typeorm.query.repository';
import { GeneralUrbanRetirementGrantInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit.typeorm.command.repository';
import { GeneralUrbanRetirementGrantLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding.typeorm.command.repository';
import { GeneralUrbanRetirementGrantPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-period/general-urban-retirement-grant-period.typeorm.command.repository';
import { GeneralUrbanRetirementGrantPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-period/general-urban-retirement-grant-period.typeorm.query.repository';
import { GeneralUrbanRetirementGrantPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-period-document/general-urban-retirement-grant-period-document.typeorm.command.repository';
import { GeneralUrbanRetirementGrantPeriodDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-period-document/general-urban-retirement-grant-period-document.typeorm.query.repository';
import { GeneralUrbanRetirementGrantResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-result/general-urban-retirement-grant-result.typeorm.command.repository';
import { GeneralUrbanRetirementGrantResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-result/general-urban-retirement-grant-result.typeorm.query.repository';
import { GeneralUrbanRetirementGrantSpecialPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-special-period/general-urban-retirement-grant-special-period.typeorm.command.repository';
import { GeneralUrbanRetirementGrantSpecialPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-special-period/general-urban-retirement-grant-special-period.typeorm.query.repository';
import { GeneralUrbanRetirementGrantTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-time-accelerator/general-urban-retirement-grant-time-accelerator.typeorm.command.repository';
import { GeneralUrbanRetirementGrantTimeAcceleratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-grant-time-accelerator/general-urban-retirement-grant-time-accelerator.typeorm.query.repository';
import { GeneralUrbanRetirementReviewTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review/general-urban-retirement-review.typeorm.command.repository';
import { GeneralUrbanRetirementReviewTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review/general-urban-retirement-review.typeorm.query.repository';
import { GeneralUrbanRetirementReviewAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-analysis-result/general-urban-retirement-review-analysis-result.typeorm.command.repository';
import { GeneralUrbanRetirementReviewAnalysisResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-analysis-result/general-urban-retirement-review-analysis-result.typeorm.query.repository';
import { GeneralUrbanRetirementReviewDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-document/general-urban-retirement-review-document.typeorm.command.repository';
import { GeneralUrbanRetirementReviewEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history.typeorm.command.repository';
import { GeneralUrbanRetirementReviewEarningsHistoryTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history.typeorm.query.repository';
import { GeneralUrbanRetirementReviewInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit.typeorm.command.repository';
import { GeneralUrbanRetirementReviewLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding.typeorm.command.repository';
import { GeneralUrbanRetirementReviewPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-period/general-urban-retirement-review-period.typeorm.command.repository';
import { GeneralUrbanRetirementReviewPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-period/general-urban-retirement-review-period.typeorm.query.repository';
import { GeneralUrbanRetirementReviewPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-period-document/general-urban-retirement-review-period-document.typeorm.command.repository';
import { GeneralUrbanRetirementReviewPeriodDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-period-document/general-urban-retirement-review-period-document.typeorm.query.repository';
import { GeneralUrbanRetirementReviewResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-result/general-urban-retirement-review-result.typeorm.command.repository';
import { GeneralUrbanRetirementReviewResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-result/general-urban-retirement-review-result.typeorm.query.repository';
import { GeneralUrbanRetirementReviewSpecialPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-special-period/general-urban-retirement-review-special-period.typeorm.command.repository';
import { GeneralUrbanRetirementReviewSpecialPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-special-period/general-urban-retirement-review-special-period.typeorm.query.repository';
import { GeneralUrbanRetirementReviewTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator.typeorm.command.repository';
import { GeneralUrbanRetirementReviewTimeAcceleratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator.typeorm.query.repository';
import { InsuranceQualityAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/insurance-quality-analysis/insurance-quality-analysis.typeorm.command.repository';
import { InsuranceQualityAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/insurance-quality-analysis/insurance-quality-analysis.typeorm.query.repository';
import { InsuranceQualityAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/insurance-quality-analysis-document/insurance-quality-analysis-document.typeorm.command.repository';
import { InsuranceQualityAnalysisInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/insurance-quality-analysis-inss-benefit/insurance-quality-analysis-inss-benefit.typeorm.command.repository';
import { InsuranceQualityAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/insurance-quality-analysis-legal-proceeding/insurance-quality-analysis-legal-proceeding.typeorm.command.repository';
import { InsuranceQualityAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/insurance-quality-analysis-result/insurance-quality-analysis-result.typeorm.command.repository';
import { JudicialCaseAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/judicial-case-analysis/judicial-case-analysis.typeorm.command.repository';
import { JudicialCaseAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/judicial-case-analysis/judicial-case-analysis.typeorm.query.repository';
import { JudicialCaseAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/judicial-case-analysis-benefit/judicial-case-analysis-benefit.typeorm.command.repository';
import { JudicialCaseAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/judicial-case-analysis-document/judicial-case-analysis-document.typeorm.command.repository';
import { JudicialCaseAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.typeorm.command.repository';
import { JudicialCaseAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/judicial-case-analysis-result/judicial-case-analysis-result.typeorm.command.repository';
import { LegalPleadingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading/legal-pleading.typeorm.command.repository';
import { LegalPleadingTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading/legal-pleading.typeorm.query.repository';
import { LegalPleadingAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address/legal-pleading-address.typeorm.command.repository';
import { LegalPleadingAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address/legal-pleading-address.typeorm.query.repository';
import { LegalPleadingDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.command.repository';
import { LegalPleadingDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.query.repository';
import { LegalPleadingDocumentAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.command.repository';
import { LegalPleadingDocumentAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.query.repository';
import { LegalPleadingHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-history/legal-pleading-history.typeorm.command.repository';
import { LegalPleadingHistoryTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-history/legal-pleading-history.typeorm.query.repository';
import { LegalProceedingDetailTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-proceeding-detail/legal-proceeding-detail.typeorm.command.repository';
import { LegalProceedingDetailTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-proceeding-detail/legal-proceeding-detail.typeorm.query.repository';
import { MaternityPayGrantTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant/maternity-pay-grant.typeorm.command.repository';
import { MaternityPayGrantTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant/maternity-pay-grant.typeorm.query.repository';
import { MaternityPayGrantDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant-document/maternity-pay-grant-document.typeorm.command.repository';
import { MaternityPayGrantEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history.typeorm.command.repository';
import { MaternityPayGrantInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit.typeorm.command.repository';
import { MaternityPayGrantLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding.typeorm.command.repository';
import { MaternityPayGrantPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant-period/maternity-pay-grant-period.typeorm.command.repository';
import { MaternityPayGrantPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant-period/maternity-pay-grant-period.typeorm.query.repository';
import { MaternityPayGrantPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant-period-document/maternity-pay-grant-period-document.typeorm.command.repository';
import { MaternityPayGrantResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-grant-result/maternity-pay-grant-result.typeorm.command.repository';
import { MaternityPayRejectionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-rejection/maternity-pay-rejection.typeorm.command.repository';
import { MaternityPayRejectionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-rejection/maternity-pay-rejection.typeorm.query.repository';
import { MaternityPayRejectionDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-rejection-document/maternity-pay-rejection-document.typeorm.command.repository';
import { MaternityPayRejectionInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-rejection-inss-benefit/maternity-pay-rejection-inss-benefit.typeorm.command.repository';
import { MaternityPayRejectionLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-rejection-legal-proceeding/maternity-pay-rejection-legal-proceeding.typeorm.command.repository';
import { MaternityPayRejectionResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-rejection-result/maternity-pay-rejection-result.typeorm.command.repository';
import { MaternityPayRejectionWorkPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period.typeorm.command.repository';
import { MaternityPayRejectionWorkPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document.typeorm.command.repository';
import { MaternityPayRejectionWorkPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.typeorm.query.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.typeorm.command.repository';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.typeorm.command.repository';
import { MedicalQuestionGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-question-generator/medical-question-generator.typeorm.command.repository';
import { MedicalQuestionGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/medical-question-generator/medical-question-generator.typeorm.query.repository';
import { MedicalQuestionGeneratorDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-question-generator-document/medical-question-generator-document.typeorm.command.repository';
import { MedicalQuestionGeneratorInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.typeorm.command.repository';
import { MedicalQuestionGeneratorLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.typeorm.command.repository';
import { MedicalQuestionGeneratorResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/medical-question-generator-result/medical-question-generator-result.typeorm.command.repository';
import { MiniAdvisorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/mini-advisor/mini-advisor.typeorm.command.repository';
import { MiniAdvisorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/mini-advisor/mini-advisor.typeorm.query.repository';
import { MiniAdvisorResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/mini-advisor-result/mini-advisor-result.typeorm.command.repository';
import { MiniAdvisorResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/mini-advisor-result/mini-advisor-result.typeorm.query.repository';
import { OrganizationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.command.repository';
import { OrganizationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.query.repository';
import { OrganizationCreditPurchaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-purchase.typeorm.command.repository';
import { OrganizationCreditPurchaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-purchase.typeorm.query.repository';
import { OrganizationCreditUsageTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-usage.typeorm.command.repository';
import { OrganizationCreditUsageTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-usage.typeorm.query.repository';
import { OrganizationCreditPackPurchaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-credit-pack-purchase/organization-credit-pack-purchase.typeorm.command.repository';
import { OrganizationCreditPackPurchaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-credit-pack-purchase/organization-credit-pack-purchase.typeorm.query.repository';
import { OrganizationCustomizationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-customization/organization-customization.typeorm.command.repository';
import { OrganizationCustomizationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-customization/organization-customization.typeorm.query.repository';
import { OrganizationCustomizationDocumentFooterTemplateTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-customization-document-footer-template/organization-customization-document-footer-template.typeorm.command.repository';
import { OrganizationCustomizationDocumentFooterTemplateTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-customization-document-footer-template/organization-customization-document-footer-template.typeorm.query.repository';
import { OrganizationCustomizationDocumentHeaderTemplateTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-customization-document-header-template/organization-customization-document-header-template.typeorm.command.repository';
import { OrganizationCustomizationDocumentHeaderTemplateTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-customization-document-header-template/organization-customization-document-header-template.typeorm.query.repository';
import { OrganizationMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.command.repository';
import { OrganizationMemberTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.query.repository';
import { OrganizationPaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan/organization-payment-plan.typeorm.command.repository';
import { OrganizationPaymentPlanAffiliateCommissionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.typeorm.command.repository';
import { OrganizationPaymentPlanAffiliateCommissionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.typeorm.query.repository';
import { OrganizationPaymentPlanBankPaymentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.typeorm.command.repository';
import { OrganizationPaymentPlanBankPaymentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.typeorm.query.repository';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.typeorm.command.repository';
import { PaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan/payment-plan.typeorm.command.repository';
import { PaymentPlanTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan/payment-plan.typeorm.query.repository';
import { PaymentPlanEnabledPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource.typeorm.command.repository';
import { PaymentPlanPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.command.repository';
import { PaymentPlanPaidResourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.query.repository';
import { PerCapitaIncomeForBpcAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.typeorm.query.repository';
import { PerCapitaIncomeForBpcAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-family-member-document/per-capita-income-for-bpc-analysis-family-member-document.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.typeorm.command.repository';
import { RegulatoryUpdateTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update/regulatory-update.typeorm.command.repository';
import { RegulatoryUpdateTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update/regulatory-update.typeorm.query.repository';
import { RegulatoryUpdateEmailPreferenceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update-email-preference/regulatory-update-email-preference.typeorm.command.repository';
import { RegulatoryUpdateEmailPreferenceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update-email-preference/regulatory-update-email-preference.typeorm.query.repository';
import { RegulatoryUpdateMonitoredSourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update-monitored-source/regulatory-update-monitored-source.typeorm.command.repository';
import { RegulatoryUpdateMonitoredSourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update-monitored-source/regulatory-update-monitored-source.typeorm.query.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.typeorm.command.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps.typeorm.query.repository';
import { RetirementPlanningRgpsEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.typeorm.command.repository';
import { RetirementPlanningRgpsEarningsHistoryTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.typeorm.query.repository';
import { RetirementPlanningRppsInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.typeorm.command.repository';
import { RetirementPlanningRppsLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.typeorm.query.repository';
import { RuralOrHybridRetirementAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-document/rural-or-hybrid-retirement-analysis-document.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-period/rural-or-hybrid-retirement-analysis-period.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-period-document/rural-or-hybrid-retirement-analysis-period-document.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisPeriodMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-period-member/rural-or-hybrid-retirement-analysis-period-member.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-period-member-document/rural-or-hybrid-retirement-analysis-period-member-document.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-testimonial-witness/rural-or-hybrid-retirement-analysis-testimonial-witness.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-testimonial-witness-document/rural-or-hybrid-retirement-analysis-testimonial-witness-document.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-time-accelerator/rural-or-hybrid-retirement-analysis-time-accelerator.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisWorkPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-work-period/rural-or-hybrid-retirement-analysis-work-period.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-work-period-document/rural-or-hybrid-retirement-analysis-work-period-document.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-work-period-document-analysis/rural-or-hybrid-retirement-analysis-work-period-document-analysis.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-analysis-work-period-earnings-history/rural-or-hybrid-retirement-analysis-work-period-earnings-history.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.typeorm.query.repository';
import { RuralOrHybridRetirementRejectionDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-document/rural-or-hybrid-retirement-rejection-document.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-inss-benefit/rural-or-hybrid-retirement-rejection-inss-benefit.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-legal-proceeding/rural-or-hybrid-retirement-rejection-legal-proceeding.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-period/rural-or-hybrid-retirement-rejection-period.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-period-document/rural-or-hybrid-retirement-rejection-period-document.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionPeriodMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-period-member/rural-or-hybrid-retirement-rejection-period-member.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-period-member-document/rural-or-hybrid-retirement-rejection-period-member-document.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionTestimonialWitnessTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-testimonial-witness/rural-or-hybrid-retirement-rejection-testimonial-witness.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-testimonial-witness-document/rural-or-hybrid-retirement-rejection-testimonial-witness-document.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-time-accelerator/rural-or-hybrid-retirement-rejection-time-accelerator.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionWorkPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-work-period/rural-or-hybrid-retirement-rejection-work-period.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-work-period-document/rural-or-hybrid-retirement-rejection-work-period-document.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-work-period-document-analysis/rural-or-hybrid-retirement-rejection-work-period-document-analysis.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-or-hybrid-retirement-rejection-work-period-earnings-history/rural-or-hybrid-retirement-rejection-work-period-earnings-history.typeorm.command.repository';
import { RuralTimelineAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis/rural-timeline-analysis.typeorm.command.repository';
import { RuralTimelineAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis/rural-timeline-analysis.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.command.repository';
import { RuralTimelineAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-document/rural-timeline-analysis-document.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period/rural-timeline-analysis-period.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodEconomicAspectsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodPropertyTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodResidenceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.typeorm.command.repository';
import { RuralTimelineCnisContributionPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.typeorm.command.repository';
import { RuralTimelineCnisContributionPeriodDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.typeorm.query.repository';
import { SpecialActivityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity/special-activity.typeorm.command.repository';
import { SpecialActivityTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-activity/special-activity.typeorm.query.repository';
import { SpecialActivityDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity-document/special-activity-document.typeorm.command.repository';
import { SpecialActivityInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity-inss-benefit/special-activity-inss-benefit.typeorm.command.repository';
import { SpecialActivityLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity-legal-proceeding/special-activity-legal-proceeding.typeorm.command.repository';
import { SpecialActivityResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity-result/special-activity-result.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis/special-category-retirement-analysis.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis/special-category-retirement-analysis.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-period-document/special-category-retirement-analysis-period-document.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisPeriodDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-period-document/special-category-retirement-analysis-period-document.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisRemunerationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisRemunerationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-result/special-category-retirement-analysis-result.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-result/special-category-retirement-analysis-result.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisResultConversionItemTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-result-conversion-item/special-category-retirement-analysis-result-conversion-item.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisResultConversionItemTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-result-conversion-item/special-category-retirement-analysis-result-conversion-item.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisResultRuleItemTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-result-rule-item/special-category-retirement-analysis-result-rule-item.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisResultRuleItemTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-result-rule-item/special-category-retirement-analysis-result-rule-item.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisWorkPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisWorkPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period.typeorm.query.repository';
import { SpecialRetirementGrantTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant/special-retirement-grant.typeorm.command.repository';
import { SpecialRetirementGrantTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant/special-retirement-grant.typeorm.query.repository';
import { SpecialRetirementGrantBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-benefit/special-retirement-grant-benefit.typeorm.command.repository';
import { SpecialRetirementGrantDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-document/special-retirement-grant-document.typeorm.command.repository';
import { SpecialRetirementGrantEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-earnings-history/special-retirement-grant-earnings-history.typeorm.command.repository';
import { SpecialRetirementGrantLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding.typeorm.command.repository';
import { SpecialRetirementGrantPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-period/special-retirement-grant-period.typeorm.command.repository';
import { SpecialRetirementGrantPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-period/special-retirement-grant-period.typeorm.query.repository';
import { SpecialRetirementGrantPeriodOverdueContributionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-period-overdue-contribution/special-retirement-grant-period-overdue-contribution.typeorm.command.repository';
import { SpecialRetirementGrantPeriodPendingExitDateTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-period-pending-exit-date/special-retirement-grant-period-pending-exit-date.typeorm.command.repository';
import { SpecialRetirementGrantPeriodUnderMinimumTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-period-under-minimum/special-retirement-grant-period-under-minimum.typeorm.command.repository';
import { SpecialRetirementGrantResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-grant-result/special-retirement-grant-result.typeorm.command.repository';
import { SpecialRetirementRejectionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection/special-retirement-rejection.typeorm.command.repository';
import { SpecialRetirementRejectionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection/special-retirement-rejection.typeorm.query.repository';
import { SpecialRetirementRejectionDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection-document/special-retirement-rejection-document.typeorm.command.repository';
import { SpecialRetirementRejectionInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection-inss-benefit/special-retirement-rejection-inss-benefit.typeorm.command.repository';
import { SpecialRetirementRejectionLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection-legal-proceeding/special-retirement-rejection-legal-proceeding.typeorm.command.repository';
import { SpecialRetirementRejectionResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection-result/special-retirement-rejection-result.typeorm.command.repository';
import { SpecialRetirementRejectionWorkPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection-work-period/special-retirement-rejection-work-period.typeorm.command.repository';
import { SpecialRetirementRejectionWorkPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection-work-period-document/special-retirement-rejection-work-period-document.typeorm.command.repository';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection-work-period-earnings-history/special-retirement-rejection-work-period-earnings-history.typeorm.command.repository';
import { SpecialRetirementRejectionWorkSpecialPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection-work-special-period/special-retirement-rejection-work-special-period.typeorm.command.repository';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-retirement-rejection-work-special-period-legal-framework/special-retirement-rejection-work-special-period-legal-framework.typeorm.command.repository';
import { SpeechGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator/speech-generator.typeorm.command.repository';
import { SpeechGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/speech-generator/speech-generator.typeorm.query.repository';
import { SpeechGeneratorBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-benefit/speech-generator-benefit.typeorm.command.repository';
import { SpeechGeneratorDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-document/speech-generator-document.typeorm.command.repository';
import { SpeechGeneratorLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-legal-proceeding/speech-generator-legal-proceeding.typeorm.command.repository';
import { SpeechGeneratorResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-result/speech-generator-result.typeorm.command.repository';
import { SurvivorPensionAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis/survivor-pension-analysis.typeorm.command.repository';
import { SurvivorPensionAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis/survivor-pension-analysis.typeorm.query.repository';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-benefit-originator-identification/survivor-pension-analysis-benefit-originator-identification.typeorm.command.repository';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-benefit-originator-identification/survivor-pension-analysis-benefit-originator-identification.typeorm.query.repository';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-benefit-originator-identification-document/survivor-pension-analysis-benefit-originator-identification-document.typeorm.command.repository';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-customer-profile-identification/survivor-pension-analysis-customer-profile-identification.typeorm.command.repository';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-customer-profile-identification/survivor-pension-analysis-customer-profile-identification.typeorm.query.repository';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-customer-profile-identification-document/survivor-pension-analysis-customer-profile-identification-document.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-deceased-benefit-dependents/survivor-pension-analysis-deceased-benefit-dependents.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-deceased-benefit-dependents/survivor-pension-analysis-deceased-benefit-dependents.typeorm.query.repository';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-deceased-benefit-dependents-document/survivor-pension-analysis-deceased-benefit-dependents-document.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-deceased-work-history/survivor-pension-analysis-deceased-work-history.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-deceased-work-history/survivor-pension-analysis-deceased-work-history.typeorm.query.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-deceased-work-history-period/survivor-pension-analysis-deceased-work-history-period.typeorm.command.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-deceased-work-history-period/survivor-pension-analysis-deceased-work-history-period.typeorm.query.repository';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-deceased-work-history-period-document/survivor-pension-analysis-deceased-work-history-period-document.typeorm.command.repository';
import { SurvivorPensionAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-result/survivor-pension-analysis-result.typeorm.command.repository';
import { SurvivorPensionAnalysisResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-result/survivor-pension-analysis-result.typeorm.query.repository';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-result-dependent-pension-analysis/survivor-pension-analysis-result-dependent-pension-analysis.typeorm.command.repository';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-result-dependent-pension-analysis/survivor-pension-analysis-result-dependent-pension-analysis.typeorm.query.repository';
import { SurvivorPensionAnalysisResultRetirementRuleTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-result-retirement-rule/survivor-pension-analysis-result-retirement-rule.typeorm.command.repository';
import { SurvivorPensionAnalysisResultRetirementRuleTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/survivor-pension-analysis-result-retirement-rule/survivor-pension-analysis-result-retirement-rule.typeorm.query.repository';
import { SystemActivitiesTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/system-activities/system-activities.typeorm.command.repository';
import { SystemActivitiesTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/system-activities/system-activities.typeorm.query.repository';
import { SystemLogTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/system-log/system-log.typeorm.command.repository';
import { TeacherRetirementPlanningTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning/teacher-retirement-planning.typeorm.command.repository';
import { TeacherRetirementPlanningTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning/teacher-retirement-planning.typeorm.query.repository';
import { TeacherRetirementPlanningDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-document/teacher-retirement-planning-document.typeorm.command.repository';
import { TeacherRetirementPlanningInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-inss-benefit/teacher-retirement-planning-inss-benefit.typeorm.command.repository';
import { TeacherRetirementPlanningLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-legal-proceeding/teacher-retirement-planning-legal-proceeding.typeorm.command.repository';
import { TeacherRetirementPlanningPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-period/teacher-retirement-planning-period.typeorm.command.repository';
import { TeacherRetirementPlanningPeriodItemTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.typeorm.command.repository';
import { TeacherRetirementPlanningPeriodItemDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.typeorm.command.repository';
import { TeacherRetirementPlanningRemunerationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-remuneration/teacher-retirement-planning-remuneration.typeorm.command.repository';
import { TeacherRetirementPlanningRemunerationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-remuneration/teacher-retirement-planning-remuneration.typeorm.query.repository';
import { TeacherRetirementPlanningResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/teacher-retirement-planning-result/teacher-retirement-planning-result.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant/temporary-disability-benefits-grant.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant/temporary-disability-benefits-grant.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-inss-benefit/temporary-disability-benefits-grant-inss-benefit.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-legal-proceeding/temporary-disability-benefits-grant-legal-proceeding.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.typeorm.query.repository';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-disability-analysis/temporary-disability-benefits-terminated-disability-analysis.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-document/temporary-disability-benefits-terminated-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-inss-benefit/temporary-disability-benefits-terminated-inss-benefit.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-insured-status/temporary-disability-benefits-terminated-insured-status.typeorm.query.repository';
import { TemporaryDisabilityBenefitsTerminatedResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-result/temporary-disability-benefits-terminated-result.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-work-periods/temporary-disability-benefits-terminated-work-periods.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-work-periods/temporary-disability-benefits-terminated-work-periods.typeorm.query.repository';
import { TemporaryIncapacityBenefitRejectionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.typeorm.query.repository';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-disability-analysis/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-disability-analysis/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.query.repository';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-disability-analysis-cid/temporary-incapacity-benefit-rejection-disability-analysis-cid.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-disability-analysis-document/temporary-incapacity-benefit-rejection-disability-analysis-document.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-document/temporary-incapacity-benefit-rejection-document.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-inss-benefit/temporary-incapacity-benefit-rejection-inss-benefit.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-insured-status/temporary-incapacity-benefit-rejection-insured-status.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-insured-status/temporary-incapacity-benefit-rejection-insured-status.typeorm.query.repository';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-insured-status-document/temporary-incapacity-benefit-rejection-insured-status-document.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-result/temporary-incapacity-benefit-rejection-result.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-work-periods/temporary-incapacity-benefit-rejection-work-periods.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-work-periods/temporary-incapacity-benefit-rejection-work-periods.typeorm.query.repository';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-incapacity-benefit-rejection-work-periods-earnings-history/temporary-incapacity-benefit-rejection-work-periods-earnings-history.typeorm.command.repository';
import { TutorialTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/tutorial/tutorial.typeorm.command.repository';
import { TutorialTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/tutorial/tutorial.typeorm.query.repository';
import { AccidentAssistanceTerminatedBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-benefit.entity';
import { AccidentAssistanceTerminatedCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-cid.entity';
import { AccidentAssistanceTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-document.entity';
import { AccidentAssistanceTerminatedLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-legal-proceeding.entity';
import { AccidentAssistanceTerminatedPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period-document.typeorm.entity';
import { AccidentAssistanceTerminatedPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period.typeorm.entity';
import { AccidentAssistanceTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-result.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { AccidentBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-document.typeorm.entity';
import { AccidentBenefitRejectionEventDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event-document.typeorm.entity';
import { AccidentBenefitRejectionEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event.typeorm.entity';
import { AccidentBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-inss-benefit.typeorm.entity';
import { AccidentBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-result.typeorm.entity';
import { AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-document.typeorm.entity';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-earnings-history.typeorm.entity';
import { AccidentBenefitRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { AdministrativeProcedureInssAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-benefit.entity';
import { AdministrativeProcedureInssAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-document.entity';
import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { AdministrativeProcedureInssAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-result.entity';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AdministrativeRequestGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-request-generator.typeorm.entity';
import { AffiliateBankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-bank-transfer.typeorm.entity';
import { AffiliateCustomerConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-config.typeorm.entity';
import { AffiliateCustomerPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-payment-plan.typeorm.entity';
import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { AnalysisToolClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-inss-benefit.typeorm.entity';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { AudienceQuestionGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-benefit.typeorm.entity';
import { AudienceQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-document.typeorm.entity';
import { AudienceQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-legal-proceeding.typeorm.entity';
import { AudienceQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-result.typeorm.entity';
import { AudienceQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator.typeorm.entity';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { BpcDisabilityDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-document.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member-document.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member.typeorm.entity';
import { BpcDisabilityDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-inss-benefit.typeorm.entity';
import { BpcDisabilityDenialLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-legal-proceeding.typeorm.entity';
import { BpcDisabilityDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-result.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { BpcElderlyAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { BpcElderlyAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-inss-benefit.typeorm.entity';
import { BpcElderlyAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-legal-proceeding.typeorm.entity';
import { BpcElderlyAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-result.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { BpcElderlyCessationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-document.typeorm.entity';
import { BpcElderlyCessationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member-document.typeorm.entity';
import { BpcElderlyCessationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member.typeorm.entity';
import { BpcElderlyCessationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-inss-benefit.typeorm.entity';
import { BpcElderlyCessationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-legal-proceeding.typeorm.entity';
import { BpcElderlyCessationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-result.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { CnisFastAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { CreditPackTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-pack.typeorm.entity';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerEmailSentAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent-attachment.typeorm.entity';
import { CustomerEmailSentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent.typeorm.entity';
import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';
import { CustomerTermsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { DeathBenefitGrantDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent-document.typeorm.entity';
import { DeathBenefitGrantDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent.typeorm.entity';
import { DeathBenefitGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-document.typeorm.entity';
import { DeathBenefitGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-inss-benefit.typeorm.entity';
import { DeathBenefitGrantInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-institutor.typeorm.entity';
import { DeathBenefitGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-legal-proceeding.typeorm.entity';
import { DeathBenefitGrantLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-legal-representative.typeorm.entity';
import { DeathBenefitGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-document.typeorm.entity';
import { DeathBenefitGrantPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-earnings-history.typeorm.entity';
import { DeathBenefitGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period.typeorm.entity';
import { DeathBenefitGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-result.typeorm.entity';
import { DeathBenefitGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-time-accelerator.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { DeathBenefitRejectionDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent-document.typeorm.entity';
import { DeathBenefitRejectionDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent.typeorm.entity';
import { DeathBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-document.typeorm.entity';
import { DeathBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-inss-benefit.typeorm.entity';
import { DeathBenefitRejectionInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-institutor.typeorm.entity';
import { DeathBenefitRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-legal-proceeding.typeorm.entity';
import { DeathBenefitRejectionLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-legal-representative.typeorm.entity';
import { DeathBenefitRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-document.typeorm.entity';
import { DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-earnings-history.typeorm.entity';
import { DeathBenefitRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period.typeorm.entity';
import { DeathBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-result.typeorm.entity';
import { DeathBenefitRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-time-accelerator.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { DisabilityAssessmentForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-result.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { DisabilityRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period.typeorm.entity';
import { DisabilityRetirementPlanningGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-legal-proceeding.typeorm.entity';
import { DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period-earnings-history.typeorm.entity';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';
import { DisabilityRetirementPlanningGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-result.typeorm.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-time-accelerator.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { DisabilityRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-legal-proceeding.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time.typeorm.entity';
import { DisabilityRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period.typeorm.entity';
import { DisabilityRetirementPlanningRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-document.typeorm.entity';
import { DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period-document.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period-earnings-history.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';
import { DisabilityRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-result.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { DisabilityRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-remuneration.typeorm.entity';
import { DisabilityRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-result.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { EmailTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/email-template.typeorm.entity';
import { FullOpinionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/full-opinion-generator.typeorm.entity';
import { GeneralUrbanRetirementAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-document.typeorm.entity';
import { GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-disability.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-document.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-special-time.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period.typeorm.entity';
import { GeneralUrbanRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-remuneration.typeorm.entity';
import { GeneralUrbanRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { GeneralUrbanRetirementDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-document.typeorm.entity';
import { GeneralUrbanRetirementDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-document.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-earnings-history.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period.typeorm.entity';
import { GeneralUrbanRetirementDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-result.typeorm.entity';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-time-accelerator.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { GeneralUrbanRetirementGrantAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-earnings-history.typeorm.entity';
import { GeneralUrbanRetirementGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period-document.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { GeneralUrbanRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-result.typeorm.entity';
import { GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-special-period.typeorm.entity';
import { GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-time-accelerator.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementReviewAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementReviewDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-document.typeorm.entity';
import { GeneralUrbanRetirementReviewInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementReviewLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period-document.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period-earnings-history.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { GeneralUrbanRetirementReviewResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-result.typeorm.entity';
import { GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-special-period.typeorm.entity';
import { GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-time-accelerator.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { InitialPetitionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/initial-petition-generator.typeorm.entity';
import { InsuranceQualityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-document.typeorm.entity';
import { InsuranceQualityAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-inss-benefit.typeorm.entity';
import { InsuranceQualityAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-legal-proceeding.typeorm.entity';
import { InsuranceQualityAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-result.typeorm.entity';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { JudicialCaseAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-benefit.typeorm.entity';
import { JudicialCaseAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-document.typeorm.entity';
import { JudicialCaseAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-legal-proceeding.typeorm.entity';
import { JudicialCaseAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-result.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { LegalPleadingDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document-analysis.typeorm.entity';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';
import { LegalPleadingHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-history.typeorm.entity';
import { LegalPleadingResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-result.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { MaternityPayGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-document.typeorm.entity';
import { MaternityPayGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-earnings-history.typeorm.entity';
import { MaternityPayGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-inss-benefit.typeorm.entity';
import { MaternityPayGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-legal-proceeding.typeorm.entity';
import { MaternityPayGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period-document.typeorm.entity';
import { MaternityPayGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period.typeorm.entity';
import { MaternityPayGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-result.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { MaternityPayRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-document.typeorm.entity';
import { MaternityPayRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-inss-benefit.typeorm.entity';
import { MaternityPayRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-legal-proceeding.typeorm.entity';
import { MaternityPayRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-result.typeorm.entity';
import { MaternityPayRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-document.typeorm.entity';
import { MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-earnings-history.typeorm.entity';
import { MaternityPayRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period.typeorm.entity';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-document.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis-result.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-document.typeorm.entity';
import { MedicalQuestionGeneratorInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-inss-benefit.typeorm.entity';
import { MedicalQuestionGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-legal-proceeding.typeorm.entity';
import { MedicalQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator-result.typeorm.entity';
import { MedicalQuestionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-question-generator.typeorm.entity';
import { MiniAdvisorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor-result.typeorm.entity';
import { MiniAdvisorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor.typeorm.entity';
import { OrganizationCreditPackPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-pack-purchase.typeorm.entity';
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';
import { OrganizationCreditUsageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-usage.typeorm.entity';
import { OrganizationCustomizationDocumentFooterTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-footer-template.typeorm.entity';
import { OrganizationCustomizationDocumentHeaderTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-header-template.typeorm.entity';
import { OrganizationCustomizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationPaymentPlanAffiliateCommissionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-affiliate-commission.typeorm.entity';
import { OrganizationPaymentPlanBankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-bank-payment.typeorm.entity';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enabled-paid-resource.typeorm.entity';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { PaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceIaConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource-ia-config.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-benefit.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { PerCapitaIncomeForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-result.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { RegulatoryUpdateEmailPreferenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-email-preference.typeorm.entity';
import { RegulatoryUpdateMainChangeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-main-change.typeorm.entity';
import { RegulatoryUpdateMonitoredSourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-monitored-source.typeorm.entity';
import { RegulatoryUpdateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update.typeorm.entity';
import { RetirementPlanningRgpsAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-analysis-result.typeorm.entity';
import { RetirementPlanningRgpsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-earnings-history.typeorm.entity';
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
import { RuralOrHybridRetirementAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-member.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-result.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit.typeorm.entity';
import { RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period-member.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-result.typeorm.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness.typeorm.entity';
import { RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-document.typeorm.entity';
import { RuralTimelineAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-inss-benefit.typeorm.entity';
import { RuralTimelineAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-legal-proceeding.typeorm.entity';
import { RuralTimelineAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-document.typeorm.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-economic-aspects.typeorm.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-family-group-member.typeorm.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-pending-exit-date.typeorm.entity';
import { RuralTimelineAnalysisPeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-property.typeorm.entity';
import { RuralTimelineAnalysisPeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-residence.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { RuralTimelineCnisContributionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-document.typeorm.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution.typeorm.entity';
import { SpecialActivityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-documents.typeorm.entity';
import { SpecialActivityInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-benefit.typeorm.entity';
import { SpecialActivityLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-legal-proceeding.typeorm.entity';
import { SpecialActivityResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-result.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-period-document.typeorm.entity';
import { SpecialCategoryRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-remuneration.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-conversion-item.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-rule-item.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result.typeorm.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-work-period.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';
import { SpecialRetirementGrantBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-document.typeorm.entity';
import { SpecialRetirementGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-earnings-history.typeorm.entity';
import { SpecialRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-legal-proceeding.entity';
import { SpecialRetirementGrantPeriodObservationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-observation.typeorm.entity';
import { SpecialRetirementGrantPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-overdue-contribution.typeorm.entity';
import { SpecialRetirementGrantPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-pending-exit-date.typeorm.entity';
import { SpecialRetirementGrantPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-under-minimum.typeorm.entity';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { SpecialRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-result.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { SpecialRetirementRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-document.typeorm.entity';
import { SpecialRetirementRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-inss-benefit.typeorm.entity';
import { SpecialRetirementRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-legal-proceeding.typeorm.entity';
import { SpecialRetirementRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-result.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period-document.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period-earnings-history.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-special-period-legal-framework.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-special-period.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { SpeechGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-benefit.typeorm.entity';
import { SpeechGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-document.typeorm.entity';
import { SpeechGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-legal-proceeding.typeorm.entity';
import { SpeechGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-result.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTicketAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-attachment.typeorm.entity';
import { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification-document.typeorm.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification.typeorm.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification-document.typeorm.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period-document.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history.typeorm.entity';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis.typeorm.entity';
import { SurvivorPensionAnalysisResultRetirementRuleTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-retirement-rule.typeorm.entity';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { SystemActivitiesTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/system-activities.typeorm.entity';
import { SystemLogTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/system-log.typeorm.entity';
import { TeacherRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-document.typeorm.entity';
import { TeacherRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-inss-benefit.typeorm.entity';
import { TeacherRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-legal-proceeding.typeorm.entity';
import { TeacherRetirementPlanningPeriodItemDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period-item-document.typeorm.entity';
import { TeacherRetirementPlanningPeriodItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period-item.typeorm.entity';
import { TeacherRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period.typeorm.entity';
import { TeacherRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-remuneration.typeorm.entity';
import { TeacherRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-result.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-inss-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-legal-proceeding.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-result.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-inss-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-result.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-period-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-result.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-inss-benefit.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-result.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { TutorialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/tutorial.typeorm.entity';
import { DatabaseApplicationVariable } from '@shared/system/constant/application-variable/source/database.application-variable';

import type { Provider } from '@nestjs/common';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import type { DataSourceOptions } from 'typeorm';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-disability-analysis/temporary-disability-benefits-terminated-disability-analysis.typeorm.query.repository';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-disability-analysis-cid/temporary-disability-benefits-terminated-disability-analysis-cid.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-disability-analysis-document/temporary-disability-benefits-terminated-disability-analysis-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-insured-status/temporary-disability-benefits-terminated-insured-status.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-insured-status-document/temporary-disability-benefits-terminated-insured-status-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-work-periods-earnings-history/temporary-disability-benefits-terminated-work-periods-earnings-history.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-previous-benefit/temporary-disability-benefits-terminated-previous-benefit.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-previous-benefit-document/temporary-disability-benefits-terminated-previous-benefit-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-terminated-work-period-document/temporary-disability-benefits-terminated-work-period-document.typeorm.command.repository';

export class TypeormIndex {
  public static readonly entities: EntityClassOrSchema[] = [
    AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
    AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
    AdministrativeProcedureInssAnalysisResultTypeormEntity,
    AdministrativeProcedureInssAnalysisTypeormEntity,
    AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
    AuthIdentityTypeormEntity,
    AffiliateCustomerTypeormEntity,
    AffiliateBankTransferTypeormEntity,
    AffiliateCustomerConfigTypeormEntity,
    AffiliateCustomerPaymentPlanTypeormEntity,
    EmailTemplateTypeormEntity,
    CustomerAddressTypeormEntity,
    CustomerEmailSentTypeormEntity,
    CustomerEmailSentAttachmentTypeormEntity,
    CustomerTypeormEntity,
    OrganizationCreditPurchaseTypeormEntity,
    OrganizationCreditUsageTypeormEntity,
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
    LegalPleadingHistoryTypeormEntity,
    LegalPleadingResultTypeormEntity,
    AnalysisToolRecordTypeormEntity,
    AudienceQuestionGeneratorBenefitTypeormEntity,
    AudienceQuestionGeneratorDocumentTypeormEntity,
    AudienceQuestionGeneratorLegalProceedingTypeormEntity,
    AudienceQuestionGeneratorResultTypeormEntity,
    AudienceQuestionGeneratorTypeormEntity,
    CustomerTermsTypeormEntity,
    CustomerTermsAcceptanceTypeormEntity,
    AnalysisToolClientLegalProceedingTypeormEntity,
    AdminTypeormEntity,
    LegalProceedingDetailTypeormEntity,
    PaymentPlanTypeormEntity,
    PaymentPlanPaidResourceTypeormEntity,
    OrganizationPaymentPlanTypeormEntity,
    PaymentPlanEnabledPaidResourceTypeormEntity,
    OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
    PaymentPlanPaidResourceIaConfigTypeormEntity,
    BankPaymentTypeormEntity,
    BankTransferTypeormEntity,
    OrganizationPaymentPlanBankPaymentTypeormEntity,
    OrganizationPaymentPlanAffiliateCommissionTypeormEntity,
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
    TeacherRetirementPlanningTypeormEntity,
    TeacherRetirementPlanningDocumentTypeormEntity,
    TeacherRetirementPlanningInssBenefitTypeormEntity,
    TeacherRetirementPlanningLegalProceedingTypeormEntity,
    TeacherRetirementPlanningPeriodTypeormEntity,
    TeacherRetirementPlanningPeriodItemTypeormEntity,
    TeacherRetirementPlanningPeriodItemDocumentTypeormEntity,
    TeacherRetirementPlanningRemunerationTypeormEntity,
    TeacherRetirementPlanningResultTypeormEntity,
    GeneralUrbanRetirementAnalysisTypeormEntity,
    GeneralUrbanRetirementAnalysisResultTypeormEntity,
    GeneralUrbanRetirementAnalysisDocumentTypeormEntity,
    GeneralUrbanRetirementAnalysisPeriodTypeormEntity,
    GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity,
    GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity,
    GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity,
    GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
    GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity,
    CidTenTypeormEntity,
    DisabilityRetirementPlanningGrantTypeormEntity,
    DisabilityRetirementPlanningGrantResultTypeormEntity,
    DisabilityRetirementPlanningGrantDocumentTypeormEntity,
    DisabilityRetirementPlanningGrantInssBenefitTypeormEntity,
    DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity,
    DisabilityRetirementPlanningGrantPeriodTypeormEntity,
    DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity,
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormEntity,
    DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
    DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity,
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
    TemporaryDisabilityBenefitsGrantTypeormEntity,
    TemporaryDisabilityBenefitsGrantResultTypeormEntity,
    TemporaryDisabilityBenefitsGrantDocumentTypeormEntity,
    TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
    TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity,
    TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity,
    TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity,
    TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
    TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity,
    TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity,
    TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedResultTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity,
    TemporaryIncapacityBenefitRejectionTypeormEntity,
    TemporaryIncapacityBenefitRejectionResultTypeormEntity,
    TemporaryIncapacityBenefitRejectionDocumentTypeormEntity,
    TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity,
    TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity,
    TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity,
    TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity,
    TemporaryIncapacityBenefitTerminationTypeormEntity,
    TemporaryIncapacityBenefitTerminationResultTypeormEntity,
    TemporaryIncapacityBenefitTerminationDocumentTypeormEntity,
    TemporaryIncapacityBenefitTerminationInssBenefitTypeormEntity,
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity,
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity,
    TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
    TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity,
    TemporaryIncapacityBenefitTerminationWorkPeriodsTypeormEntity,
    TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity,
    GeneralUrbanRetirementGrantTypeormEntity,
    GeneralUrbanRetirementGrantResultTypeormEntity,
    GeneralUrbanRetirementGrantInssBenefitTypeormEntity,
    GeneralUrbanRetirementGrantLegalProceedingTypeormEntity,
    GeneralUrbanRetirementGrantPeriodTypeormEntity,
    GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity,
    GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity,
    GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
    GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
    GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
    GeneralUrbanRetirementReviewTypeormEntity,
    GeneralUrbanRetirementReviewResultTypeormEntity,
    GeneralUrbanRetirementReviewDocumentTypeormEntity,
    GeneralUrbanRetirementReviewInssBenefitTypeormEntity,
    GeneralUrbanRetirementReviewLegalProceedingTypeormEntity,
    GeneralUrbanRetirementReviewPeriodTypeormEntity,
    GeneralUrbanRetirementReviewPeriodEarningsHistoryTypeormEntity,
    GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity,
    GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
    GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
    GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity,
    RetirementPlanningRgpsTypeormEntity,
    RetirementPlanningRgpsResultTypeormEntity,
    RetirementPlanningRgpsInssBenefitTypeormEntity,
    RetirementPlanningRgpsLegalProceedingTypeormEntity,
    RetirementPlanningRgpsPeriodTypeormEntity,
    RetirementPlanningRgpsEarningsHistoryTypeormEntity,
    RetirementPlanningRgpsPeriodDocumentTypeormEntity,
    RetirementPlanningRgpsAnalysisResultTypeormEntity,
    RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
    RetirementPlanningRgpsSpecialPeriodTypeormEntity,
    JudicialCaseAnalysisBenefitTypeormEntity,
    JudicialCaseAnalysisDocumentTypeormEntity,
    JudicialCaseAnalysisLegalProceedingTypeormEntity,
    JudicialCaseAnalysisResultTypeormEntity,
    JudicialCaseAnalysisTypeormEntity,
    RuralTimelineAnalysisTypeormEntity,
    RuralTimelineAnalysisDocumentTypeormEntity,
    RuralTimelineAnalysisPeriodTypeormEntity,
    RuralTimelineAnalysisPeriodPropertyTypeormEntity,
    RuralTimelineAnalysisPeriodResidenceTypeormEntity,
    RuralTimelineAnalysisPeriodDocumentTypeormEntity,
    RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity,
    RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
    RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity,
    RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
    RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
    RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity,
    RuralTimelineAnalysisInssBenefitTypeormEntity,
    RuralTimelineAnalysisLegalProceedingTypeormEntity,
    RuralOrHybridRetirementRejectionTypeormEntity,
    RuralOrHybridRetirementRejectionResultTypeormEntity,
    RuralOrHybridRetirementRejectionDocumentTypeormEntity,
    RuralOrHybridRetirementRejectionInssBenefitTypeormEntity,
    RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity,
    RuralOrHybridRetirementRejectionPeriodTypeormEntity,
    RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity,
    RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity,
    RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity,
    RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity,
    RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity,
    RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity,
    RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity,
    RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity,
    RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity,
    RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity,
    RuralOrHybridRetirementAnalysisTypeormEntity,
    RuralOrHybridRetirementAnalysisDocumentTypeormEntity,
    RuralOrHybridRetirementAnalysisPeriodTypeormEntity,
    RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity,
    RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity,
    RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity,
    RuralOrHybridRetirementAnalysisResultTypeormEntity,
    RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity,
    RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity,
    RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity,
    RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity,
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity,
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity,
    RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity,
    InsuranceQualityAnalysisTypeormEntity,
    InsuranceQualityAnalysisDocumentTypeormEntity,
    InsuranceQualityAnalysisResultTypeormEntity,
    InsuranceQualityAnalysisInssBenefitTypeormEntity,
    InsuranceQualityAnalysisLegalProceedingTypeormEntity,
    SpecialActivityTypeormEntity,
    SpecialActivityDocumentTypeormEntity,
    SpecialActivityResultTypeormEntity,
    SpecialActivityInssBenefitTypeormEntity,
    SpecialActivityLegalProceedingTypeormEntity,
    SpecialCategoryRetirementAnalysisTypeormEntity,
    SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
    SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
    SpecialCategoryRetirementAnalysisResultTypeormEntity,
    SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
    SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
    SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
    MedicalQuestionGeneratorDocumentTypeormEntity,
    MedicalQuestionGeneratorInssBenefitTypeormEntity,
    MedicalQuestionGeneratorLegalProceedingTypeormEntity,
    MedicalQuestionGeneratorResultTypeormEntity,
    MedicalQuestionGeneratorTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
    InitialPetitionGeneratorTypeormEntity,
    AdministrativeRequestGeneratorTypeormEntity,
    FullOpinionGeneratorTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    SpeechGeneratorBenefitTypeormEntity,
    SpeechGeneratorDocumentTypeormEntity,
    SpeechGeneratorLegalProceedingTypeormEntity,
    SpeechGeneratorResultTypeormEntity,
    SpeechGeneratorTypeormEntity,
    SystemLogTypeormEntity,
    DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
    DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
    DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
    DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
    DisabilityAssessmentForBpcAnalysisTypeormEntity,
    PerCapitaIncomeForBpcAnalysisTypeormEntity,
    PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
    PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
    PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity,
    PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity,
    PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
    DisabilityRetirementPlanningTypeormEntity,
    DisabilityRetirementPlanningRemunerationTypeormEntity,
    DisabilityRetirementPlanningResultTypeormEntity,
    DisabilityRetirementPlanningPeriodTypeormEntity,
    DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
    DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
    DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
    DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
    DisabilityRetirementPlanningInssBenefitTypeormEntity,
    DisabilityRetirementPlanningLegalProceedingTypeormEntity,
    DisabilityRetirementPlanningDocumentTypeormEntity,
    SpecialRetirementGrantTypeormEntity,
    SpecialRetirementGrantResultTypeormEntity,
    SpecialRetirementGrantDocumentTypeormEntity,
    SpecialRetirementGrantBenefitTypeormEntity,
    SpecialRetirementGrantLegalProceedingTypeormEntity,
    SpecialRetirementGrantPeriodTypeormEntity,
    SpecialRetirementGrantEarningsHistoryTypeormEntity,
    SpecialRetirementGrantPeriodObservationTypeormEntity,
    SpecialRetirementGrantPeriodUnderMinimumTypeormEntity,
    SpecialRetirementGrantPeriodPendingExitDateTypeormEntity,
    SpecialRetirementGrantPeriodOverdueContributionTypeormEntity,
    SpecialRetirementRejectionTypeormEntity,
    SpecialRetirementRejectionResultTypeormEntity,
    SpecialRetirementRejectionDocumentTypeormEntity,
    SpecialRetirementRejectionInssBenefitTypeormEntity,
    SpecialRetirementRejectionLegalProceedingTypeormEntity,
    SpecialRetirementRejectionWorkPeriodTypeormEntity,
    SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity,
    SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity,
    SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity,
    SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity,
    MiniAdvisorTypeormEntity,
    MiniAdvisorResultTypeormEntity,
    SystemActivitiesTypeormEntity,
    TutorialTypeormEntity,
    RegulatoryUpdateTypeormEntity,
    RegulatoryUpdateEmailPreferenceTypeormEntity,
    RegulatoryUpdateMonitoredSourceTypeormEntity,
    RegulatoryUpdateMainChangeTypeormEntity,
    CreditPackTypeormEntity,
    OrganizationCreditPackPurchaseTypeormEntity,
    OrganizationCustomizationTypeormEntity,
    OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
    OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
    SupportAttendantTypeormEntity,
    SupportTicketTypeormEntity,
    SupportTicketAttachmentTypeormEntity,
    SupportTicketMessageTypeormEntity,
    DeathBenefitGrantTypeormEntity,
    DeathBenefitGrantResultTypeormEntity,
    DeathBenefitGrantDocumentTypeormEntity,
    DeathBenefitGrantInssBenefitTypeormEntity,
    DeathBenefitGrantLegalProceedingTypeormEntity,
    DeathBenefitGrantLegalRepresentativeTypeormEntity,
    DeathBenefitGrantInstitorTypeormEntity,
    DeathBenefitGrantDependentTypeormEntity,
    DeathBenefitGrantDependentDocumentTypeormEntity,
    DeathBenefitGrantPeriodTypeormEntity,
    DeathBenefitGrantPeriodEarningsHistoryTypeormEntity,
    DeathBenefitGrantPeriodDocumentTypeormEntity,
    DeathBenefitGrantTimeAcceleratorTypeormEntity,
    DeathBenefitRejectionTypeormEntity,
    DeathBenefitRejectionResultTypeormEntity,
    DeathBenefitRejectionDocumentTypeormEntity,
    DeathBenefitRejectionInssBenefitTypeormEntity,
    DeathBenefitRejectionLegalProceedingTypeormEntity,
    DeathBenefitRejectionLegalRepresentativeTypeormEntity,
    DeathBenefitRejectionInstitorTypeormEntity,
    DeathBenefitRejectionDependentTypeormEntity,
    DeathBenefitRejectionDependentDocumentTypeormEntity,
    DeathBenefitRejectionPeriodTypeormEntity,
    DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity,
    DeathBenefitRejectionPeriodDocumentTypeormEntity,
    DeathBenefitRejectionTimeAcceleratorTypeormEntity,
    SurvivorPensionAnalysisTypeormEntity,
    SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
    SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
    SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
    SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
    SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
    SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
    SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
    SurvivorPensionAnalysisResultTypeormEntity,
    SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
    SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
    GeneralUrbanRetirementDenialTypeormEntity,
    GeneralUrbanRetirementDenialResultTypeormEntity,
    GeneralUrbanRetirementDenialDocumentTypeormEntity,
    GeneralUrbanRetirementDenialInssBenefitTypeormEntity,
    GeneralUrbanRetirementDenialPeriodTypeormEntity,
    GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity,
    GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity,
    GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
    AccidentBenefitRejectionTypeormEntity,
    AccidentBenefitRejectionResultTypeormEntity,
    AccidentBenefitRejectionDocumentTypeormEntity,
    AccidentBenefitRejectionInssBenefitTypeormEntity,
    AccidentBenefitRejectionEventTypeormEntity,
    AccidentBenefitRejectionEventDocumentTypeormEntity,
    AccidentBenefitRejectionWorkPeriodTypeormEntity,
    AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity,
    AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity,
    MaternityPayRejectionTypeormEntity,
    MaternityPayRejectionResultTypeormEntity,
    MaternityPayRejectionInssBenefitTypeormEntity,
    MaternityPayRejectionLegalProceedingTypeormEntity,
    MaternityPayRejectionDocumentTypeormEntity,
    MaternityPayRejectionWorkPeriodTypeormEntity,
    MaternityPayRejectionWorkPeriodDocumentTypeormEntity,
    MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity,
    DisabilityRetirementPlanningRejectionTypeormEntity,
    DisabilityRetirementPlanningRejectionResultTypeormEntity,
    DisabilityRetirementPlanningRejectionDocumentTypeormEntity,
    DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity,
    DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
    DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity,
    DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormEntity,
    DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
    BpcDisabilityDenialTypeormEntity,
    BpcDisabilityDenialDocumentTypeormEntity,
    BpcDisabilityDenialFamilyMemberTypeormEntity,
    BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
    BpcDisabilityDenialResultTypeormEntity,
    BpcDisabilityDenialInssBenefitTypeormEntity,
    BpcDisabilityDenialLegalProceedingTypeormEntity,
    BpcElderlyAnalysisTypeormEntity,
    BpcElderlyAnalysisDocumentTypeormEntity,
    BpcElderlyAnalysisFamilyMemberTypeormEntity,
    BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
    BpcElderlyAnalysisResultTypeormEntity,
    BpcElderlyAnalysisInssBenefitTypeormEntity,
    BpcElderlyAnalysisLegalProceedingTypeormEntity,
    BpcElderlyCessationTypeormEntity,
    BpcElderlyCessationDocumentTypeormEntity,
    BpcElderlyCessationFamilyMemberTypeormEntity,
    BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
    BpcElderlyCessationResultTypeormEntity,
    BpcElderlyCessationInssBenefitTypeormEntity,
    BpcElderlyCessationLegalProceedingTypeormEntity,
    MaternityPayGrantTypeormEntity,
    MaternityPayGrantDocumentTypeormEntity,
    MaternityPayGrantEarningsHistoryTypeormEntity,
    MaternityPayGrantInssBenefitTypeormEntity,
    MaternityPayGrantLegalProceedingTypeormEntity,
    MaternityPayGrantPeriodTypeormEntity,
    MaternityPayGrantPeriodDocumentTypeormEntity,
    MaternityPayGrantResultTypeormEntity,
    AccidentAssistanceTerminatedTypeormEntity,
    AccidentAssistanceTerminatedBenefitTypeormEntity,
    AccidentAssistanceTerminatedCidTypeormEntity,
    AccidentAssistanceTerminatedDocumentTypeormEntity,
    AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
    AccidentAssistanceTerminatedResultTypeormEntity,
    AccidentAssistanceTerminatedPeriodTypeormEntity,
    AccidentAssistanceTerminatedPeriodDocumentTypeormEntity,
  ];

  public static readonly repositories: Provider[] = [
    BaseTypeormTransactionRepository,
    AuthIdentityTypeormQueryRepository,
    AuthIdentityTypeormCommandRepository,
    AudienceQuestionGeneratorTypeormCommandRepository,
    AudienceQuestionGeneratorTypeormQueryRepository,
    AudienceQuestionGeneratorBenefitTypeormCommandRepository,
    AudienceQuestionGeneratorDocumentTypeormCommandRepository,
    AudienceQuestionGeneratorLegalProceedingTypeormCommandRepository,
    AudienceQuestionGeneratorResultTypeormCommandRepository,
    AdministrativeProcedureInssAnalysisTypeormCommandRepository,
    AdministrativeProcedureInssAnalysisTypeormQueryRepository,
    AccidentAssistanceTerminatedTypeormCommandRepository,
    AccidentAssistanceTerminatedTypeormQueryRepository,
    AccidentAssistanceTerminatedBenefitTypeormCommandRepository,
    AccidentAssistanceTerminatedCidTypeormCommandRepository,
    AccidentAssistanceTerminatedDocumentTypeormCommandRepository,
    AccidentAssistanceTerminatedLegalProceedingTypeormCommandRepository,
    AccidentAssistanceTerminatedResultTypeormCommandRepository,
    AccidentAssistanceTerminatedPeriodTypeormCommandRepository,
    AccidentAssistanceTerminatedPeriodTypeormQueryRepository,
    AccidentAssistanceTerminatedPeriodDocumentTypeormCommandRepository,
    DisabilityAssessmentForBpcAnalysisTypeormCommandRepository,
    DisabilityAssessmentForBpcAnalysisTypeormQueryRepository,
    DisabilityAssessmentForBpcAnalysisBenefitTypeormCommandRepository,
    DisabilityAssessmentForBpcAnalysisDocumentTypeormCommandRepository,
    DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormCommandRepository,
    DisabilityAssessmentForBpcAnalysisResultTypeormCommandRepository,
    AdministrativeProcedureInssAnalysisBenefitTypeormCommandRepository,
    AdministrativeProcedureInssAnalysisDocumentTypeormCommandRepository,
    AdministrativeProcedureInssAnalysisLegalProceedingTypeormCommandRepository,
    AdministrativeProcedureInssAnalysisResultTypeormCommandRepository,
    MedicalAndSocialReportObjectionGeneratorAnalysisTypeormCommandRepository,
    MedicalAndSocialReportObjectionGeneratorAnalysisTypeormQueryRepository,
    MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormCommandRepository,
    MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormCommandRepository,
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormCommandRepository,
    MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormCommandRepository,
    AffiliateCustomerTypeormCommandRepository,
    AffiliateCustomerTypeormQueryRepository,
    AffiliateBankTransferTypeormCommandRepository,
    AffiliateBankTransferTypeormQueryRepository,
    AffiliateCustomerPaymentPlanTypeormCommandRepository,
    AffiliateCustomerPaymentPlanTypeormQueryRepository,
    CustomerTypeormQueryRepository,
    CustomerTypeormCommandRepository,
    CustomerAddressTypeormCommandRepository,
    CustomerAddressTypeormQueryRepository,
    OrganizationTypeormQueryRepository,
    OrganizationTypeormCommandRepository,
    OrganizationCreditPurchaseTypeormQueryRepository,
    OrganizationCreditPurchaseTypeormCommandRepository,
    OrganizationCreditUsageTypeormQueryRepository,
    OrganizationCreditUsageTypeormCommandRepository,
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
    LegalPleadingHistoryTypeormCommandRepository,
    LegalPleadingHistoryTypeormQueryRepository,
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
    PaymentPlanPaidResourceTypeormCommandRepository,
    PaymentPlanPaidResourceTypeormQueryRepository,
    OrganizationPaymentPlanTypeormCommandRepository,
    PaymentPlanTypeormCommandRepository,
    PaymentPlanTypeormQueryRepository,
    PaymentPlanEnabledPaidResourceTypeormCommandRepository,
    OrganizationPaymentPlanEnabledPaidResourceTypeormCommandRepository,
    BankPaymentTypeormCommandRepository,
    BankPaymentTypeormQueryRepository,
    BankTransferTypeormCommandRepository,
    BankTransferTypeormQueryRepository,
    OrganizationPaymentPlanBankPaymentTypeormCommandRepository,
    OrganizationPaymentPlanBankPaymentTypeormQueryRepository,
    GeneralUrbanRetirementAnalysisTypeormCommandRepository,
    GeneralUrbanRetirementAnalysisTypeormQueryRepository,
    GeneralUrbanRetirementAnalysisResultTypeormCommandRepository,
    GeneralUrbanRetirementAnalysisLegalProceedingTypeormCommandRepository,
    GeneralUrbanRetirementAnalysisPeriodTypeormCommandRepository,
    GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormCommandRepository,
    GeneralUrbanRetirementAnalysisPeriodDocumentTypeormCommandRepository,
    GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormCommandRepository,
    GeneralUrbanRetirementAnalysisDocumentTypeormCommandRepository,
    GeneralUrbanRetirementAnalysisRemunerationTypeormCommandRepository,
    GeneralUrbanRetirementAnalysisRemunerationTypeormQueryRepository,
    DisabilityRetirementPlanningGrantTypeormCommandRepository,
    DisabilityRetirementPlanningGrantTypeormQueryRepository,
    DisabilityRetirementPlanningGrantDocumentTypeormCommandRepository,
    DisabilityRetirementPlanningGrantResultTypeormCommandRepository,
    DisabilityRetirementPlanningGrantInssBenefitTypeormCommandRepository,
    DisabilityRetirementPlanningGrantLegalProceedingTypeormCommandRepository,
    DisabilityRetirementPlanningGrantPeriodTypeormCommandRepository,
    DisabilityRetirementPlanningGrantPeriodTypeormQueryRepository,
    DisabilityRetirementPlanningGrantPeriodDocumentTypeormCommandRepository,
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormCommandRepository,
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormQueryRepository,
    DisabilityRetirementPlanningGrantDisabilityPeriodTypeormCommandRepository,
    DisabilityRetirementPlanningGrantDisabilityPeriodTypeormQueryRepository,
    DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormCommandRepository,
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeormCommandRepository,
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeormQueryRepository,
    TemporaryDisabilityBenefitsGrantTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantTypeormQueryRepository,
    TemporaryDisabilityBenefitsGrantResultTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantDocumentTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantPeriodTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantPeriodTypeormQueryRepository,
    TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantInsuredStatusTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantInsuredStatusTypeormQueryRepository,
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormQueryRepository,
    TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantInssBenefitTypeormCommandRepository,
    TemporaryDisabilityBenefitsGrantLegalProceedingTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedTypeormQueryRepository,
    TemporaryDisabilityBenefitsTerminatedTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedResultTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedDocumentTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedInssBenefitTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormQueryRepository,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormQueryRepository,
    TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormQueryRepository,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormCommandRepository,
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionTypeormQueryRepository,
    TemporaryIncapacityBenefitRejectionTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionResultTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionDocumentTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionInssBenefitTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormQueryRepository,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionInsuredStatusTypeormQueryRepository,
    TemporaryIncapacityBenefitRejectionInsuredStatusTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormQueryRepository,
    TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormCommandRepository,
    TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormCommandRepository,
    GeneralUrbanRetirementGrantTypeormCommandRepository,
    GeneralUrbanRetirementGrantTypeormQueryRepository,
    GeneralUrbanRetirementGrantResultTypeormCommandRepository,
    GeneralUrbanRetirementGrantResultTypeormQueryRepository,
    GeneralUrbanRetirementGrantAnalysisResultTypeormCommandRepository,
    GeneralUrbanRetirementGrantAnalysisResultTypeormQueryRepository,
    GeneralUrbanRetirementGrantPeriodTypeormCommandRepository,
    GeneralUrbanRetirementGrantPeriodTypeormQueryRepository,
    GeneralUrbanRetirementGrantEarningsHistoryTypeormCommandRepository,
    GeneralUrbanRetirementGrantEarningsHistoryTypeormQueryRepository,
    GeneralUrbanRetirementGrantInssBenefitTypeormCommandRepository,
    GeneralUrbanRetirementGrantLegalProceedingTypeormCommandRepository,
    GeneralUrbanRetirementGrantSpecialPeriodTypeormCommandRepository,
    GeneralUrbanRetirementGrantSpecialPeriodTypeormQueryRepository,
    GeneralUrbanRetirementGrantTimeAcceleratorTypeormCommandRepository,
    GeneralUrbanRetirementGrantTimeAcceleratorTypeormQueryRepository,
    GeneralUrbanRetirementGrantPeriodDocumentTypeormCommandRepository,
    GeneralUrbanRetirementGrantPeriodDocumentTypeormQueryRepository,
    GeneralUrbanRetirementReviewTypeormCommandRepository,
    GeneralUrbanRetirementReviewTypeormQueryRepository,
    GeneralUrbanRetirementReviewResultTypeormCommandRepository,
    GeneralUrbanRetirementReviewResultTypeormQueryRepository,
    GeneralUrbanRetirementReviewAnalysisResultTypeormCommandRepository,
    GeneralUrbanRetirementReviewAnalysisResultTypeormQueryRepository,
    GeneralUrbanRetirementReviewPeriodTypeormCommandRepository,
    GeneralUrbanRetirementReviewPeriodTypeormQueryRepository,
    GeneralUrbanRetirementReviewEarningsHistoryTypeormCommandRepository,
    GeneralUrbanRetirementReviewEarningsHistoryTypeormQueryRepository,
    GeneralUrbanRetirementReviewInssBenefitTypeormCommandRepository,
    GeneralUrbanRetirementReviewLegalProceedingTypeormCommandRepository,
    GeneralUrbanRetirementReviewSpecialPeriodTypeormCommandRepository,
    GeneralUrbanRetirementReviewSpecialPeriodTypeormQueryRepository,
    GeneralUrbanRetirementReviewTimeAcceleratorTypeormCommandRepository,
    GeneralUrbanRetirementReviewTimeAcceleratorTypeormQueryRepository,
    GeneralUrbanRetirementReviewPeriodDocumentTypeormCommandRepository,
    GeneralUrbanRetirementReviewPeriodDocumentTypeormQueryRepository,
    GeneralUrbanRetirementReviewDocumentTypeormCommandRepository,
    OrganizationPaymentPlanAffiliateCommissionTypeormCommandRepository,
    OrganizationPaymentPlanAffiliateCommissionTypeormQueryRepository,
    RetirementPlanningRppsInssBenefitTypeormCommandRepository,
    RetirementPlanningRppsLegalProceedingTypeormCommandRepository,
    TeacherRetirementPlanningTypeormCommandRepository,
    TeacherRetirementPlanningTypeormQueryRepository,
    TeacherRetirementPlanningDocumentTypeormCommandRepository,
    TeacherRetirementPlanningInssBenefitTypeormCommandRepository,
    TeacherRetirementPlanningLegalProceedingTypeormCommandRepository,
    TeacherRetirementPlanningPeriodTypeormCommandRepository,
    TeacherRetirementPlanningPeriodItemTypeormCommandRepository,
    TeacherRetirementPlanningPeriodItemDocumentTypeormCommandRepository,
    TeacherRetirementPlanningRemunerationTypeormCommandRepository,
    TeacherRetirementPlanningRemunerationTypeormQueryRepository,
    TeacherRetirementPlanningResultTypeormCommandRepository,
    RetirementPlanningRgpsAnalysisResultTypeormCommandRepository,
    RetirementPlanningRgpsAnalysisResultTypeormQueryRepository,
    RetirementPlanningRgpsEarningsHistoryTypeormCommandRepository,
    RetirementPlanningRgpsEarningsHistoryTypeormQueryRepository,
    JudicialCaseAnalysisTypeormCommandRepository,
    JudicialCaseAnalysisTypeormQueryRepository,
    JudicialCaseAnalysisBenefitTypeormCommandRepository,
    JudicialCaseAnalysisDocumentTypeormCommandRepository,
    JudicialCaseAnalysisLegalProceedingTypeormCommandRepository,
    JudicialCaseAnalysisResultTypeormCommandRepository,
    SpeechGeneratorTypeormCommandRepository,
    SpeechGeneratorTypeormQueryRepository,
    SpeechGeneratorBenefitTypeormCommandRepository,
    SpeechGeneratorLegalProceedingTypeormCommandRepository,
    SpeechGeneratorResultTypeormCommandRepository,
    SpeechGeneratorDocumentTypeormCommandRepository,
    RuralTimelineAnalysisTypeormCommandRepository,
    RuralTimelineAnalysisTypeormQueryRepository,
    RuralTimelineAnalysisDocumentTypeormCommandRepository,
    RuralTimelineAnalysisPeriodTypeormCommandRepository,
    RuralTimelineAnalysisPeriodPropertyTypeormCommandRepository,
    RuralTimelineAnalysisPeriodResidenceTypeormCommandRepository,
    RuralTimelineAnalysisPeriodDocumentTypeormCommandRepository,
    RuralTimelineAnalysisPeriodEconomicAspectsTypeormCommandRepository,
    RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormCommandRepository,
    RuralTimelineAnalysisCnisContributionPeriodTypeormCommandRepository,
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormCommandRepository,
    RuralTimelineCnisContributionPeriodDocumentTypeormCommandRepository,
    RuralTimelineCnisContributionPeriodDocumentTypeormQueryRepository,
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormCommandRepository,
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormQueryRepository,
    RuralOrHybridRetirementRejectionTypeormCommandRepository,
    RuralOrHybridRetirementRejectionTypeormQueryRepository,
    RuralOrHybridRetirementRejectionResultTypeormCommandRepository,
    RuralOrHybridRetirementRejectionDocumentTypeormCommandRepository,
    RuralOrHybridRetirementRejectionInssBenefitTypeormCommandRepository,
    RuralOrHybridRetirementRejectionLegalProceedingTypeormCommandRepository,
    RuralOrHybridRetirementRejectionPeriodTypeormCommandRepository,
    RuralOrHybridRetirementRejectionPeriodDocumentTypeormCommandRepository,
    RuralOrHybridRetirementRejectionPeriodMemberTypeormCommandRepository,
    RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormCommandRepository,
    RuralOrHybridRetirementRejectionTestimonialWitnessTypeormCommandRepository,
    RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormCommandRepository,
    RuralOrHybridRetirementRejectionWorkPeriodTypeormCommandRepository,
    RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormCommandRepository,
    RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormCommandRepository,
    RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormCommandRepository,
    RuralOrHybridRetirementRejectionTimeAcceleratorTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisTypeormQueryRepository,
    RuralOrHybridRetirementAnalysisResultTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisDocumentTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisPeriodTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisPeriodDocumentTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisPeriodMemberTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisWorkPeriodTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormCommandRepository,
    RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormCommandRepository,
    InsuranceQualityAnalysisTypeormCommandRepository,
    InsuranceQualityAnalysisDocumentTypeormCommandRepository,
    InsuranceQualityAnalysisInssBenefitTypeormCommandRepository,
    InsuranceQualityAnalysisLegalProceedingTypeormCommandRepository,
    InsuranceQualityAnalysisTypeormQueryRepository,
    InsuranceQualityAnalysisResultTypeormCommandRepository,
    SpecialActivityTypeormCommandRepository,
    SpecialActivityTypeormQueryRepository,
    SpecialActivityResultTypeormCommandRepository,
    SpecialActivityDocumentTypeormCommandRepository,
    SpecialActivityInssBenefitTypeormCommandRepository,
    SpecialActivityLegalProceedingTypeormCommandRepository,
    SpecialCategoryRetirementAnalysisTypeormCommandRepository,
    SpecialCategoryRetirementAnalysisTypeormQueryRepository,
    SpecialCategoryRetirementAnalysisPeriodDocumentTypeormCommandRepository,
    SpecialCategoryRetirementAnalysisPeriodDocumentTypeormQueryRepository,
    SpecialCategoryRetirementAnalysisRemunerationTypeormCommandRepository,
    SpecialCategoryRetirementAnalysisRemunerationTypeormQueryRepository,
    SpecialCategoryRetirementAnalysisResultTypeormCommandRepository,
    SpecialCategoryRetirementAnalysisResultTypeormQueryRepository,
    SpecialCategoryRetirementAnalysisResultConversionItemTypeormCommandRepository,
    SpecialCategoryRetirementAnalysisResultConversionItemTypeormQueryRepository,
    SpecialCategoryRetirementAnalysisResultRuleItemTypeormCommandRepository,
    SpecialCategoryRetirementAnalysisResultRuleItemTypeormQueryRepository,
    SpecialCategoryRetirementAnalysisWorkPeriodTypeormCommandRepository,
    SpecialCategoryRetirementAnalysisWorkPeriodTypeormQueryRepository,
    PerCapitaIncomeForBpcAnalysisTypeormCommandRepository,
    PerCapitaIncomeForBpcAnalysisTypeormQueryRepository,
    PerCapitaIncomeForBpcAnalysisBenefitTypeormCommandRepository,
    PerCapitaIncomeForBpcAnalysisDocumentTypeormCommandRepository,
    PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormCommandRepository,
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormCommandRepository,
    PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormCommandRepository,
    PerCapitaIncomeForBpcAnalysisResultTypeormCommandRepository,
    MedicalQuestionGeneratorTypeormCommandRepository,
    MedicalQuestionGeneratorTypeormQueryRepository,
    MedicalQuestionGeneratorDocumentTypeormCommandRepository,
    MedicalQuestionGeneratorInssBenefitTypeormCommandRepository,
    MedicalQuestionGeneratorLegalProceedingTypeormCommandRepository,
    MedicalQuestionGeneratorResultTypeormCommandRepository,
    DisabilityRetirementPlanningTypeormQueryRepository,
    DisabilityRetirementPlanningTypeormCommandRepository,
    DisabilityRetirementPlanningRemunerationTypeormQueryRepository,
    DisabilityRetirementPlanningRemunerationTypeormCommandRepository,
    DisabilityRetirementPlanningResultTypeormCommandRepository,
    DisabilityRetirementPlanningPeriodTypeormCommandRepository,
    DisabilityRetirementPlanningPeriodDisabilityTypeormCommandRepository,
    DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormCommandRepository,
    DisabilityRetirementPlanningPeriodSpecialTimeTypeormCommandRepository,
    DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormCommandRepository,
    DisabilityRetirementPlanningInssBenefitTypeormCommandRepository,
    DisabilityRetirementPlanningLegalProceedingTypeormCommandRepository,
    DisabilityRetirementPlanningDocumentTypeormCommandRepository,
    SpecialRetirementGrantTypeormCommandRepository,
    SpecialRetirementGrantTypeormQueryRepository,
    SpecialRetirementGrantBenefitTypeormCommandRepository,
    SpecialRetirementGrantLegalProceedingTypeormCommandRepository,
    SpecialRetirementGrantDocumentTypeormCommandRepository,
    SpecialRetirementGrantResultTypeormCommandRepository,
    SpecialRetirementGrantPeriodTypeormCommandRepository,
    SpecialRetirementGrantPeriodTypeormQueryRepository,
    SpecialRetirementGrantEarningsHistoryTypeormCommandRepository,
    SpecialRetirementGrantPeriodUnderMinimumTypeormCommandRepository,
    SpecialRetirementGrantPeriodPendingExitDateTypeormCommandRepository,
    SpecialRetirementGrantPeriodOverdueContributionTypeormCommandRepository,
    SpecialRetirementRejectionTypeormCommandRepository,
    SpecialRetirementRejectionTypeormQueryRepository,
    SpecialRetirementRejectionDocumentTypeormCommandRepository,
    SpecialRetirementRejectionInssBenefitTypeormCommandRepository,
    SpecialRetirementRejectionLegalProceedingTypeormCommandRepository,
    SpecialRetirementRejectionResultTypeormCommandRepository,
    SpecialRetirementRejectionWorkPeriodTypeormCommandRepository,
    SpecialRetirementRejectionWorkPeriodDocumentTypeormCommandRepository,
    SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormCommandRepository,
    SpecialRetirementRejectionWorkSpecialPeriodTypeormCommandRepository,
    SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormCommandRepository,
    MiniAdvisorTypeormCommandRepository,
    MiniAdvisorTypeormQueryRepository,
    MiniAdvisorResultTypeormCommandRepository,
    MiniAdvisorResultTypeormQueryRepository,
    SystemActivitiesTypeormCommandRepository,
    SystemActivitiesTypeormQueryRepository,
    TutorialTypeormCommandRepository,
    TutorialTypeormQueryRepository,
    SystemLogTypeormCommandRepository,
    CreditPackTypeormQueryRepository,
    CreditPackTypeormCommandRepository,
    OrganizationCreditPackPurchaseTypeormQueryRepository,
    OrganizationCreditPackPurchaseTypeormCommandRepository,
    OrganizationCustomizationTypeormCommandRepository,
    OrganizationCustomizationTypeormQueryRepository,
    OrganizationCustomizationDocumentHeaderTemplateTypeormCommandRepository,
    OrganizationCustomizationDocumentHeaderTemplateTypeormQueryRepository,
    OrganizationCustomizationDocumentFooterTemplateTypeormCommandRepository,
    OrganizationCustomizationDocumentFooterTemplateTypeormQueryRepository,
    RegulatoryUpdateTypeormQueryRepository,
    RegulatoryUpdateTypeormCommandRepository,
    RegulatoryUpdateEmailPreferenceTypeormQueryRepository,
    RegulatoryUpdateEmailPreferenceTypeormCommandRepository,
    RegulatoryUpdateMonitoredSourceTypeormQueryRepository,
    RegulatoryUpdateMonitoredSourceTypeormCommandRepository,
    DeathBenefitGrantTypeormCommandRepository,
    DeathBenefitGrantTypeormQueryRepository,
    DeathBenefitGrantResultTypeormCommandRepository,
    DeathBenefitGrantDocumentTypeormCommandRepository,
    DeathBenefitGrantInssBenefitTypeormCommandRepository,
    DeathBenefitGrantLegalProceedingTypeormCommandRepository,
    DeathBenefitGrantLegalRepresentativeTypeormCommandRepository,
    DeathBenefitGrantInstitorTypeormCommandRepository,
    DeathBenefitGrantDependentTypeormCommandRepository,
    DeathBenefitGrantDependentDocumentTypeormCommandRepository,
    DeathBenefitGrantPeriodTypeormCommandRepository,
    DeathBenefitGrantPeriodTypeormQueryRepository,
    DeathBenefitGrantPeriodEarningsHistoryTypeormCommandRepository,
    DeathBenefitGrantPeriodDocumentTypeormCommandRepository,
    DeathBenefitGrantTimeAcceleratorTypeormCommandRepository,
    DeathBenefitGrantTimeAcceleratorTypeormQueryRepository,
    DeathBenefitRejectionTypeormCommandRepository,
    DeathBenefitRejectionTypeormQueryRepository,
    DeathBenefitRejectionDependentTypeormCommandRepository,
    DeathBenefitRejectionDependentDocumentTypeormCommandRepository,
    DeathBenefitRejectionDocumentTypeormCommandRepository,
    DeathBenefitRejectionInssBenefitTypeormCommandRepository,
    DeathBenefitRejectionInstitorTypeormCommandRepository,
    DeathBenefitRejectionLegalProceedingTypeormCommandRepository,
    DeathBenefitRejectionLegalRepresentativeTypeormCommandRepository,
    DeathBenefitRejectionPeriodTypeormCommandRepository,
    DeathBenefitRejectionPeriodTypeormQueryRepository,
    DeathBenefitRejectionPeriodDocumentTypeormCommandRepository,
    DeathBenefitRejectionPeriodEarningsHistoryTypeormCommandRepository,
    DeathBenefitRejectionResultTypeormCommandRepository,
    DeathBenefitRejectionTimeAcceleratorTypeormCommandRepository,
    DeathBenefitRejectionTimeAcceleratorTypeormQueryRepository,
    SurvivorPensionAnalysisTypeormCommandRepository,
    SurvivorPensionAnalysisTypeormQueryRepository,
    SurvivorPensionAnalysisCustomerProfileIdentificationTypeormCommandRepository,
    SurvivorPensionAnalysisCustomerProfileIdentificationTypeormQueryRepository,
    SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormCommandRepository,
    SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormCommandRepository,
    SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormQueryRepository,
    SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormCommandRepository,
    SurvivorPensionAnalysisDeceasedWorkHistoryTypeormCommandRepository,
    SurvivorPensionAnalysisDeceasedWorkHistoryTypeormQueryRepository,
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormCommandRepository,
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormQueryRepository,
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormCommandRepository,
    SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormCommandRepository,
    SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormQueryRepository,
    SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormCommandRepository,
    SurvivorPensionAnalysisResultTypeormCommandRepository,
    SurvivorPensionAnalysisResultTypeormQueryRepository,
    SurvivorPensionAnalysisResultRetirementRuleTypeormCommandRepository,
    SurvivorPensionAnalysisResultRetirementRuleTypeormQueryRepository,
    SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormCommandRepository,
    SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormQueryRepository,
    GeneralUrbanRetirementDenialTypeormCommandRepository,
    GeneralUrbanRetirementDenialTypeormQueryRepository,
    GeneralUrbanRetirementDenialDocumentTypeormCommandRepository,
    GeneralUrbanRetirementDenialResultTypeormCommandRepository,
    GeneralUrbanRetirementDenialInssBenefitTypeormCommandRepository,
    GeneralUrbanRetirementDenialPeriodTypeormCommandRepository,
    GeneralUrbanRetirementDenialPeriodDocumentTypeormCommandRepository,
    GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormCommandRepository,
    GeneralUrbanRetirementDenialTimeAcceleratorTypeormCommandRepository,
    GeneralUrbanRetirementDenialTimeAcceleratorTypeormQueryRepository,
    AccidentBenefitRejectionTypeormQueryRepository,
    AccidentBenefitRejectionTypeormCommandRepository,
    AccidentBenefitRejectionResultTypeormCommandRepository,
    AccidentBenefitRejectionDocumentTypeormCommandRepository,
    AccidentBenefitRejectionInssBenefitTypeormCommandRepository,
    AccidentBenefitRejectionEventTypeormCommandRepository,
    AccidentBenefitRejectionEventDocumentTypeormCommandRepository,
    AccidentBenefitRejectionWorkPeriodTypeormCommandRepository,
    AccidentBenefitRejectionWorkPeriodDocumentTypeormCommandRepository,
    AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormCommandRepository,
    MaternityPayRejectionTypeormQueryRepository,
    MaternityPayRejectionTypeormCommandRepository,
    MaternityPayRejectionResultTypeormCommandRepository,
    MaternityPayRejectionInssBenefitTypeormCommandRepository,
    MaternityPayRejectionLegalProceedingTypeormCommandRepository,
    MaternityPayRejectionDocumentTypeormCommandRepository,
    MaternityPayRejectionWorkPeriodTypeormCommandRepository,
    MaternityPayRejectionWorkPeriodDocumentTypeormCommandRepository,
    MaternityPayRejectionWorkPeriodEarningsHistoryTypeormCommandRepository,
    MaternityPayGrantTypeormCommandRepository,
    MaternityPayGrantTypeormQueryRepository,
    MaternityPayGrantDocumentTypeormCommandRepository,
    MaternityPayGrantEarningsHistoryTypeormCommandRepository,
    MaternityPayGrantInssBenefitTypeormCommandRepository,
    MaternityPayGrantLegalProceedingTypeormCommandRepository,
    MaternityPayGrantPeriodTypeormCommandRepository,
    MaternityPayGrantPeriodTypeormQueryRepository,
    MaternityPayGrantPeriodDocumentTypeormCommandRepository,
    MaternityPayGrantResultTypeormCommandRepository,
    DisabilityRetirementPlanningRejectionTypeormCommandRepository,
    DisabilityRetirementPlanningRejectionTypeormQueryRepository,
    DisabilityRetirementPlanningRejectionResultTypeormCommandRepository,
    DisabilityRetirementPlanningRejectionDocumentTypeormCommandRepository,
    DisabilityRetirementPlanningRejectionInssBenefitTypeormCommandRepository,
    DisabilityRetirementPlanningRejectionPeriodTypeormCommandRepository,
    DisabilityRetirementPlanningRejectionPeriodDocumentTypeormCommandRepository,
    DisabilityRetirementPlanningRejectionPeriodEarningsHistoryTypeormCommandRepository,
    DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormCommandRepository,
    DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormQueryRepository,
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
    synchronize: false,
  };

  protected readonly _type = TypeormIndex.name;
}
