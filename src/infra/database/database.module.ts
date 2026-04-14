import { ClassProvider, Module } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AdminTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.command.repository';
import { AdminTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.query.repository';
import { AdministrativeProcedureInssAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.typeorm.query.repository';
import { AdministrativeProcedureInssAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.typeorm.command.repository';
import { AdministrativeRequestGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-request-generator-analysis-result/administrative-request-generator-analysis-result.typeorm.command.repository';
import { AdministrativeRequestGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/administrative-request-generator-analysis-result/administrative-request-generator-analysis-result.typeorm.query.repository';
import { AffiliateBankTransferTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/affiliate-bank-transfer/affiliate-bank-transfer.typeorm.command.repository';
import { AffiliateBankTransferTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/affiliate-bank-transfer/affiliate-bank-transfer.typeorm.query.repository';
import { AffiliateCustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer/affiliate-customer.typeorm.command.repository';
import { AffiliateCustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer/affiliate-customer.typeorm.query.repository';
import { AffiliateCustomerConfigTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer-config/affiliate-customer-config.typeorm.command.repository';
import { AffiliateCustomerConfigTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer-config/affiliate-customer-config.typeorm.query.repository';
import { AffiliateCustomerPaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer-payment-plan/affiliate-customer-payment-plan.typeorm.command.repository';
import { AffiliateCustomerPaymentPlanTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer-payment-plan/affiliate-customer-payment-plan.typeorm.query.repository';
import { AnalysisToolClientTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.command.repository';
import { AnalysisToolClientTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.query.repository';
import { AnalysisToolClientInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.typeorm.command.repository';
import { AnalysisToolClientLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.typeorm.command.repository';
import { AnalysisToolClientLegalProceedingTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.typeorm.query.repository';
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
import { CidTenTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cid-ten/cid-ten.typeorm.command.repository';
import { CidTenTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/cid-ten/cid-ten.typeorm.query.repository';
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
import { CustomerTermsAcceptanceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.command.repository';
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
import { DisabilityRetirementPlanningRemunerationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration.typeorm.command.repository';
import { DisabilityRetirementPlanningRemunerationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration.typeorm.query.repository';
import { DisabilityRetirementPlanningResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-result/disability-retirement-planning-result.typeorm.command.repository';
import { DisabilityRetirementPlanningResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-retirement-planning-result/disability-retirement-planning-result.typeorm.query.repository';
import { FullOpinionGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/full-opinion-generator-analysis-result/full-opinion-generator-analysis-result.typeorm.command.repository';
import { FullOpinionGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/full-opinion-generator-analysis-result/full-opinion-generator-analysis-result.typeorm.query.repository';
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
import { InitialPetitionGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/initial-petition-generator-analysis-result/initial-petition-generator-analysis-result.typeorm.command.repository';
import { InitialPetitionGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/initial-petition-generator-analysis-result/initial-petition-generator-analysis-result.typeorm.query.repository';
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
import { LegalPleadingResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address-result/legal-pleading-result.typeorm.command.repository';
import { LegalPleadingResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address-result/legal-pleading-result.typeorm.query.repository';
import { LegalPleadingDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.command.repository';
import { LegalPleadingDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.query.repository';
import { LegalPleadingDocumentAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.command.repository';
import { LegalPleadingDocumentAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.query.repository';
import { LegalPleadingHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-history/legal-pleading-history.typeorm.command.repository';
import { LegalPleadingHistoryTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-history/legal-pleading-history.typeorm.query.repository';
import { LegalProceedingDetailTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-proceeding-detail/legal-proceeding-detail.typeorm.command.repository';
import { LegalProceedingDetailTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-proceeding-detail/legal-proceeding-detail.typeorm.query.repository';
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
import { OrganizationPaymentPlanTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan/organization-payment-plan.typeorm.query.repository';
import { OrganizationPaymentPlanAffiliateCommissionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.typeorm.command.repository';
import { OrganizationPaymentPlanAffiliateCommissionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.typeorm.query.repository';
import { OrganizationPaymentPlanBankPaymentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.typeorm.command.repository';
import { OrganizationPaymentPlanBankPaymentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.typeorm.query.repository';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.typeorm.command.repository';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.typeorm.query.repository';
import { PaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan/payment-plan.typeorm.command.repository';
import { PaymentPlanTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan/payment-plan.typeorm.query.repository';
import { PaymentPlanEnabledPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource.typeorm.command.repository';
import { PaymentPlanEnabledPaidResourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource.typeorm.query.repository';
import { PaymentPlanPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.command.repository';
import { PaymentPlanPaidResourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.query.repository';
import { PaymentPlanPaidResourceIaConfigTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource-ia-config/payment-plan-paid-resource-ia-config.typeorm.command.repository';
import { PaymentPlanPaidResourceIaConfigTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource-ia-config/payment-plan-paid-resource-ia-config.typeorm.query.repository';
import { PerCapitaIncomeForBpcAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.typeorm.query.repository';
import { PerCapitaIncomeForBpcAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.typeorm.query.repository';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-family-member-document/per-capita-income-for-bpc-analysis-family-member-document.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.typeorm.command.repository';
import { RegulatoryUpdateTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update/regulatory-update.typeorm.command.repository';
import { RegulatoryUpdateTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update/regulatory-update.typeorm.query.repository';
import { RegulatoryUpdateEmailPreferenceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update-email-preference/regulatory-update-email-preference.typeorm.command.repository';
import { RegulatoryUpdateEmailPreferenceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update-email-preference/regulatory-update-email-preference.typeorm.query.repository';
import { RegulatoryUpdateMonitoredSourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update-monitored-source/regulatory-update-monitored-source.typeorm.command.repository';
import { RegulatoryUpdateMonitoredSourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/regulatory-update-monitored-source/regulatory-update-monitored-source.typeorm.query.repository';
import { RetirementPlanningRgpsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps/retirement-planning-rgps.typeorm.command.repository';
import { RetirementPlanningRgpsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps/retirement-planning-rgps.typeorm.query.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.typeorm.command.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps.typeorm.query.repository';
import { RetirementPlanningRgpsEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.typeorm.command.repository';
import { RetirementPlanningRgpsEarningsHistoryTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.typeorm.query.repository';
import { RetirementPlanningRgpsInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-inss-benefit/retirement-planning-rgps-inss-benefit.typeorm.command.repository';
import { RetirementPlanningRgpsLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding.typeorm.command.repository';
import { RetirementPlanningRgpsPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-period/retirement-planning-rgps-period.typeorm.command.repository';
import { RetirementPlanningRgpsPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-period/retirement-planning-rgps-period.typeorm.query.repository';
import { RetirementPlanningRgpsPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.typeorm.command.repository';
import { RetirementPlanningRgpsPeriodDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.typeorm.query.repository';
import { RetirementPlanningRgpsResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-result/retirement-planning-rgps-result.typeorm.command.repository';
import { RetirementPlanningRgpsSpecialPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period.typeorm.command.repository';
import { RetirementPlanningRgpsSpecialPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period.typeorm.query.repository';
import { RetirementPlanningRgpsTimeAcceleratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator.typeorm.command.repository';
import { RetirementPlanningRgpsTimeAcceleratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator.typeorm.query.repository';
import { RetirementPlanningRppsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps/retirement-planning-rpps.typeorm.command.repository';
import { RetirementPlanningRppsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps/retirement-planning-rpps.typeorm.query.repository';
import { RetirementPlanningRppsInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.typeorm.command.repository';
import { RetirementPlanningRppsLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.typeorm.command.repository';
import { RetirementPlanningRppsPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period/retirement-planning-rpps-period.typeorm.command.repository';
import { RetirementPlanningRppsPeriodDisabilityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.typeorm.command.repository';
import { RetirementPlanningRppsPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.typeorm.command.repository';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.typeorm.command.repository';
import { RetirementPlanningRppsRemunerationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.typeorm.command.repository';
import { RetirementPlanningRppsRemunerationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.typeorm.query.repository';
import { RetirementPlanningRppsRemunerationCalculationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.typeorm.command.repository';
import { RetirementPlanningRppsRemunerationCalculationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.typeorm.query.repository';
import { RetirementPlanningRppsResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-result/retirement-planning-rpps-result.typeorm.command.repository';
import { RuralTimelineAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis/rural-timeline-analysis.typeorm.command.repository';
import { RuralTimelineAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis/rural-timeline-analysis.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.typeorm.query.repository';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.command.repository';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.query.repository';
import { RuralTimelineAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-document/rural-timeline-analysis-document.typeorm.command.repository';
import { RuralTimelineAnalysisDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-document/rural-timeline-analysis-document.typeorm.query.repository';
import { RuralTimelineAnalysisInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-inss-benefit/rural-timeline-analysis-inss-benefit.typeorm.command.repository';
import { RuralTimelineAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-legal-proceeding/rural-timeline-analysis-legal-proceeding.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period/rural-timeline-analysis-period.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period/rural-timeline-analysis-period.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodEconomicAspectsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodEconomicAspectsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodPendingExitDateTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodPendingExitDateTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodPropertyTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodPropertyTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.typeorm.query.repository';
import { RuralTimelineAnalysisPeriodResidenceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodResidenceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.typeorm.query.repository';
import { RuralTimelineCnisContributionPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.typeorm.command.repository';
import { RuralTimelineCnisContributionPeriodDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.typeorm.query.repository';
import { RuralTimelineCnisContributionPeriodOverdueContributionTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.typeorm.command.repository';
import { RuralTimelineCnisContributionPeriodOverdueContributionTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.typeorm.query.repository';
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
import { SpeechGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator/speech-generator.typeorm.command.repository';
import { SpeechGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/speech-generator/speech-generator.typeorm.query.repository';
import { SpeechGeneratorBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-benefit/speech-generator-benefit.typeorm.command.repository';
import { SpeechGeneratorDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-document/speech-generator-document.typeorm.command.repository';
import { SpeechGeneratorLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-legal-proceeding/speech-generator-legal-proceeding.typeorm.command.repository';
import { SpeechGeneratorResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-result/speech-generator-result.typeorm.command.repository';
import { SupportAttendantTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/support-attendant/support-attendant.typeorm.command.repository';
import { SupportAttendantTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/support-attendant/support-attendant.typeorm.query.repository';
import { SupportTicketTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/support-ticket/support-ticket.typeorm.command.repository';
import { SupportTicketTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/support-ticket/support-ticket.typeorm.query.repository';
import { SupportTicketAttachmentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/support-ticket-attachment/support-ticket-attachment.typeorm.command.repository';
import { SupportTicketMessageTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/support-ticket-message/support-ticket-message.typeorm.command.repository';
import { SupportTicketMessageTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/support-ticket-message/support-ticket-message.typeorm.query.repository';
import { SystemActivitiesTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/system-activities/system-activities.typeorm.command.repository';
import { SystemActivitiesTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/system-activities/system-activities.typeorm.query.repository';
import { SystemLogTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/system-log/system-log.typeorm.command.repository';
import { SystemLogTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/system-log/system-log.typeorm.query.repository';
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
import { TutorialTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/tutorial/tutorial.typeorm.command.repository';
import { TutorialTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/tutorial/tutorial.typeorm.query.repository';
import { TypeormModule } from '@infra/database/implementation/typeorm/typeorm.module';
import { MapperModule } from '@lib/mapper/mapper.module';
import { AdminCommandRepositoryGateway } from '@module/admin/account/domain/repository/admin/command/admin.command.repository.gateway';
import { AdminQueryRepositoryGateway } from '@module/admin/account/domain/repository/admin/query/admin.query.repository.gateway';
import { SystemLogsQueryRepositoryGateway } from '@module/admin/system-logs/domain/repository/system-logs/query/system-logs.query.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { CustomerAddressQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/query/customer-address.query.repository.gateway';
import { CustomerTermsCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/command/customer-terms.command.repository.gateway';
import { CustomerTermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/query/customer-terms.query.repository.gateway';
import { CustomerTermsAcceptanceCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/command/customer-terms-acceptance.command.repository.gateway';
import { CustomerTermsAcceptanceQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/customer-terms-acceptance.query.repository.gateway';
import { OrganizationCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization/command/organization.command.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AffiliateBankTransferCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/command/affiliate-bank-transfer.command.repository.gateway';
import { AffiliateBankTransferQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/affiliate-bank-transfer.query.repository.gateway';
import { AffiliateCustomerCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/command/affiliate-customer.command.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerConfigCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/command/affiliate-customer-config.command.repository.gateway';
import { AffiliateCustomerConfigQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/query/affiliate-customer-config.query.repository.gateway';
import { AffiliateCustomerPaymentPlanCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/command/affiliate-customer-payment-plan.command.repository.gateway';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/command/analysis-tool-client-inss-benefit.command.repository.gateway';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CidTenCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/command/cid-ten.command.repository.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { SystemActivitiesCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/system-activities/command/system-activities.command.repository.gateway';
import { SystemActivitiesQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/system-activities/query/system-activities.query.repository.gateway';
import { AdministrativeProcedureInssAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/command/administrative-procedure-inss-analysis.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/administrative-procedure-inss-analysis.query.repository.gateway';
import { AdministrativeProcedureInssAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-benefit/command/administrative-procedure-inss-analysis-benefit.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-document/command/administrative-procedure-inss-analysis-document.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-legal-proceeding/command/administrative-procedure-inss-analysis-legal-proceeding.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-result/command/administrative-procedure-inss-analysis-result.command.repository.gateway';
import { AudienceQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/command/audience-question-generator.command.repository.gateway';
import { AudienceQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/audience-question-generator.query.repository.gateway';
import { AudienceQuestionGeneratorBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-benefit/command/audience-question-generator-benefit.command.repository.gateway';
import { AudienceQuestionGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-document/command/audience-question-generator-document.command.repository.gateway';
import { AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-legal-proceeding/command/audience-question-generator-legal-proceeding.command.repository.gateway';
import { AudienceQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-result/command/audience-question-generator-result.command.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis-inss-benefit/command/cnis-fast-analysis-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis-legal-proceeding/command/cnis-fast-analysis-legal-proceeding.command.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { DeathBenefitGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/command/death-benefit-grant.command.repository.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantDependentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-dependent/command/death-benefit-grant-dependent.command.repository.gateway';
import { DeathBenefitGrantDependentDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-dependent-document/command/death-benefit-grant-dependent-document.command.repository.gateway';
import { DeathBenefitGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-document/command/death-benefit-grant-document.command.repository.gateway';
import { DeathBenefitGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-inss-benefit/command/death-benefit-grant-inss-benefit.command.repository.gateway';
import { DeathBenefitGrantInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-institutor/command/death-benefit-grant-institutor.command.repository.gateway';
import { DeathBenefitGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-proceeding/command/death-benefit-grant-legal-proceeding.command.repository.gateway';
import { DeathBenefitGrantLegalRepresentativeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-representative/command/death-benefit-grant-legal-representative.command.repository.gateway';
import { DeathBenefitGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/command/death-benefit-grant-period.command.repository.gateway';
import { DeathBenefitGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/query/death-benefit-grant-period.query.repository.gateway';
import { DeathBenefitGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period-document/command/death-benefit-grant-period-document.command.repository.gateway';
import { DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period-earnings-history/command/death-benefit-grant-period-earnings-history.command.repository.gateway';
import { DeathBenefitGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-result/command/death-benefit-grant-result.command.repository.gateway';
import { DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/command/death-benefit-grant-time-accelerator.command.repository.gateway';
import { DeathBenefitGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/query/death-benefit-grant-time-accelerator.query.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/command/disability-assessment-for-bpc-analysis.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/disability-assessment-for-bpc-analysis.query.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-benefit/command/disability-assessment-for-bpc-analysis-benefit.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-document/command/disability-assessment-for-bpc-analysis-document.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-legal-proceeding/command/disability-assessment-for-bpc-analysis-legal-proceeding.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-result/command/disability-assessment-for-bpc-analysis-result.command.repository.gateway';
import { DisabilityRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/command/disability-retirement-planning.command.repository.gateway';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-document/command/disability-retirement-planning-document.command.repository.gateway';
import { DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-inss-benefit/command/disability-retirement-planning-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-legal-proceeding/command/disability-retirement-planning-legal-proceeding.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period/command/disability-retirement-planning-period.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability/command/disability-retirement-planning-period-disability.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability-document/command/disability-retirement-planning-period-disability-document.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time/command/disability-retirement-planning-period-special-time.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time-document/command/disability-retirement-planning-period-special-time-document.command.repository.gateway';
import { DisabilityRetirementPlanningRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/command/disability-retirement-planning-remuneration.command.repository.gateway';
import { DisabilityRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/disability-retirement-planning-remuneration.query.repository.gateway';
import { DisabilityRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/command/disability-retirement-planning-result.command.repository.gateway';
import { DisabilityRetirementPlanningResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/query/disability-retirement-planning-result.query.repository.gateway';
import { DisabilityRetirementPlanningGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/command/disability-retirement-planning-grant.command.repository.gateway';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/command/disability-retirement-planning-grant-disability-period.command.repository.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/query/disability-retirement-planning-grant-disability-period.query.repository.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period-document/command/disability-retirement-planning-grant-disability-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-document/command/disability-retirement-planning-grant-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-inss-benefit/command/disability-retirement-planning-grant-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-legal-proceeding/command/disability-retirement-planning-grant-legal-proceeding.command.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/command/disability-retirement-planning-grant-period.command.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/query/disability-retirement-planning-grant-period.query.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period-document/command/disability-retirement-planning-grant-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period-earnings-history/command/disability-retirement-planning-grant-period-earnings-history.command.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period-earnings-history/query/disability-retirement-planning-grant-period-earnings-history.query.repository.gateway';
import { DisabilityRetirementPlanningGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-result/command/disability-retirement-planning-grant-result.command.repository.gateway';
import { DisabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/command/disability-retirement-planning-grant-time-accelerator.command.repository.gateway';
import { DisabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/query/disability-retirement-planning-grant-time-accelerator.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/command/general-urban-retirement-analysis.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-document/command/general-urban-retirement-analysis-document.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-legal-proceeding/command/general-urban-retirement-analysis-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period/command/general-urban-retirement-analysis-period.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-disability/command/general-urban-retirement-analysis-period-disability.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-document/command/general-urban-retirement-analysis-period-document.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-special-time/command/general-urban-retirement-analysis-period-special-time.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/command/general-urban-retirement-analysis-remuneration.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/general-urban-retirement-analysis-remuneration.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-result/command/general-urban-retirement-analysis-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/command/general-urban-retirement-grant.command.repository.gateway';
import { GeneralUrbanRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/general-urban-retirement-grant.query.repository.gateway';
import { GeneralUrbanRetirementGrantAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/command/general-urban-retirement-grant-analysis-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/query/general-urban-retirement-grant-analysis-result.query.repository.gateway';
import { GeneralUrbanRetirementGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-earnings-history/command/general-urban-retirement-grant-earnings-history.command.repository.gateway';
import { GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-earnings-history/query/general-urban-retirement-grant-earnings-history.query.repository.gateway';
import { GeneralUrbanRetirementGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-inss-benefit/command/general-urban-retirement-grant-inss-benefit.command.repository.gateway';
import { GeneralUrbanRetirementGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-legal-proceeding/command/general-urban-retirement-grant-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/command/general-urban-retirement-grant-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/general-urban-retirement-grant-period.query.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period-document/command/general-urban-retirement-grant-period-document.command.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period-document/query/general-urban-retirement-grant-period-document.query.repository.gateway';
import { GeneralUrbanRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/command/general-urban-retirement-grant-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/query/general-urban-retirement-grant-result.query.repository.gateway';
import { GeneralUrbanRetirementGrantSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-special-period/command/general-urban-retirement-grant-special-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-special-period/query/general-urban-retirement-grant-special-period.query.repository.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/command/general-urban-retirement-grant-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/query/general-urban-retirement-grant-time-accelerator.query.repository.gateway';
import { InsuranceQualityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/command/insurance-quality-analysis.command.repository.gateway';
import { InsuranceQualityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/insurance-quality-analysis.query.repository.gateway';
import { InsuranceQualityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-document/command/insurance-quality-analysis-document.command.repository.gateway';
import { InsuranceQualityAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-inss-benefit/command/insurance-quality-analysis-inss-benefit.command.repository.gateway';
import { InsuranceQualityAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-legal-proceeding/command/insurance-quality-analysis-legal-proceeding.command.repository.gateway';
import { InsuranceQualityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-result/command/insurance-quality-analysis-result.command.repository.gateway';
import { JudicialCaseAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/command/judicial-case-analysis.command.repository.gateway';
import { JudicialCaseAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/judicial-case-analysis.query.repository.gateway';
import { JudicialCaseAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-benefit/command/judicial-case-analysis-benefit.command.repository.gateway';
import { JudicialCaseAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-document/command/judicial-case-analysis-document.command.repository.gateway';
import { JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-legal-proceeding/command/judicial-case-analysis-legal-proceeding.command.repository.gateway';
import { JudicialCaseAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-result/command/judicial-case-analysis-result.command.repository.gateway';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingAddressCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-address/command/legal-pleading-address.repository.gateway';
import { LegalPleadingAddressQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-address/query/legal-pleading-address.query.repository.gateway';
import { LegalPleadingDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document/command/legal-pleading-document.repository.gateway';
import { LegalPleadingDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document/query/legal-pleading-document.query.repository.gateway';
import { LegalPleadingDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document-analysis/command/legal-pleading-document-analysis.repository.gateway';
import { LegalPleadingDocumentAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document-analysis/query/legal-pleading-document-analysis.query.repository.gateway';
import { LegalPleadingHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-history/command/legal-pleading-history.command.repository.gateway';
import { LegalPleadingHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-history/query/legal-pleading-history.query.repository.gateway';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-result/query/legal-pleading-result.query.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/command/medical-and-social-report-objection-generator-analysis.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/medical-and-social-report-objection-generator-analysis.query.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-benefit/command/medical-and-social-report-objection-generator-analysis-benefit.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-document/command/medical-and-social-report-objection-generator-analysis-document.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-legal-proceeding/command/medical-and-social-report-objection-generator-analysis-legal-proceeding.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-result/command/medical-and-social-report-objection-generator-analysis-result.command.repository.gateway';
import { MedicalQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/command/medical-question-generator.command.repository.gateway';
import { MedicalQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/medical-question-generator.query.repository.gateway';
import { MedicalQuestionGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-document/command/medical-question-generator-document.command.repository.gateway';
import { MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-inss-benefit/command/medical-question-generator-inss-benefit.command.repository.gateway';
import { MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-legal-proceeding/command/medical-question-generator-legal-proceeding.command.repository.gateway';
import { MedicalQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-result/command/medical-question-generator-result.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/command/per-capita-income-for-bpc-analysis.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/per-capita-income-for-bpc-analysis.query.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-benefit/command/per-capita-income-for-bpc-analysis-benefit.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-document/command/per-capita-income-for-bpc-analysis-document.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-family-member/command/per-capita-income-for-bpc-analysis-family-member.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberQueryRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-family-member/query/per-capita-income-for-bpc-analysis-family-member.query.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-family-member-document/command/per-capita-income-for-bpc-analysis-family-member-document.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-legal-proceeding/command/per-capita-income-for-bpc-analysis-legal-proceeding.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-result/command/per-capita-income-for-bpc-analysis-result.command.repository.gateway';
import { RetirementPlanningRgpsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/command/retirement-planning-rgps.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-analysis-result/command/retirement-planning-rgps-analysis-result.repository.gateway';
import { RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-analysis-result/query/retirement-planning-rgps-analysis-result.query.repository.gateway.ts';
import { RetirementPlanningRgpsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-earnings-history/command/retirement-planning-rgps-earnings-history.command.repository.gateway';
import { RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-earnings-history/query/retirement-planning-rgps-earnings-history.query.repository.gateway';
import { RetirementPlanningRgpsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-inss-benefit/command/retirement-planning-rgps-inss-benefit.command.repository.gateway';
import { RetirementPlanningRgpsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-legal-proceeding/command/retirement-planning-rgps-legal-proceeding.command.repository.gateway';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period-document/command/retirement-planning-rgps-period-document.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period-document/query/retirement-planning-rgps-period-document.query.repository.gateway';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { RetirementPlanningRgpsSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-special-period/command/retirement-planning-rgps-special-period.repository.gateway';
import { RetirementPlanningRgpsSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-special-period/query/retirement-planning-rgps-special-period.query.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-time-accelerator/command/retirement-planning-rgps-time-accelerator.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-time-accelerator/query/retirement-planning-rgps-time-accelerator.query.repository.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-inss-benefit/command/retirement-planning-rpps-inss-benefit.command.repository.gateway';
import { RetirementPlanningRppsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-legal-proceeding/command/retirement-planning-rpps-legal-proceeding.command.repository.gateway';
import { RetirementPlanningRppsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period/command/retirement-planning-rpps-period.command.repository.gateway';
import { RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-disability/command/retirement-planning-rpps-period-disability.command.repository.gateway';
import { RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-document/command/retirement-planning-rpps-period-document.command.repository.gateway';
import { RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-special-time/command/retirement-planning-rpps-period-special-time.command.repository.gateway';
import { RetirementPlanningRppsRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration/command/retirement-planning-rpps-remuneration.command.repository.gateway';
import { RetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.query.repository.gateway';
import { RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration-calculation/command/retirement-planning-rpps-remuneration-calculation.command.repository.gateway';
import { RetirementPlanningRppsRemunerationCalculationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration-calculation/query/retirement-planning-rpps-remuneration-calculation.query.repository.gateway';
import { RetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-result/command/retirement-planning-rpps-result.command.repository.gateway';
import { RuralTimelineAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/command/rural-timeline-analysis.command.repository.gateway';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/command/rural-timeline-analysis-cnis-contribution-period.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-adjustment/command/rural-timeline-analysis-cnis-contribution-period-adjustment.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-adjustment/query/rural-timeline-analysis-cnis-contribution-period-adjustment.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/command/rural-timeline-analysis-cnis-contribution-period-under-minimum.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/query/rural-timeline-analysis-cnis-contribution-period-under-minimum.query.repository.gateway';
import { RuralTimelineAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/command/rural-timeline-analysis-document.command.repository.gateway';
import { RuralTimelineAnalysisDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/query/rural-timeline-analysis-document.query.repository.gateway';
import { RuralTimelineAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-inss-benefit/command/rural-timeline-analysis-inss-benefit.command.repository.gateway';
import { RuralTimelineAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-legal-proceeding/command/rural-timeline-analysis-legal-proceeding.command.repository.gateway';
import { RuralTimelineAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/command/rural-timeline-analysis-period.command.repository.gateway';
import { RuralTimelineAnalysisPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/query/rural-timeline-analysis-period.query.repository.gateway';
import { RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/command/rural-timeline-analysis-period-document.command.repository.gateway';
import { RuralTimelineAnalysisPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/query/rural-timeline-analysis-period-document.query.repository.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/command/rural-timeline-analysis-period-economic-aspects.command.repository.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/query/rural-timeline-analysis-period-economic-aspects.query.repository.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/command/rural-timeline-analysis-period-family-group-member.command.repository.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/query/rural-timeline-analysis-period-family-group-member.query.repository.gateway';
import { RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-pending-exit-date/command/rural-timeline-analysis-period-pending-exit-date.command.repository.gateway';
import { RuralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-pending-exit-date/query/rural-timeline-analysis-period-pending-exit-date.query.repository.gateway';
import { RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-property/command/rural-timeline-analysis-period-property.command.repository.gateway';
import { RuralTimelineAnalysisPeriodPropertyQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-property/query/rural-timeline-analysis-period-property.query.repository.gateway';
import { RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-residence/command/rural-timeline-analysis-period-residence.command.repository.gateway';
import { RuralTimelineAnalysisPeriodResidenceQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-residence/query/rural-timeline-analysis-period-residence.query.repository.gateway';
import { RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/command/rural-timeline-cnis-contribution-period-document.command.repository.gateway';
import { RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/query/rural-timeline-cnis-contribution-period-document.query.repository.gateway';
import { RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-overdue-contribution/command/rural-timeline-cnis-contribution-period-overdue-contribution.command.repository.gateway';
import { RuralTimelineCnisContributionPeriodOverdueContributionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-overdue-contribution/query/rural-timeline-cnis-contribution-period-overdue-contribution.query.repository.gateway';
import { SpecialActivityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/command/special-activity-analysis.command.repository.gateway';
import { SpecialActivityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/special-activity-analysis.query.repository.gateway';
import { SpecialActivityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-document/command/special-activity-analysis-document.command.repository.gateway';
import { SpecialActivityAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-inss-benefit/command/special-activity-analysis-inss-benefit.command.repository.gateway';
import { SpecialActivityAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-legal-proceeding/command/special-activity-analysis-legal-proceeding.command.repository.gateway';
import { SpecialActivityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-result/command/special-activity-analysis-result.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/command/special-category-retirement-analysis.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/command/special-category-retirement-analysis-period-document.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/query/special-category-retirement-analysis-period-document.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/command/special-category-retirement-analysis-remuneration.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/special-category-retirement-analysis-remuneration.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/command/special-category-retirement-analysis-result.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/query/special-category-retirement-analysis-result.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultConversionItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-conversion-item/command/special-category-retirement-analysis-result-conversion-item.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultConversionItemQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-conversion-item/query/special-category-retirement-analysis-result-conversion-item.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/command/special-category-retirement-analysis-result-rule-item.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultRuleItemQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/query/special-category-retirement-analysis-result-rule-item.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/command/special-category-retirement-analysis-work-period.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/special-category-retirement-analysis-work-period.query.repository.gateway';
import { SpeechGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/command/speech-generator.command.repository.gateway';
import { SpeechGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/speech-generator.query.repository.gateway';
import { SpeechGeneratorBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-benefit/command/speech-generator-benefit.command.repository.gateway';
import { SpeechGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-document/command/speech-generator-document.command.repository.gateway';
import { SpeechGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-legal-proceeding/command/speech-generator-legal-proceeding.command.repository.gateway';
import { SpeechGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/command/speech-generator-result.command.repository.gateway';
import { TeacherRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-document/command/teacher-retirement-planning-document.command.repository.gateway';
import { TeacherRetirementPlanningInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-inss-benefit/command/teacher-retirement-planning-inss-benefit.command.repository.gateway';
import { TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-legal-proceeding/command/teacher-retirement-planning-legal-proceeding.command.repository.gateway';
import { TeacherRetirementPlanningPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period/command/teacher-retirement-planning-period.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item/command/teacher-retirement-planning-period-item.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item-document/command/teacher-retirement-planning-period-item-document.command.repository.gateway';
import { TeacherRetirementPlanningRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/command/teacher-retirement-planning-remuneration.command.repository.gateway';
import { TeacherRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/teacher-retirement-planning-remuneration.query.repository.gateway';
import { TeacherRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { CreditPackCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/command/credit-pack.command.repository.gateway';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { OrganizationCreditPackPurchaseCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/organization-credit-pack-purchase/command/organization-credit-pack-purchase.command.repository.gateway';
import { OrganizationCreditPackPurchaseQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/organization-credit-pack-purchase/query/organization-credit-pack-purchase.query.repository.gateway';
import { AdministrativeRequestGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/command/administrative-request-generator.command.repository.gateway';
import { AdministrativeRequestGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/query/administrative-request-generator.query.repository.gateway';
import { FullOpinionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/command/full-opinion-generator.command.repository.gateway';
import { FullOpinionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/query/full-opinion-generator.query.repository.gateway';
import { InitialPetitionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/command/initial-petition-generator.command.repository.gateway';
import { InitialPetitionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/query/initial-petition-generator.query.repository.gateway';
import { LegalProceedingDetailCommandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { MiniAdvisorCommandRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor/command/mini-advisor.command.repository.gateway';
import { MiniAdvisorQueryRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor/query/mini-advisor.query.repository.gateway';
import { MiniAdvisorResultCommandRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/command/mini-advisor-result.command.repository.gateway';
import { MiniAdvisorResultQueryRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/query/mini-advisor-result.query.repository.gateway';
import { OrganizationCreditPurchaseCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/command/organization-credit-purchase.command.repository.gateway';
import { OrganizationCreditPurchaseQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/organization-credit-purchase.query.repository.gateway';
import { OrganizationCreditUsageCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/command/organization-credit-usage.command.repository.gateway';
import { OrganizationCreditUsageQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/query/organization-credit-usage.query.repository.gateway';
import { OrganizationCustomizationCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/command/organization-customization.command.repository.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/command/organization-customization-document-footer-template.command.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/command/organization-customization-document-header-template.command.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/command/organization-payment-plan-affiliate-commission.command.repository.gateway';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { OrganizationPaymentPlanBankPaymentCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/command/organization-payment-plan-bank-payment.command.repository.gateway';
import { OrganizationPaymentPlanBankPaymentQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/organization-payment-plan-bank-payment.query.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/command/organization-payment-plan-enabled-paid-resource.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/query/organization-payment-plan-enabled-paid-resource.query.repository.gateway';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository.gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/command/payment-plan-enabled-paid-resource.command.repository.gateway';
import { PaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/payment-plan-enabled-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/command/payment-plan-paid-resource.command.repository.gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceIaConfigCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/command/payment-plan-paid-resource-ia-config.command.repository.gateway';
import { PaymentPlanPaidResourceIaConfigQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/payment-plan-paid-resource-ia-config.query.repository.gateway';
import { RegulatoryUpdateCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/command/regulatory-update.command.repository.gateway';
import { RegulatoryUpdateQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/regulatory-update.query.repository.gateway';
import { RegulatoryUpdateEmailPreferenceCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/command/regulatory-update-email-preference.command.repository.gateway';
import { RegulatoryUpdateEmailPreferenceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/regulatory-update-email-preference.query.repository.gateway';
import { RegulatoryUpdateMonitoredSourceCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/command/regulatory-update-monitored-source.command.repository.gateway';
import { RegulatoryUpdateMonitoredSourceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/regulatory-update-monitored-source.query.repository.gateway';
import { TutorialCommandRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/command/tutorial.command.repository.gateway';
import { TutorialQueryRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/query/tutorial.query.repository.gateway';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { BankTransferCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/command/bank-transfer.command.repository.gateway';
import { BankTransferQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/query/bank-transfer.query.repository.gateway';
import { SupportAttendantCommandRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/command/support-attendant.command.repository.gateway';
import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportTicketCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketAttachmentCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-attachment/command/support-ticket-attachment.command.repository.gateway';
import { SupportTicketMessageCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/command/support-ticket-message.command.repository.gateway';
import { SupportTicketMessageQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-message/query/support-ticket-message.query.repository.gateway';
import { SystemLogCommandGateway } from '@shared/system/system-log/system-log.command.gateway';

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
    provide: AudienceQuestionGeneratorCommandRepositoryGateway,
    useClass: AudienceQuestionGeneratorTypeormCommandRepository,
  },
  {
    provide: AudienceQuestionGeneratorQueryRepositoryGateway,
    useClass: AudienceQuestionGeneratorTypeormQueryRepository,
  },
  {
    provide: AudienceQuestionGeneratorDocumentCommandRepositoryGateway,
    useClass: AudienceQuestionGeneratorDocumentTypeormCommandRepository,
  },
  {
    provide: AudienceQuestionGeneratorBenefitCommandRepositoryGateway,
    useClass: AudienceQuestionGeneratorBenefitTypeormCommandRepository,
  },
  {
    provide: AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway,
    useClass: AudienceQuestionGeneratorLegalProceedingTypeormCommandRepository,
  },
  {
    provide: AudienceQuestionGeneratorResultCommandRepositoryGateway,
    useClass: AudienceQuestionGeneratorResultTypeormCommandRepository,
  },
  {
    provide: JudicialCaseAnalysisCommandRepositoryGateway,
    useClass: JudicialCaseAnalysisTypeormCommandRepository,
  },
  {
    provide: JudicialCaseAnalysisQueryRepositoryGateway,
    useClass: JudicialCaseAnalysisTypeormQueryRepository,
  },
  {
    provide: JudicialCaseAnalysisBenefitCommandRepositoryGateway,
    useClass: JudicialCaseAnalysisBenefitTypeormCommandRepository,
  },
  {
    provide: JudicialCaseAnalysisDocumentCommandRepositoryGateway,
    useClass: JudicialCaseAnalysisDocumentTypeormCommandRepository,
  },
  {
    provide: JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway,
    useClass: JudicialCaseAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide: JudicialCaseAnalysisResultCommandRepositoryGateway,
    useClass: JudicialCaseAnalysisResultTypeormCommandRepository,
  },
  {
    provide: MedicalQuestionGeneratorCommandRepositoryGateway,
    useClass: MedicalQuestionGeneratorTypeormCommandRepository,
  },
  {
    provide: MedicalQuestionGeneratorQueryRepositoryGateway,
    useClass: MedicalQuestionGeneratorTypeormQueryRepository,
  },
  {
    provide: MedicalQuestionGeneratorDocumentCommandRepositoryGateway,
    useClass: MedicalQuestionGeneratorDocumentTypeormCommandRepository,
  },
  {
    provide: MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway,
    useClass: MedicalQuestionGeneratorInssBenefitTypeormCommandRepository,
  },
  {
    provide: MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway,
    useClass: MedicalQuestionGeneratorLegalProceedingTypeormCommandRepository,
  },
  {
    provide: MedicalQuestionGeneratorResultCommandRepositoryGateway,
    useClass: MedicalQuestionGeneratorResultTypeormCommandRepository,
  },
  {
    provide: AdministrativeProcedureInssAnalysisCommandRepositoryGateway,
    useClass: AdministrativeProcedureInssAnalysisTypeormCommandRepository,
  },
  {
    provide: AdministrativeProcedureInssAnalysisQueryRepositoryGateway,
    useClass: AdministrativeProcedureInssAnalysisTypeormQueryRepository,
  },
  {
    provide: AdministrativeProcedureInssAnalysisBenefitCommandRepositoryGateway,
    useClass:
      AdministrativeProcedureInssAnalysisBenefitTypeormCommandRepository,
  },
  {
    provide:
      AdministrativeProcedureInssAnalysisDocumentCommandRepositoryGateway,
    useClass:
      AdministrativeProcedureInssAnalysisDocumentTypeormCommandRepository,
  },
  {
    provide:
      AdministrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway,
    useClass:
      AdministrativeProcedureInssAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide: AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway,
    useClass: AdministrativeProcedureInssAnalysisResultTypeormCommandRepository,
  },
  {
    provide: DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway,
    useClass: DisabilityAssessmentForBpcAnalysisTypeormCommandRepository,
  },
  {
    provide: DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway,
    useClass: DisabilityAssessmentForBpcAnalysisTypeormQueryRepository,
  },
  {
    provide: DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway,
    useClass: DisabilityAssessmentForBpcAnalysisBenefitTypeormCommandRepository,
  },
  {
    provide: DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway,
    useClass:
      DisabilityAssessmentForBpcAnalysisDocumentTypeormCommandRepository,
  },
  {
    provide:
      DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway,
    useClass:
      DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide: DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway,
    useClass: DisabilityAssessmentForBpcAnalysisResultTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningQueryRepositoryGateway,
    useClass: DisabilityRetirementPlanningTypeormQueryRepository,
  },
  {
    provide: DisabilityRetirementPlanningDocumentCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningDocumentTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningInssBenefitTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningLegalProceedingTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningPeriodCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningPeriodTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningPeriodDisabilityCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningPeriodDisabilityTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningPeriodDisabilityDocumentCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningPeriodSpecialTimeCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningPeriodSpecialTimeTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningRemunerationCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningRemunerationTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningRemunerationQueryRepositoryGateway,
    useClass: DisabilityRetirementPlanningRemunerationTypeormQueryRepository,
  },
  {
    provide: DisabilityRetirementPlanningResultCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningResultTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningResultQueryRepositoryGateway,
    useClass: DisabilityRetirementPlanningResultTypeormQueryRepository,
  },
  {
    provide:
      MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway,
    useClass:
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormCommandRepository,
  },
  {
    provide:
      MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
    useClass:
      MedicalAndSocialReportObjectionGeneratorAnalysisTypeormQueryRepository,
  },
  {
    provide:
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway,
    useClass:
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormCommandRepository,
  },
  {
    provide:
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway,
    useClass:
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormCommandRepository,
  },
  {
    provide:
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway,
    useClass:
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide:
      MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway,
    useClass:
      MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormCommandRepository,
  },
  {
    provide: InitialPetitionGeneratorCommandRepositoryGateway,
    useClass: InitialPetitionGeneratorTypeormCommandRepository,
  },
  {
    provide: InitialPetitionGeneratorQueryRepositoryGateway,
    useClass: InitialPetitionGeneratorTypeormQueryRepository,
  },
  {
    provide: AdministrativeRequestGeneratorCommandRepositoryGateway,
    useClass: AdministrativeRequestGeneratorTypeormCommandRepository,
  },
  {
    provide: AdministrativeRequestGeneratorQueryRepositoryGateway,
    useClass: AdministrativeRequestGeneratorTypeormQueryRepository,
  },
  {
    provide: FullOpinionGeneratorCommandRepositoryGateway,
    useClass: FullOpinionGeneratorTypeormCommandRepository,
  },
  {
    provide: FullOpinionGeneratorQueryRepositoryGateway,
    useClass: FullOpinionGeneratorTypeormQueryRepository,
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
    provide: AffiliateCustomerCommandRepositoryGateway,
    useClass: AffiliateCustomerTypeormCommandRepository,
  },
  {
    provide: AffiliateCustomerQueryRepositoryGateway,
    useClass: AffiliateCustomerTypeormQueryRepository,
  },
  {
    provide: AffiliateCustomerConfigCommandRepositoryGateway,
    useClass: AffiliateCustomerConfigTypeormCommandRepository,
  },
  {
    provide: AffiliateCustomerConfigQueryRepositoryGateway,
    useClass: AffiliateCustomerConfigTypeormQueryRepository,
  },
  {
    provide: AffiliateCustomerPaymentPlanCommandRepositoryGateway,
    useClass: AffiliateCustomerPaymentPlanTypeormCommandRepository,
  },
  {
    provide: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
    useClass: AffiliateCustomerPaymentPlanTypeormQueryRepository,
  },
  {
    provide: AffiliateBankTransferCommandRepositoryGateway,
    useClass: AffiliateBankTransferTypeormCommandRepository,
  },
  {
    provide: AffiliateBankTransferQueryRepositoryGateway,
    useClass: AffiliateBankTransferTypeormQueryRepository,
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
    provide: OrganizationCreditPurchaseCommandRepositoryGateway,
    useClass: OrganizationCreditPurchaseTypeormCommandRepository,
  },
  {
    provide: OrganizationCreditPurchaseQueryRepositoryGateway,
    useClass: OrganizationCreditPurchaseTypeormQueryRepository,
  },
  {
    provide: OrganizationCreditUsageCommandRepositoryGateway,
    useClass: OrganizationCreditUsageTypeormCommandRepository,
  },
  {
    provide: OrganizationCreditUsageQueryRepositoryGateway,
    useClass: OrganizationCreditUsageTypeormQueryRepository,
  },
  {
    provide: CnisFastAnalysisCommandRepositoryGateway,
    useClass: CnisFastAnalysisTypeormCommandRepository,
  },
  {
    provide: InsuranceQualityAnalysisCommandRepositoryGateway,
    useClass: InsuranceQualityAnalysisTypeormCommandRepository,
  },
  {
    provide: InsuranceQualityAnalysisDocumentCommandRepositoryGateway,
    useClass: InsuranceQualityAnalysisDocumentTypeormCommandRepository,
  },
  {
    provide: InsuranceQualityAnalysisInssBenefitCommandRepositoryGateway,
    useClass: InsuranceQualityAnalysisInssBenefitTypeormCommandRepository,
  },
  {
    provide: InsuranceQualityAnalysisLegalProceedingCommandRepositoryGateway,
    useClass: InsuranceQualityAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide: InsuranceQualityAnalysisQueryRepositoryGateway,
    useClass: InsuranceQualityAnalysisTypeormQueryRepository,
  },
  {
    provide: InsuranceQualityAnalysisResultCommandRepositoryGateway,
    useClass: InsuranceQualityAnalysisResultTypeormCommandRepository,
  },
  {
    provide: InsuranceQualityAnalysisInssBenefitCommandRepositoryGateway,
    useClass: InsuranceQualityAnalysisInssBenefitTypeormCommandRepository,
  },
  {
    provide: InsuranceQualityAnalysisLegalProceedingCommandRepositoryGateway,
    useClass: InsuranceQualityAnalysisLegalProceedingTypeormCommandRepository,
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
    provide: SpeechGeneratorCommandRepositoryGateway,
    useClass: SpeechGeneratorTypeormCommandRepository,
  },
  {
    provide: SpeechGeneratorBenefitCommandRepositoryGateway,
    useClass: SpeechGeneratorBenefitTypeormCommandRepository,
  },
  {
    provide: SpeechGeneratorLegalProceedingCommandRepositoryGateway,
    useClass: SpeechGeneratorLegalProceedingTypeormCommandRepository,
  },
  {
    provide: SpeechGeneratorDocumentCommandRepositoryGateway,
    useClass: SpeechGeneratorDocumentTypeormCommandRepository,
  },
  {
    provide: SpeechGeneratorQueryRepositoryGateway,
    useClass: SpeechGeneratorTypeormQueryRepository,
  },
  {
    provide: SpeechGeneratorResultCommandRepositoryGateway,
    useClass: SpeechGeneratorResultTypeormCommandRepository,
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
    provide: LegalPleadingHistoryCommandRepositoryGateway,
    useClass: LegalPleadingHistoryTypeormCommandRepository,
  },
  {
    provide: LegalPleadingHistoryQueryRepositoryGateway,
    useClass: LegalPleadingHistoryTypeormQueryRepository,
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
    provide: SystemActivitiesCommandRepositoryGateway,
    useClass: SystemActivitiesTypeormCommandRepository,
  },
  {
    provide: SystemActivitiesQueryRepositoryGateway,
    useClass: SystemActivitiesTypeormQueryRepository,
  },
  {
    provide: SupportAttendantQueryRepositoryGateway,
    useClass: SupportAttendantTypeormQueryRepository,
  },
  {
    provide: SupportTicketQueryRepositoryGateway,
    useClass: SupportTicketTypeormQueryRepository,
  },
  {
    provide: SupportTicketCommandRepositoryGateway,
    useClass: SupportTicketTypeormCommandRepository,
  },
  {
    provide: SupportTicketAttachmentCommandRepositoryGateway,
    useClass: SupportTicketAttachmentTypeormCommandRepository,
  },
  {
    provide: SupportTicketMessageQueryRepositoryGateway,
    useClass: SupportTicketMessageTypeormQueryRepository,
  },
  {
    provide: SupportTicketMessageCommandRepositoryGateway,
    useClass: SupportTicketMessageTypeormCommandRepository,
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
    provide: OrganizationPaymentPlanCommandRepositoryGateway,
    useClass: OrganizationPaymentPlanTypeormCommandRepository,
  },
  {
    provide: OrganizationPaymentPlanQueryRepositoryGateway,
    useClass: OrganizationPaymentPlanTypeormQueryRepository,
  },
  {
    provide: PaymentPlanCommandRepositoryGateway,
    useClass: PaymentPlanTypeormCommandRepository,
  },
  {
    provide: PaymentPlanQueryRepositoryGateway,
    useClass: PaymentPlanTypeormQueryRepository,
  },
  {
    provide: PaymentPlanPaidResourceCommandRepositoryGateway,
    useClass: PaymentPlanPaidResourceTypeormCommandRepository,
  },
  {
    provide: PaymentPlanPaidResourceQueryRepositoryGateway,
    useClass: PaymentPlanPaidResourceTypeormQueryRepository,
  },
  {
    provide: PaymentPlanEnabledPaidResourceCommandRepositoryGateway,
    useClass: PaymentPlanEnabledPaidResourceTypeormCommandRepository,
  },
  {
    provide: PaymentPlanEnabledPaidResourceQueryRepositoryGateway,
    useClass: PaymentPlanEnabledPaidResourceTypeormQueryRepository,
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
    provide: PaymentPlanPaidResourceIaConfigCommandRepositoryGateway,
    useClass: PaymentPlanPaidResourceIaConfigTypeormCommandRepository,
  },
  {
    provide: PaymentPlanPaidResourceIaConfigQueryRepositoryGateway,
    useClass: PaymentPlanPaidResourceIaConfigTypeormQueryRepository,
  },
  {
    provide: BankPaymentCommandRepositoryGateway,
    useClass: BankPaymentTypeormCommandRepository,
  },
  {
    provide: BankPaymentQueryRepositoryGateway,
    useClass: BankPaymentTypeormQueryRepository,
  },
  {
    provide: BankTransferCommandRepositoryGateway,
    useClass: BankTransferTypeormCommandRepository,
  },
  {
    provide: BankTransferQueryRepositoryGateway,
    useClass: BankTransferTypeormQueryRepository,
  },
  {
    provide: OrganizationPaymentPlanBankPaymentCommandRepositoryGateway,
    useClass: OrganizationPaymentPlanBankPaymentTypeormCommandRepository,
  },
  {
    provide: OrganizationPaymentPlanBankPaymentQueryRepositoryGateway,
    useClass: OrganizationPaymentPlanBankPaymentTypeormQueryRepository,
  },
  {
    provide: GeneralUrbanRetirementAnalysisCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementAnalysisTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementAnalysisQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementAnalysisTypeormQueryRepository,
  },
  {
    provide: GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementAnalysisResultTypeormCommandRepository,
  },
  {
    provide:
      GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway,
    useClass:
      GeneralUrbanRetirementAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementAnalysisPeriodCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementAnalysisPeriodTypeormCommandRepository,
  },
  {
    provide:
      GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway,
    useClass:
      GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormCommandRepository,
  },
  {
    provide:
      GeneralUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    useClass:
      GeneralUrbanRetirementAnalysisPeriodDocumentTypeormCommandRepository,
  },
  {
    provide:
      GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway,
    useClass:
      GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementAnalysisDocumentTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementAnalysisRemunerationCommandRepositoryGateway,
    useClass:
      GeneralUrbanRetirementAnalysisRemunerationTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementAnalysisRemunerationTypeormQueryRepository,
  },
  {
    provide: OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway,
    useClass:
      OrganizationPaymentPlanAffiliateCommissionTypeormCommandRepository,
  },
  {
    provide: OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway,
    useClass: OrganizationPaymentPlanAffiliateCommissionTypeormQueryRepository,
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
  {
    provide: TeacherRetirementPlanningCommandRepositoryGateway,
    useClass: TeacherRetirementPlanningTypeormCommandRepository,
  },
  {
    provide: TeacherRetirementPlanningQueryRepositoryGateway,
    useClass: TeacherRetirementPlanningTypeormQueryRepository,
  },
  {
    provide: TeacherRetirementPlanningDocumentCommandRepositoryGateway,
    useClass: TeacherRetirementPlanningDocumentTypeormCommandRepository,
  },
  {
    provide: TeacherRetirementPlanningInssBenefitCommandRepositoryGateway,
    useClass: TeacherRetirementPlanningInssBenefitTypeormCommandRepository,
  },
  {
    provide: TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway,
    useClass: TeacherRetirementPlanningLegalProceedingTypeormCommandRepository,
  },
  {
    provide: TeacherRetirementPlanningPeriodCommandRepositoryGateway,
    useClass: TeacherRetirementPlanningPeriodTypeormCommandRepository,
  },
  {
    provide: TeacherRetirementPlanningPeriodItemCommandRepositoryGateway,
    useClass: TeacherRetirementPlanningPeriodItemTypeormCommandRepository,
  },
  {
    provide:
      TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway,
    useClass:
      TeacherRetirementPlanningPeriodItemDocumentTypeormCommandRepository,
  },
  {
    provide: TeacherRetirementPlanningRemunerationCommandRepositoryGateway,
    useClass: TeacherRetirementPlanningRemunerationTypeormCommandRepository,
  },
  {
    provide: TeacherRetirementPlanningRemunerationQueryRepositoryGateway,
    useClass: TeacherRetirementPlanningRemunerationTypeormQueryRepository,
  },
  {
    provide: TeacherRetirementPlanningResultCommandRepositoryGateway,
    useClass: TeacherRetirementPlanningResultTypeormCommandRepository,
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
    provide: RetirementPlanningRgpsEarningsHistoryCommandRepositoryGateway,
    useClass: RetirementPlanningRgpsEarningsHistoryTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway,
    useClass: RetirementPlanningRgpsEarningsHistoryTypeormQueryRepository,
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
    provide: GeneralUrbanRetirementGrantCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantTypeormQueryRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantResultCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantResultTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantResultQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantResultTypeormQueryRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantAnalysisResultCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantAnalysisResultTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantAnalysisResultTypeormQueryRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantPeriodTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantPeriodTypeormQueryRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantEarningsHistoryCommandRepositoryGateway,
    useClass:
      GeneralUrbanRetirementGrantEarningsHistoryTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantEarningsHistoryTypeormQueryRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantInssBenefitCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantInssBenefitTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantLegalProceedingCommandRepositoryGateway,
    useClass:
      GeneralUrbanRetirementGrantLegalProceedingTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantSpecialPeriodCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantSpecialPeriodTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantSpecialPeriodTypeormQueryRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway,
    useClass:
      GeneralUrbanRetirementGrantTimeAcceleratorTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantTimeAcceleratorTypeormQueryRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantPeriodDocumentTypeormCommandRepository,
  },
  {
    provide: GeneralUrbanRetirementGrantPeriodDocumentQueryRepositoryGateway,
    useClass: GeneralUrbanRetirementGrantPeriodDocumentTypeormQueryRepository,
  },
  {
    provide: DisabilityRetirementPlanningGrantCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningGrantTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningGrantQueryRepositoryGateway,
    useClass: DisabilityRetirementPlanningGrantTypeormQueryRepository,
  },
  {
    provide: DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningGrantDocumentTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningGrantResultCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningGrantResultTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantInssBenefitTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantLegalProceedingTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway,
    useClass: DisabilityRetirementPlanningGrantPeriodTypeormCommandRepository,
  },
  {
    provide: DisabilityRetirementPlanningGrantPeriodQueryRepositoryGateway,
    useClass: DisabilityRetirementPlanningGrantPeriodTypeormQueryRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantPeriodDocumentTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryQueryRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantPeriodEarningsHistoryTypeormQueryRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormQueryRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormCommandRepository,
  },
  {
    provide:
      DisabilityRetirementPlanningGrantTimeAcceleratorQueryRepositoryGateway,
    useClass:
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormQueryRepository,
  },
  {
    provide: DeathBenefitGrantCommandRepositoryGateway,
    useClass: DeathBenefitGrantTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantQueryRepositoryGateway,
    useClass: DeathBenefitGrantTypeormQueryRepository,
  },
  {
    provide: DeathBenefitGrantResultCommandRepositoryGateway,
    useClass: DeathBenefitGrantResultTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantDocumentCommandRepositoryGateway,
    useClass: DeathBenefitGrantDocumentTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantInssBenefitCommandRepositoryGateway,
    useClass: DeathBenefitGrantInssBenefitTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantLegalProceedingCommandRepositoryGateway,
    useClass: DeathBenefitGrantLegalProceedingTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantLegalRepresentativeCommandRepositoryGateway,
    useClass: DeathBenefitGrantLegalRepresentativeTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantInstitorCommandRepositoryGateway,
    useClass: DeathBenefitGrantInstitorTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantDependentCommandRepositoryGateway,
    useClass: DeathBenefitGrantDependentTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantDependentDocumentCommandRepositoryGateway,
    useClass: DeathBenefitGrantDependentDocumentTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantPeriodCommandRepositoryGateway,
    useClass: DeathBenefitGrantPeriodTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantPeriodQueryRepositoryGateway,
    useClass: DeathBenefitGrantPeriodTypeormQueryRepository,
  },
  {
    provide: DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway,
    useClass: DeathBenefitGrantPeriodEarningsHistoryTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantPeriodDocumentCommandRepositoryGateway,
    useClass: DeathBenefitGrantPeriodDocumentTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway,
    useClass: DeathBenefitGrantTimeAcceleratorTypeormCommandRepository,
  },
  {
    provide: DeathBenefitGrantTimeAcceleratorQueryRepositoryGateway,
    useClass: DeathBenefitGrantTimeAcceleratorTypeormQueryRepository,
  },
  {
    provide: RuralTimelineAnalysisCommandRepositoryGateway,
    useClass: RuralTimelineAnalysisTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisQueryRepositoryGateway,
    useClass: RuralTimelineAnalysisTypeormQueryRepository,
  },
  {
    provide: RuralTimelineAnalysisInssBenefitCommandRepositoryGateway,
    useClass: RuralTimelineAnalysisInssBenefitTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisLegalProceedingCommandRepositoryGateway,
    useClass: RuralTimelineAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisDocumentCommandRepositoryGateway,
    useClass: RuralTimelineAnalysisDocumentTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisDocumentQueryRepositoryGateway,
    useClass: RuralTimelineAnalysisDocumentTypeormQueryRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodCommandRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodQueryRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodTypeormQueryRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodPropertyTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodPropertyQueryRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodPropertyTypeormQueryRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodResidenceTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodResidenceQueryRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodResidenceTypeormQueryRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodDocumentTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodDocumentQueryRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodDocumentTypeormQueryRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway,
    useClass:
      RuralTimelineAnalysisPeriodEconomicAspectsTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodEconomicAspectsTypeormQueryRepository,
  },
  {
    provide:
      RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway,
    useClass:
      RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway,
    useClass:
      RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormQueryRepository,
  },
  {
    provide:
      RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway,
    useClass:
      RuralTimelineAnalysisCnisContributionPeriodTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway,
    useClass: RuralTimelineAnalysisCnisContributionPeriodTypeormQueryRepository,
  },
  {
    provide:
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway,
    useClass:
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormCommandRepository,
  },
  {
    provide:
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryRepositoryGateway,
    useClass:
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormQueryRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway,
    useClass:
      RuralTimelineAnalysisPeriodPendingExitDateTypeormCommandRepository,
  },
  {
    provide: RuralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway,
    useClass: RuralTimelineAnalysisPeriodPendingExitDateTypeormQueryRepository,
  },
  {
    provide:
      RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway,
    useClass:
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormCommandRepository,
  },
  {
    provide:
      RuralTimelineCnisContributionPeriodOverdueContributionQueryRepositoryGateway,
    useClass:
      RuralTimelineCnisContributionPeriodOverdueContributionTypeormQueryRepository,
  },
  {
    provide:
      RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway,
    useClass:
      RuralTimelineCnisContributionPeriodDocumentTypeormCommandRepository,
  },
  {
    provide: RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway,
    useClass: RuralTimelineCnisContributionPeriodDocumentTypeormQueryRepository,
  },
  {
    provide:
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentCommandRepositoryGateway,
    useClass:
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormCommandRepository,
  },
  {
    provide:
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentQueryRepositoryGateway,
    useClass:
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormQueryRepository,
  },
  {
    provide: SpecialActivityAnalysisQueryRepositoryGateway,
    useClass: SpecialActivityTypeormQueryRepository,
  },
  {
    provide: SpecialActivityAnalysisCommandRepositoryGateway,
    useClass: SpecialActivityTypeormCommandRepository,
  },
  {
    provide: SpecialActivityAnalysisResultCommandRepositoryGateway,
    useClass: SpecialActivityResultTypeormCommandRepository,
  },
  {
    provide: SpecialActivityAnalysisDocumentCommandRepositoryGateway,
    useClass: SpecialActivityDocumentTypeormCommandRepository,
  },
  {
    provide: SpecialActivityAnalysisInssBenefitCommandRepositoryGateway,
    useClass: SpecialActivityInssBenefitTypeormCommandRepository,
  },
  {
    provide: SpecialActivityAnalysisLegalProceedingCommandRepositoryGateway,
    useClass: SpecialActivityLegalProceedingTypeormCommandRepository,
  },
  {
    provide: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    useClass: SpecialCategoryRetirementAnalysisTypeormQueryRepository,
  },
  {
    provide: SpecialCategoryRetirementAnalysisCommandRepositoryGateway,
    useClass: SpecialCategoryRetirementAnalysisTypeormCommandRepository,
  },
  {
    provide: SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway,
    useClass: SpecialCategoryRetirementAnalysisWorkPeriodTypeormQueryRepository,
  },
  {
    provide:
      SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway,
    useClass:
      SpecialCategoryRetirementAnalysisWorkPeriodTypeormCommandRepository,
  },
  {
    provide:
      SpecialCategoryRetirementAnalysisPeriodDocumentQueryRepositoryGateway,
    useClass:
      SpecialCategoryRetirementAnalysisPeriodDocumentTypeormQueryRepository,
  },
  {
    provide:
      SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    useClass:
      SpecialCategoryRetirementAnalysisPeriodDocumentTypeormCommandRepository,
  },
  {
    provide:
      SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway,
    useClass:
      SpecialCategoryRetirementAnalysisRemunerationTypeormQueryRepository,
  },
  {
    provide:
      SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway,
    useClass:
      SpecialCategoryRetirementAnalysisRemunerationTypeormCommandRepository,
  },
  {
    provide: SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway,
    useClass: SpecialCategoryRetirementAnalysisResultTypeormQueryRepository,
  },
  {
    provide: SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway,
    useClass: SpecialCategoryRetirementAnalysisResultTypeormCommandRepository,
  },
  {
    provide:
      SpecialCategoryRetirementAnalysisResultConversionItemQueryRepositoryGateway,
    useClass:
      SpecialCategoryRetirementAnalysisResultConversionItemTypeormQueryRepository,
  },
  {
    provide:
      SpecialCategoryRetirementAnalysisResultConversionItemCommandRepositoryGateway,
    useClass:
      SpecialCategoryRetirementAnalysisResultConversionItemTypeormCommandRepository,
  },
  {
    provide:
      SpecialCategoryRetirementAnalysisResultRuleItemQueryRepositoryGateway,
    useClass:
      SpecialCategoryRetirementAnalysisResultRuleItemTypeormQueryRepository,
  },
  {
    provide:
      SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway,
    useClass:
      SpecialCategoryRetirementAnalysisResultRuleItemTypeormCommandRepository,
  },
  {
    provide: PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway,
    useClass: PerCapitaIncomeForBpcAnalysisTypeormCommandRepository,
  },
  {
    provide: PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway,
    useClass: PerCapitaIncomeForBpcAnalysisTypeormQueryRepository,
  },
  {
    provide: PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway,
    useClass: PerCapitaIncomeForBpcAnalysisBenefitTypeormCommandRepository,
  },
  {
    provide: PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway,
    useClass: PerCapitaIncomeForBpcAnalysisDocumentTypeormCommandRepository,
  },
  {
    provide: PerCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway,
    useClass: PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormCommandRepository,
  },
  {
    provide: PerCapitaIncomeForBpcAnalysisFamilyMemberQueryRepositoryGateway,
    useClass: PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormQueryRepository,
  },
  {
    provide:
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway,
    useClass:
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormCommandRepository,
  },
  {
    provide:
      PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway,
    useClass:
      PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide: PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway,
    useClass: PerCapitaIncomeForBpcAnalysisResultTypeormCommandRepository,
  },
  {
    provide: MiniAdvisorCommandRepositoryGateway,
    useClass: MiniAdvisorTypeormCommandRepository,
  },
  {
    provide: MiniAdvisorQueryRepositoryGateway,
    useClass: MiniAdvisorTypeormQueryRepository,
  },
  {
    provide: MiniAdvisorResultCommandRepositoryGateway,
    useClass: MiniAdvisorResultTypeormCommandRepository,
  },
  {
    provide: MiniAdvisorResultQueryRepositoryGateway,
    useClass: MiniAdvisorResultTypeormQueryRepository,
  },
  {
    provide: SystemLogCommandGateway,
    useClass: SystemLogTypeormCommandRepository,
  },
  {
    provide: SystemLogsQueryRepositoryGateway,
    useClass: SystemLogTypeormQueryRepository,
  },
  {
    provide: TutorialCommandRepositoryGateway,
    useClass: TutorialTypeormCommandRepository,
  },
  {
    provide: TutorialQueryRepositoryGateway,
    useClass: TutorialTypeormQueryRepository,
  },
  {
    provide: CreditPackQueryRepositoryGateway,
    useClass: CreditPackTypeormQueryRepository,
  },
  {
    provide: CreditPackCommandRepositoryGateway,
    useClass: CreditPackTypeormCommandRepository,
  },
  {
    provide: OrganizationCreditPackPurchaseQueryRepositoryGateway,
    useClass: OrganizationCreditPackPurchaseTypeormQueryRepository,
  },
  {
    provide: OrganizationCreditPackPurchaseCommandRepositoryGateway,
    useClass: OrganizationCreditPackPurchaseTypeormCommandRepository,
  },
  {
    provide: OrganizationCustomizationCommandRepositoryGateway,
    useClass: OrganizationCustomizationTypeormCommandRepository,
  },
  {
    provide: OrganizationCustomizationQueryRepositoryGateway,
    useClass: OrganizationCustomizationTypeormQueryRepository,
  },
  {
    provide:
      OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway,
    useClass:
      OrganizationCustomizationDocumentHeaderTemplateTypeormCommandRepository,
  },
  {
    provide:
      OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    useClass:
      OrganizationCustomizationDocumentHeaderTemplateTypeormQueryRepository,
  },
  {
    provide:
      OrganizationCustomizationDocumentFooterTemplateCommandRepositoryGateway,
    useClass:
      OrganizationCustomizationDocumentFooterTemplateTypeormCommandRepository,
  },
  {
    provide:
      OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    useClass:
      OrganizationCustomizationDocumentFooterTemplateTypeormQueryRepository,
  },
  {
    provide: RegulatoryUpdateQueryRepositoryGateway,
    useClass: RegulatoryUpdateTypeormQueryRepository,
  },
  {
    provide: RegulatoryUpdateCommandRepositoryGateway,
    useClass: RegulatoryUpdateTypeormCommandRepository,
  },
  {
    provide: RegulatoryUpdateEmailPreferenceQueryRepositoryGateway,
    useClass: RegulatoryUpdateEmailPreferenceTypeormQueryRepository,
  },
  {
    provide: RegulatoryUpdateEmailPreferenceCommandRepositoryGateway,
    useClass: RegulatoryUpdateEmailPreferenceTypeormCommandRepository,
  },
  {
    provide: RegulatoryUpdateMonitoredSourceQueryRepositoryGateway,
    useClass: RegulatoryUpdateMonitoredSourceTypeormQueryRepository,
  },
  {
    provide: RegulatoryUpdateMonitoredSourceCommandRepositoryGateway,
    useClass: RegulatoryUpdateMonitoredSourceTypeormCommandRepository,
  },
  {
    provide: SupportAttendantCommandRepositoryGateway,
    useClass: SupportAttendantTypeormCommandRepository,
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
