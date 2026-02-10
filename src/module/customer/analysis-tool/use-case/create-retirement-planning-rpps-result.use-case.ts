import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-result/command/retirement-planning-rpps-result.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';
import { CreateRetirementPlanningRppsResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rpps-result.response.dto';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { FailedToGenerateRetirementPlanningRppsAnalysisError } from '@module/customer/analysis-tool/error/failed-to-generate-retirement-planning-rpps-analysis.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rpps-not-found.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPlanningRppsResultUseCase {
  protected readonly _type = CreateRetirementPlanningRppsResultUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    protected readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRppsCommandRepositoryGateway)
    private readonly retirementPlanningRppsCommandRepositoryGateway: RetirementPlanningRppsCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsResultCommandRepositoryGateway)
    private readonly retirementPlanningRppsResultCommandRepositoryGateway: RetirementPlanningRppsResultCommandRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<CreateRetirementPlanningRppsResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    const retirementPlanningRppsQueryResult =
      await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        RetirementPlanningRppsNotFoundError,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisData = {
      analysisToolClient: analysisToolRecordQueryResult.analysisToolClient,
      careerStartDate: retirementPlanningRppsQueryResult.careerStartDate,
      publicServiceStartDate:
        retirementPlanningRppsQueryResult.publicServiceStartDate,
      ctcDocuments: retirementPlanningRppsQueryResult.ctcDocuments,
      periods: retirementPlanningRppsQueryResult.periods,
      remunerations: retirementPlanningRppsQueryResult.remunerations,
    };

    const documentsBuffer: Buffer[] = [
      Buffer.from(JSON.stringify(analysisData, null, 2), 'utf-8'),
    ];

    const retirementPlanningRppsCompleteAnalysis =
      await this.analysisProcessorGateway.getRetirementPlanningRppsCompleteAnalysis(
        promptResponse.prompt,
        documentsBuffer,
      );

    if (retirementPlanningRppsCompleteAnalysis === null) {
      throw new FailedToGenerateRetirementPlanningRppsAnalysisError();
    }

    let parsedAnalysis: object;
    try {
      let cleanedJson: string = retirementPlanningRppsCompleteAnalysis;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      parsedAnalysis = JSON.parse(cleanedJson) as object;
    } catch {
      throw new FailedToGenerateRetirementPlanningRppsAnalysisError();
    }

    const retirementPlanningRppsResult = new RetirementPlanningRppsResultEntity(
      {
        retirementPlanningRppsCompleteAnalysis,
        retirementPlanningRppsSimplifiedAnalysis: null,
      },
    );

    const retirementPlanningRpps = new RetirementPlanningRppsEntity({
      id: retirementPlanningRppsQueryResult.id,
      careerStartDate: retirementPlanningRppsQueryResult.careerStartDate,
      publicServiceStartDate:
        retirementPlanningRppsQueryResult.publicServiceStartDate,
      retirementPlanningRppsResult,
    });

    const retirementPlanningRppsTransaction =
      this.retirementPlanningRppsCommandRepositoryGateway.updateRetirementPlanningRpps(
        retirementPlanningRpps.id,
        retirementPlanningRpps,
      );

    const retirementPlanningRppsResultTransaction =
      this.retirementPlanningRppsResultCommandRepositoryGateway.createRetirementPlanningRppsResult(
        retirementPlanningRppsResult,
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
      cnisFastAnalysis: null,
      retirementPlanningRpps,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      retirementPlanningRppsResultTransaction,
      retirementPlanningRppsTransaction,
      updateAnalysisToolRecordTransaction,
    ]);

    await transaction.commit();

    return CreateRetirementPlanningRppsResultResponseDto.build({
      retirementPlanningRppsCompleteAnalysis: parsedAnalysis,
    });
  }
}
