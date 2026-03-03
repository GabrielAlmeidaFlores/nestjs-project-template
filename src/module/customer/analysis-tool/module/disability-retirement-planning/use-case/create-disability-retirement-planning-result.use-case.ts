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
import { DisabilityRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/command/disability-retirement-planning.command.repository.gateway';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/command/disability-retirement-planning-result.command.repository.gateway';
import { DisabilityRetirementPlanningResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/query/disability-retirement-planning-result.query.repository.gateway';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/disability-retirement-planning-result.entity';
import { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';
import { CreateDisabilityRetirementPlanningResultResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/create-disability-retirement-planning-result.response.dto';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { DisabilityRetirementPlanningCompleteAnalysisModel, DisabilityRetirementPlanningRetirementOptionModel, DisabilityRetirementPlanningTimelinePeriodModel } from '@module/customer/analysis-tool/module/disability-retirement-planning/model/generic/disability-retirement-planning-complete-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDisabilityRetirementPlanningResultUseCase {
  protected readonly _type =
    CreateDisabilityRetirementPlanningResultUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    protected readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningQueryRepositoryGateway: DisabilityRetirementPlanningQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningCommandRepositoryGateway: DisabilityRetirementPlanningCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningResultCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningResultCommandRepositoryGateway: DisabilityRetirementPlanningResultCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningResultQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningResultQueryRepositoryGateway: DisabilityRetirementPlanningResultQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<CreateDisabilityRetirementPlanningResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.disabilityRetirementPlanningQueryRepositoryGateway.findOneDisabilityRetirementPlanningByIdWithRelations(
        disabilityRetirementPlanningId,
      );

    if (!queryResult) {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityRetirementPlanningId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        DisabilityRetirementPlanningNotFoundError,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisData = {
      currentPosition: queryResult.currentPosition,
      federativeEntity: queryResult.federativeEntity,
      state: queryResult.state,
      municipality: queryResult.municipality,
      longTimeDisability: queryResult.longTimeDisability,
      publicServiceStartDate: queryResult.publicServiceStartDate,
      careerStartDate: queryResult.careerStartDate,
      periods: queryResult.periods,
      inssBenefits: queryResult.inssBenefits,
      legalProceedings: queryResult.legalProceedings,
    };

    const analysisDataBuffer = Buffer.from(
      JSON.stringify(analysisData, null, 2),
      'utf-8',
    );

    const analysisResult =
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningCompleteAnalysis(
        promptResponse.prompt,
        [analysisDataBuffer],
        true,
      );

    if (analysisResult === null) {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    let parsedAnalysis: DisabilityRetirementPlanningCompleteAnalysisModel;
    try {
      let cleanedJson: string = analysisResult;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(cleanedJson) as DisabilityRetirementPlanningCompleteAnalysisModel;

      parsedAnalysis = DisabilityRetirementPlanningCompleteAnalysisModel.build({
        ...raw,
        timeline: raw.timeline.map((p) =>
          DisabilityRetirementPlanningTimelinePeriodModel.build(p),
        ),
        retirementOptionsSummary: raw.retirementOptionsSummary.map((o) =>
          DisabilityRetirementPlanningRetirementOptionModel.build(o),
        ),
      });
    } catch {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    const disabilityRetirementPlanningEntity =
      new DisabilityRetirementPlanningEntity({
        id: disabilityRetirementPlanningId,
        currentPosition: queryResult.currentPosition,
        federativeEntity: queryResult.federativeEntity,
        state: queryResult.state,
        municipality: queryResult.municipality,
        longTimeDisability: queryResult.longTimeDisability,
        publicServiceStartDate: queryResult.publicServiceStartDate,
        careerStartDate: queryResult.careerStartDate,
        analysisName: queryResult.analysisName,
      });

    const existingResultId =
      await this.disabilityRetirementPlanningResultQueryRepositoryGateway.findOneIdByDisabilityRetirementPlanningId(
        disabilityRetirementPlanningId,
      );

    const resultId = existingResultId ?? new DisabilityRetirementPlanningResultId();

    const disabilityRetirementPlanningResultEntity =
      new DisabilityRetirementPlanningResultEntity({
        id: resultId,
        disabilityRetirementPlanning: disabilityRetirementPlanningEntity,
        disabilityRetirementPlanningCompleteAnalysis: JSON.stringify(
          parsedAnalysis,
        ),
        disabilityRetirementPlanningSimplifiedAnalysis: null,
        disabilityRetirementPlanningCompleteAnalysisDownload: null,
      });

    const resultTransaction = existingResultId
      ? this.disabilityRetirementPlanningResultCommandRepositoryGateway.updateDisabilityRetirementPlanningResult(
          existingResultId,
          disabilityRetirementPlanningResultEntity,
        )
      : this.disabilityRetirementPlanningResultCommandRepositoryGateway.createDisabilityRetirementPlanningResult(
          disabilityRetirementPlanningResultEntity,
        );

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
      disabilityRetirementPlanning: disabilityRetirementPlanningEntity,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      resultTransaction,
      this.disabilityRetirementPlanningCommandRepositoryGateway.updateDisabilityRetirementPlanning(
        disabilityRetirementPlanningId,
        disabilityRetirementPlanningEntity,
      ),
      this.disabilityRetirementPlanningCommandRepositoryGateway.updateDisabilityRetirementPlanningResultId(
        disabilityRetirementPlanningId,
        resultId,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    ]);

    await transaction.commit();

    return CreateDisabilityRetirementPlanningResultResponseDto.build({
      disabilityRetirementPlanningCompleteAnalysis: parsedAnalysis,
    });
  }
}
