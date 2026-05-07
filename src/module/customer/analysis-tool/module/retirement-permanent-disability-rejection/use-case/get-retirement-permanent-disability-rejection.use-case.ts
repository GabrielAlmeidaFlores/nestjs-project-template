import { Inject, Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/retirement-permanent-disability-rejection.query.repository.gateway';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/retirement-permanent-disability-rejection-document.entity';
import { RetirementPermanentDisabilityRejectionIncapacityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/retirement-permanent-disability-rejection-incapacity.entity';
import { RetirementPermanentDisabilityRejectionIncapacityCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/retirement-permanent-disability-rejection-incapacity-cid.entity';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/retirement-permanent-disability-rejection-incapacity-document.entity';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/retirement-permanent-disability-rejection-incapacity-previous-benefit.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/retirement-permanent-disability-rejection-insured-quality.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/retirement-permanent-disability-rejection-insured-quality-document.entity';
import { RetirementPermanentDisabilityRejectionPeriodEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/retirement-permanent-disability-rejection-period.entity';
import { RetirementPermanentDisabilityRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/retirement-permanent-disability-rejection-period-document.entity';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/retirement-permanent-disability-rejection-period-earnings-history.entity';
import { RetirementPermanentDisabilityRejectionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/retirement-permanent-disability-rejection-result.entity';
import {
  GetRetirementPermanentDisabilityRejectionDocumentResponseDto,
  GetRetirementPermanentDisabilityRejectionIncapacityAuditCidResponseDto,
  GetRetirementPermanentDisabilityRejectionIncapacityDocumentResponseDto,
  GetRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitResponseDto,
  GetRetirementPermanentDisabilityRejectionIncapacityResponseDto,
  GetRetirementPermanentDisabilityRejectionInsuredQualityDocumentResponseDto,
  GetRetirementPermanentDisabilityRejectionInsuredQualityResponseDto,
  GetRetirementPermanentDisabilityRejectionPeriodDocumentResponseDto,
  GetRetirementPermanentDisabilityRejectionPeriodEarningsHistoryResponseDto,
  GetRetirementPermanentDisabilityRejectionPeriodResponseDto,
  GetRetirementPermanentDisabilityRejectionResponseDto,
  GetRetirementPermanentDisabilityRejectionResultResponseDto,
} from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/get-retirement-permanent-disability-rejection.response.dto';
import { RetirementPermanentDisabilityRejectionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-not-found.error';

@Injectable()
export class GetRetirementPermanentDisabilityRejectionUseCase {
  protected readonly _type =
    GetRetirementPermanentDisabilityRejectionUseCase.name;

  public constructor(
    @Inject(RetirementPermanentDisabilityRejectionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionQueryRepositoryGateway: RetirementPermanentDisabilityRejectionQueryRepositoryGateway,
  ) {}

  public async execute(
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
  ): Promise<GetRetirementPermanentDisabilityRejectionResponseDto> {
    const denial =
      await this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations(
        retirementPermanentDisabilityRejectionId,
        RetirementPermanentDisabilityRejectionNotFoundError,
      );

    const periods = denial.retirementPermanentDisabilityRejectionPeriod ?? [];
    const periodDocuments =
      denial.retirementPermanentDisabilityRejectionPeriodDocument ?? [];
    const periodEarningsHistories =
      denial.retirementPermanentDisabilityRejectionPeriodEarningsHistory ?? [];

    const incapacityCids =
      denial.retirementPermanentDisabilityRejectionIncapacityCid ?? [];
    const incapacityDocuments =
      denial.retirementPermanentDisabilityRejectionIncapacityDocument ?? [];
    const incapacityPreviousBenefits =
      denial.retirementPermanentDisabilityRejectionIncapacityPreviousBenefit ??
      [];
    const insuredQualityDocuments =
      denial.retirementPermanentDisabilityRejectionInsuredQualityDocument ?? [];

    const periodResponseDtos = periods.map((period) =>
      this.buildPeriodResponseDto(
        period,
        this.findPeriodDocuments(periodDocuments, period),
        this.findPeriodEarningsHistories(periodEarningsHistories, period),
      ),
    );

    return GetRetirementPermanentDisabilityRejectionResponseDto.build({
      retirementPermanentDisabilityRejectionId: denial.id,
      ...(denial.analysisName !== null && {
        analysisName: denial.analysisName,
      }),
      ...(denial.requestEntryDate !== null && {
        requestEntryDate: denial.requestEntryDate,
      }),
      ...(denial.denialDate !== null && { denialDate: denial.denialDate }),
      ...(denial.category !== null && { category: denial.category }),
      ...(denial.retirementPermanentDisabilityRejectionResult !== null && {
        retirementPermanentDisabilityRejectionResult:
          this.buildResultResponseDto(
            denial.retirementPermanentDisabilityRejectionResult,
          ),
      }),
      ...(denial.retirementPermanentDisabilityRejectionDocument !== null &&
        denial.retirementPermanentDisabilityRejectionDocument.length > 0 && {
          retirementPermanentDisabilityRejectionDocument:
            denial.retirementPermanentDisabilityRejectionDocument.map((doc) =>
              this.buildDocumentResponseDto(doc),
            ),
        }),
      ...(denial.retirementPermanentDisabilityRejectionIncapacity !== null && {
        retirementPermanentDisabilityRejectionIncapacity:
          this.buildIncapacityResponseDto(
            denial.retirementPermanentDisabilityRejectionIncapacity,
            incapacityCids,
            incapacityDocuments,
            incapacityPreviousBenefits,
          ),
      }),
      ...(denial.retirementPermanentDisabilityRejectionInsuredQuality !==
        null && {
        retirementPermanentDisabilityRejectionInsuredQuality:
          this.buildInsuredQualityResponseDto(
            denial.retirementPermanentDisabilityRejectionInsuredQuality,
            insuredQualityDocuments,
          ),
      }),
      ...(periodResponseDtos.length > 0 && {
        retirementPermanentDisabilityRejectionPeriod: periodResponseDtos,
      }),
      createdAt: denial.createdAt,
      updatedAt: denial.updatedAt,
    });
  }

  private buildResultResponseDto(
    result: RetirementPermanentDisabilityRejectionResultEntity,
  ): GetRetirementPermanentDisabilityRejectionResultResponseDto {
    return GetRetirementPermanentDisabilityRejectionResultResponseDto.build({
      ...(result.inssDecisionAnalysis !== null && {
        inssDecisionAnalysis: result.inssDecisionAnalysis,
      }),
      ...(result.firstAnalysis !== null && {
        firstAnalysis: result.firstAnalysis,
      }),
      ...(result.completeAnalysis !== null && {
        completeAnalysis: result.completeAnalysis,
      }),
    });
  }

  private buildDocumentResponseDto(
    document: RetirementPermanentDisabilityRejectionDocumentEntity,
  ): GetRetirementPermanentDisabilityRejectionDocumentResponseDto {
    return GetRetirementPermanentDisabilityRejectionDocumentResponseDto.build({
      document: document.document,
      type: document.type,
    });
  }

  private buildIncapacityResponseDto(
    incapacity: RetirementPermanentDisabilityRejectionIncapacityEntity,
    cids: RetirementPermanentDisabilityRejectionIncapacityCidEntity[],
    documents: RetirementPermanentDisabilityRejectionIncapacityDocumentEntity[],
    previousBenefits: RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity[],
  ): GetRetirementPermanentDisabilityRejectionIncapacityResponseDto {
    return GetRetirementPermanentDisabilityRejectionIncapacityResponseDto.build(
      {
        ...(incapacity.incapacityStartDate !== null && {
          incapacityStartDate: incapacity.incapacityStartDate,
        }),
        ...(incapacity.diseaseDescription !== null && {
          diseaseDescription: incapacity.diseaseDescription,
        }),
        isIncapacityFromAccident: incapacity.isIncapacityFromAccident,
        ...(incapacity.incapacitatingEventDescription !== null && {
          incapacitatingEventDescription:
            incapacity.incapacitatingEventDescription,
        }),
        isIncapacityFromSeriousDisease:
          incapacity.isIncapacityFromSeriousDisease,
        ...(incapacity.seriousDiseaseType !== null && {
          seriousDiseaseType: incapacity.seriousDiseaseType,
        }),
        ...(incapacity.seriousDiseaseOtherDescription !== null && {
          seriousDiseaseOtherDescription:
            incapacity.seriousDiseaseOtherDescription,
        }),
        ...(incapacity.seriousDiseaseStartDate !== null && {
          seriousDiseaseStartDate: incapacity.seriousDiseaseStartDate,
        }),
        needsPermanentAssistance: incapacity.needsPermanentAssistance,
        hasPreviousIncapacityBenefit: incapacity.hasPreviousIncapacityBenefit,
        ...(previousBenefits.length > 0 && {
          previousBenefits: previousBenefits.map((pb) =>
            GetRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitResponseDto.build(
              {
                benefitNumber: pb.benefitNumber,
                ...(pb.startDate !== null && { startDate: pb.startDate }),
                ...(pb.endDate !== null && { endDate: pb.endDate }),
              },
            ),
          ),
        }),
        ...(cids.length > 0 && {
          cids: cids.map((cid) =>
            GetRetirementPermanentDisabilityRejectionIncapacityAuditCidResponseDto.build(
              {
                cid: cid.cid,
                type: cid.type,
              },
            ),
          ),
        }),
        ...(documents.length > 0 && {
          documents: documents.map((doc) =>
            GetRetirementPermanentDisabilityRejectionIncapacityDocumentResponseDto.build(
              {
                document: doc.document,
                type: doc.type,
              },
            ),
          ),
        }),
      },
    );
  }

  private buildInsuredQualityResponseDto(
    insuredQuality: RetirementPermanentDisabilityRejectionInsuredQualityEntity,
    documents: RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity[],
  ): GetRetirementPermanentDisabilityRejectionInsuredQualityResponseDto {
    return GetRetirementPermanentDisabilityRejectionInsuredQualityResponseDto.build(
      {
        isInvoluntaryUnemployed: insuredQuality.isInvoluntaryUnemployed,
        ...(insuredQuality.intendsToProveInvoluntaryUnemployment !== null && {
          intendsToProveInvoluntaryUnemployment:
            insuredQuality.intendsToProveInvoluntaryUnemployment,
        }),
        isRuralInsuredAtGeneratingFact:
          insuredQuality.isRuralInsuredAtGeneratingFact,
        ...(insuredQuality.ruralInsuredStartDate !== null && {
          ruralInsuredStartDate: insuredQuality.ruralInsuredStartDate,
        }),
        ...(insuredQuality.ruralInsuredEndDate !== null && {
          ruralInsuredEndDate: insuredQuality.ruralInsuredEndDate,
        }),
        ...(insuredQuality.ruralInsuredDescription !== null && {
          ruralInsuredDescription: insuredQuality.ruralInsuredDescription,
        }),
        ...(documents.length > 0 && {
          documents: documents.map((doc) =>
            GetRetirementPermanentDisabilityRejectionInsuredQualityDocumentResponseDto.build(
              {
                document: doc.document,
                type: doc.type,
              },
            ),
          ),
        }),
      },
    );
  }

  private buildPeriodResponseDto(
    period: RetirementPermanentDisabilityRejectionPeriodEntity,
    periodDocuments: RetirementPermanentDisabilityRejectionPeriodDocumentEntity[],
    earningsHistories: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity[],
  ): GetRetirementPermanentDisabilityRejectionPeriodResponseDto {
    return GetRetirementPermanentDisabilityRejectionPeriodResponseDto.build({
      startDate: period.startDate,
      ...(period.endDate !== null && { endDate: period.endDate }),
      workType: period.workType,
      ...(period.bondOrigin !== null && { bondOrigin: period.bondOrigin }),
      ...(period.category !== null && { category: period.category }),
      ...(period.activityDescription !== null && {
        activityDescription: period.activityDescription,
      }),
      isPendency: period.isPendency,
      competenceBelowTheMinimum: period.competenceBelowTheMinimum,
      ...(period.pendencyReason !== null && {
        pendencyReason: period.pendencyReason,
      }),
      ...(period.periodConsideration !== null && {
        periodConsideration: period.periodConsideration,
      }),
      ...(period.contributionAverage !== null && {
        contributionAverage: period.contributionAverage,
      }),
      ...(period.wantsToComplementViaMeuINSS !== null && {
        wantsToComplementViaMeuINSS: period.wantsToComplementViaMeuINSS,
      }),
      ...(period.local !== null && { local: period.local }),
      status: period.status,
      ...(periodDocuments.length > 0 && {
        retirementPermanentDisabilityRejectionPeriodDocument:
          periodDocuments.map((doc) =>
            GetRetirementPermanentDisabilityRejectionPeriodDocumentResponseDto.build(
              {
                document: doc.document,
              },
            ),
          ),
      }),
      ...(earningsHistories.length > 0 && {
        earningsHistory: earningsHistories.map((hist) =>
          GetRetirementPermanentDisabilityRejectionPeriodEarningsHistoryResponseDto.build(
            {
              ...(hist.competence !== null && { competence: hist.competence }),
              ...(hist.value !== null && { value: hist.value }),
            },
          ),
        ),
      }),
    });
  }

  private findPeriodDocuments(
    allDocs: RetirementPermanentDisabilityRejectionPeriodDocumentEntity[],
    period: RetirementPermanentDisabilityRejectionPeriodEntity,
  ): RetirementPermanentDisabilityRejectionPeriodDocumentEntity[] {
    return allDocs.filter(
      (doc) =>
        doc.retirementPermanentDisabilityRejectionPeriodId.toString() ===
        period.id.toString(),
    );
  }

  private findPeriodEarningsHistories(
    allHistories: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity[],
    period: RetirementPermanentDisabilityRejectionPeriodEntity,
  ): RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity[] {
    return allHistories.filter(
      (hist) =>
        hist.retirementPermanentDisabilityRejectionPeriodId.toString() ===
        period.id.toString(),
    );
  }
}
