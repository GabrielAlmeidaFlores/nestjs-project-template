import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { MaternityPayRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/maternity-pay-rejection.query.repository.gateway';
import { MaternityPayRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-result/command/maternity-pay-rejection-result.command.repository.gateway';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/enum/maternity-pay-rejection-document-type.enum';
import { MaternityPayRejectionResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity';
import { CreateMaternityPayRejectionResultResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/create-maternity-pay-rejection-result.response.dto';
import { InvalidMaternityPayRejectionResultJsonError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/invalid-maternity-pay-rejection-result-json.error';
import { MaternityPayRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-cnis-document-not-found.error';
import { MaternityPayRejectionNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-not-found.error';
import { MaternityPayRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GetMaternityPayRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/result/get-maternity-pay-rejection-with-relations.query.result';
import type { MaternityPayRejectionResultInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/interface/maternity-pay-rejection-result.interface';

@Injectable()
export class CreateMaternityPayRejectionResultUseCase {
  protected readonly _type = CreateMaternityPayRejectionResultUseCase.name;

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
    @Inject(MaternityPayRejectionQueryRepositoryGateway)
    private readonly maternityPayRejectionQueryRepositoryGateway: MaternityPayRejectionQueryRepositoryGateway,
    @Inject(MaternityPayRejectionResultCommandRepositoryGateway)
    private readonly maternityPayRejectionResultCommandRepositoryGateway: MaternityPayRejectionResultCommandRepositoryGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayRejectionId: MaternityPayRejectionId,
  ): Promise<CreateMaternityPayRejectionResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const rejection =
      await this.maternityPayRejectionQueryRepositoryGateway.findOneByMaternityPayRejectionIdOrFailWithRelations(
        maternityPayRejectionId,
        MaternityPayRejectionNotFoundError,
      );

    const cnisDoc =
      (rejection.maternityPayRejectionDocument ?? []).find(
        (d) => d.type === MaternityPayRejectionDocumentTypeEnum.CNIS,
      ) ?? null;

    if (!cnisDoc) {
      throw new MaternityPayRejectionCnisDocumentNotFoundError();
    }

    if (cnisDoc.document === null) {
      throw new MaternityPayRejectionCnisDocumentNotFoundError();
    }

    const existingResult = rejection.maternityPayRejectionResult;

    if (existingResult === null) {
      throw new MaternityPayRejectionResultNotFoundError();
    }

    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        maternityPayRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MaternityPayRejectionNotFoundError,
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
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_REJECTION_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_REJECTION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysisResponse =
      await this.analysisProcessorGateway.getMaternityPayRejectionCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildRejectionDataBuffer(rejection), ...allDocumentBuffers],
      );

    if (completeAnalysisResponse === null) {
      throw new MaternityPayRejectionNotFoundError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysisResponse);

    const resultEntity = new MaternityPayRejectionResultEntity({
      id: existingResult.id,
      firstAnalysis: existingResult.firstAnalysis,
      secondAnalysis: existingResult.secondAnalysis,
      completeAnalysis: completeAnalysisResponse,
      simplifiedAnalysis: existingResult.simplifiedAnalysis,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.maternityPayRejectionResultCommandRepositoryGateway.updateMaternityPayRejectionResult(
        resultEntity,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordStatus(
        analysisToolRecord.id,
        AnalysisStatusEnum.COMPLETED,
        organizationMember.id,
      ),
    ]);

    await transaction.commit();

    return CreateMaternityPayRejectionResultResponseDto.build({
      maternityPayRejectionCompleteAnalysis: parsedResult,
    });
  }

  private parseResultAnalysis(
    raw: string,
  ): MaternityPayRejectionResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidMaternityPayRejectionResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is MaternityPayRejectionResultInterface {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const obj = value as Record<string, unknown>;

    return (
      'retirementRules' in obj &&
      'isEligibleForMaternityPay' in obj &&
      'analysisResult' in obj
    );
  }

  private buildRejectionDataBuffer(
    rejection: GetMaternityPayRejectionWithRelationsQueryResult,
  ): Buffer {
    const data = {
      analysisName: rejection.analysisName,
      triggeringEvent: rejection.triggeringEvent,
      triggeringEventDate: rejection.triggeringEventDate,
      isCurrentlyUnemployed: rejection.isCurrentlyUnemployed,
      category: rejection.category,
      inssBenefits: (rejection.maternityPayRejectionInssBenefit ?? []).map(
        (ib) => ib.inssBenefit,
      ),
      legalProceedingNumbers: (
        rejection.maternityPayRejectionLegalProceeding ?? []
      ).map((lp) => lp.legalProceedingNumber),
      workPeriods: (rejection.maternityPayRejectionWorkPeriod ?? []).map(
        (wp) => ({
          bondOrigin: wp.bondOrigin,
          startDate: wp.startDate,
          endDate: wp.endDate,
          category: wp.category,
          competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
          pendencyReason: wp.pendencyReason,
          periodConsideration: wp.periodConsideration,
          contributionAverage: wp.contributionAverage,
          status: wp.status,
          gracePeriod: wp.gracePeriod,
          jobType: wp.jobType,
          activityDescription: wp.activityDescription,
        }),
      ),
    };

    return Buffer.from(JSON.stringify(data, null, 2));
  }

  private async buildDocumentBuffers(
    rejection: GetMaternityPayRejectionWithRelationsQueryResult,
  ): Promise<Buffer[]> {
    const docs = (rejection.maternityPayRejectionDocument ?? []).filter(
      (d) =>
        d.type !== MaternityPayRejectionDocumentTypeEnum.CNIS &&
        d.document !== null,
    );

    return Promise.all(
      docs.map((d) =>
        this.fileProcessorGateway.getFileBuffer(d.document as string),
      ),
    );
  }
}
