import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/command/medical-and-social-report-objection-generator-analysis.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-result/command/medical-and-social-report-objection-generator-analysis-result.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-result/medical-and-social-report-objection-generator-analysis-result.entity';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/response/create-medical-and-social-report-objection-generator-analysis-result.response.dto';
import { MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-not-found.error';
import { MedicalAndSocialReportObjectionGeneratorAnalysisResultAlreadyExistsError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultUseCase {
  protected readonly _type =
    CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
  ): Promise<CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        medicalAndSocialReportObjectionGeneratorAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError,
      );

    const medicalAndSocialReportObjectionGeneratorAnalysisQueryResult =
      analysisToolRecordQueryResult.medicalAndSocialReportObjectionGeneratorAnalysis;

    if (medicalAndSocialReportObjectionGeneratorAnalysisQueryResult === null) {
      throw new MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError();
    }

    if (
      analysisToolRecordQueryResult
        .medicalAndSocialReportObjectionGeneratorAnalysis
        ?.medicalAndSocialReportObjectionGeneratorAnalysisResult !== null
    ) {
      throw new MedicalAndSocialReportObjectionGeneratorAnalysisResultAlreadyExistsError();
    }

    if (
      medicalAndSocialReportObjectionGeneratorAnalysisQueryResult
        .medicalAndSocialReportObjectionGeneratorAnalysisDocument.length === 0
    ) {
      throw new Error('Documentos são obrigatórios');
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );
    const medicalAndSocialReportObjectionGeneratorAnalysisDocumentsBuffer =
      await Promise.all(
        medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisDocument.map(
          async (document) => {
            return await this.fileProcessorGateway.getFileBuffer(
              document.document,
            );
          },
        ),
      );

    const medicalAndSocialReportObjectionGeneratorCompleteAnalysis =
      await this.analysisProcessorGateway.getMedicalAndSocialReportObjectionGeneratorAnalysisCompleteAnalysis(
        promptResponse.prompt,
        [
          ...medicalAndSocialReportObjectionGeneratorAnalysisDocumentsBuffer,
          clientDataBuffer,
        ],
      );

    const medicalAndSocialReportObjectionGeneratorAnalysisResult =
      new MedicalAndSocialReportObjectionGeneratorAnalysisResultEntity({
        medicalAndSocialReportObjectionGeneratorCompleteAnalysis:
          medicalAndSocialReportObjectionGeneratorCompleteAnalysis,
      });

    const medicalAndSocialReportObjectionGeneratorAnalysis =
      new MedicalAndSocialReportObjectionGeneratorAnalysisEntity({
        id: medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.id,
        medicalAndSocialReportObjectionGeneratorAnalysisResult,
        medicalAndSocialReportObjectionGeneratorAnalysisBenefit: [],
        medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding: [],
        medicalAndSocialReportObjectionGeneratorAnalysisDocument: [],
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      ...analysisToolRecordQueryResult,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      medicalAndSocialReportObjectionGeneratorAnalysis,
      disabilityAssessmentForBpcAnalysis: null,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      cnisFastAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      judicialCaseAnalysis: null,
      medicalQuestionGenerator: null,
      specialActivity: null,
      perCapitaIncomeForBpcAnalysis: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createMedicalAndSocialReportObjectionGeneratorAnalysisResultTransaction =
      this.medicalAndSocialReportObjectionGeneratorAnalysisResultCommandRepositoryGateway.createMedicalAndSocialReportObjectionGeneratorAnalysisResult(
        medicalAndSocialReportObjectionGeneratorAnalysisResult,
      );
    const updateMedicalAndSocialReportObjectionGeneratorAnalysisTransaction =
      this.medicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway.updateMedicalAndSocialReportObjectionGeneratorAnalysis(
        medicalAndSocialReportObjectionGeneratorAnalysis.id,
        medicalAndSocialReportObjectionGeneratorAnalysis,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createMedicalAndSocialReportObjectionGeneratorAnalysisResultTransaction,
      updateMedicalAndSocialReportObjectionGeneratorAnalysisTransaction,
      updateAnalysisToolRecordTransaction,
    ]);
    await transaction.commit();

    return CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto.build(
      {
        ...medicalAndSocialReportObjectionGeneratorAnalysisResult,
      },
    );
  }
}
