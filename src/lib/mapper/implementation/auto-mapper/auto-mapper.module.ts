import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AutoMapperService } from '@lib/mapper/implementation/auto-mapper/auto-mapper.service';
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
import { FullOpinionGeneratorEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/full-opinion-generator-analysis-result/full-opinion-generator-analysis-result-entity.auto-mapper.profile';
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
import { GetOrganizationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization/get-organization-query-result.auto-mapper.profile';
import { OrganizationEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization/organization-entity.auto-mapper.profile';
import { GetOrganizationCreditPurchaseQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-credit/get-organization-credit-purchase-query-result.auto-mapper.profile';
import { GetOrganizationCreditUsageQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-credit/get-organization-credit-usage-query-result.auto-mapper.profile';
import { OrganizationCreditPurchaseEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-credit/organization-credit-purchase-entity.auto-mapper.profile';
import { OrganizationCreditUsageEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-credit/organization-credit-usage-entity.auto-mapper.profile';
import { GetOrganizationMemberQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-with-customer-and-organization-relations-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithCustomerRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-with-customer-relation-query-result.auto-mapper.profile';
import { GetOrganizationMemberWithOrganizationRelationQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/get-organization-member-with-organization-relations-query-result.auto-mapper.profile copy';
import { OrganizationMemberEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-member/organization-member-entity.auto-mapper.profile';
import { OrganizationPaymentPlanEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan/organization-payment-plan-entity.auto-mapper.profile';
import { OrganizationPaymentPlanQueryResultWithRelationsAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan/organization-payment-plan-query-result-with-relations.auto-mapper.profile';
import { OrganizationPaymentPlanQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/organization-payment-plan/organization-payment-plan-query-result.auto-mapper.profile';
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
import { GetRuralTimelineAnalysisWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis/get-rural-timeline-analysis-with-relations-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis/rural-timeline-analysis-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisCnisContributionPeriodQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-cnis-contribution-period/get-rural-timeline-analysis-cnis-contribution-period-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisCnisContributionPeriodEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period-entity.auto-mapper.profile';
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
import { GetRuralTimelineAnalysisPeriodPropertyQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-property/get-rural-timeline-analysis-period-property-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisPeriodPropertyEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property-entity.auto-mapper.profile';
import { GetRuralTimelineAnalysisPeriodResidenceQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-residence/get-rural-timeline-analysis-period-residence-query-result.auto-mapper.profile';
import { RuralTimelineAnalysisPeriodResidenceEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence-entity.auto-mapper.profile';
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

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
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
    OrganizationPaymentPlanBankPaymentEntityAutoMapperProfile,
    GetOrganizationPaymentPlanBankPaymentQueryResultAutoMapperProfile,
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
    GetRuralTimelineAnalysisInssBenefitQueryResultAutoMapperProfile,
    RuralTimelineAnalysisInssBenefitEntityAutoMapperProfile,
    GetRuralTimelineAnalysisLegalProceedingQueryResultAutoMapperProfile,
    RuralTimelineAnalysisLegalProceedingEntityAutoMapperProfile,
    GetRuralTimelineAnalysisDocumentQueryResultAutoMapperProfile,
    RuralTimelineAnalysisDocumentEntityAutoMapperProfile,
    GetRuralTimelineAnalysisPeriodQueryResultAutoMapperProfile,
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
    GetRuralTimelineAnalysisWithRelationsQueryResultAutoMapperProfile,
  ],
  exports: [AutoMapperService],
})
export class AutoMapperModule {
  protected readonly _type = AutoMapperModule.name;
}
