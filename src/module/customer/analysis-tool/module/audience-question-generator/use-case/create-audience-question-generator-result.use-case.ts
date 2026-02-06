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
import { AudienceQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/command/audience-question-generator.command.repository.gateway';
import { AudienceQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-result/command/audience-question-generator-result.command.repository.gateway';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';
import { CreateAudienceQuestionGeneratorResultResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/create-audience-question-generator-result.response.dto';
import { AudienceQuestionDocumentRequiredError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-document-required.error';
import { AudienceQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-not-found.error';
import { AudienceQuestionGeneratorResultAlreadyExistsError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAudienceQuestionGeneratorResultUseCase {
  protected readonly _type = CreateAudienceQuestionGeneratorResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorCommandRepositoryGateway: AudienceQuestionGeneratorCommandRepositoryGateway,
    @Inject(AudienceQuestionGeneratorResultCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorResultCommandRepositoryGateway: AudienceQuestionGeneratorResultCommandRepositoryGateway,
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
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
  ): Promise<CreateAudienceQuestionGeneratorResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.AUDIENCE_QUESTION_GENERATOR_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.AUDIENCE_QUESTION_GENERATOR_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAudienceQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AudienceQuestionGeneratorNotFoundError,
      );

    const audienceQuestionGeneratorQueryResult =
      analysisToolRecordQueryResult.audienceQuestionGenerator;

    if (audienceQuestionGeneratorQueryResult === null) {
      throw new AudienceQuestionGeneratorNotFoundError();
    }

    if (
      analysisToolRecordQueryResult.audienceQuestionGenerator
        ?.audienceQuestionGeneratorResult !== null
    ) {
      throw new AudienceQuestionGeneratorResultAlreadyExistsError();
    }

    if (
      audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorDocument
        .length === 0
    ) {
      throw new AudienceQuestionDocumentRequiredError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );
    const audienceQuestionDocumentsBuffer = await Promise.all(
      audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorDocument.map(
        async (document) => {
          return await this.fileProcessorGateway.getFileBuffer(
            document.document,
          );
        },
      ),
    );

    const audienceQuestionCompleteAnalysis =
      await this.analysisProcessorGateway.getAudienceQuestionGeneratorCompleteAnalysis(
        promptResponse.prompt,
        [...audienceQuestionDocumentsBuffer, clientDataBuffer],
      );

    const audienceQuestionGeneratorResult =
      new AudienceQuestionGeneratorResultEntity({
        audienceQuestionGeneratorCompleteAnalysis: audienceQuestionCompleteAnalysis,
      });

    const audienceQuestionGenerator = new AudienceQuestionGeneratorEntity({
      id: audienceQuestionGeneratorQueryResult.id,
      audienceQuestionGeneratorResult,
      audienceQuestionGeneratorDocument: [],
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
      audienceQuestionGenerator,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      cnisFastAnalysis: null,
      specialActivity: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      judicialCaseAnalysis: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createAudienceQuestionGeneratorResultTransaction =
      this.audienceQuestionGeneratorResultCommandRepositoryGateway.createAudienceQuestionGeneratorResult(
        audienceQuestionGeneratorResult,
      );
    const updateAudienceQuestionGeneratorTransaction =
      this.audienceQuestionGeneratorCommandRepositoryGateway.updateAudienceQuestionGenerator(
        audienceQuestionGenerator.id,
        audienceQuestionGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createAudienceQuestionGeneratorResultTransaction,
      updateAudienceQuestionGeneratorTransaction,
      updateAnalysisToolRecordTransaction,
    ]);
    await transaction.commit();

    return CreateAudienceQuestionGeneratorResultResponseDto.build({
      audienceQuestionGeneratorResultId: audienceQuestionGeneratorResult.id,
    });
  }
}
