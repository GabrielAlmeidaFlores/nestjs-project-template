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
import { JudicialCaseAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/command/judicial-case-analysis.command.repository.gateway';
import { JudicialCaseAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-result/command/judicial-case-analysis-result.command.repository.gateway';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { JudicialCaseAnalysisResultEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity';
import { CreateJudicialCaseAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/response/create-judicial-case-analysis-result.response.dto';
import { JudicialCaseAnalysisNotFoundError } from '@module/customer/analysis-tool/module/judicial-case-analysis/error/judicial-case-analysis-not-found.error';
import { JudicialCaseAnalysisResultAlreadyExistsError } from '@module/customer/analysis-tool/module/judicial-case-analysis/error/judicial-case-analysis-result-already-exists.error';
import { JudicialCaseDocumentRequiredError } from '@module/customer/analysis-tool/module/judicial-case-analysis/error/judicial-case-document-required.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateJudicialCaseAnalysisResultUseCase {
  protected readonly _type = CreateJudicialCaseAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisCommandRepositoryGateway)
    private readonly judicialCaseAnalysisCommandRepositoryGateway: JudicialCaseAnalysisCommandRepositoryGateway,
    @Inject(JudicialCaseAnalysisResultCommandRepositoryGateway)
    private readonly judicialCaseAnalysisResultCommandRepositoryGateway: JudicialCaseAnalysisResultCommandRepositoryGateway,
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
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
  ): Promise<CreateJudicialCaseAnalysisResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByJudicialCaseAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        judicialCaseAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        JudicialCaseAnalysisNotFoundError,
      );

    const judicialCaseAnalysisQueryResult =
      analysisToolRecordQueryResult.judicialCaseAnalysis;

    if (judicialCaseAnalysisQueryResult === null) {
      throw new JudicialCaseAnalysisNotFoundError();
    }

    if (
      analysisToolRecordQueryResult.judicialCaseAnalysis
        ?.judicialCaseAnalysisResult !== null
    ) {
      throw new JudicialCaseAnalysisResultAlreadyExistsError();
    }

    if (
      judicialCaseAnalysisQueryResult.judicialCaseAnalysisDocument.length === 0
    ) {
      throw new JudicialCaseDocumentRequiredError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );
    const judicialCaseDocumentsBuffer = await Promise.all(
      judicialCaseAnalysisQueryResult.judicialCaseAnalysisDocument.map(
        async (document) => {
          return await this.fileProcessorGateway.getFileBuffer(
            document.document,
          );
        },
      ),
    );

    const judicialCaseCompleteAnalysis =
      await this.analysisProcessorGateway.getJudicialCaseAnalysisCompleteAnalysis(
        promptResponse.prompt,
        [...judicialCaseDocumentsBuffer, clientDataBuffer],
      );

    const judicialCaseAnalysisResult = new JudicialCaseAnalysisResultEntity({
      judicialCaseCompleteAnalysis: judicialCaseCompleteAnalysis,
    });

    const judicialCaseAnalysis = new JudicialCaseAnalysisEntity({
      id: judicialCaseAnalysisQueryResult.id,
      judicialCaseAnalysisResult,
      judicialCaseAnalysisBenefit: [],
      judicialCaseAnalysisLegalProceeding: [],
      judicialCaseAnalysisDocument: [],
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
      judicialCaseAnalysis,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      cnisFastAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createJudicialCaseAnalysisResultTransaction =
      this.judicialCaseAnalysisResultCommandRepositoryGateway.createJudicialCaseAnalysisResult(
        judicialCaseAnalysisResult,
      );
    const updateJudicialCaseAnalysisTransaction =
      this.judicialCaseAnalysisCommandRepositoryGateway.updateJudicialCaseAnalysis(
        judicialCaseAnalysis.id,
        judicialCaseAnalysis,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createJudicialCaseAnalysisResultTransaction,
      updateJudicialCaseAnalysisTransaction,
      updateAnalysisToolRecordTransaction,
    ]);
    await transaction.commit();

    return CreateJudicialCaseAnalysisResultResponseDto.build({
      ...judicialCaseAnalysisResult,
    });
  }
}
