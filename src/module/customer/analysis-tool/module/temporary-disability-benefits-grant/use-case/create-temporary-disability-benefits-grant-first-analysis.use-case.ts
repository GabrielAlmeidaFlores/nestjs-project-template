import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { CnisXRayAnalysisGateway } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/cnis-x-ray-analysis.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { TemporaryDisabilityBenefitsGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/command/temporary-disability-benefits-grant.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/temporary-disability-benefits-grant.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-result/command/temporary-disability-benefits-grant-result.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.entity';
import { CreateTemporaryDisabilityBenefitsGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/create-temporary-disability-benefits-grant-first-analysis.response.dto';
import { InvalidTemporaryDisabilityBenefitsGrantFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/invalid-temporary-disability-benefits-grant-first-analysis-json.error';
import { TemporaryDisabilityBenefitsGrantCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-cnis-document-not-found.error';
import { TemporaryDisabilityBenefitsGrantNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-not-found.error';
import {
  TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemModel,
  TemporaryDisabilityBenefitsGrantFirstAnalysisModel,
} from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/model/generic/temporary-disability-benefits-grant-first-analysis.model';
import { TemporaryDisabilityBenefitsGrantFirstAnalysisInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/model/interface/temporary-disability-benefits-grant-first-analysis.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface ParsedFirstAnalysisInterface {
  cleanedJson: string;
  model: TemporaryDisabilityBenefitsGrantFirstAnalysisModel;
}

@Injectable()
export class CreateTemporaryDisabilityBenefitsGrantFirstAnalysisUseCase {
  protected readonly _type =
    CreateTemporaryDisabilityBenefitsGrantFirstAnalysisUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisXRayAnalysisGateway)
    private readonly cnisXRayAnalysisGateway: CnisXRayAnalysisGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantCommandRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantQueryRepositoryGateway: TemporaryDisabilityBenefitsGrantQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantResultCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway,
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
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): Promise<CreateTemporaryDisabilityBenefitsGrantFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const temporaryDisabilityBenefitsGrant =
      await this.temporaryDisabilityBenefitsGrantQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations(
        temporaryDisabilityBenefitsGrantId,
        TemporaryDisabilityBenefitsGrantNotFoundError,
      );

    const temporaryDisabilityBenefitsGrantDocument =
      temporaryDisabilityBenefitsGrant
        .temporaryDisabilityBenefitsGrantDocument?.[0];

    if (!temporaryDisabilityBenefitsGrantDocument) {
      throw new TemporaryDisabilityBenefitsGrantCnisDocumentNotFoundError();
    }

    const temporaryDisabilityBenefitsGrantResult =
      temporaryDisabilityBenefitsGrant.temporaryDisabilityBenefitsGrantResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      temporaryDisabilityBenefitsGrantDocument.fileName,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient =
      await this.findAnalysisToolClientByAnalysisToolRecordOrFail(
        temporaryDisabilityBenefitsGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisWorkPeriods = this.cnisXRayAnalysisGateway.analyze(
      cnisData,
      analysisToolClient,
    );

    const grantDocumentBuffers = await this.getGrantDocumentBuffers(
      temporaryDisabilityBenefitsGrant,
      temporaryDisabilityBenefitsGrantDocument.fileName,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysis =
      await this.analysisProcessorGateway.getTemporaryDisabilityBenefitsGrantFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisWorkPeriods),
        [
          this.buildFirstAnalysisGrantDataBuffer(
            temporaryDisabilityBenefitsGrant,
          ),
          ...grantDocumentBuffers,
        ],
        true,
      );

    if (firstAnalysis === null) {
      throw new TemporaryDisabilityBenefitsGrantNotFoundError();
    }

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(firstAnalysis);

    const resultEntity = new TemporaryDisabilityBenefitsGrantResultEntity({
      ...(temporaryDisabilityBenefitsGrantResult !== null && {
        id: temporaryDisabilityBenefitsGrantResult.id,
      }),
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
      completeAnalysis:
        temporaryDisabilityBenefitsGrantResult?.completeAnalysis ?? null,
      simplifiedAnalysis:
        temporaryDisabilityBenefitsGrantResult?.simplifiedAnalysis ?? null,
      completeAnalysisDownload:
        temporaryDisabilityBenefitsGrantResult?.completeAnalysisDownload ??
        null,
    });

    const resultTransaction =
      temporaryDisabilityBenefitsGrantResult !== null
        ? this.temporaryDisabilityBenefitsGrantResultCommandRepositoryGateway.updateTemporaryDisabilityBenefitsGrantResult(
            resultEntity,
          )
        : this.temporaryDisabilityBenefitsGrantResultCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (temporaryDisabilityBenefitsGrantResult === null) {
      transactionOperations.push(
        this.temporaryDisabilityBenefitsGrantCommandRepositoryGateway.updateTemporaryDisabilityBenefitsGrantResultId(
          temporaryDisabilityBenefitsGrantId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateTemporaryDisabilityBenefitsGrantFirstAnalysisResponseDto.build(
      {
        temporaryDisabilityBenefitsGrantFirstAnalysis:
          parsedFirstAnalysis.model,
        cnisWorkPeriods,
      },
    );
  }

  private parseFirstAnalysisOrThrow(
    firstAnalysis: string,
  ): ParsedFirstAnalysisInterface {
    try {
      let cleanedJson = firstAnalysis;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as TemporaryDisabilityBenefitsGrantFirstAnalysisInterface;

      cleanedJson = JSON.stringify(raw);

      return {
        cleanedJson,
        model: TemporaryDisabilityBenefitsGrantFirstAnalysisModel.build({
          insuredStatus: raw.insuredStatus,
          gracePeriodStatus: raw.gracePeriodStatus,
          gracePeriods: raw.gracePeriods.map((item) =>
            TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemModel.build(
              {
                event: item.event,
                date: item.date,
                observation: item.observation,
              },
            ),
          ),
          analysisConclusion: raw.analysisConclusion,
          graceExtensionDueToInvoluntaryUnemployment:
            raw.graceExtensionDueToInvoluntaryUnemployment,
          requestToExtendGracePeriod: raw.requestToExtendGracePeriod,
        }),
      };
    } catch {
      throw new InvalidTemporaryDisabilityBenefitsGrantFirstAnalysisJsonError();
    }
  }

  private buildFirstAnalysisGrantDataBuffer(
    grant: Awaited<
      ReturnType<
        typeof this.temporaryDisabilityBenefitsGrantQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const grantData = {
      category: grant.category,
      analysisName: grant.analysisName,
      documents: (grant.temporaryDisabilityBenefitsGrantDocument ?? []).map(
        (doc) => ({
          id: doc.id.toString(),
          type: doc.type,
        }),
      ),
      insuredStatus: (
        grant.temporaryDisabilityBenefitsGrantInsuredStatus ?? []
      ).map((item) => ({
        id: item.id.toString(),
        involuntaryUnemployment: item.involuntaryUnemployment,
        intentionToProveInvoluntaryUnemployment:
          item.intentionToProveInvoluntaryUnemployment,
        ruralInsuredClient: item.ruralInsuredClient,
        ruralPeriodStartDate: item.ruralPeriodStartDate,
        ruralPeriodEndDate: item.ruralPeriodEndDate,
        documentsDescription: item.documentsDescription,
      })),
      periods: (grant.temporaryDisabilityBenefitsGrantPeriod ?? []).map(
        (period) => ({
          id: period.id.toString(),
          startDate: period.startDate,
          cidTenId: period.cidTenId,
          description: period.description,
          jobDerivatedDisability: period.jobDerivatedDisability,
          disablingConditionDescription: period.disablingConditionDescription,
          disabilityFromSevereDisease: period.disabilityFromSevereDisease,
          severeDisease: period.severeDisease,
          diseaseStartDate: period.diseaseStartDate,
          needsConstantAssistanceFromAnotherPerson:
            period.needsConstantAssistanceFromAnotherPerson,
        }),
      ),
      workPeriods: (
        grant.temporaryDisabilityBenefitsGrantWorkPeriods ?? []
      ).map((wp) => ({
        id: wp.id.toString(),
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
      })),
    };

    return Buffer.from(JSON.stringify(grantData, null, 2), 'utf-8');
  }

  private async getGrantDocumentBuffers(
    grant: Awaited<
      ReturnType<
        typeof this.temporaryDisabilityBenefitsGrantQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations
      >
    >,
    currentDocumentPath: string,
    currentDocumentBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      (grant.temporaryDisabilityBenefitsGrantDocument ?? [])
        .filter((doc) => doc.fileName !== currentDocumentPath)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.fileName)),
    );

    const periodDocumentBuffers = await Promise.all(
      (grant.temporaryDisabilityBenefitsGrantPeriodDocument ?? []).map((doc) =>
        this.fileProcessorGateway.getFileBuffer(doc.fileName),
      ),
    );

    const insuredStatusDocumentBuffers = await Promise.all(
      (grant.temporaryDisabilityBenefitsGrantInsuredStatusDocument ?? []).map(
        (doc) => this.fileProcessorGateway.getFileBuffer(doc.fileName),
      ),
    );

    const previousBenefitsDocumentBuffers = await Promise.all(
      (
        grant.temporaryDisabilityBenefitsGrantPreviousBenefitsDocument ?? []
      ).map((doc) => this.fileProcessorGateway.getFileBuffer(doc.fileName)),
    );

    return [
      currentDocumentBuffer,
      ...otherDocumentBuffers,
      ...periodDocumentBuffers,
      ...insuredStatusDocumentBuffers,
      ...previousBenefitsDocumentBuffers,
    ];
  }

  private findAnalysisToolClientByAnalysisToolRecordOrFail(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    return this.analysisToolRecordQueryRepositoryGateway
      .findWithRelationsByTemporaryDisabilityBenefitsGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        temporaryDisabilityBenefitsGrantId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      )
      .then((analysisToolRecordQueryResult) => {
        const analysisToolClient =
          analysisToolRecordQueryResult.analysisToolClient;

        return new AnalysisToolClientEntity({
          ...analysisToolClient,
          createdBy: analysisToolClient.createdBy.id,
          updatedBy: analysisToolClient.updatedBy.id,
        });
      });
  }
}
