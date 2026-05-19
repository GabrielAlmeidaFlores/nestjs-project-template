import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { RuralOrHybridRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/command/rural-or-hybrid-retirement-analysis.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-result/command/rural-or-hybrid-retirement-analysis-result.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.entity';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/enum/rural-or-hybrid-retirement-analysis-document-type.enum';
import { RuralOrHybridRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.entity';
import { CreateRuralOrHybridRetirementAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis-result.response.dto';
import { InvalidRuralOrHybridRetirementAnalysisResultJsonError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/invalid-rural-or-hybrid-retirement-analysis-result-json.error';
import { RuralOrHybridRetirementAnalysisCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-cnis-document-not-found.error';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { RuralOrHybridRetirementAnalysisResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-result.interface';

@Injectable()
export class CreateRuralOrHybridRetirementAnalysisResultUseCase {
  protected readonly _type =
    CreateRuralOrHybridRetirementAnalysisResultUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisCommandRepositoryGateway: RuralOrHybridRetirementAnalysisCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway: RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway,
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
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): Promise<CreateRuralOrHybridRetirementAnalysisResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysis =
      await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      );

    const cnisDocument = (
      analysis.ruralOrHybridRetirementAnalysisDocument ?? []
    ).find(
      (document) =>
        document.type === RuralOrHybridRetirementAnalysisDocumentTypeEnum.CNIS,
    );

    if (cnisDocument?.document === null || cnisDocument === undefined) {
      throw new RuralOrHybridRetirementAnalysisCnisDocumentNotFoundError();
    }

    const analysisResult = analysis.ruralOrHybridRetirementAnalysisResult;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.document,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolRecordQueryResult =
      await this.findAnalysisToolRecordQueryResultOrFail(
        ruralOrHybridRetirementAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await this.getAllDocumentBuffers(
      analysis,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_COMPLETE_ANALYSIS,
      );

    const simplifiedPromptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const consumeSimplifiedCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysis =
      await this.analysisProcessorGateway.getRuralOrHybridRetirementAnalysisCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildCompleteAnalysisDataBuffer(analysis), ...documentBuffers],
      );

    if (completeAnalysis === null) {
      throw new InvalidRuralOrHybridRetirementAnalysisResultJsonError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysis);

    const simplifiedAnalysis =
      await this.analysisProcessorGateway.getRuralOrHybridRetirementAnalysisSimplifiedAnalysis(
        simplifiedPromptResponse.prompt,
        [],
        completeAnalysis,
      );

    const resultEntity = new RuralOrHybridRetirementAnalysisResultEntity({
      ...(analysisResult !== null && { id: analysisResult.id }),
      firstAnalysis: analysisResult?.firstAnalysis ?? null,
      secondAnalysis: analysisResult?.secondAnalysis ?? null,
      completeAnalysis,
      simplifiedAnalysis:
        simplifiedAnalysis ?? analysisResult?.simplifiedAnalysis ?? null,
      completeAnalysisDownload:
        analysisResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysisDownload:
        simplifiedAnalysis ??
        analysisResult?.simplifiedAnalysisDownload ??
        null,
      ruralOrHybridRetirementAnalysisId,
    });

    const resultTransaction =
      analysisResult !== null
        ? this.ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway.updateRuralOrHybridRetirementAnalysisResult(
            resultEntity,
          )
        : this.ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisResult(
            resultEntity,
          );

    const transactionOperations = [
      consumeCreditTransaction,
      consumeSimplifiedCreditTransaction,
      resultTransaction,
    ];

    if (analysisResult === null) {
      transactionOperations.push(
        this.ruralOrHybridRetirementAnalysisCommandRepositoryGateway.updateRuralOrHybridRetirementAnalysisResultId(
          ruralOrHybridRetirementAnalysisId,
          resultEntity.id,
        ),
      );
    }

    const ruralOrHybridRetirementAnalysisEntity =
      new RuralOrHybridRetirementAnalysisEntity({
        id: ruralOrHybridRetirementAnalysisId,
      });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      ruralOrHybridRetirementAnalysis: ruralOrHybridRetirementAnalysisEntity,
      analysisToolClient,
      status: AnalysisStatusEnum.COMPLETED,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    transactionOperations.push(
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateRuralOrHybridRetirementAnalysisResultResponseDto.build({
      ruralOrHybridRetirementAnalysisResult: parsedResult,
      ...(simplifiedAnalysis !== null && {
        ruralOrHybridRetirementAnalysisSimplifiedAnalysis: simplifiedAnalysis,
      }),
    });
  }

  private parseResultAnalysis(
    raw: string,
  ): RuralOrHybridRetirementAnalysisResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidRuralOrHybridRetirementAnalysisResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is RuralOrHybridRetirementAnalysisResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      Array.isArray(value['retirementRules']) &&
      value['retirementRules'].every((item: unknown) =>
        this.isRetirementRule(item),
      ) &&
      typeof value['analysisResult'] === 'string'
    );
  }

  private isRetirementRule(value: unknown): boolean {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['ruleName'] === 'string' &&
      typeof value['fulfilled'] === 'boolean' &&
      this.isNullableString(value['retirementDate']) &&
      this.isNullableNumber(value['expectedRmi']) &&
      this.isNullableNumber(value['causeValue']) &&
      typeof value['detaildAnalysis'] === 'string'
    );
  }

  private isNullableNumber(value: unknown): value is number | null {
    return typeof value === 'number' || value === null;
  }

  private isNullableString(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private buildCompleteAnalysisDataBuffer(
    analysis: Awaited<
      ReturnType<
        typeof this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const periods = analysis.ruralOrHybridRetirementAnalysisPeriod ?? [];
    const periodDocuments =
      analysis.ruralOrHybridRetirementAnalysisPeriodDocument ?? [];
    const periodMembers =
      analysis.ruralOrHybridRetirementAnalysisPeriodMember ?? [];
    const periodMemberDocuments =
      analysis.ruralOrHybridRetirementAnalysisPeriodMemberDocument ?? [];
    const testimonialWitnesses =
      analysis.ruralOrHybridRetirementAnalysisTestimonialWitness ?? [];
    const testimonialWitnessDocuments =
      analysis.ruralOrHybridRetirementAnalysisTestimonialWitnessDocument ?? [];
    const workPeriods =
      analysis.ruralOrHybridRetirementAnalysisWorkPeriod ?? [];
    const workPeriodDocuments =
      analysis.ruralOrHybridRetirementAnalysisWorkPeriodDocument ?? [];
    const workPeriodDocumentAnalyses =
      analysis.ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis ?? [];
    const workPeriodEarningsHistory =
      analysis.ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistory ?? [];

    const analysisData = {
      analysisName: analysis.analysisName,
      activityType: analysis.activityType,
      requestedBenefit: analysis.requestedBenefit,
      documents: (analysis.ruralOrHybridRetirementAnalysisDocument ?? []).map(
        (document) => ({
          id: document.id.toString(),
          type: document.type,
        }),
      ),
      periods: periods.map((period) => {
        const members = periodMembers.filter(
          (member) =>
            member.ruralOrHybridRetirementAnalysisPeriodId.toString() ===
            period.id.toString(),
        );

        return {
          id: period.id.toString(),
          startDate: period.startDate,
          endDate: period.endDate,
          workerType: period.workerType,
          workSchedule: period.workSchedule,
          propertyName: period.propertyName,
          propertyCategory: period.propertyCategory,
          propertyOwner: period.propertyOwner,
          propertyCep: period.propertyCep,
          propertyState: period.propertyState,
          propertyCity: period.propertyCity,
          propertyNeighbourhood: period.propertyNeighbourhood,
          propertyStreet: period.propertyStreet,
          propertyNumber: period.propertyNumber,
          productionDestination: period.productionDestination,
          employee: period.employee,
          employeeAmount: period.employeeAmount,
          agriculturalMachinery: period.agriculturalMachinery,
          agriculturalMachineryDescription:
            period.agriculturalMachineryDescription,
          farmVehicles: period.farmVehicles,
          farmVehiclesDescription: period.farmVehiclesDescription,
          incomeBesidesRuralProduction: period.incomeBesidesRuralProduction,
          incomeBesidesRuralProductionDescription:
            period.incomeBesidesRuralProductionDescription,
          clientHasOrHadCnpj: period.clientHasOrHadCnpj,
          clientHasOrHadCnpjDescription: period.clientHasOrHadCnpjDescription,
          clientLivesInUrbanArea: period.clientLivesInUrbanArea,
          clientMunicipality: period.clientMunicipality,
          clientState: period.clientState,
          distance: period.distance,
          documents: periodDocuments
            .filter(
              (document) =>
                document.ruralOrHybridRetirementAnalysisPeriodId.toString() ===
                period.id.toString(),
            )
            .map((document) => ({
              id: document.id.toString(),
              type: document.type,
            })),
          members: members.map((member) => ({
            id: member.id.toString(),
            name: member.name,
            federalDocument: member.federalDocument,
            kinship: member.kinship,
            hasReceivedRuralBenefit: member.hasReceivedRuralBenefit,
            benefitNumber: member.benefitNumber,
            documents: periodMemberDocuments
              .filter(
                (document) =>
                  document.ruralOrHybridRetirementAnalysisPeriodMemberId.toString() ===
                  member.id.toString(),
              )
              .map((document) => ({
                id: document.id.toString(),
                type: document.type,
              })),
          })),
        };
      }),
      testimonialWitnesses: testimonialWitnesses.map((witness) => ({
        id: witness.id.toString(),
        fullName: witness.fullName,
        federalDocument: witness.federalDocument,
        insuredRelationship: witness.insuredRelationship,
        canTestifyStartDate: witness.canTestifyStartDate,
        canTestifyEndDate: witness.canTestifyEndDate,
        documents: testimonialWitnessDocuments
          .filter(
            (document) =>
              document.ruralOrHybridRetirementAnalysisTestimonialWitnessId.toString() ===
              witness.id.toString(),
          )
          .map((document) => ({
            id: document.id.toString(),
          })),
      })),
      workPeriods: workPeriods.map((workPeriod) => ({
        id: workPeriod.id.toString(),
        bondOrigin: workPeriod.bondOrigin,
        startDate: workPeriod.startDate,
        endDate: workPeriod.endDate,
        category: workPeriod.category,
        competenceBelowTheMinimum: workPeriod.competenceBelowTheMinimum,
        pendencyReason: workPeriod.pendencyReason,
        periodConsideration: workPeriod.periodConsideration,
        contributionAverage: workPeriod.contributionAverage,
        status: workPeriod.status,
        gracePeriod: workPeriod.gracePeriod,
        jobType: workPeriod.jobType,
        activityDescription: workPeriod.activityDescription,
        documents: workPeriodDocuments
          .filter(
            (document) =>
              document.ruralOrHybridRetirementAnalysisWorkPeriodId.toString() ===
              workPeriod.id.toString(),
          )
          .map((document) => ({
            id: document.id.toString(),
            type: document.type,
          })),
        documentAnalyses: workPeriodDocumentAnalyses
          .filter(
            (docAnalysis) =>
              docAnalysis.ruralOrHybridRetirementAnalysisWorkPeriodId.toString() ===
              workPeriod.id.toString(),
          )
          .map((docAnalysis) => ({
            id: docAnalysis.id.toString(),
            documentType: docAnalysis.documentType,
            ownName: docAnalysis.ownName,
            documentYear: docAnalysis.documentYear,
            technicalNote: docAnalysis.technicalNote,
          })),
        earningsHistory: workPeriodEarningsHistory
          .filter(
            (item) =>
              item.ruralOrHybridRetirementAnalysisWorkPeriodId.toString() ===
              workPeriod.id.toString(),
          )
          .map((item) => ({
            id: item.id.toString(),
            competence: item.competence,
            remuneration: item.remuneration,
            indicators: item.indicators,
            paymentDate: item.paymentDate,
            contribution: item.contribution,
            contributionSalary: item.contributionSalary,
            competenceBelowMinimum: item.competenceBelowMinimum,
          })),
      })),
      timeAccelerators: (
        analysis.ruralOrHybridRetirementAnalysisTimeAccelerator ?? []
      ).map((item) => ({
        id: item.id.toString(),
        timeType: item.timeType,
        institution: item.institution,
        recognitionInss: item.recognitionInss,
        viability: item.viability,
        technicalNote: item.technicalNote,
        startDate: item.startDate,
        endDate: item.endDate,
        affectsQualifyingPeriod: item.affectsQualifyingPeriod,
      })),
      currentResult: {
        id: analysis.ruralOrHybridRetirementAnalysisResult?.id.toString(),
        firstAnalysis:
          analysis.ruralOrHybridRetirementAnalysisResult?.firstAnalysis ?? null,
        secondAnalysis:
          analysis.ruralOrHybridRetirementAnalysisResult?.secondAnalysis ??
          null,
        completeAnalysis:
          analysis.ruralOrHybridRetirementAnalysisResult?.completeAnalysis ??
          null,
        simplifiedAnalysis:
          analysis.ruralOrHybridRetirementAnalysisResult?.simplifiedAnalysis ??
          null,
      },
    };

    return Buffer.from(JSON.stringify(analysisData, null, 2), 'utf-8');
  }

  private async getAllDocumentBuffers(
    analysis: Awaited<
      ReturnType<
        typeof this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const buffers = await Promise.all(
      [
        ...(analysis.ruralOrHybridRetirementAnalysisDocument ?? [])
          .filter(
            (document) =>
              document.document !== null &&
              document.document !== cnisDocumentPath,
          )
          .map((document) => document.document),
        ...(analysis.ruralOrHybridRetirementAnalysisPeriodDocument ?? [])
          .filter((document) => document.document !== null)
          .map((document) => document.document),
        ...(analysis.ruralOrHybridRetirementAnalysisPeriodMemberDocument ?? [])
          .filter((document) => document.document !== null)
          .map((document) => document.document),
        ...(
          analysis.ruralOrHybridRetirementAnalysisTestimonialWitnessDocument ??
          []
        )
          .filter((document) => document.document !== null)
          .map((document) => document.document),
        ...(analysis.ruralOrHybridRetirementAnalysisWorkPeriodDocument ?? [])
          .filter((document) => document.document !== null)
          .map((document) => document.document),
      ]
        .filter((documentPath): documentPath is string => documentPath !== null)
        .map((documentPath) =>
          this.fileProcessorGateway.getFileBuffer(documentPath),
        ),
    );

    return [cnisBuffer, ...buffers];
  }

  private findAnalysisToolRecordQueryResultOrFail(
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): ReturnType<
    AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByRuralOrHybridRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail']
  > {
    return this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralOrHybridRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralOrHybridRetirementAnalysisId,
      organizationId,
      authIdentityId,
      AnalysisToolRecordNotFoundError,
    );
  }
}
