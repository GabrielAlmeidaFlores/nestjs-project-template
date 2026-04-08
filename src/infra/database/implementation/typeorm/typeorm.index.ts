import { TypeOrmModule } from '@nestjs/typeorm';

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
import { SpeechGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator/speech-generator.typeorm.command.repository';
import { SpeechGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/speech-generator/speech-generator.typeorm.query.repository';
import { SpeechGeneratorBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-benefit/speech-generator-benefit.typeorm.command.repository';
import { SpeechGeneratorDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-document/speech-generator-document.typeorm.command.repository';
import { SpeechGeneratorLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-legal-proceeding/speech-generator-legal-proceeding.typeorm.command.repository';
import { SpeechGeneratorResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-result/speech-generator-result.typeorm.command.repository';
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
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history.typeorm.command.repository';
import { TutorialTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/tutorial/tutorial.typeorm.command.repository';
import { TutorialTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/tutorial/tutorial.typeorm.query.repository';
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
import { SpeechGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-benefit.typeorm.entity';
import { SpeechGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-document.typeorm.entity';
import { SpeechGeneratorLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-legal-proceeding.typeorm.entity';
import { SpeechGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-result.typeorm.entity';
import { SpeechGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator.typeorm.entity';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTicketAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-attachment.typeorm.entity';
import { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
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
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-result.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { TutorialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/tutorial.typeorm.entity';
import { DatabaseApplicationVariable } from '@shared/system/constant/application-variable/source/database.application-variable';

import type { Provider } from '@nestjs/common';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import type { DataSourceOptions } from 'typeorm';

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
