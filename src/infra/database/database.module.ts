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
import { AffiliateCustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer/affiliate-customer.typeorm.command.repository';
import { AffiliateCustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/affiliate-customer/affiliate-customer.typeorm.query.repository';
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
import { BaseTypeormTransactionRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.transaction.repository';
import { CidTenTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cid-ten/cid-ten.typeorm.command.repository';
import { CidTenTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/cid-ten/cid-ten.typeorm.query.repository';
import { CnisFastAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.command.repository';
import { CnisFastAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.query.repository';
import { CnisFastAnalysisInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.typeorm.command.repository';
import { CnisFastAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.typeorm.command.repository';
import { CnisFastAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-result/cnis-fast-analysis-result.typeorm.command.repository';
import { CustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.command.repository';
import { CustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.query.repository';
import { CustomerAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.command.repository';
import { CustomerAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.query.repository';
import { CustomerTermsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.command.repository';
import { CustomerTermsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.query.repository';
import { CustomerTermsAcceptanceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.command.repository';
import { CustomerTermsAcceptanceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.query.repository';
import { DisabilityAssessmentForBpcAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.typeorm.query.repository';
import { DisabilityAssessmentForBpcAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.typeorm.command.repository';
import { FullOpinionGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/full-opinion-generator-analysis-result/full-opinion-generator-analysis-result.typeorm.command.repository';
import { FullOpinionGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/full-opinion-generator-analysis-result/full-opinion-generator-analysis-result.typeorm.query.repository';
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
import { OrganizationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.command.repository';
import { OrganizationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.query.repository';
import { OrganizationCreditPurchaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-purchase.typeorm.command.repository';
import { OrganizationCreditPurchaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-purchase.typeorm.query.repository';
import { OrganizationCreditUsageTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-usage.typeorm.command.repository';
import { OrganizationCreditUsageTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-usage.typeorm.query.repository';
import { OrganizationMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.command.repository';
import { OrganizationMemberTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.query.repository';
import { OrganizationPaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan/organization-payment-plan.typeorm.command.repository';
import { OrganizationPaymentPlanTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan/organization-payment-plan.typeorm.query.repository';
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
import { SpeechGeneratorTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator/speech-generator.typeorm.command.repository';
import { SpeechGeneratorTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/speech-generator/speech-generator.typeorm.query.repository';
import { SpeechGeneratorBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-benefit/speech-generator-benefit.typeorm.command.repository';
import { SpeechGeneratorDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-document/speech-generator-document.typeorm.command.repository';
import { SpeechGeneratorLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-legal-proceeding/speech-generator-legal-proceeding.typeorm.command.repository';
import { SpeechGeneratorResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/speech-generator-result/speech-generator-result.typeorm.command.repository';
import { TutorialTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/tutorial/tutorial.typeorm.command.repository';
import { TutorialTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/tutorial/tutorial.typeorm.query.repository';
import { TypeormModule } from '@infra/database/implementation/typeorm/typeorm.module';
import { MapperModule } from '@lib/mapper/mapper.module';
import { AdminCommandRepositoryGateway } from '@module/admin/account/domain/repository/admin/command/admin.command.repository.gateway';
import { AdminQueryRepositoryGateway } from '@module/admin/account/domain/repository/admin/query/admin.query.repository.gateway';
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
import { AffiliateCustomerCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/command/affiliate-customer.command.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
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
import { DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/command/disability-assessment-for-bpc-analysis.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/disability-assessment-for-bpc-analysis.query.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-benefit/command/disability-assessment-for-bpc-analysis-benefit.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-document/command/disability-assessment-for-bpc-analysis-document.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-legal-proceeding/command/disability-assessment-for-bpc-analysis-legal-proceeding.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-result/command/disability-assessment-for-bpc-analysis-result.command.repository.gateway';
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
import { SpeechGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/command/speech-generator.command.repository.gateway';
import { SpeechGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/speech-generator.query.repository.gateway';
import { SpeechGeneratorBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-benefit/command/speech-generator-benefit.command.repository.gateway';
import { SpeechGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-document/command/speech-generator-document.command.repository.gateway';
import { SpeechGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-legal-proceeding/command/speech-generator-legal-proceeding.command.repository.gateway';
import { SpeechGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/command/speech-generator-result.command.repository.gateway';
import { AdministrativeRequestGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/command/administrative-request-generator.command.repository.gateway';
import { AdministrativeRequestGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/query/administrative-request-generator.query.repository.gateway';
import { FullOpinionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/command/full-opinion-generator.command.repository.gateway';
import { FullOpinionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/query/full-opinion-generator.query.repository.gateway';
import { InitialPetitionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/command/initial-petition-generator.command.repository.gateway';
import { InitialPetitionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/query/initial-petition-generator.query.repository.gateway';
import { LegalProceedingDetailCommandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { OrganizationCreditPurchaseCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/command/organization-credit-purchase.command.repository.gateway';
import { OrganizationCreditPurchaseQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/organization-credit-purchase.query.repository.gateway';
import { OrganizationCreditUsageCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/command/organization-credit-usage.command.repository.gateway';
import { OrganizationCreditUsageQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/query/organization-credit-usage.query.repository.gateway';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
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
import { TutorialCommandRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/command/tutorial.command.repository.gateway';
import { TutorialQueryRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/query/tutorial.query.repository.gateway';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';

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
    provide: AffiliateCustomerPaymentPlanCommandRepositoryGateway,
    useClass: AffiliateCustomerPaymentPlanTypeormCommandRepository,
  },
  {
    provide: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
    useClass: AffiliateCustomerPaymentPlanTypeormQueryRepository,
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
    provide: OrganizationPaymentPlanBankPaymentCommandRepositoryGateway,
    useClass: OrganizationPaymentPlanBankPaymentTypeormCommandRepository,
  },
  {
    provide: OrganizationPaymentPlanBankPaymentQueryRepositoryGateway,
    useClass: OrganizationPaymentPlanBankPaymentTypeormQueryRepository,
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
    provide: TutorialCommandRepositoryGateway,
    useClass: TutorialTypeormCommandRepository,
  },
  {
    provide: TutorialQueryRepositoryGateway,
    useClass: TutorialTypeormQueryRepository,
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
