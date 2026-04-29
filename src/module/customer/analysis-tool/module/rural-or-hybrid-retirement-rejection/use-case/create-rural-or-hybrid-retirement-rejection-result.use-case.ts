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
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-result/command/rural-or-hybrid-retirement-rejection-result.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/enum/rural-or-hybrid-retirement-rejection-document-type.enum';
import { RuralOrHybridRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.entity';
import { CreateRuralOrHybridRetirementRejectionResultResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-result.response.dto';
import { InvalidRuralOrHybridRetirementRejectionResultJsonError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/invalid-rural-or-hybrid-retirement-rejection-result-json.error';
import { RuralOrHybridRetirementRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-cnis-document-not-found.error';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { RuralOrHybridRetirementRejectionResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-result.interface';

@Injectable()
export class CreateRuralOrHybridRetirementRejectionResultUseCase {
  protected readonly _type =
    CreateRuralOrHybridRetirementRejectionResultUseCase.name;

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
    @Inject(RuralOrHybridRetirementRejectionCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionCommandRepositoryGateway: RuralOrHybridRetirementRejectionCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionResultCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionResultCommandRepositoryGateway: RuralOrHybridRetirementRejectionResultCommandRepositoryGateway,
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
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<CreateRuralOrHybridRetirementRejectionResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const rejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const cnisDocument = (
      rejection.ruralOrHybridRetirementRejectionDocument ?? []
    ).find(
      (document) =>
        document.type === RuralOrHybridRetirementRejectionDocumentTypeEnum.CNIS,
    );

    if (cnisDocument?.document === null || cnisDocument === undefined) {
      throw new RuralOrHybridRetirementRejectionCnisDocumentNotFoundError();
    }

    const rejectionResult = rejection.ruralOrHybridRetirementRejectionResult;

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
        ruralOrHybridRetirementRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await this.getAllDocumentBuffers(
      rejection,
      cnisDocument.document,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_COMPLETE_ANALYSIS,
      );

    const simplifiedPromptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const consumeSimplifiedCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysis =
      await this.analysisProcessorGateway.getRuralOrHybridRetirementRejectionCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildCompleteAnalysisDataBuffer(rejection), ...documentBuffers],
      );

    if (completeAnalysis === null) {
      throw new InvalidRuralOrHybridRetirementRejectionResultJsonError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysis);

    const simplifiedAnalysis =
      await this.analysisProcessorGateway.getRuralOrHybridRetirementRejectionSimplifiedAnalysis(
        simplifiedPromptResponse.prompt,
        [],
        completeAnalysis,
      );

    const resultEntity = new RuralOrHybridRetirementRejectionResultEntity({
      ...(rejectionResult !== null && { id: rejectionResult.id }),
      firstAnalysis: rejectionResult?.firstAnalysis ?? null,
      secondAnalysis: rejectionResult?.secondAnalysis ?? null,
      completeAnalysis,
      simplifiedAnalysis:
        simplifiedAnalysis ?? rejectionResult?.simplifiedAnalysis ?? null,
      completeAnalysisDownload:
        rejectionResult?.completeAnalysisDownload ?? null,
      simplifiedAnalysisDownload:
        simplifiedAnalysis ??
        rejectionResult?.simplifiedAnalysisDownload ??
        null,
      ruralOrHybridRetirementRejectionId,
    });

    const resultTransaction =
      rejectionResult !== null
        ? this.ruralOrHybridRetirementRejectionResultCommandRepositoryGateway.updateRuralOrHybridRetirementRejectionResult(
            resultEntity,
          )
        : this.ruralOrHybridRetirementRejectionResultCommandRepositoryGateway.createRuralOrHybridRetirementRejectionResult(
            resultEntity,
          );

    const transactionOperations = [
      consumeCreditTransaction,
      consumeSimplifiedCreditTransaction,
      resultTransaction,
    ];

    if (rejectionResult === null) {
      transactionOperations.push(
        this.ruralOrHybridRetirementRejectionCommandRepositoryGateway.updateRuralOrHybridRetirementRejectionResultId(
          ruralOrHybridRetirementRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateRuralOrHybridRetirementRejectionResultResponseDto.build({
      ruralOrHybridRetirementRejectionResult: parsedResult,
      ...(simplifiedAnalysis !== null && {
        ruralOrHybridRetirementRejectionSimplifiedAnalysis: simplifiedAnalysis,
      }),
    });
  }

  private parseResultAnalysis(
    raw: string,
  ): RuralOrHybridRetirementRejectionResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidRuralOrHybridRetirementRejectionResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is RuralOrHybridRetirementRejectionResultInterface {
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
    rejection: Awaited<
      ReturnType<
        typeof this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    const periods = rejection.ruralOrHybridRetirementRejectionPeriod ?? [];
    const periodDocuments =
      rejection.ruralOrHybridRetirementRejectionPeriodDocument ?? [];
    const periodMembers =
      rejection.ruralOrHybridRetirementRejectionPeriodMember ?? [];
    const periodMemberDocuments =
      rejection.ruralOrHybridRetirementRejectionPeriodMemberDocument ?? [];
    const testimonialWitnesses =
      rejection.ruralOrHybridRetirementRejectionTestimonialWitness ?? [];
    const testimonialWitnessDocuments =
      rejection.ruralOrHybridRetirementRejectionTestimonialWitnessDocument ??
      [];
    const workPeriods =
      rejection.ruralOrHybridRetirementRejectionWorkPeriod ?? [];
    const workPeriodDocuments =
      rejection.ruralOrHybridRetirementRejectionWorkPeriodDocument ?? [];
    const workPeriodDocumentAnalyses =
      rejection.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis ??
      [];
    const workPeriodEarningsHistory =
      rejection.ruralOrHybridRetirementRejectionWorkPeriodEarningsHistory ?? [];

    const rejectionData = {
      analysisName: rejection.analysisName,
      activityType: rejection.activityType,
      requestedBenefit: rejection.requestedBenefit,
      applicationSubmissionDate: rejection.applicationSubmissionDate,
      dateOfRejection: rejection.dateOfRejection,
      documents: (rejection.ruralOrHybridRetirementRejectionDocument ?? []).map(
        (document) => ({
          id: document.id.toString(),
          type: document.type,
        }),
      ),
      inssBenefits: (
        rejection.ruralOrHybridRetirementRejectionInssBenefit ?? []
      ).map((item) => item.inssBenefit),
      legalProceedings: (
        rejection.ruralOrHybridRetirementRejectionLegalProceeding ?? []
      ).map((item) => item.legalProceedingNumber),
      periods: periods.map((period) => {
        const members = periodMembers.filter(
          (member) =>
            member.ruralOrHybridRetirementRejectionPeriodId.toString() ===
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
                document.ruralOrHybridRetirementRejectionPeriodId.toString() ===
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
                  document.ruralOrHybridRetirementRejectionPeriodMemberId.toString() ===
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
              document.ruralOrHybridRetirementRejectionTestimonialWitnessId.toString() ===
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
              document.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
              workPeriod.id.toString(),
          )
          .map((document) => ({
            id: document.id.toString(),
            type: document.type,
          })),
        documentAnalyses: workPeriodDocumentAnalyses
          .filter(
            (analysis) =>
              analysis.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
              workPeriod.id.toString(),
          )
          .map((analysis) => ({
            id: analysis.id.toString(),
            documentType: analysis.documentType,
            ownName: analysis.ownName,
            documentYear: analysis.documentYear,
            technicalNote: analysis.technicalNote,
          })),
        earningsHistory: workPeriodEarningsHistory
          .filter(
            (item) =>
              item.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
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
        rejection.ruralOrHybridRetirementRejectionTimeAccelerator ?? []
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
        id: rejection.ruralOrHybridRetirementRejectionResult?.id.toString(),
        firstAnalysis:
          rejection.ruralOrHybridRetirementRejectionResult?.firstAnalysis ??
          null,
        secondAnalysis:
          rejection.ruralOrHybridRetirementRejectionResult?.secondAnalysis ??
          null,
        completeAnalysis:
          rejection.ruralOrHybridRetirementRejectionResult?.completeAnalysis ??
          null,
        simplifiedAnalysis:
          rejection.ruralOrHybridRetirementRejectionResult
            ?.simplifiedAnalysis ?? null,
      },
    };

    return Buffer.from(JSON.stringify(rejectionData, null, 2), 'utf-8');
  }

  private async getAllDocumentBuffers(
    rejection: Awaited<
      ReturnType<
        typeof this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations
      >
    >,
    cnisDocumentPath: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const buffers = await Promise.all(
      [
        ...(rejection.ruralOrHybridRetirementRejectionDocument ?? [])
          .filter(
            (document) =>
              document.document !== null &&
              document.document !== cnisDocumentPath,
          )
          .map((document) => document.document),
        ...(rejection.ruralOrHybridRetirementRejectionPeriodDocument ?? [])
          .filter((document) => document.document !== null)
          .map((document) => document.document),
        ...(
          rejection.ruralOrHybridRetirementRejectionPeriodMemberDocument ?? []
        )
          .filter((document) => document.document !== null)
          .map((document) => document.document),
        ...(
          rejection.ruralOrHybridRetirementRejectionTestimonialWitnessDocument ??
          []
        )
          .filter((document) => document.document !== null)
          .map((document) => document.document),
        ...(rejection.ruralOrHybridRetirementRejectionWorkPeriodDocument ?? [])
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

  private findAnalysisToolClientByAnalysisToolRecordOrFail(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    organizationId: OrganizationSessionDataModel['organizationId'],
    authIdentityId: SessionDataModel['authIdentityId'],
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecordQueryResultPromise: ReturnType<
      AnalysisToolRecordQueryRepositoryGateway['findWithRelationsByRuralOrHybridRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail']
    > =
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralOrHybridRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        ruralOrHybridRetirementRejectionId,
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
