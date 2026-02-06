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
import { MedicalQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/command/medical-question-generator.command.repository.gateway';
import { MedicalQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-result/command/medical-question-generator-result.command.repository.gateway';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { MedicalQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/medical-question-generator-result.entity';
import { CreateMedicalQuestionGeneratorResultResponseDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/create-medical-question-generator-result.response.dto';
import { MedicalQuestionGeneratorDocumentRequiredError } from '@module/customer/analysis-tool/module/medical-question-generator/error/medical-question-generator-document-required.error';
import { MedicalQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/medical-question-generator/error/medical-question-generator-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateMedicalQuestionGeneratorResultUseCase {
  protected readonly _type = CreateMedicalQuestionGeneratorResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorCommandRepositoryGateway: MedicalQuestionGeneratorCommandRepositoryGateway,
    @Inject(MedicalQuestionGeneratorResultCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorResultCommandRepositoryGateway: MedicalQuestionGeneratorResultCommandRepositoryGateway,
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
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
  ): Promise<CreateMedicalQuestionGeneratorResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMedicalQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        medicalQuestionGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MedicalQuestionGeneratorNotFoundError,
      );

    const medicalQuestionGeneratorQueryResult =
      analysisToolRecordQueryResult.medicalQuestionGenerator;

    if (medicalQuestionGeneratorQueryResult === null) {
      throw new MedicalQuestionGeneratorNotFoundError();
    }

    if (
      medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorDocument
        .length === 0
    ) {
      throw new MedicalQuestionGeneratorDocumentRequiredError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );
    const medicalQuestionGeneratorDocumentsBuffer = await Promise.all(
      medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorDocument.map(
        async (document) => {
          return await this.fileProcessorGateway.getFileBuffer(
            document.document,
          );
        },
      ),
    );

    const medicalQuestionGeneratorCompleteAnalysis =
      await this.analysisProcessorGateway.getMedicalQuestionGeneratorCompleteAnalysis(
        promptResponse.prompt,
        [...medicalQuestionGeneratorDocumentsBuffer, clientDataBuffer],
      );

    const medicalQuestionGeneratorResult =
      new MedicalQuestionGeneratorResultEntity({
        medicalQuestionGeneratorCompleteAnalysis:
          medicalQuestionGeneratorCompleteAnalysis,
        medicalQuestionGeneratorSimplifiedAnalysis: null,
      });

    const medicalQuestionGenerator = new MedicalQuestionGeneratorEntity({
      id: medicalQuestionGeneratorQueryResult.id,
      disabilityDate: medicalQuestionGeneratorQueryResult.disabilityDate,
      medicalQuestionGeneratorResult,
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
      medicalQuestionGenerator,
      administrativeProcedureInssAnalysis: null,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      cnisFastAnalysis: null,
      judicialCaseAnalysis: null,
      audienceQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      disabilityAssessmentForBpcAnalysis: null,
      specialActivity: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createMedicalQuestionGeneratorResultTransaction =
      this.medicalQuestionGeneratorResultCommandRepositoryGateway.createMedicalQuestionGeneratorResult(
        medicalQuestionGeneratorResult,
      );
    const updateMedicalQuestionGeneratorTransaction =
      this.medicalQuestionGeneratorCommandRepositoryGateway.updateMedicalQuestionGenerator(
        medicalQuestionGenerator.id,
        medicalQuestionGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createMedicalQuestionGeneratorResultTransaction,
      updateMedicalQuestionGeneratorTransaction,
      updateAnalysisToolRecordTransaction,
    ]);
    await transaction.commit();

    return CreateMedicalQuestionGeneratorResultResponseDto.build({
      medicalQuestionGeneratorCompleteAnalysis,
    });
  }
}
