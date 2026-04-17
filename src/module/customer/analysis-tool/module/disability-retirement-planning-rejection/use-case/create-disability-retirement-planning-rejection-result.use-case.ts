import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-result/command/disability-retirement-planning-rejection-result.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/enum/disability-retirement-planning-rejection-document-type.enum';
import { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import {
  CreateDisabilityRetirementPlanningRejectionResultClientDataResponseDto,
  CreateDisabilityRetirementPlanningRejectionResultResponseDto,
  CreateDisabilityRetirementPlanningRejectionResultRetirementRuleResponseDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/create-disability-retirement-planning-rejection-result.response.dto';
import { DisabilityRetirementPlanningRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-cnis-document-not-found.error';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { DisabilityRetirementPlanningRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-result-not-found.error';
import { InvalidDisabilityRetirementPlanningRejectionResultJsonError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/invalid-disability-retirement-planning-rejection-result-json.error';
import {
  DisabilityRetirementPlanningRejectionResultInterface,
  DisabilityRetirementPlanningRejectionResultRetirementRuleInterface,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/model/interface/disability-retirement-planning-rejection-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDisabilityRetirementPlanningRejectionResultUseCase {
  protected readonly _type =
    CreateDisabilityRetirementPlanningRejectionResultUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionQueryRepositoryGateway: DisabilityRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionResultCommandRepositoryGateway: DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway,
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
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): Promise<CreateDisabilityRetirementPlanningRejectionResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const disabilityRetirementPlanningRejection =
      await this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
        disabilityRetirementPlanningRejectionId,
        DisabilityRetirementPlanningRejectionNotFoundError,
      );

    const cnisDocument = (
      disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionDocument ??
      []
    ).find(
      (doc) =>
        doc.type === DisabilityRetirementPlanningRejectionDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new DisabilityRetirementPlanningRejectionCnisDocumentNotFoundError();
    }

    const existingResult =
      disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionResult;

    if (existingResult === null) {
      throw new DisabilityRetirementPlanningRejectionResultNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      disabilityRetirementPlanningRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
    );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await this.buildAllDocumentBuffers(
      disabilityRetirementPlanningRejection,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningRejectionResultAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildGrantDataBuffer(disabilityRetirementPlanningRejection),
          ...documentBuffers,
        ],
      );

    if (completeAnalysisRaw === null) {
      throw new DisabilityRetirementPlanningRejectionResultNotFoundError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const resultEntity = new DisabilityRetirementPlanningRejectionResultEntity({
      id: existingResult.id,
      inssDecisionAnalysis: existingResult.inssDecisionAnalysis,
      firstAnalysis: existingResult.firstAnalysis,
      completeAnalysis: completeAnalysisRaw,
      completeAnalysisDownload: parsedResult.completeAnalysisDownload,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.disabilityRetirementPlanningRejectionResultCommandRepositoryGateway.updateDisabilityRetirementPlanningRejectionResult(
        existingResult.id,
        resultEntity,
      ),
    ]);

    await transaction.commit();

    return CreateDisabilityRetirementPlanningRejectionResultResponseDto.build({
      clientData:
        CreateDisabilityRetirementPlanningRejectionResultClientDataResponseDto.build(
          {
            name: parsedResult.clientData.name,
            federalDocument: parsedResult.clientData.federalDocument,
            ...(parsedResult.clientData.lastAffiliationDate !== null && {
              lastAffiliationDate: new Date(
                parsedResult.clientData.lastAffiliationDate,
              ),
            }),
            ...(parsedResult.clientData.birthDate !== null && {
              birthDate: new Date(parsedResult.clientData.birthDate),
            }),
            gender: parsedResult.clientData.gender,
          },
        ),
      retirementRules: parsedResult.retirementRules.map(
        (
          rule: DisabilityRetirementPlanningRejectionResultRetirementRuleInterface,
        ) =>
          CreateDisabilityRetirementPlanningRejectionResultRetirementRuleResponseDto.build(
            {
              retirementRuleName: rule.retirementRuleName,
              isEligible: rule.isEligible,
              ...(rule.eligibilityAvailableAt !== null && {
                eligibilityAvailableAt: new Date(rule.eligibilityAvailableAt),
              }),
              expectedMonthlyBenefit: rule.expectedMonthlyBenefit,
              isBestRmi: rule.isBestRmi,
              isHighestCauseValue: rule.isHighestCauseValue,
              retirementAnalysis: rule.retirementAnalysis,
            },
          ),
      ),
      analysisResult: parsedResult.analysisResult,
    });
  }

  private parseResultAnalysis(
    raw: string,
  ): DisabilityRetirementPlanningRejectionResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidDisabilityRetirementPlanningRejectionResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is DisabilityRetirementPlanningRejectionResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      this.isRecord(value['clientData']) &&
      Array.isArray(value['retirementRules']) &&
      typeof value['analysisResult'] === 'string' &&
      typeof value['completeAnalysisDownload'] === 'string'
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private buildGrantDataBuffer(
    disabilityRetirementPlanningRejection: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      analysisName: disabilityRetirementPlanningRejection.analysisName,
      requestEntryDate: disabilityRetirementPlanningRejection.requestEntryDate,
      denialDate: disabilityRetirementPlanningRejection.denialDate,
      requestedBenefitType:
        disabilityRetirementPlanningRejection.requestedBenefitType,
      category: disabilityRetirementPlanningRejection.category,
      retirementType: disabilityRetirementPlanningRejection.retirementType,
      denialReason: disabilityRetirementPlanningRejection.denialReason,
      denialReasonDescription:
        disabilityRetirementPlanningRejection.denialReasonDescription,
      documents: (
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionDocument ??
        []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      periods: (
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionPeriod ??
        []
      ).map((period) => ({
        id: period.id.toString(),
        startDate: period.startDate,
        endDate: period.endDate,
        workType: period.workType,
        bondOrigin: period.bondOrigin,
        category: period.category,
        isPendency: period.isPendency,
        competenceBelowTheMinimum: period.competenceBelowTheMinimum,
        pendencyReason: period.pendencyReason,
        periodConsideration: period.periodConsideration,
        ...(period.contributionAverage !== null && {
          contributionAverage: period.contributionAverage.toString(),
        }),
        status: period.status,
        pcdStatus: period.pcdStatus,
      })),
      timeAccelerators:
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionTimeAccelerator ??
        [],
      inssBenefits:
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionInssBenefit ??
        [],
      currentResult:
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionResult !==
        null
          ? {
              id: disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionResult.id.toString(),
              inssDecisionAnalysis:
                disabilityRetirementPlanningRejection
                  .disabilityRetirementPlanningRejectionResult
                  .inssDecisionAnalysis,
              firstAnalysis:
                disabilityRetirementPlanningRejection
                  .disabilityRetirementPlanningRejectionResult.firstAnalysis,
            }
          : null,
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async buildAllDocumentBuffers(
    disabilityRetirementPlanningRejection: Awaited<
      ReturnType<
        typeof this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionDocument ??
        []
      )
        .filter((doc) => doc.document !== cnisDocumentPath)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    const periodDocumentBuffers = await Promise.all(
      (
        disabilityRetirementPlanningRejection.disabilityRetirementPlanningRejectionPeriodDocument ??
        []
      ).map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    return [cnisBuffer, ...otherDocumentBuffers, ...periodDocumentBuffers];
  }

  private findAnalysisToolClientOrFail(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const recordPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByDisabilityRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityRetirementPlanningRejectionId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    return recordPromise.then((record) => {
      const analysisToolClient = record.analysisToolClient;

      return new AnalysisToolClientEntity({
        ...analysisToolClient,
        createdBy: analysisToolClient.createdBy.id,
        updatedBy: analysisToolClient.updatedBy.id,
      });
    });
  }
}
