import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/special-activity-result.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialActivityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/command/special-activity-analysis.command.repository.gateway';
import { SpecialActivityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-result/command/special-activity-analysis-result.command.repository.gateway';
import { CreateSpecialActivityAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/special-activity-analysis/dto/response/create-special-activity-analysis-result.response.dto';
import { InvalidCompleteAnalysisJsonError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/invalid-complete-analysis-json.error';
import { SpecialActivityAnalysisDocumentsNotFoundError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-documents-not-found.errors';
import { SpecialActivityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpecialActivityAnalysisResultUseCase {
  protected readonly _type = CreateSpecialActivityAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialActivityAnalysisCommandRepositoryGateway)
    private readonly specialActivityCommandRepositoryGateway: SpecialActivityAnalysisCommandRepositoryGateway,
    @Inject(SpecialActivityAnalysisResultCommandRepositoryGateway)
    private readonly specialActivityResultCommandRepositoryGateway: SpecialActivityAnalysisResultCommandRepositoryGateway,
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
    specialActivityId: SpecialActivityId,
  ): Promise<CreateSpecialActivityAnalysisResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialActivityAnalysisNotFoundError,
      );

    const specialActivityQueryResult =
      analysisToolRecordQueryResult.specialActivity;

    if (specialActivityQueryResult === null) {
      throw new SpecialActivityAnalysisNotFoundError();
    }

    if (specialActivityQueryResult.specialActivityDocuments.length === 0) {
      throw new SpecialActivityAnalysisDocumentsNotFoundError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );

    const documentBuffers = await Promise.all(
      specialActivityQueryResult.specialActivityDocuments.map(async (doc) => {
        const buffer = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        return buffer;
      }),
    );

    const allBuffers = [clientDataBuffer, ...documentBuffers];

    const specialActivityCompleteAnalysisJson =
      await this.analysisProcessorGateway.getSpecialActivityCompleteAnalysis(
        promptResponse.prompt,
        allBuffers,
      );

    const specialActivityResult = new SpecialActivityResultEntity({
      specialActivityCompleteAnalysis: specialActivityCompleteAnalysisJson,
      specialActivitySimplifiedAnalysis: null,
      specialActivityCompleteAnalysisDownload: null,
    });

    const specialActivity = new SpecialActivityEntity({
      ...specialActivityQueryResult,
      specialActivityResult,
      specialActivityDocuments: null,
      specialActivityInssBenefit: null,
      specialActivityLegalProceeding: null,
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
      specialActivity,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      disabilityAssessmentForBpcAnalysis: null,
      medicalQuestionGenerator: null,
      speechGenerator: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createSpecialActivityResultTransaction =
      this.specialActivityResultCommandRepositoryGateway.createSpecialActivityResult(
        specialActivityResult,
      );

    const updateSpecialActivityTransaction =
      this.specialActivityCommandRepositoryGateway.updateSpecialActivity(
        specialActivity.id,
        specialActivity,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createSpecialActivityResultTransaction,
      updateSpecialActivityTransaction,
      updateAnalysisToolRecordTransaction,
    ]);

    await transaction.commit();

    let parsedAnalysis: object = {};
    if (
      specialActivityResult.specialActivityCompleteAnalysis !== null &&
      specialActivityResult.specialActivityCompleteAnalysis.length > 0
    ) {
      try {
        parsedAnalysis = JSON.parse(
          specialActivityResult.specialActivityCompleteAnalysis,
        ) as object;
      } catch {
        throw new InvalidCompleteAnalysisJsonError();
      }
    }

    return CreateSpecialActivityAnalysisResultResponseDto.build({
      specialActivityCompleteAnalysis: parsedAnalysis,
    });
  }
}
