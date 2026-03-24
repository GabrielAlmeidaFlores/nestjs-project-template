import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/command/disability-assessment-for-bpc-analysis.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-result/command/disability-assessment-for-bpc-analysis-result.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { DisabilityAssessmentForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity';
import { CreateDisabilityAssessmentForBpcAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/response/create-disability-assessment-for-bpc-analysis-result.response.dto';
import { DisabilityAssessmentForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-not-found.error';
import { DisabilityAssessmentForBpcAnalysisResultAlreadyExistsError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDisabilityAssessmentForBpcAnalysisResultUseCase {
  protected readonly _type =
    CreateDisabilityAssessmentForBpcAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisCommandRepositoryGateway: DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway: DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway,
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
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
  ): Promise<CreateDisabilityAssessmentForBpcAnalysisResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityAssessmentForBpcAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        DisabilityAssessmentForBpcAnalysisNotFoundError,
      );

    const disabilityAssessmentForBpcAnalysisQueryResult =
      analysisToolRecordQueryResult.disabilityAssessmentForBpcAnalysis;

    if (disabilityAssessmentForBpcAnalysisQueryResult === null) {
      throw new DisabilityAssessmentForBpcAnalysisNotFoundError();
    }

    if (
      analysisToolRecordQueryResult.disabilityAssessmentForBpcAnalysis
        ?.disabilityAssessmentForBpcAnalysisResult !== null
    ) {
      throw new DisabilityAssessmentForBpcAnalysisResultAlreadyExistsError();
    }

    if (
      disabilityAssessmentForBpcAnalysisQueryResult
        .disabilityAssessmentForBpcAnalysisDocument.length === 0
    ) {
      throw new DisabilityAssessmentForBpcAnalysisNotFoundError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );

    const additionalDataBuffer = Buffer.from(
      JSON.stringify(
        {
          estimatedDisabilityStartDate:
            disabilityAssessmentForBpcAnalysisQueryResult.estimatedDisabilityStartDate,
          attendsSchoolOrTechnicalCourse:
            disabilityAssessmentForBpcAnalysisQueryResult.attendsSchoolOrTechnicalCourse,
          performsLaborActivity:
            disabilityAssessmentForBpcAnalysisQueryResult.performsLaborActivity,
          needsThirdPartyHelp:
            disabilityAssessmentForBpcAnalysisQueryResult.needsThirdPartyHelp,
          hasAccessToBasicServices:
            disabilityAssessmentForBpcAnalysisQueryResult.hasAccessToBasicServices,
          otherBarriersDescription:
            disabilityAssessmentForBpcAnalysisQueryResult.otherBarriersDescription,
        },
        null,
        2,
      ),
      'utf-8',
    );

    const medicalAndSocialDocumentsBuffer = await Promise.all(
      disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisDocument.map(
        async (document) => {
          return await this.fileProcessorGateway.getFileBuffer(
            document.document,
          );
        },
      ),
    );

    const disabilityAssessmentForBpcCompleteAnalysis =
      await this.analysisProcessorGateway.getDisabilityAssessmentForBpcAnalysisCompleteAnalysis(
        promptResponse.prompt,
        [
          ...medicalAndSocialDocumentsBuffer,
          clientDataBuffer,
          additionalDataBuffer,
        ],
      );

    const disabilityAssessmentForBpcAnalysisResult =
      new DisabilityAssessmentForBpcAnalysisResultEntity({
        disabilityAssessmentForBpcCompleteAnalysis:
          disabilityAssessmentForBpcCompleteAnalysis,
      });

    const disabilityAssessmentForBpcAnalysis =
      new DisabilityAssessmentForBpcAnalysisEntity({
        id: disabilityAssessmentForBpcAnalysisQueryResult.id,
        estimatedDisabilityStartDate:
          disabilityAssessmentForBpcAnalysisQueryResult.estimatedDisabilityStartDate ??
          null,
        attendsSchoolOrTechnicalCourse:
          disabilityAssessmentForBpcAnalysisQueryResult.attendsSchoolOrTechnicalCourse ??
          null,
        performsLaborActivity:
          disabilityAssessmentForBpcAnalysisQueryResult.performsLaborActivity ??
          null,
        needsThirdPartyHelp:
          disabilityAssessmentForBpcAnalysisQueryResult.needsThirdPartyHelp ??
          null,
        hasAccessToBasicServices:
          disabilityAssessmentForBpcAnalysisQueryResult.hasAccessToBasicServices ??
          null,
        otherBarriersDescription:
          disabilityAssessmentForBpcAnalysisQueryResult.otherBarriersDescription ??
          null,
        disabilityAssessmentForBpcAnalysisResult,
        disabilityAssessmentForBpcAnalysisBenefit: [],
        disabilityAssessmentForBpcAnalysisLegalProceeding: [],
        disabilityAssessmentForBpcAnalysisDocument: [],
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      disabilityAssessmentForBpcAnalysis,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      cnisFastAnalysis: null,
      judicialCaseAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      administrativeProcedureInssAnalysis: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createDisabilityAssessmentForBpcAnalysisResultTransaction =
      this.disabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway.createDisabilityAssessmentForBpcAnalysisResult(
        disabilityAssessmentForBpcAnalysisResult,
      );
    const updateDisabilityAssessmentForBpcAnalysisTransaction =
      this.disabilityAssessmentForBpcAnalysisCommandRepositoryGateway.updateDisabilityAssessmentForBpcAnalysis(
        disabilityAssessmentForBpcAnalysis.id,
        disabilityAssessmentForBpcAnalysis,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.RESULT_ADDED,
        analysisType: analysisToolRecord.type,
        organizationMemberId: organizationMember.id.toString(),
        analysisToolClientId:
          analysisToolRecord.analysisToolClient.id.toString(),
        analysisToolRecordId: analysisToolRecord.id.toString(),
        transactions: [
          consumeCreditTransaction,
          createDisabilityAssessmentForBpcAnalysisResultTransaction,
          updateDisabilityAssessmentForBpcAnalysisTransaction,
          updateAnalysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );
    await transaction.commit();

    return CreateDisabilityAssessmentForBpcAnalysisResultResponseDto.build({
      ...disabilityAssessmentForBpcAnalysisResult,
    });
  }
}
