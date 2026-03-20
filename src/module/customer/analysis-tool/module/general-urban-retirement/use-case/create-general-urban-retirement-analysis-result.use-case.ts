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
import { GeneralUrbanRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/command/general-urban-retirement-analysis.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-result/command/general-urban-retirement-analysis-result.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';
import { CreateGeneralUrbanRetirementAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/create-general-urban-retirement-analysis-result.response.dto';
import { FailedToGenerateGeneralUrbanRetirementCompleteAnalysisError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/failed-to-generate-general-urban-retirement-complete-analysis.error';
import { GeneralUrbanRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/general-urban-retirement-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GeneralUrbanRetirementCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/model/general-urban-retirement-complete-analysis.model';

@Injectable()
export class CreateGeneralUrbanRetirementAnalysisResultUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementAnalysisResultUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    protected readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisQueryRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisQueryRepositoryGateway: GeneralUrbanRetirementAnalysisQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisCommandRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisCommandRepositoryGateway: GeneralUrbanRetirementAnalysisCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisResultCommandRepositoryGateway: GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
  ): Promise<CreateGeneralUrbanRetirementAnalysisResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        GeneralUrbanRetirementAnalysisNotFoundError,
      );

    const generalUrbanRetirementAnalysisQueryResult =
      await this.generalUrbanRetirementAnalysisQueryRepositoryGateway.findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdWithRelationsOrFail(
        generalUrbanRetirementAnalysisId,
        organizationSessionData.organizationId,
        GeneralUrbanRetirementAnalysisNotFoundError,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisData = {
      analysisToolClient: analysisToolRecordQueryResult.analysisToolClient,
      careerStartDate:
        generalUrbanRetirementAnalysisQueryResult.careerStartDate,
      publicServiceStartDate:
        generalUrbanRetirementAnalysisQueryResult.publicServiceStartDate,
      currentPosition:
        generalUrbanRetirementAnalysisQueryResult.currentPosition,
      generalUrbanRetirementBenefitAnalysis:
        generalUrbanRetirementAnalysisQueryResult.generalUrbanRetirementBenefitAnalysis,
      periods: generalUrbanRetirementAnalysisQueryResult.periods,
      remunerations: generalUrbanRetirementAnalysisQueryResult.remunerations,
    };

    const documentsBuffer: Buffer[] = [
      Buffer.from(JSON.stringify(analysisData, null, 2), 'utf-8'),
    ];

    const generalUrbanRetirementCompleteAnalysis =
      await this.analysisProcessorGateway.getGeneralUrbanRetirementCompleteAnalysis(
        promptResponse.prompt,
        documentsBuffer,
      );

    if (generalUrbanRetirementCompleteAnalysis === null) {
      throw new FailedToGenerateGeneralUrbanRetirementCompleteAnalysisError();
    }

    let parsedAnalysis: Record<string, unknown>;
    try {
      let cleanedJson: string = generalUrbanRetirementCompleteAnalysis;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      parsedAnalysis = JSON.parse(cleanedJson) as Record<string, unknown>;
    } catch {
      throw new FailedToGenerateGeneralUrbanRetirementCompleteAnalysisError();
    }

    const completeAnalysisReport =
      typeof parsedAnalysis['completeAnalysisReport'] === 'string'
        ? parsedAnalysis['completeAnalysisReport']
        : null;

    const generalUrbanRetirementAnalysisResult =
      new GeneralUrbanRetirementAnalysisResultEntity({
        generalUrbanRetirementCompleteAnalysis,
        generalUrbanRetirementCompleteAnalysisDownload: completeAnalysisReport,
        generalUrbanRetirementSimplifiedAnalysis: null,
      });

    const analysisEntity = new GeneralUrbanRetirementAnalysisEntity({
      id: generalUrbanRetirementAnalysisQueryResult.id,
      careerStartDate:
        generalUrbanRetirementAnalysisQueryResult.careerStartDate,
      publicServiceStartDate:
        generalUrbanRetirementAnalysisQueryResult.publicServiceStartDate,
      generalUrbanRetirementAnalysisResult,
      federativeEntity:
        generalUrbanRetirementAnalysisQueryResult.federativeEntity ?? null,
      state: generalUrbanRetirementAnalysisQueryResult.state ?? null,
      municipality:
        generalUrbanRetirementAnalysisQueryResult.municipality ?? null,
      name: generalUrbanRetirementAnalysisQueryResult.name ?? null,
      benefitType:
        generalUrbanRetirementAnalysisQueryResult.benefitType ?? null,
      currentPosition:
        generalUrbanRetirementAnalysisQueryResult.currentPosition ?? null,
      generalUrbanRetirementBenefitAnalysis:
        generalUrbanRetirementAnalysisQueryResult.generalUrbanRetirementBenefitAnalysis ??
        null,
    });

    const generalUrbanRetirementAnalysisTransaction =
      this.generalUrbanRetirementAnalysisCommandRepositoryGateway.updateGeneralUrbanRetirementAnalysis(
        generalUrbanRetirementAnalysisId,
        analysisEntity,
      );

    const generalUrbanRetirementAnalysisResultTransaction =
      this.generalUrbanRetirementAnalysisResultCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisResult(
        generalUrbanRetirementAnalysisResult,
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
      generalUrbanRetirementAnalysis: analysisEntity,
      analysisToolClient,
      status: AnalysisStatusEnum.COMPLETED,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      audienceQuestionGenerator: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      generalUrbanRetirementAnalysisResultTransaction,
      generalUrbanRetirementAnalysisTransaction,
      updateAnalysisToolRecordTransaction,
    ]);

    await transaction.commit();

    const completeAnalysis: GeneralUrbanRetirementCompleteAnalysisInterface =
      parsedAnalysis as GeneralUrbanRetirementCompleteAnalysisInterface;

    return CreateGeneralUrbanRetirementAnalysisResultResponseDto.build({
      generalUrbanRetirementCompleteAnalysis: completeAnalysis,
    });
  }
}
