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
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-result/command/death-benefit-rejection-result.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity';
import { DeathBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-document-type.enum';
import {
  CreateDeathBenefitRejectionResultApplicableRuleResponseDto,
  CreateDeathBenefitRejectionResultClientDataResponseDto,
  CreateDeathBenefitRejectionResultDependentAnalysisResponseDto,
  CreateDeathBenefitRejectionResultResponseDto,
} from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection-result.response.dto';
import { DeathBenefitRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-cnis-document-not-found.error';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { DeathBenefitRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-result-not-found.error';
import { InvalidDeathBenefitRejectionResultJsonError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/invalid-death-benefit-rejection-result-json.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type {
  DeathBenefitRejectionResultApplicableRuleInterface,
  DeathBenefitRejectionResultDependentAnalysisInterface,
  DeathBenefitRejectionResultInterface,
} from '@module/customer/analysis-tool/module/death-benefit-rejection/model/interface/death-benefit-rejection-result.interface';

@Injectable()
export class CreateDeathBenefitRejectionResultUseCase {
  protected readonly _type = CreateDeathBenefitRejectionResultUseCase.name;

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
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionResultCommandRepositoryGateway)
    private readonly deathBenefitRejectionResultCommandRepositoryGateway: DeathBenefitRejectionResultCommandRepositoryGateway,
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
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): Promise<CreateDeathBenefitRejectionResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const deathBenefitRejection =
      await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
        deathBenefitRejectionId,
        DeathBenefitRejectionNotFoundError,
      );

    const cnisDocument = (
      deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
        ?.deathBenefitRejectionDocument ?? []
    ).find(
      (document) =>
        document.type === DeathBenefitRejectionDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new DeathBenefitRejectionCnisDocumentNotFoundError();
    }

    const deathBenefitRejectionResult =
      deathBenefitRejection.deathBenefitRejectionResult;

    if (deathBenefitRejectionResult === null) {
      throw new DeathBenefitRejectionResultNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient =
      await this.findAnalysisToolClientByAnalysisToolRecordOrFail(
        deathBenefitRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const grantDocumentBuffers = await this.getGrantDocumentBuffers(
      deathBenefitRejection,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysis =
      await this.analysisProcessorGateway.getDeathBenefitRejectionResultAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [
          this.buildGrantDataBuffer(deathBenefitRejection),
          ...grantDocumentBuffers,
        ],
      );

    if (completeAnalysis === null) {
      throw new DeathBenefitRejectionNotFoundError();
    }

    const parsedResult = this.parseResultAnalysisOrThrow(completeAnalysis);

    const htmlContent = await this.exportDocumentGateway.convertMarkdownToHtml(
      parsedResult.analysisDescription,
    );

    const resultEntity = new DeathBenefitRejectionResultEntity({
      ...deathBenefitRejectionResult,
      deathBenefitRejectionCompleteAnalysis: completeAnalysis,
      deathBenefitRejectionCompleteAnalysisDownload: htmlContent,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.deathBenefitRejectionResultCommandRepositoryGateway.updateDeathBenefitRejectionResult(
        deathBenefitRejectionResult.id,
        resultEntity,
      ),
    ]);

    await transaction.commit();

    return CreateDeathBenefitRejectionResultResponseDto.build({
      clientData: this.buildClientData(
        analysisToolClient,
        deathBenefitRejection,
      ),
      eligibilityStatus: parsedResult.eligibilityStatus,
      insuredQualityStatus: parsedResult.insuredQualityStatus,
      dependentQualityStatus: parsedResult.dependentQualityStatus,
      applicableRules: parsedResult.applicableRules.map(
        (rule: DeathBenefitRejectionResultApplicableRuleInterface) =>
          CreateDeathBenefitRejectionResultApplicableRuleResponseDto.build({
            ruleName: rule.ruleName,
            result: rule.result,
            ...(rule.rightDate !== null && { rightDate: rule.rightDate }),
            ...(rule.estimatedRmi !== null && {
              estimatedRmi: rule.estimatedRmi,
            }),
            ...(rule.quotaQuantity !== null && {
              quotaQuantity: rule.quotaQuantity,
            }),
            ...(rule.quotaValue !== null && { quotaValue: rule.quotaValue }),
            detailedAnalysis: rule.detailedAnalysis,
          }),
      ),
      dependentAnalysis: parsedResult.dependentAnalysis.map(
        (dep: DeathBenefitRejectionResultDependentAnalysisInterface) =>
          CreateDeathBenefitRejectionResultDependentAnalysisResponseDto.build({
            dependentName: dep.dependentName,
            dependencyDegree: dep.dependencyDegree,
            dependentQualityStatus: dep.dependentQualityStatus,
            ...(dep.quotaValue !== null && { quotaValue: dep.quotaValue }),
            ...(dep.pensionStartDate !== null && {
              pensionStartDate: dep.pensionStartDate,
            }),
            estimatedPensionDuration: dep.estimatedPensionDuration,
          }),
      ),
      analysisDescription: parsedResult.analysisDescription,
    });
  }

  private buildClientData(
    analysisToolClient: AnalysisToolClientEntity,
    deathBenefitRejection: Awaited<
      ReturnType<
        typeof this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations
      >
    >,
  ): CreateDeathBenefitRejectionResultClientDataResponseDto {
    const nb =
      (deathBenefitRejection.deathBenefitRejectionInssBenefit ?? [])[0]
        ?.inssBenefit ?? null;
    const legalProceedingNumber =
      (deathBenefitRejection.deathBenefitRejectionLegalProceeding ?? [])[0]
        ?.legalProceedingNumber ?? null;

    return CreateDeathBenefitRejectionResultClientDataResponseDto.build({
      ...(analysisToolClient.name !== null && {
        name: analysisToolClient.name,
      }),
      ...(analysisToolClient.federalDocument !== null && {
        federalDocument: analysisToolClient.federalDocument.toString(),
      }),
      ...(analysisToolClient.birthDate !== null && {
        birthDate: analysisToolClient.birthDate,
      }),
      ...(analysisToolClient.gender !== null && {
        gender: analysisToolClient.gender,
      }),
      ...(analysisToolClient.email !== null && {
        email: analysisToolClient.email.toString(),
      }),
      ...(analysisToolClient.phoneNumber !== null && {
        phoneNumber: analysisToolClient.phoneNumber.toString(),
      }),
      ...(analysisToolClient.clientType !== null && {
        category: analysisToolClient.clientType,
      }),
      ...(nb !== null && { nb }),
      ...(legalProceedingNumber !== null && { legalProceedingNumber }),
    });
  }

  private parseResultAnalysisOrThrow(
    raw: string,
  ): DeathBenefitRejectionResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidDeathBenefitRejectionResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is DeathBenefitRejectionResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['eligibilityStatus'] === 'string' &&
      typeof value['insuredQualityStatus'] === 'string' &&
      typeof value['dependentQualityStatus'] === 'string' &&
      Array.isArray(value['applicableRules']) &&
      Array.isArray(value['dependentAnalysis']) &&
      typeof value['analysisDescription'] === 'string'
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private buildGrantDataBuffer(
    deathBenefitRejection: Awaited<
      ReturnType<
        typeof this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      id: deathBenefitRejection.id.toString(),
      analysisName: deathBenefitRejection.analysisName,
      inssBenefits: (
        deathBenefitRejection.deathBenefitRejectionInssBenefit ?? []
      ).map((b) => ({ nb: b.inssBenefit })),
      legalProceedings: (
        deathBenefitRejection.deathBenefitRejectionLegalProceeding ?? []
      ).map((p) => ({ legalProceedingNumber: p.legalProceedingNumber })),
      institutor: deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
        ? {
            name: deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
              .name,
            birthDate:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .birthDate,
            deathDate:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .deathDate,
            wasRetired:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .wasRetired,
            wasRuralInsured:
              deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
                .wasRuralInsured,
          }
        : null,
      dependents: (
        deathBenefitRejection.deathBenefitRejectionDependent ?? []
      ).map((d) => ({
        name: d.name,
        dependentClass: d.dependentClass,
        dependentType: d.dependentType,
        birthDate: d.birthDate,
        hasDisabilityOrInvalidism: d.hasDisabilityOrInvalidism,
        isMinorUnder16: d.isMinorUnder16,
        stableUnionOrMarriageStartDate: d.stableUnionOrMarriageStartDate,
      })),
      periods: (deathBenefitRejection.deathBenefitRejectionPeriod ?? []).map(
        (p) => ({
          id: p.id.toString(),
          startDate: p.startDate,
          endDate: p.endDate,
          category: p.category,
          isPendency: p.isPendency,
          competenceBelowTheMinimum: p.competenceBelowTheMinimum,
        }),
      ),
      timeAccelerators:
        deathBenefitRejection.deathBenefitRejectionTimeAccelerator ?? [],
      currentResult:
        deathBenefitRejection.deathBenefitRejectionResult !== null
          ? {
              deathBenefitRejectionFirstAnalysis:
                deathBenefitRejection.deathBenefitRejectionResult
                  .deathBenefitRejectionFirstAnalysis,
            }
          : null,
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async getGrantDocumentBuffers(
    deathBenefitRejection: Awaited<
      ReturnType<
        typeof this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations
      >
    >,
    currentDocumentPath: string,
    currentDocumentBuffer: Buffer,
  ): Promise<Buffer[]> {
    const allDocuments = (
      deathBenefitRejection.deathBenefitRejectionBenefitInstitutor
        ?.deathBenefitRejectionDocument ?? []
    ).filter((document) => document.document !== currentDocumentPath);

    const otherDocumentBuffers = await Promise.all(
      allDocuments.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    return [currentDocumentBuffer, ...otherDocumentBuffers];
  }

  private findAnalysisToolClientByAnalysisToolRecordOrFail(
    deathBenefitRejectionId: DeathBenefitRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecordQueryResultPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByDeathBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDeathBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        deathBenefitRejectionId,
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
