import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/command/accident-benefit-rejection.command.repository.gateway';
import { AccidentBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/accident-benefit-rejection.query.repository.gateway';
import { AccidentBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-result/command/accident-benefit-rejection-result.command.repository.gateway';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/enum/accident-benefit-rejection-document-type.enum';
import { AccidentBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/accident-benefit-rejection-result.entity';
import { CreateAccidentBenefitRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/create-accident-benefit-rejection-first-analysis.response.dto';
import { AccidentBenefitRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/accident-benefit-rejection/error/accident-benefit-rejection-cnis-document-not-found.error';
import { AccidentBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/accident-benefit-rejection/error/accident-benefit-rejection-not-found.error';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAccidentBenefitRejectionFirstAnalysisUseCase {
  protected readonly _type =
    CreateAccidentBenefitRejectionFirstAnalysisUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AccidentBenefitRejectionCommandRepositoryGateway)
    private readonly accidentBenefitRejectionCommandRepositoryGateway: AccidentBenefitRejectionCommandRepositoryGateway,
    @Inject(AccidentBenefitRejectionQueryRepositoryGateway)
    private readonly accidentBenefitRejectionQueryRepositoryGateway: AccidentBenefitRejectionQueryRepositoryGateway,
    @Inject(AccidentBenefitRejectionResultCommandRepositoryGateway)
    private readonly accidentBenefitRejectionResultCommandRepositoryGateway: AccidentBenefitRejectionResultCommandRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
  ): Promise<CreateAccidentBenefitRejectionFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const rejection =
      await this.accidentBenefitRejectionQueryRepositoryGateway.findOneByAccidentBenefitRejectionIdOrFailWithRelations(
        accidentBenefitRejectionId,
        AccidentBenefitRejectionNotFoundError,
      );

    const cnisDoc =
      (rejection.accidentBenefitRejectionDocument ?? []).find(
        (d) => d.type === AccidentBenefitRejectionDocumentTypeEnum.CNIS,
      ) ?? null;

    if (!cnisDoc) {
      throw new AccidentBenefitRejectionCnisDocumentNotFoundError();
    }

    if (cnisDoc.document === null) {
      throw new AccidentBenefitRejectionCnisDocumentNotFoundError();
    }

    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAccidentBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        accidentBenefitRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AccidentBenefitRejectionNotFoundError,
      );

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDoc.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecord.analysisToolClient,
      createdBy: analysisToolRecord.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecord.analysisToolClient.updatedBy.id,
    });

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const allDocumentBuffers = await this.buildDocumentBuffers(rejection);

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_BENEFIT_REJECTION_SECOND_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_BENEFIT_REJECTION_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisResponse =
      await this.analysisProcessorGateway.getAccidentBenefitRejectionSecondAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildRejectionDataBuffer(rejection), ...allDocumentBuffers],
      );

    if (firstAnalysisResponse === null) {
      throw new AccidentBenefitRejectionNotFoundError();
    }

    const existingResult = rejection.accidentBenefitRejectionResult;

    const resultEntity = new AccidentBenefitRejectionResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      firstAnalysis: firstAnalysisResponse,
      secondAnalysis: existingResult?.secondAnalysis ?? null,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
      completeAnalysisDownload:
        existingResult?.completeAnalysisDownload ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.accidentBenefitRejectionResultCommandRepositoryGateway.updateAccidentBenefitRejectionResult(
            resultEntity,
          )
        : this.accidentBenefitRejectionResultCommandRepositoryGateway.createAccidentBenefitRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.accidentBenefitRejectionCommandRepositoryGateway.updateAccidentBenefitRejectionResultId(
          accidentBenefitRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateAccidentBenefitRejectionFirstAnalysisResponseDto.build({
      accidentBenefitRejectionFirstAnalysis: firstAnalysisResponse,
    });
  }

  private buildRejectionDataBuffer(
    rejection: Awaited<
      ReturnType<
        typeof this.accidentBenefitRejectionQueryRepositoryGateway.findOneByAccidentBenefitRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const data = {
      analysisName: rejection.analysisName,
      requirementStartDate: rejection.requirementStartDate,
      rejectionDate: rejection.rejectionDate,
      category: rejection.category,
      mainAccidentBenefitRejectionReason:
        rejection.mainAccidentBenefitRejectionReason,
      otherAccidentBenefitRejectionReason:
        rejection.otherAccidentBenefitRejectionReason,
      hasPreviousGrantRelated: rejection.hasPreviousGrantRelated,
      previousGrantBenefitNumber: rejection.previousGrantBenefitNumber,
      previousGrantStartDate: rejection.previousGrantStartDate,
      previousGrantTerminationDate: rejection.previousGrantTerminationDate,
      requestToExtendTemporaryDisabilityBenefit:
        rejection.requestToExtendTemporaryDisabilityBenefit,
      inssBenefits: (rejection.accidentBenefitRejectionInssBenefit ?? []).map(
        (ib) => ib.inssBenefit,
      ),
      events: (rejection.accidentBenefitRejectionEvent ?? []).map((e) => ({
        accidentDate: e.accidentDate,
        accidentDescription: e.accidentDescription,
        cidTenId: e.cidTenId?.toString() ?? null,
      })),
      workPeriods: (rejection.accidentBenefitRejectionWorkPeriod ?? []).map(
        (wp) => ({
          bondOrigin: wp.bondOrigin,
          startDate: wp.startDate,
          endDate: wp.endDate,
          category: wp.category,
          competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
          pendencyReason: wp.pendencyReason,
          periodConsideration: wp.periodConsideration,
          ...(wp.contributionAverage !== null && {
            contributionAverage: wp.contributionAverage.toString(),
          }),
          status: wp.status,
          gracePeriod: wp.gracePeriod,
          jobType: wp.jobType,
          activityDescription: wp.activityDescription,
        }),
      ),
    };

    return Buffer.from(JSON.stringify(data));
  }

  private async buildDocumentBuffers(
    rejection: Awaited<
      ReturnType<
        typeof this.accidentBenefitRejectionQueryRepositoryGateway.findOneByAccidentBenefitRejectionIdOrFailWithRelations
      >
    >,
  ): Promise<Buffer[]> {
    const fileNames = [
      ...(rejection.accidentBenefitRejectionDocument ?? []).map(
        (d) => d.document,
      ),
      ...(rejection.accidentBenefitRejectionEventDocument ?? []).map(
        (d) => d.document,
      ),
      ...(rejection.accidentBenefitRejectionWorkPeriodDocument ?? []).map(
        (d) => d.document,
      ),
    ].filter((fileName): fileName is string => fileName !== null);

    return Promise.all(
      fileNames.map((fileName) =>
        this.fileProcessorGateway.getFileBuffer(fileName),
      ),
    );
  }
}
