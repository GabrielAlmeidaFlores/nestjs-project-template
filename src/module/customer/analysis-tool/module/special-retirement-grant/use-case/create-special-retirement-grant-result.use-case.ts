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
import { SpecialRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/command/special-retirement-grant.command.repository.gateway';
import { SpecialRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/command/special-retirement-grant-result.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';
import { CreateSpecialRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-result.response.dto';
import { InvalidSpecialRetirementGrantCompleteAnalysisJsonError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/invalid-special-retirement-grant-complete-analysis-json.error';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpecialRetirementGrantResultUseCase {
  protected readonly _type = CreateSpecialRetirementGrantResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantCommandRepositoryGateway)
    private readonly specialRetirementGrantCommandRepositoryGateway: SpecialRetirementGrantCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantResultCommandRepositoryGateway)
    private readonly specialRetirementGrantResultCommandRepositoryGateway: SpecialRetirementGrantResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<CreateSpecialRetirementGrantResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    const specialRetirementGrantQueryResult =
      analysisToolRecordQueryResult.specialRetirementGrant;
    if (specialRetirementGrantQueryResult === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      specialRetirementGrantQueryResult.cnisDocument,
    );

    const docBuffers = await Promise.all(
      specialRetirementGrantQueryResult.specialRetirementGrantDocument.map(
        async (doc) => await this.fileProcessorGateway.getFileBuffer(doc.document),
      ),
    );

    const allBuffers = [clientDataBuffer, cnisBuffer, ...docBuffers];

    const completeAnalysisJson =
      await this.analysisProcessorGateway.getSpecialRetirementGrantCompleteAnalysis(
        promptResponse.prompt,
        allBuffers,
      );

    if (completeAnalysisJson === null) {
      throw new InvalidSpecialRetirementGrantCompleteAnalysisJsonError();
    }

    try {
      JSON.parse(completeAnalysisJson);
    } catch {
      throw new InvalidSpecialRetirementGrantCompleteAnalysisJsonError();
    }

    const specialRetirementGrantResult = new SpecialRetirementGrantResultEntity({
      specialRetirementGrantCompleteAnalysis: completeAnalysisJson,
      specialRetirementGrantSimplifiedAnalysis: null,
    });

    const specialRetirementGrant = new SpecialRetirementGrantEntity({
      ...specialRetirementGrantQueryResult,
      specialRetirementGrantResult,
      specialRetirementGrantBenefit: null,
      specialRetirementGrantLegalProceeding: null,
      specialRetirementGrantDocument: null,
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
      specialRetirementGrant,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      specialActivity: null,
      administrativeProcedureInssAnalysis: null,
      judicialCaseAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      audienceQuestionGenerator: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
      teacherRetirementPlanning: null,
      disabilityRetirementPlanning: null,
      generalUrbanRetirementGrant: null,
      generalUrbanRetirementAnalysis: null,
      specialCategoryRetirementAnalysis: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createResultTransaction =
      this.specialRetirementGrantResultCommandRepositoryGateway.createSpecialRetirementGrantResult(
        specialRetirementGrantResult,
      );

    const updateSpecialRetirementGrantTransaction =
      this.specialRetirementGrantCommandRepositoryGateway.updateSpecialRetirementGrant(
        specialRetirementGrant.id,
        specialRetirementGrant,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createResultTransaction,
      updateSpecialRetirementGrantTransaction,
      updateAnalysisToolRecordTransaction,
    ]);
    await transaction.commit();

    return CreateSpecialRetirementGrantResultResponseDto.build({
      specialRetirementGrantCompleteAnalysis: JSON.parse(completeAnalysisJson) as object,
    });
  }
}

