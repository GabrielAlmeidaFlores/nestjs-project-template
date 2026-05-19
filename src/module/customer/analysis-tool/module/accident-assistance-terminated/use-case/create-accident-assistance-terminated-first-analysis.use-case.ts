import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/command/accident-assistance-terminated.command.repository.gateway';
import { AccidentAssistanceTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/accident-assistance-terminated.query.repository.gateway';
import { GetAccidentAssistanceTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-with-relations.query.result';
import { AccidentAssistanceTerminatedPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/command/accident-assistance-terminated-period.command.repository.gateway';
import { AccidentAssistanceTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-result/command/accident-assistance-terminated-result.command.repository.gateway';
import { AccidentAssistanceTerminatedEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/accident-assistance-terminated.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/enum/accident-assistance-terminated-document-type.enum';
import { AccidentAssistanceTerminatedPeriodEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/accident-assistance-terminated-period.entity';
import { AccidentAssistanceTerminatedPeriodReasonPendencyEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/enum/accident-assistance-terminated-period-reason-pendency.enum';
import { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';
import { CreateAccidentAssistanceTerminatedFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-first-analysis.response.dto';
import { AccidentAssistanceTerminatedCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-cnis-document-not-found.error';
import { AccidentAssistanceTerminatedNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-not-found.error';
import { InvalidAccidentAssistanceTerminatedFirstAnalysisJsonError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/invalid-accident-assistance-terminated-first-analysis-json.error';
import {
  AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeModel,
  AccidentAssistanceTerminatedFirstAnalysisModel,
  AccidentAssistanceTerminatedFirstAnalysisQualitySecurityModel,
} from '@module/customer/analysis-tool/module/accident-assistance-terminated/model/generic/accident-assistance-terminated-first-analysis.model';
import { AccidentAssistanceTerminatedFirstAnalysisInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/model/interface/accident-assistance-terminated-first-analysis.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface ParsedFirstAnalysisInterface {
  cleanedJson: string;
  model: AccidentAssistanceTerminatedFirstAnalysisModel;
}

@Injectable()
export class CreateAccidentAssistanceTerminatedFirstAnalysisUseCase {
  protected readonly _type =
    CreateAccidentAssistanceTerminatedFirstAnalysisUseCase.name;

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
    @Inject(AccidentAssistanceTerminatedCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedCommandRepositoryGateway: AccidentAssistanceTerminatedCommandRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedQueryRepositoryGateway)
    private readonly accidentAssistanceTerminatedQueryRepositoryGateway: AccidentAssistanceTerminatedQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedPeriodCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedPeriodCommandRepositoryGateway: AccidentAssistanceTerminatedPeriodCommandRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedResultCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedResultCommandRepositoryGateway: AccidentAssistanceTerminatedResultCommandRepositoryGateway,
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
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): Promise<CreateAccidentAssistanceTerminatedFirstAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const aatQueryResult =
      await this.accidentAssistanceTerminatedQueryRepositoryGateway.findOneAccidentAssistanceTerminatedByIdOrFail(
        accidentAssistanceTerminatedId,
        AccidentAssistanceTerminatedNotFoundError,
      );

    const cnisDocument =
      aatQueryResult.accidentAssistanceTerminatedDocument.find(
        (doc) => doc.type === AccidentAssistanceTerminatedDocumentTypeEnum.CNIS,
      );

    if (!cnisDocument) {
      throw new AccidentAssistanceTerminatedCnisDocumentNotFoundError();
    }

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const analysisToolClient = await this.findAnalysisToolClientOrFail(
      aatQueryResult,
      sessionData,
      organizationSessionData,
    );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED_FIRST_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED_FIRST_ANALYSIS,
        organizationMember.id,
      );

    const otherDocumentBuffers = await Promise.all(
      aatQueryResult.accidentAssistanceTerminatedDocument
        .filter((doc) => doc.document !== cnisDocument.document)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.document)),
    );

    const firstAnalysisRaw =
      await this.analysisProcessorGateway.getAccidentAssistanceTerminatedFirstAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [cnisBuffer, ...otherDocumentBuffers],
      );

    const parsedFirstAnalysis = this.parseFirstAnalysisOrThrow(
      firstAnalysisRaw ?? '',
    );

    const existingResult = aatQueryResult.accidentAssistanceTerminatedResult;

    const resultEntity = new AccidentAssistanceTerminatedResultEntity({
      ...(existingResult !== null && {
        id: existingResult.id,
      }),
      firstAnalysis: parsedFirstAnalysis.cleanedJson,
      accidentAssistanceTerminatedCompleteAnalysis:
        existingResult?.accidentAssistanceTerminatedCompleteAnalysis ?? null,
      accidentAssistanceTerminatedSimplifiedAnalysis:
        existingResult?.accidentAssistanceTerminatedSimplifiedAnalysis ?? null,
      decisionDetails: existingResult?.decisionDetails ?? null,
    });

    const periods = this.buildPeriodsFromCnis(cnisData);

    const deleteOldPeriodsTransaction =
      this.accidentAssistanceTerminatedPeriodCommandRepositoryGateway.deleteAccidentAssistanceTerminatedPeriodsByAccidentAssistanceTerminatedId(
        accidentAssistanceTerminatedId,
      );

    const createPeriodTransactions = periods.map((period) =>
      this.accidentAssistanceTerminatedPeriodCommandRepositoryGateway.createAccidentAssistanceTerminatedPeriod(
        accidentAssistanceTerminatedId,
        period,
      ),
    );

    const resultTransaction =
      existingResult !== null
        ? this.accidentAssistanceTerminatedResultCommandRepositoryGateway.updateAccidentAssistanceTerminatedResult(
            existingResult.id,
            resultEntity,
          )
        : this.accidentAssistanceTerminatedResultCommandRepositoryGateway.createAccidentAssistanceTerminatedResult(
            accidentAssistanceTerminatedId,
            resultEntity,
          );

    const aatEntity = this.buildAatEntityForUpdate(
      aatQueryResult,
      resultEntity,
      organizationMember.id,
    );

    const transactionOperations = [
      consumeCreditTransaction,
      deleteOldPeriodsTransaction,
      ...createPeriodTransactions,
      resultTransaction,
      ...(existingResult === null
        ? [
            this.accidentAssistanceTerminatedCommandRepositoryGateway.updateAccidentAssistanceTerminated(
              aatEntity.id,
              aatEntity,
            ),
          ]
        : []),
    ];

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );
    await transaction.commit();

    return CreateAccidentAssistanceTerminatedFirstAnalysisResponseDto.build({
      accidentAssistanceTerminatedFirstAnalysis: parsedFirstAnalysis.model,
      cnisAnalysis,
    });
  }

  private buildAatEntityForUpdate(
    aatQueryResult: GetAccidentAssistanceTerminatedWithRelationsQueryResult,
    resultEntity: AccidentAssistanceTerminatedResultEntity,
    updatedBy: GetAccidentAssistanceTerminatedWithRelationsQueryResult['updatedBy']['id'],
  ): AccidentAssistanceTerminatedEntity {
    return new AccidentAssistanceTerminatedEntity({
      id: aatQueryResult.id,
      der: aatQueryResult.der,
      denialDate: aatQueryResult.denialDate,
      category: aatQueryResult.category,
      inssPassword: aatQueryResult.inssPassword ?? null,
      analysisName: aatQueryResult.analysisName ?? null,
      benefitCessationReason: aatQueryResult.benefitCessationReason,
      hadPreviousIncapacityBenefit: aatQueryResult.hadPreviousIncapacityBenefit,
      previousIncapacityBenefitNumber:
        aatQueryResult.previousIncapacityBenefitNumber ?? null,
      previousIncapacityBenefitStartDate:
        aatQueryResult.previousIncapacityBenefitStartDate ?? null,
      previousIncapacityBenefitEndDate:
        aatQueryResult.previousIncapacityBenefitEndDate ?? null,
      extensionRequestStatus: aatQueryResult.extensionRequestStatus ?? null,
      accidentDate: aatQueryResult.accidentDate ?? null,
      accidentDescription: aatQueryResult.accidentDescription ?? null,
      accidentAssistanceTerminatedResult: resultEntity,
      accidentAssistanceTerminatedBenefit: [],
      accidentAssistanceTerminatedLegalProceeding: [],
      accidentAssistanceTerminatedDocument: [],
      createdBy: aatQueryResult.createdBy.id,
      updatedBy,
    });
  }

  private parseFirstAnalysisOrThrow(
    rawJson: string,
  ): ParsedFirstAnalysisInterface {
    try {
      let cleanedJson = rawJson;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const raw = JSON.parse(
        cleanedJson,
      ) as AccidentAssistanceTerminatedFirstAnalysisInterface;

      cleanedJson = JSON.stringify(raw);

      return {
        cleanedJson,
        model: AccidentAssistanceTerminatedFirstAnalysisModel.build({
          qualitySecurity:
            AccidentAssistanceTerminatedFirstAnalysisQualitySecurityModel.build(
              {
                status: raw.qualitySecurity.status,
                description: raw.qualitySecurity.description,
              },
            ),
          assessmentSequelae:
            AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeModel.build(
              {
                existsSequelae: raw.assessmentSequelae.existsSequelae,
                sequelaeCompatibility:
                  raw.assessmentSequelae.sequelaeCompatibility,
                partialWorkCapacityMaintenance:
                  raw.assessmentSequelae.partialWorkCapacityMaintenance,
                description: raw.assessmentSequelae.description,
              },
            ),
        }),
      };
    } catch {
      throw new InvalidAccidentAssistanceTerminatedFirstAnalysisJsonError();
    }
  }

  private buildPeriodsFromCnis(
    cnisData: CnisModel,
  ): AccidentAssistanceTerminatedPeriodEntity[] {
    if (!cnisData.socialSecurityRelations) {
      return [];
    }
    const pendencies = ['PEXT'];

    return cnisData.socialSecurityRelations.map((relation) => {
      const typeOfContribution =
        relation.socialSecurityAffiliationInfo.origemDoVinculo ===
          'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL' ||
        relation.socialSecurityAffiliationInfo.origemDoVinculo ===
          'SEGURADO ESPECIAL'
          ? 'Rural'
          : 'Urbano';

      const contributionTotal =
        relation.socialSecurityAffiliationEarningsHistory
          .map((earning) => {
            const remuneration = this.parseRemunerationString(
              earning.remuneracao,
            );
            if (remuneration === null || isNaN(remuneration)) {
              return 0;
            }
            return remuneration;
          })
          .reduce((acc, curr) => acc + curr, 0);

      const contributionAverage =
        relation.socialSecurityAffiliationEarningsHistory.length > 0
          ? contributionTotal /
            relation.socialSecurityAffiliationEarningsHistory.length
          : 0;

      const delayPayment =
        relation.socialSecurityAffiliationEarningsHistory.some((earning) => {
          if (earning.indicadores === undefined) {
            return false;
          }
          return pendencies.includes(earning.indicadores);
        });

      const reasonPendency: AccidentAssistanceTerminatedPeriodReasonPendencyEnum | null =
        relation.socialSecurityAffiliationInfo.dataFim === undefined
          ? AccidentAssistanceTerminatedPeriodReasonPendencyEnum.LEAVE_DATE
          : delayPayment
            ? AccidentAssistanceTerminatedPeriodReasonPendencyEnum.INCONSISTENT_COMPETENCE
            : null;

      return new AccidentAssistanceTerminatedPeriodEntity({
        sequencial: relation.socialSecurityAffiliationInfo.seq ?? null,
        periodName:
          relation.socialSecurityAffiliationInfo.origemDoVinculo ?? null,
        periodStart: relation.socialSecurityAffiliationInfo.dataInicio ?? null,
        periodEnd: relation.socialSecurityAffiliationInfo.dataFim ?? null,
        category:
          relation.socialSecurityAffiliationInfo.tipoFiliadoNoVinculo ?? null,
        isPendency: reasonPendency !== null,
        competenceBelowTheMinimum: false,
        contributionAverage: new DecimalValue(contributionAverage),
        typeOfContribution,
        reasonPendency,
        status: reasonPendency === null,
      });
    });
  }

  private parseRemunerationString(value: string | undefined): number | null {
    if (value === undefined) {
      return null;
    }
    const cleaned = value.replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  }

  private async findAnalysisToolClientOrFail(
    aatQueryResult: GetAccidentAssistanceTerminatedWithRelationsQueryResult,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAccidentAssistanceTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        aatQueryResult.id,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AccidentAssistanceTerminatedNotFoundError,
      );

    return new AnalysisToolClientEntity({
      ...analysisToolRecord.analysisToolClient,
      createdBy: analysisToolRecord.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecord.analysisToolClient.updatedBy.id,
    });
  }
}
