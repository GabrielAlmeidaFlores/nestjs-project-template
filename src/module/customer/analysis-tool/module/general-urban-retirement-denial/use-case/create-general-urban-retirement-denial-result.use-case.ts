import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-result/command/general-urban-retirement-denial-result.command.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
import { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import {
  CreateGeneralUrbanRetirementDenialResultClientDataResponseDto,
  CreateGeneralUrbanRetirementDenialResultResponseDto,
  CreateGeneralUrbanRetirementDenialResultRetirementRuleResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial-result.response.dto';
import { GeneralUrbanRetirementDenialCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-cnis-document-not-found.error';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { GeneralUrbanRetirementDenialResultNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-result-not-found.error';
import { InvalidGeneralUrbanRetirementDenialResultJsonError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/invalid-general-urban-retirement-denial-result-json.error';
import {
  GeneralUrbanRetirementDenialResultInterface,
  GeneralUrbanRetirementDenialResultRetirementRuleInterface,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/interface/general-urban-retirement-denial-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementDenialResultUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementDenialResultUseCase.name;

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
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementDenialResultCommandRepositoryGateway: GeneralUrbanRetirementDenialResultCommandRepositoryGateway,
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
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<CreateGeneralUrbanRetirementDenialResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementDenial =
      await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
        generalUrbanRetirementDenialId,
        GeneralUrbanRetirementDenialNotFoundError,
      );

    const cnisDocument = (
      generalUrbanRetirementDenial.generalUrbanRetirementDenialDocument ?? []
    ).find(
      (doc) => doc.type === GeneralUrbanRetirementDenialDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new GeneralUrbanRetirementDenialCnisDocumentNotFoundError();
    }

    const existingResult =
      generalUrbanRetirementDenial.generalUrbanRetirementDenialResult;

    if (existingResult === null) {
      throw new GeneralUrbanRetirementDenialResultNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementDenialId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisRecord.analysisToolClient,
      createdBy: analysisRecord.analysisToolClient.createdBy.id,
      updatedBy: analysisRecord.analysisToolClient.updatedBy.id,
    });

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await this.buildAllDocumentBuffers(
      generalUrbanRetirementDenial,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysisRaw =
      await this.analysisProcessorGateway.getGeneralUrbanRetirementDenialResultAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildGrantDataBuffer(generalUrbanRetirementDenial),
          ...documentBuffers,
        ],
      );

    if (completeAnalysisRaw === null) {
      throw new GeneralUrbanRetirementDenialResultNotFoundError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysisRaw);

    const resultEntity = new GeneralUrbanRetirementDenialResultEntity({
      id: existingResult.id,
      inssDecisionAnalysis: existingResult.inssDecisionAnalysis,
      firstAnalysis: existingResult.firstAnalysis,
      completeAnalysis: completeAnalysisRaw,
      completeAnalysisDownload: parsedResult.completeAnalysisDownload,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.generalUrbanRetirementDenialResultCommandRepositoryGateway.updateGeneralUrbanRetirementDenialResult(
        existingResult.id,
        resultEntity,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordStatus(
        analysisRecord.id,
        AnalysisStatusEnum.COMPLETED,
        organizationMember.id,
      ),
    ]);

    await transaction.commit();

    return CreateGeneralUrbanRetirementDenialResultResponseDto.build({
      clientData:
        CreateGeneralUrbanRetirementDenialResultClientDataResponseDto.build({
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
        }),
      retirementRules: parsedResult.retirementRules.map(
        (rule: GeneralUrbanRetirementDenialResultRetirementRuleInterface) =>
          CreateGeneralUrbanRetirementDenialResultRetirementRuleResponseDto.build(
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
  ): GeneralUrbanRetirementDenialResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidGeneralUrbanRetirementDenialResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is GeneralUrbanRetirementDenialResultInterface {
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
    generalUrbanRetirementDenial: Awaited<
      ReturnType<
        typeof this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      analysisName: generalUrbanRetirementDenial.analysisName,
      requestEntryDate: generalUrbanRetirementDenial.requestEntryDate,
      denialDate: generalUrbanRetirementDenial.denialDate,
      requestedBenefitType: generalUrbanRetirementDenial.requestedBenefitType,
      category: generalUrbanRetirementDenial.category,
      documents: (
        generalUrbanRetirementDenial.generalUrbanRetirementDenialDocument ?? []
      ).map((document) => ({
        id: document.id.toString(),
        type: document.type,
      })),
      periods: (
        generalUrbanRetirementDenial.generalUrbanRetirementDenialPeriod ?? []
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
      })),
      timeAccelerators:
        generalUrbanRetirementDenial.generalUrbanRetirementDenialTimeAccelerator ??
        [],
      inssBenefits:
        generalUrbanRetirementDenial.generalUrbanRetirementDenialInssBenefit ??
        [],
      currentResult:
        generalUrbanRetirementDenial.generalUrbanRetirementDenialResult !== null
          ? {
              id: generalUrbanRetirementDenial.generalUrbanRetirementDenialResult.id.toString(),
              inssDecisionAnalysis:
                generalUrbanRetirementDenial.generalUrbanRetirementDenialResult
                  .inssDecisionAnalysis,
              firstAnalysis:
                generalUrbanRetirementDenial.generalUrbanRetirementDenialResult
                  .firstAnalysis,
            }
          : null,
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async buildAllDocumentBuffers(
    generalUrbanRetirementDenial: Awaited<
      ReturnType<
        typeof this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (generalUrbanRetirementDenial.generalUrbanRetirementDenialDocument ?? [])
        .filter((doc) => doc.document !== cnisDocumentPath)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    const periodDocumentBuffers = await Promise.all(
      (
        generalUrbanRetirementDenial.generalUrbanRetirementDenialPeriodDocument ??
        []
      ).map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    return [cnisBuffer, ...otherDocumentBuffers, ...periodDocumentBuffers];
  }
}
