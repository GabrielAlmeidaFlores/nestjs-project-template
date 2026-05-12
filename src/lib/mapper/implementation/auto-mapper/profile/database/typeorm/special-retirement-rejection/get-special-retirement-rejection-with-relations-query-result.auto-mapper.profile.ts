import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { GetSpecialRetirementRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/query/result/get-special-retirement-rejection-with-relations.query.result';
import { GetSpecialRetirementRejectionTechnicalDiagnosisQueryResult } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-technical-diagnosis/query/result/get-special-retirement-rejection-technical-diagnosis.query.result';
import { SpecialRetirementRejectionEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/special-retirement-rejection.entity';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/special-retirement-rejection-document.entity';
import { SpecialRetirementRejectionDocumentId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/value-object/special-retirement-rejection-document-id.value-object';
import { SpecialRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/special-retirement-rejection-inss-benefit.entity';
import { SpecialRetirementRejectionInssBenefitId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/value-object/special-retirement-rejection-inss-benefit-id.value-object';
import { SpecialRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/special-retirement-rejection-legal-proceeding.entity';
import { SpecialRetirementRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/value-object/special-retirement-rejection-legal-proceeding-id.value-object';
import { SpecialRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/special-retirement-rejection-result.entity';
import { SpecialRetirementRejectionResultId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/value-object/special-retirement-rejection-result-id.value-object';
import { SpecialRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/special-retirement-rejection-work-period.entity';
import { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import { SpecialRetirementRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/special-retirement-rejection-work-period-document.entity';
import { SpecialRetirementRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/value-object/special-retirement-rejection-work-period-document-id.value-object';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/special-retirement-rejection-work-period-earnings-history.entity';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/value-object/special-retirement-rejection-work-period-earnings-history-id.value-object';
import { SpecialRetirementRejectionWorkSpecialPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/special-retirement-rejection-work-special-period.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/value-object/special-retirement-rejection-work-special-period-id.value-object';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period-legal-framework/special-retirement-rejection-work-special-period-legal-framework.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period-legal-framework/value-object/special-retirement-rejection-work-special-period-legal-framework-id.value-object';

@Injectable()
export class GetSpecialRetirementRejectionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialRetirementRejectionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: SpecialRetirementRejectionTypeormEntity,
    ): GetSpecialRetirementRejectionWithRelationsQueryResult => {
      const specialRetirementRejection = this.mapper.map(
        source,
        SpecialRetirementRejectionTypeormEntity,
        SpecialRetirementRejectionEntity,
      );

      const specialRetirementRejectionResult =
        source.specialRetirementRejectionResult !== null &&
        source.specialRetirementRejectionResult !== undefined
          ? new SpecialRetirementRejectionResultEntity({
              id: new SpecialRetirementRejectionResultId(
                source.specialRetirementRejectionResult.id,
              ),
              firstAnalysis:
                source.specialRetirementRejectionResult.firstAnalysis,
              completeAnalysis:
                source.specialRetirementRejectionResult.completeAnalysis,
              simplifiedAnalysis:
                source.specialRetirementRejectionResult.simplifiedAnalysis,
              createdAt: source.specialRetirementRejectionResult.createdAt,
              updatedAt: source.specialRetirementRejectionResult.updatedAt,
              deletedAt: source.specialRetirementRejectionResult.deletedAt,
            })
          : null;

      const specialRetirementRejectionDocument = (
        source.specialRetirementRejectionDocument ?? []
      ).map(
        (item) =>
          new SpecialRetirementRejectionDocumentEntity({
            id: new SpecialRetirementRejectionDocumentId(item.id),
            fileName: item.fileName,
            type: item.type,
            specialRetirementRejectionId: specialRetirementRejection.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const specialRetirementRejectionInssBenefit = (
        source.specialRetirementRejectionInssBenefit ?? []
      ).map(
        (item) =>
          new SpecialRetirementRejectionInssBenefitEntity({
            id: new SpecialRetirementRejectionInssBenefitId(item.id),
            benefitNumber: item.benefitNumber,
            specialRetirementRejectionId: specialRetirementRejection.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const specialRetirementRejectionLegalProceeding = (
        source.specialRetirementRejectionLegalProceeding ?? []
      ).map(
        (item) =>
          new SpecialRetirementRejectionLegalProceedingEntity({
            id: new SpecialRetirementRejectionLegalProceedingId(item.id),
            number: item.number,
            specialRetirementRejectionId: specialRetirementRejection.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const specialRetirementRejectionWorkPeriod = (
        source.specialRetirementRejectionWorkPeriod ?? []
      ).map(
        (item) =>
          new SpecialRetirementRejectionWorkPeriodEntity({
            id: new SpecialRetirementRejectionWorkPeriodId(item.id),
            bondOrigin: item.bondOrigin,
            startDate: item.startDate,
            endDate: item.endDate,
            category: item.category,
            pendencyReason: item.pendencyReason,
            periodConsideration: item.periodConsideration,
            contributionAverage: item.contributionAverage,
            status: item.status,
            gracePeriod: item.gracePeriod,
            activityType: item.activityType,
            specialRetirementRejectionId: specialRetirementRejection.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      const specialRetirementRejectionWorkPeriodDocument = (
        source.specialRetirementRejectionWorkPeriod ?? []
      ).flatMap((workPeriod) =>
        (workPeriod.specialRetirementRejectionWorkPeriodDocument ?? []).map(
          (item) =>
            new SpecialRetirementRejectionWorkPeriodDocumentEntity({
              id: new SpecialRetirementRejectionWorkPeriodDocumentId(item.id),
              fileName: item.fileName,
              type: item.type,
              specialRetirementRejectionWorkPeriodId:
                new SpecialRetirementRejectionWorkPeriodId(workPeriod.id),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      );

      const specialRetirementRejectionWorkPeriodEarningsHistory = (
        source.specialRetirementRejectionWorkPeriod ?? []
      ).flatMap((workPeriod) =>
        (
          workPeriod.specialRetirementRejectionWorkPeriodEarningsHistory ?? []
        ).map(
          (item) =>
            new SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity({
              id: new SpecialRetirementRejectionWorkPeriodEarningsHistoryId(
                item.id,
              ),
              competence: item.competence,
              remuneration:
                item.remuneration !== null
                  ? new DecimalValue(item.remuneration)
                  : null,
              indicators: item.indicators,
              paymentDate: item.paymentDate,
              contribution:
                item.contribution !== null
                  ? new DecimalValue(item.contribution)
                  : null,
              contributionSalary:
                item.contributionSalary !== null
                  ? new DecimalValue(item.contributionSalary)
                  : null,
              competenceBelowTheMinimum: item.competenceBelowTheMinimum,
              specialRetirementRejectionWorkPeriodId:
                new SpecialRetirementRejectionWorkPeriodId(workPeriod.id),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      );

      const specialRetirementRejectionWorkSpecialPeriod = (
        source.specialRetirementRejectionWorkPeriod ?? []
      ).flatMap((workPeriod) =>
        (workPeriod.specialRetirementRejectionWorkSpecialPeriod ?? []).map(
          (item) =>
            new SpecialRetirementRejectionWorkSpecialPeriodEntity({
              id: new SpecialRetirementRejectionWorkSpecialPeriodId(item.id),
              recognizedSpecialTime: item.recognizedSpecialTime,
              companyName: item.companyName,
              cnpj: item.cnpj,
              position: item.position,
              comprobatoryDocument: item.comprobatoryDocument,
              linkedToCnis: item.linkedToCnis,
              containsCnisRemunerationInPeriod:
                item.containsCnisRemunerationInPeriod,
              technicalJustification: item.technicalJustification,
              additionalObservation: item.additionalObservation,
              lawyerObservation: item.lawyerObservation,
              exposureFrequency: item.exposureFrequency,
              informationSource: item.informationSource,
              identifiedAgents: item.identifiedAgents,
              efficientEpi: item.efficientEpi,
              specialRetirementRejectionWorkPeriodId:
                new SpecialRetirementRejectionWorkPeriodId(workPeriod.id),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        ),
      );

      const specialRetirementRejectionWorkSpecialPeriodLegalFramework = (
        source.specialRetirementRejectionWorkPeriod ?? []
      ).flatMap((workPeriod) =>
        (workPeriod.specialRetirementRejectionWorkSpecialPeriod ?? []).flatMap(
          (specialPeriod) =>
            (
              specialPeriod.specialRetirementRejectionWorkSpecialPeriodLegalFramework ??
              []
            ).map(
              (item) =>
                new SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity(
                  {
                    id: new SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkId(
                      item.id,
                    ),
                    code: item.code,
                    description: item.description,
                    specialRetirementRejectionWorkSpecialPeriodId:
                      new SpecialRetirementRejectionWorkSpecialPeriodId(
                        specialPeriod.id,
                      ),
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    deletedAt: item.deletedAt,
                  },
                ),
            ),
        ),
      );

      const specialRetirementRejectionTechnicalDiagnosis =
        source.specialRetirementRejectionTechnicalDiagnosis !== undefined &&
        source.specialRetirementRejectionTechnicalDiagnosis !== null &&
        source.specialRetirementRejectionTechnicalDiagnosis.length > 0
          ? GetSpecialRetirementRejectionTechnicalDiagnosisQueryResult.build({
              periodStartDate:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.periodStartDate ?? new Date(0),
              periodEndDate:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.periodEndDate ?? new Date(0),
              recognized:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.recognized ?? false,
              justification:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.justification ?? '',
              company:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.company ?? '',
              cnpj:
                source.specialRetirementRejectionTechnicalDiagnosis[0]?.cnpj ??
                '',
              role:
                source.specialRetirementRejectionTechnicalDiagnosis[0]?.role ??
                '',
              supportingDocument:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.supportingDocument ?? '',
              recordedInCnis:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.recordedInCnis ?? false,
              remunerationRecordedInCnis:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.remunerationRecordedInCnis ?? false,
              hazardousAgents:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.hazardousAgents ?? '',
              informationSource:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.informationSource ?? '',
              legalFramework:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.legalFramework ?? '',
              epiEficaz:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.epiEficaz ?? null,
              observations:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.observations ?? null,
              createdAt:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.createdAt ?? new Date(0),
              updatedAt:
                source.specialRetirementRejectionTechnicalDiagnosis[0]
                  ?.updatedAt ?? new Date(0),
            })
          : null;

      return GetSpecialRetirementRejectionWithRelationsQueryResult.build({
        id: new SpecialRetirementRejectionId(source.id),
        specialRetirementRejectionId: new SpecialRetirementRejectionId(
          source.id,
        ),
        analysisName: source.analysisName,
        category: source.category,
        requirementStartDate: source.requirementStartDate,
        rejectionDate: source.rejectionDate,
        harmfulAgents: source.harmfulAgents,
        otherAgents: source.otherAgents,
        rejectionReason: source.rejectionReason,
        otherRejectionReason: source.otherRejectionReason,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        specialRetirementRejectionResult,
        specialRetirementRejectionInssBenefit,
        specialRetirementRejectionDocument,
        specialRetirementRejectionLegalProceeding,
        specialRetirementRejectionWorkPeriod,
        specialRetirementRejectionWorkPeriodDocument,
        specialRetirementRejectionWorkPeriodEarningsHistory,
        specialRetirementRejectionWorkSpecialPeriod,
        specialRetirementRejectionWorkSpecialPeriodLegalFramework,
        specialRetirementRejectionTechnicalDiagnosis,
      });
    };

    createMap(
      this.mapper,
      SpecialRetirementRejectionTypeormEntity,
      GetSpecialRetirementRejectionWithRelationsQueryResult,
      constructUsing(convert),
    );
  }
}
