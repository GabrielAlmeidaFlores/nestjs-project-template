import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { MaternityPayRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/command/maternity-pay-rejection.command.repository.gateway';
import { MaternityPayRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/maternity-pay-rejection.query.repository.gateway';
import { MaternityPayRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-result/command/maternity-pay-rejection-result.command.repository.gateway';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/enum/maternity-pay-rejection-document-type.enum';
import { MaternityPayRejectionResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity';
import { CreateMaternityPayRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-rejection/dto/response/create-maternity-pay-rejection-first-analysis.response.dto';
import { InvalidMaternityPayRejectionResultJsonError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/invalid-maternity-pay-rejection-result-json.error';
import { MaternityPayRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-cnis-document-not-found.error';
import { MaternityPayRejectionNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-rejection/error/maternity-pay-rejection-not-found.error';
import { MaternityPayRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/generic/maternity-pay-rejection-first-analysis.model';
import { MaternityPayRejectionGracePeriodModel } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/generic/maternity-pay-rejection-first-analysis.model';
import { MaternityPayRejectionBenefitInformationModel } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/generic/maternity-pay-rejection-first-analysis.model';
import { MaternityPayRejectionRequirementDeadlineModel } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/generic/maternity-pay-rejection-first-analysis.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { GetMaternityPayRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/query/result/get-maternity-pay-rejection-with-relations.query.result';
import type { MaternityPayRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/interface/maternity-pay-rejection-first-analysis.interface';

interface ParsedFirstAnalysisInterface {
  cleanedJson: string;
  model: MaternityPayRejectionFirstAnalysisModel;
}

@Injectable()
export class CreateMaternityPayRejectionFirstAnalysisUseCase {
  protected readonly _type =
    CreateMaternityPayRejectionFirstAnalysisUseCase.name;

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
    @Inject(MaternityPayRejectionCommandRepositoryGateway)
    private readonly maternityPayRejectionCommandRepositoryGateway: MaternityPayRejectionCommandRepositoryGateway,
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
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayRejectionId: MaternityPayRejectionId,
  ): Promise<CreateMaternityPayRejectionFirstAnalysisResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_REJECTION_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_REJECTION_SECOND_ANALYSIS,
        organizationMember.id,
      );

    const firstAnalysisResponse =
      await this.analysisProcessorGateway.getMaternityPayRejectionFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildRejectionDataBuffer(rejection), ...allDocumentBuffers],
        true,
      );

    if (firstAnalysisResponse === null) {
      throw new MaternityPayRejectionNotFoundError();
    }

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysisResponse,
    );

    const existingResult = rejection.maternityPayRejectionResult;

    const resultEntity = new MaternityPayRejectionResultEntity({
      ...(existingResult !== null && { id: existingResult.id }),
      firstAnalysis: existingResult?.firstAnalysis ?? null,
      secondAnalysis: parsedFirstAnalysis.cleanedJson,
      completeAnalysis: existingResult?.completeAnalysis ?? null,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
    });

    const resultTransaction =
      existingResult !== null
        ? this.maternityPayRejectionResultCommandRepositoryGateway.updateMaternityPayRejectionResult(
            resultEntity,
          )
        : this.maternityPayRejectionResultCommandRepositoryGateway.createMaternityPayRejectionResult(
            resultEntity,
          );

    const transactionOperations = [consumeCreditTransaction, resultTransaction];

    if (existingResult === null) {
      transactionOperations.push(
        this.maternityPayRejectionCommandRepositoryGateway.updateMaternityPayRejectionResultId(
          maternityPayRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateMaternityPayRejectionFirstAnalysisResponseDto.build({
      maternityPayRejectionFirstAnalysis: parsedFirstAnalysis.model,
    });
  }

  private parseFirstAnalysisOrThrow(raw: string): ParsedFirstAnalysisInterface {
    try {
      const cleaned = raw
        .trim()
        .replace(/^```json\s*/i, '')
        .replace(/```$/i, '')
        .trim();
      const parsed = JSON.parse(
        cleaned,
      ) as MaternityPayRejectionFirstAnalysisInterface;

      const gracePeriod = MaternityPayRejectionGracePeriodModel.build({
        withinTheGracePeriod: parsed.gracePeriod.withinTheGracePeriod,
        situation: parsed.gracePeriod.situation,
        applicableGracePeriod: parsed.gracePeriod.applicableGracePeriod,
        endOfGracePeriod: parsed.gracePeriod.endOfGracePeriod,
      });

      const benefitInformation =
        MaternityPayRejectionBenefitInformationModel.build({
          situation: parsed.benefitInformation.situation,
          duration: parsed.benefitInformation.duration,
          startDate: parsed.benefitInformation.startDate,
          concessionDate: parsed.benefitInformation.concessionDate,
          startOfTheLeave: parsed.benefitInformation.startOfTheLeave,
          endOfTheLeave: parsed.benefitInformation.endOfTheLeave,
          totalLeaveDuration: parsed.benefitInformation.totalLeaveDuration,
          amountBenefit: parsed.benefitInformation.amountBenefit,
          calculationBasis: parsed.benefitInformation.calculationBasis,
        });

      const requirementDeadline =
        MaternityPayRejectionRequirementDeadlineModel.build({
          triggeringEventDate: parsed.requirementDeadline.triggeringEventDate,
          requirementDate: parsed.requirementDeadline.requirementDate,
          statuoryDeadline: parsed.requirementDeadline.statuoryDeadline,
          details: parsed.requirementDeadline.details,
          justification: parsed.requirementDeadline.justification,
        });

      const model = MaternityPayRejectionFirstAnalysisModel.build({
        insuredStatusManteined: parsed.insuredStatusManteined,
        insuredStatusAnalysisConclusion: parsed.insuredStatusAnalysisConclusion,
        gracePeriod,
        benefitInformation,
        requirementDeadline,
      });

      return { cleanedJson: cleaned, model };
    } catch {
      throw new InvalidMaternityPayRejectionResultJsonError();
    }
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
