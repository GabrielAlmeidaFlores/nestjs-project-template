import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.command.repository';
import { AdminTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.query.repository';
import { AdministrativeProcedureInssAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.typeorm.query.repository';
import { AdministrativeProcedureInssAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.typeorm.command.repository';
import { AnalysisToolClientTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.command.repository';
import { AnalysisToolClientTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.query.repository';
import { AnalysisToolClientInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.typeorm.command.repository';
import { AnalysisToolClientLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.typeorm.command.repository';
import { AnalysisToolRecordTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.command.repository';
import { AnalysisToolRecordTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.query.repository';
import { AuthIdentityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.command.repository';
import { AuthIdentityTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.query.repository';
import { BankPaymentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/bank-payment/bank-payment.typeorm.command.repository';
import { BankPaymentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/bank-payment/bank-payment.typeorm.query.repository';
import { BaseTypeormTransactionRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.transaction.repository';
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
import { CustomerTermsAcceptanceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.query.repository';
import { DisabilityAssessmentForBpcAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.typeorm.query.repository';
import { DisabilityAssessmentForBpcAnalysisBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.typeorm.command.repository';
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
import { OrganizationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.command.repository';
import { OrganizationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.query.repository';
import { OrganizationCreditPurchaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-purchase.typeorm.command.repository';
import { OrganizationCreditPurchaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-purchase.typeorm.query.repository';
import { OrganizationCreditUsageTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-usage.typeorm.command.repository';
import { OrganizationCreditUsageTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-credit/organization-credit-usage.typeorm.query.repository';
import { OrganizationMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.command.repository';
import { OrganizationMemberTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.query.repository';
import { OrganizationPaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan/organization-payment-plan.typeorm.command.repository';
import { OrganizationPaymentPlanBankPaymentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.typeorm.command.repository';
import { OrganizationPaymentPlanBankPaymentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.typeorm.query.repository';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.typeorm.command.repository';
import { PaymentPlanTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan/payment-plan.typeorm.command.repository';
import { PaymentPlanTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan/payment-plan.typeorm.query.repository';
import { PaymentPlanEnabledPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource.typeorm.command.repository';
import { PaymentPlanPaidResourceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.command.repository';
import { PaymentPlanPaidResourceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/payment-plan-paid-resource/payment-plan-paid-resource.typeorm.query.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.typeorm.command.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-analysis-result/retirement-planning-rgps.typeorm.query.repository';
import { RetirementPlanningRgpsEarningsHistoryTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.typeorm.command.repository';
import { RetirementPlanningRgpsEarningsHistoryTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.typeorm.query.repository';
import { RetirementPlanningRppsInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.typeorm.command.repository';
import { RetirementPlanningRppsLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.typeorm.command.repository';
import { SpecialActivityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity/special-activity.typeorm.command.repository';
import { SpecialActivityTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/special-activity/special-activity.typeorm.query.repository';
import { SpecialActivityDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity-document/special-activity-document.typeorm.command.repository';
import { SpecialActivityInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity-inss-benefit/special-activity-inss-benefit.typeorm.command.repository';
import { SpecialActivityLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity-legal-proceeding/special-activity-legal-proceeding.typeorm.command.repository';
import { SpecialActivityResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/special-activity-result/special-activity-result.typeorm.command.repository';
import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { AdministrativeProcedureInssAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-benefit.entity';
import { AdministrativeProcedureInssAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-document.entity';
import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { AdministrativeProcedureInssAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-result.entity';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AnalysisToolClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-inss-benefit.typeorm.entity';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { CnisFastAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';
import { CustomerTermsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { DisabilityAssessmentForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-result.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { InitialPetitionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/initial-petition-generator.typeorm.entity';
import { AdministrativeRequestGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-request-generator.typeorm.entity';
import { FullOpinionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/full-opinion-generator.typeorm.entity';
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
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';
import { OrganizationCreditUsageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-usage.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationPaymentPlanBankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-bank-payment.typeorm.entity';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enabled-paid-resource.typeorm.entity';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { PaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanPaidResourceIaConfigTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource-ia-config.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
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
import { SpecialActivityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-documents.typeorm.entity';
import { SpecialActivityInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-benefit.typeorm.entity';
import { SpecialActivityLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-legal-proceeding.typeorm.entity';
import { SpecialActivityResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-result.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
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
    CustomerAddressTypeormEntity,
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
    OrganizationPaymentPlanBankPaymentTypeormEntity,
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
    SpecialActivityTypeormEntity,
    SpecialActivityDocumentTypeormEntity,
    SpecialActivityResultTypeormEntity,
    SpecialActivityInssBenefitTypeormEntity,
    SpecialActivityLegalProceedingTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisBenefitTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity,
    InitialPetitionGeneratorTypeormEntity,
    AdministrativeRequestGeneratorTypeormEntity,
    FullOpinionGeneratorTypeormEntity,
    MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
    DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
    DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
    DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
    DisabilityAssessmentForBpcAnalysisTypeormEntity,
  ];

  public static readonly repositories: Provider[] = [
    BaseTypeormTransactionRepository,
    AuthIdentityTypeormQueryRepository,
    AuthIdentityTypeormCommandRepository,
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
    OrganizationPaymentPlanBankPaymentTypeormCommandRepository,
    OrganizationPaymentPlanBankPaymentTypeormQueryRepository,
    RetirementPlanningRppsInssBenefitTypeormCommandRepository,
    RetirementPlanningRppsLegalProceedingTypeormCommandRepository,
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
    SpecialActivityTypeormCommandRepository,
    SpecialActivityTypeormQueryRepository,
    SpecialActivityResultTypeormCommandRepository,
    SpecialActivityDocumentTypeormCommandRepository,
    SpecialActivityInssBenefitTypeormCommandRepository,
    SpecialActivityLegalProceedingTypeormCommandRepository,
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
