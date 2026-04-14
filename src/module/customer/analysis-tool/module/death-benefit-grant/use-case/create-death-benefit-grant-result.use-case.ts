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
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-result/command/death-benefit-grant-result.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantResultEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/death-benefit-grant-result.entity';
import { DeathBenefitGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-document-type.enum';
import {
  CreateDeathBenefitGrantResultApplicableRuleResponseDto,
  CreateDeathBenefitGrantResultClientDataResponseDto,
  CreateDeathBenefitGrantResultDependentAnalysisResponseDto,
  CreateDeathBenefitGrantResultResponseDto,
} from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant-result.response.dto';
import { DeathBenefitGrantCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-cnis-document-not-found.error';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { DeathBenefitGrantResultNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-result-not-found.error';
import { InvalidDeathBenefitGrantResultJsonError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/invalid-death-benefit-grant-result-json.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type {
  DeathBenefitGrantResultApplicableRuleInterface,
  DeathBenefitGrantResultDependentAnalysisInterface,
  DeathBenefitGrantResultInterface,
} from '@module/customer/analysis-tool/module/death-benefit-grant/model/interface/death-benefit-grant-result.interface';

@Injectable()
export class CreateDeathBenefitGrantResultUseCase {
  protected readonly _type = CreateDeathBenefitGrantResultUseCase.name;

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
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
    @Inject(DeathBenefitGrantResultCommandRepositoryGateway)
    private readonly deathBenefitGrantResultCommandRepositoryGateway: DeathBenefitGrantResultCommandRepositoryGateway,
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
    deathBenefitGrantId: DeathBenefitGrantId,
  ): Promise<CreateDeathBenefitGrantResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const deathBenefitGrant =
      await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
        deathBenefitGrantId,
        DeathBenefitGrantNotFoundError,
      );

    const cnisDocument = (
      deathBenefitGrant.deathBenefitGrantBenefitInstitutor
        ?.deathBenefitGrantDocument ?? []
    ).find(
      (document) => document.type === DeathBenefitGrantDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new DeathBenefitGrantCnisDocumentNotFoundError();
    }

    const deathBenefitGrantResult = deathBenefitGrant.deathBenefitGrantResult;

    if (deathBenefitGrantResult === null) {
      throw new DeathBenefitGrantResultNotFoundError();
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
        deathBenefitGrantId,
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
      deathBenefitGrant,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysis =
      await this.analysisProcessorGateway.getDeathBenefitGrantResultAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildGrantDataBuffer(deathBenefitGrant), ...grantDocumentBuffers],
      );

    if (completeAnalysis === null) {
      throw new DeathBenefitGrantNotFoundError();
    }

    const parsedResult = this.parseResultAnalysisOrThrow(completeAnalysis);

    const htmlContent = await this.exportDocumentGateway.convertMarkdownToHtml(
      parsedResult.analysisDescription,
    );

    const resultEntity = new DeathBenefitGrantResultEntity({
      id: deathBenefitGrantResult.id,
      deathBenefitGrantFirstAnalysis:
        deathBenefitGrantResult.deathBenefitGrantFirstAnalysis,
      deathBenefitGrantCompleteAnalysis: completeAnalysis,
      deathBenefitGrantSimplifiedAnalysis:
        deathBenefitGrantResult.deathBenefitGrantSimplifiedAnalysis,
      deathBenefitGrantCompleteAnalysisDownload: htmlContent,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.deathBenefitGrantResultCommandRepositoryGateway.updateDeathBenefitGrantResult(
        deathBenefitGrantResult.id,
        resultEntity,
      ),
    ]);

    await transaction.commit();

    return CreateDeathBenefitGrantResultResponseDto.build({
      clientData: this.buildClientData(analysisToolClient, deathBenefitGrant),
      eligibilityStatus: parsedResult.eligibilityStatus,
      insuredQualityStatus: parsedResult.insuredQualityStatus,
      dependentQualityStatus: parsedResult.dependentQualityStatus,
      applicableRules: parsedResult.applicableRules.map(
        (rule: DeathBenefitGrantResultApplicableRuleInterface) =>
          CreateDeathBenefitGrantResultApplicableRuleResponseDto.build({
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
        (dep: DeathBenefitGrantResultDependentAnalysisInterface) =>
          CreateDeathBenefitGrantResultDependentAnalysisResponseDto.build({
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
    deathBenefitGrant: Awaited<
      ReturnType<
        typeof this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations
      >
    >,
  ): CreateDeathBenefitGrantResultClientDataResponseDto {
    const nb =
      (deathBenefitGrant.deathBenefitGrantInssBenefit ?? [])[0]?.inssBenefit ??
      null;
    const legalProceedingNumber =
      (deathBenefitGrant.deathBenefitGrantLegalProceeding ?? [])[0]
        ?.legalProceedingNumber ?? null;

    return CreateDeathBenefitGrantResultClientDataResponseDto.build({
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
  ): DeathBenefitGrantResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidDeathBenefitGrantResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is DeathBenefitGrantResultInterface {
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
    deathBenefitGrant: Awaited<
      ReturnType<
        typeof this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      id: deathBenefitGrant.id.toString(),
      analysisName: deathBenefitGrant.analysisName,
      inssBenefits: (deathBenefitGrant.deathBenefitGrantInssBenefit ?? []).map(
        (b) => ({ nb: b.inssBenefit }),
      ),
      legalProceedings: (
        deathBenefitGrant.deathBenefitGrantLegalProceeding ?? []
      ).map((p) => ({ legalProceedingNumber: p.legalProceedingNumber })),
      institutor: deathBenefitGrant.deathBenefitGrantBenefitInstitutor
        ? {
            name: deathBenefitGrant.deathBenefitGrantBenefitInstitutor.name,
            birthDate:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor.birthDate,
            deathDate:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor.deathDate,
            wasRetired:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor.wasRetired,
            wasRuralInsured:
              deathBenefitGrant.deathBenefitGrantBenefitInstitutor
                .wasRuralInsured,
          }
        : null,
      dependents: (deathBenefitGrant.deathBenefitGrantDependent ?? []).map(
        (d) => ({
          name: d.name,
          dependentClass: d.dependentClass,
          dependentType: d.dependentType,
          birthDate: d.birthDate,
          hasDisabilityOrInvalidism: d.hasDisabilityOrInvalidism,
          isMinorUnder16: d.isMinorUnder16,
          stableUnionOrMarriageStartDate: d.stableUnionOrMarriageStartDate,
        }),
      ),
      periods: (deathBenefitGrant.deathBenefitGrantPeriod ?? []).map((p) => ({
        id: p.id.toString(),
        startDate: p.startDate,
        endDate: p.endDate,
        category: p.category,
        isPendency: p.isPendency,
        competenceBelowTheMinimum: p.competenceBelowTheMinimum,
      })),
      timeAccelerators:
        deathBenefitGrant.deathBenefitGrantTimeAccelerator ?? [],
      currentResult:
        deathBenefitGrant.deathBenefitGrantResult !== null
          ? {
              deathBenefitGrantFirstAnalysis:
                deathBenefitGrant.deathBenefitGrantResult
                  .deathBenefitGrantFirstAnalysis,
            }
          : null,
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async getGrantDocumentBuffers(
    deathBenefitGrant: Awaited<
      ReturnType<
        typeof this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations
      >
    >,
    currentDocumentPath: string,
    currentDocumentBuffer: Buffer,
  ): Promise<Buffer[]> {
    const allDocuments = (
      deathBenefitGrant.deathBenefitGrantBenefitInstitutor
        ?.deathBenefitGrantDocument ?? []
    ).filter((document) => document.document !== currentDocumentPath);

    const otherDocumentBuffers = await Promise.all(
      allDocuments.map((document) =>
        this.fileProcessorGateway.getFileBuffer(document.document),
      ),
    );

    return [currentDocumentBuffer, ...otherDocumentBuffers];
  }

  private findAnalysisToolClientByAnalysisToolRecordOrFail(
    deathBenefitGrantId: DeathBenefitGrantId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecordQueryResultPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByDeathBenefitGrantIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDeathBenefitGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        deathBenefitGrantId,
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
