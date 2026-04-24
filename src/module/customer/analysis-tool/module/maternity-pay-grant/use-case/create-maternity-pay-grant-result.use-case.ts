import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { MaternityPayGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-result/command/maternity-pay-grant-result.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity';
import {
  CreateMaternityPayGrantResultApplicableRuleResponseDto,
  CreateMaternityPayGrantResultResponseDto,
} from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/create-maternity-pay-grant-result.response.dto';
import { InvalidMaternityPayGrantResultJsonError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/invalid-maternity-pay-grant-result-json.error';
import { MaternityPayGrantCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-cnis-document-not-found.error';
import { MaternityPayGrantNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-not-found.error';
import { MaternityPayGrantResultNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type {
  MaternityPayGrantResultApplicableRuleInterface,
  MaternityPayGrantResultInterface,
} from '@module/customer/analysis-tool/module/maternity-pay-grant/model/interface/maternity-pay-grant-result.interface';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { MaternityPayGrantEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';

@Injectable()
export class CreateMaternityPayGrantResultUseCase {
  protected readonly _type = CreateMaternityPayGrantResultUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(MaternityPayGrantQueryRepositoryGateway)
    private readonly maternityPayGrantQueryRepositoryGateway: MaternityPayGrantQueryRepositoryGateway,
    @Inject(MaternityPayGrantResultCommandRepositoryGateway)
    private readonly maternityPayGrantResultCommandRepositoryGateway: MaternityPayGrantResultCommandRepositoryGateway,
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
    maternityPayGrantId: MaternityPayGrantId,
  ): Promise<CreateMaternityPayGrantResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const maternityPayGrantQueryResult =
      await this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations(
        maternityPayGrantId,
        MaternityPayGrantNotFoundError,
      );

    const cnisDocumentPath = maternityPayGrantQueryResult.cnisDocument;

    if (cnisDocumentPath === null) {
      throw new MaternityPayGrantCnisDocumentNotFoundError();
    }

    const maternityPayGrantResultEntity = maternityPayGrantQueryResult.maternityPayGrantResult;

    if (maternityPayGrantResultEntity === null) {
      throw new MaternityPayGrantResultNotFoundError();
    }

    const cnisBuffer =
      await this.fileProcessorGateway.getFileBuffer(cnisDocumentPath);

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolRecordQueryResult = await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
      maternityPayGrantId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      AnalysisToolRecordNotFoundError,
    );


    const analysisToolClient =
      await this.findAnalysisToolClientByAnalysisToolRecordOrFail(
        maternityPayGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const grantDataBuffer = this.buildGrantDataBuffer(maternityPayGrantQueryResult);

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_GRANT_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_GRANT_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysis =
      await this.analysisProcessorGateway.getMaternityPayGrantResultAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [grantDataBuffer, cnisBuffer],
      );

    if (completeAnalysis === null) {
      throw new MaternityPayGrantNotFoundError();
    }

    const parsedResult = this.parseResultAnalysisOrThrow(completeAnalysis);

    const htmlContent = await this.exportDocumentGateway.convertMarkdownToHtml(
      parsedResult.completeAnalysisDownload,
    );

    const resultEntity = new MaternityPayGrantResultEntity({
      id: maternityPayGrantResultEntity.id,
      firstAnalysis: maternityPayGrantResultEntity.firstAnalysis,
      completeAnalysis,
      simplifiedAnalysis: maternityPayGrantResultEntity.simplifiedAnalysis,
      completeAnalysisDownload: htmlContent,
    });

    const maternityPayGrant = new MaternityPayGrantEntity({
      ...maternityPayGrantQueryResult,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      bpcElderlyAnalysis: null,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      disabilityAssessmentForBpcAnalysis: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralOrHybridRetirementRejection: null,
      bpcDisabilityDenial: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
      teacherRetirementPlanning: null,
      disabilityRetirementPlanning: null,
      generalUrbanRetirementGrant: null,
      generalUrbanRetirementAnalysis: null,
      generalUrbanRetirementDenial: null,
      deathBenefitGrant: null,
      deathBenefitRejection: null,
      specialRetirementGrant: null,
      disabilityRetirementPlanningGrant: null,
      disabilityRetirementPlanningRejection: null,
      temporaryDisabilityBenefitsGrant: null,
      temporaryIncapacityBenefitRejection: null,
      survivorPensionAnalysis: null,
      maternityPayGrant,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      updateAnalysisToolRecordTransaction,
      this.maternityPayGrantResultCommandRepositoryGateway.updateMaternityPayGrantResult(
        resultEntity,
      ),
    ]);

    await transaction.commit();

    return CreateMaternityPayGrantResultResponseDto.build({
      eligibilityStatus: parsedResult.eligibilityStatus,
      insuredQualityStatus: parsedResult.insuredQualityStatus,
      applicableRules: parsedResult.applicableRules.map(
        (rule: MaternityPayGrantResultApplicableRuleInterface) =>
          CreateMaternityPayGrantResultApplicableRuleResponseDto.build({
            ruleName: rule.ruleName,
            result: rule.result,
            ...(rule.estimatedBenefit !== null && {
              estimatedBenefit: rule.estimatedBenefit,
            }),
            detailedAnalysis: rule.detailedAnalysis,
          }),
      ),
      analysisDescription: parsedResult.analysisDescription,
    });
  }

  private parseResultAnalysisOrThrow(
    raw: string,
  ): MaternityPayGrantResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidMaternityPayGrantResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is MaternityPayGrantResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['eligibilityStatus'] === 'string' &&
      typeof value['insuredQualityStatus'] === 'string' &&
      Array.isArray(value['applicableRules']) &&
      typeof value['completeAnalysisDownload'] === 'string'
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private buildGrantDataBuffer(
    maternityPayGrant: Awaited<
      ReturnType<
        typeof this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      analysisName: maternityPayGrant.analysisName,
      category: maternityPayGrant.category,
      triggeringEvent: maternityPayGrant.triggeringEvent,
      triggeringEventDate: maternityPayGrant.triggeringEventDate,
      isCurrentlyUnemployed: maternityPayGrant.isCurrentlyUnemployed,
      isUnemployedAtTriggeringEventDate:
        maternityPayGrant.isUnemployedAtTriggeringEventDate,
      isRuralInsured: maternityPayGrant.isRuralInsured,
      ruralPeriodStartDate: maternityPayGrant.ruralPeriodStartDate,
      ruralPeriodEndDate: maternityPayGrant.ruralPeriodEndDate,
      inssBenefits: (maternityPayGrant.maternityPayGrantInssBenefit ?? []).map(
        (item) => item.inssBenefitNumber,
      ),
      legalProceedings: (
        maternityPayGrant.maternityPayGrantLegalProceeding ?? []
      ).map((item) => item.legalProceedingNumber),
      periods: (maternityPayGrant.maternityPayGrantPeriod ?? []).map((p) => ({
        id: p.id.toString(),
        startDate: p.startDate,
        endDate: p.endDate,
        category: p.category,
        isPendency: p.isPendency,
        competenceBelowTheMinimum: p.competenceBelowTheMinimum,
      })),
      currentResult:
        maternityPayGrant.maternityPayGrantResult !== null
          ? {
              firstAnalysis:
                maternityPayGrant.maternityPayGrantResult.firstAnalysis,
            }
          : null,
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private findAnalysisToolClientByAnalysisToolRecordOrFail(
    maternityPayGrantId: MaternityPayGrantId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecordQueryResultPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        maternityPayGrantId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    return analysisToolRecordQueryResultPromise.then(
      (analysisToolRecordQueryResult) => {
        const analysisToolClient =
          analysisToolRecordQueryResult.analysisToolClient;

        return new AnalysisToolClientEntity({
          ...analysisToolClient,
          createdBy: analysisToolClient.createdBy.id,
          updatedBy: analysisToolClient.updatedBy.id,
        });
      },
    );
  }
}
