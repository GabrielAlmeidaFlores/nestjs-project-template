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
import { RetirementPermanentDisabilityRevisionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/command/retirement-permanent-disability-revision.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/command/retirement-permanent-disability-revision-result.command.repository.gateway';
import { GetRetirementPermanentDisabilityRevisionDocumentQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-document/query/result/get-retirement-permanent-disability-revision-document.query.result';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity';
import { RetirementPermanentDisabilityRevisionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/retirement-permanent-disability-revision-result.entity';
import { CreateRetirementPermanentDisabilityRevisionResultResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/create-retirement-permanent-disability-revision-result.response.dto';
import { RetirementPermanentDisabilityRevisionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPermanentDisabilityRevisionResultUseCase {
  protected readonly _type =
    CreateRetirementPermanentDisabilityRevisionResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionCommandRepositoryGateway: RetirementPermanentDisabilityRevisionCommandRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionResultCommandRepositoryGateway: RetirementPermanentDisabilityRevisionResultCommandRepositoryGateway,
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
    @Inject(RetirementPermanentDisabilityRevisionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionQueryRepositoryGateway: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): Promise<CreateRetirementPermanentDisabilityRevisionResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPermanentDisabilityRevisionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPermanentDisabilityRevisionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPermanentDisabilityRevisionNotFoundError,
      );

    const analysisQueryResult =
      await this.retirementPermanentDisabilityRevisionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionNotFoundError,
      );

    const documentBuffers = await Promise.all(
      analysisQueryResult.document.map(async (doc: GetRetirementPermanentDisabilityRevisionDocumentQueryResult) => {
        return await this.fileProcessorGateway.getFileBuffer(doc.document);
      }),
    );

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );

    const completeAnalysis =
      await this.analysisProcessorGateway.getRetirementPermanentDisabilityRevisionCompleteAnalysis(
        promptResponse.prompt,
        [...documentBuffers, clientDataBuffer],
      );

    const revisionResult =
      new RetirementPermanentDisabilityRevisionResultEntity({
        retirementPermanentDisabilityRevisionCompleteAnalysis: completeAnalysis,
        retirementPermanentDisabilityRevisionSimplifiedAnalysis: null,
      });

    const revision = new RetirementPermanentDisabilityRevisionEntity({
      id: analysisQueryResult.id,
      retirementPermanentDisabilityRevisionResultId: revisionResult.id,
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
      retirementPermanentDisabilityRevision: revision,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      audienceQuestionGenerator: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
      teacherRetirementPlanning: null,
      disabilityRetirementPlanning: null,
      generalUrbanRetirementGrant: null,
      generalUrbanRetirementAnalysis: null,
      disabilityRetirementPlanningGrant: null,
      temporaryDisabilityBenefitsGrant: null,
      ruralOrHybridRetirementRejection: null,
      ruralOrHybridRetirementAnalysis: null,
      accidentBenefitRejection: null,
      survivorPensionAnalysis: null,
      specialCategoryRetirementAnalysis: null,
      deathBenefitGrant: null,
      deathBenefitRejection: null,
      specialRetirementGrant: null,
      generalUrbanRetirementDenial: null,
      disabilityRetirementPlanningRejection: null,
      bpcDisabilityDenial: null,
      bpcElderlyAnalysis: null,
      temporaryIncapacityBenefitRejection: null,
      maternityPayGrant: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createResultTransaction =
      this.retirementPermanentDisabilityRevisionResultCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionResult(
        revisionResult,
      );

    const updateRevisionTransaction =
      this.retirementPermanentDisabilityRevisionCommandRepositoryGateway.updateRetirementPermanentDisabilityRevision(
        revision.id,
        revision,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.RESULT_ADDED,
        analysisType: analysisToolRecord.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions: [
          consumeCreditTransaction,
          createResultTransaction,
          updateRevisionTransaction,
          updateAnalysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );
    await transaction.commit();

    const client = analysisToolRecordQueryResult.analysisToolClient;

    return CreateRetirementPermanentDisabilityRevisionResultResponseDto.build({
      ...(client.name !== null && { clientName: client.name }),
      ...(client.federalDocument !== null && {
        clientFederalDocument: client.federalDocument,
      }),
      ...(client.birthDate !== null && { clientBirthDate: client.birthDate }),
      ...(completeAnalysis !== null && {
        retirementPermanentDisabilityRevisionCompleteAnalysis: completeAnalysis,
      }),
    });
  }
}
