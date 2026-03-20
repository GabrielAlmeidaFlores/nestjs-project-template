import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-document.typeorm.entity';
import { GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-remuneration.typeorm.entity';
import { GeneralUrbanRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/result/get-general-urban-retirement-analysis-with-relations.query.result';
import { GetGeneralUrbanRetirementAnalysisQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/result/get-general-urban-retirement-analysis.query.result';
import { GetGeneralUrbanRetirementAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-document/query/result/get-general-urban-retirement-analysis-document.query.result';
import { GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-legal-proceeding/query/result/get-general-urban-retirement-analysis-legal-proceeding.query.result';
import { GetGeneralUrbanRetirementAnalysisPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period/query/result/get-general-urban-retirement-analysis-period.query.result';
import { GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-document/query/result/get-general-urban-retirement-analysis-period-document.query.result';
import { GetGeneralUrbanRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/result/get-general-urban-retirement-analysis-remuneration.query.result';
import { GetGeneralUrbanRetirementAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-result/query/result/get-general-urban-retirement-analysis-result.query.result';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/value-object/general-urban-retirement-analysis-period-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/value-object/general-urban-retirement-analysis-period-disability-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/value-object/general-urban-retirement-analysis-period-document-id.value-object';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/value-object/general-urban-retirement-analysis-period-special-time-id.value-object';
import { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';
import { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapOrmEntityToDomainEntity();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementAnalysisTypeormEntity,
    ): GetGeneralUrbanRetirementAnalysisQueryResult =>
      GetGeneralUrbanRetirementAnalysisQueryResult.build({
        id: new GeneralUrbanRetirementAnalysisId(source.id),
        careerStartDate: source.careerStartDate,
        publicServiceStartDate: source.publicServiceStartDate,
        generalUrbanRetirementBenefitAnalysis:
          source.generalUrbanRetirementBenefitAnalysis ?? null,
        federativeEntity: source.federativeEntity ?? null,
        state: source.state ?? null,
        municipality: source.municipality ?? null,
        name: source.name ?? null,
        benefitType: source.benefitType ?? null,
        currentPosition: source.currentPosition ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisTypeormEntity,
      GetGeneralUrbanRetirementAnalysisQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementAnalysisTypeormEntity,
    ): GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult => {
      const generalUrbanRetirementAnalysisResult =
        source.generalUrbanRetirementAnalysisResult !== undefined
          ? GetGeneralUrbanRetirementAnalysisResultQueryResult.build({
              id: new GeneralUrbanRetirementAnalysisResultId(
                source.generalUrbanRetirementAnalysisResult.id,
              ),
              generalUrbanRetirementCompleteAnalysis:
                source.generalUrbanRetirementAnalysisResult
                  .generalUrbanRetirementCompleteAnalysis ?? null,
              generalUrbanRetirementCompleteAnalysisDownload:
                source.generalUrbanRetirementAnalysisResult
                  .generalUrbanRetirementCompleteAnalysisDownload ?? null,
              generalUrbanRetirementSimplifiedAnalysis:
                source.generalUrbanRetirementAnalysisResult
                  .generalUrbanRetirementSimplifiedAnalysis ?? null,
              createdAt: source.generalUrbanRetirementAnalysisResult.createdAt,
              updatedAt: source.generalUrbanRetirementAnalysisResult.updatedAt,
              deletedAt:
                source.generalUrbanRetirementAnalysisResult.deletedAt ?? null,
            })
          : null;

      const remunerations = (source.remunerations ?? []).map((r) =>
        GetGeneralUrbanRetirementAnalysisRemunerationQueryResult.build({
          id: new GeneralUrbanRetirementAnalysisRemunerationId(r.id),
          remunerationDate: r.remunerationDate,
          remunerationAmount: new DecimalValue(r.remunerationAmount),
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
          deletedAt: r.deletedAt ?? null,
        }),
      );

      const periods = (source.periods ?? []).map((p) => {
        const base = {
          id: new GeneralUrbanRetirementAnalysisPeriodId(p.id),
          startDate: p.startDate,
          endDate: p.endDate,
          jobPosition: p.jobPosition,
          career: p.career,
          serviceType: p.serviceType,
          department: p.department,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
          deletedAt: p.deletedAt ?? null,
        };
        const specialTimePeriod =
          p.specialTimePeriod?.id !== undefined
            ? {
                id: new GeneralUrbanRetirementAnalysisPeriodSpecialTimeId(
                  p.specialTimePeriod.id,
                ),
                type: p.specialTimePeriod.type,
                startDate: p.specialTimePeriod.startDate,
                endDate: p.specialTimePeriod.endDate,
                ...(p.specialTimePeriod.lawyerObservations !== null && {
                  lawyerObservations: p.specialTimePeriod.lawyerObservations,
                }),
                documents: (p.specialTimePeriod.specialTimeDocuments ?? []).map(
                  (d) =>
                    GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult.build(
                      {
                        id: new GeneralUrbanRetirementAnalysisPeriodDocumentId(
                          d.id,
                        ),
                        document: d.document,
                        documentType: d.documentType,
                        createdAt: d.createdAt,
                        updatedAt: d.updatedAt,
                        deletedAt: d.deletedAt ?? null,
                      },
                    ),
                ),
              }
            : undefined;
        const disabilityPeriod =
          p.disabilityPeriod?.id !== undefined &&
          p.disabilityPeriod.cid !== null
            ? {
                id: new GeneralUrbanRetirementAnalysisPeriodDisabilityId(
                  p.disabilityPeriod.id,
                ),
                type: p.disabilityPeriod.type,
                degree: p.disabilityPeriod.degree,
                startDate: p.disabilityPeriod.startDate,
                endDate: p.disabilityPeriod.endDate,
                category: p.disabilityPeriod.category,
                description: p.disabilityPeriod.description,
                dailyImpact: p.disabilityPeriod.dailyImpact,
                ...(p.disabilityPeriod.lawyerObservations !== null && {
                  lawyerObservations: p.disabilityPeriod.lawyerObservations,
                }),
                cid: {
                  id: new CidTenId(p.disabilityPeriod.cid.id),
                  code: p.disabilityPeriod.cid.code,
                  description: p.disabilityPeriod.cid.description,
                },
                documents: (p.disabilityPeriod.disabilityDocuments ?? []).map(
                  (d) =>
                    GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult.build(
                      {
                        id: new GeneralUrbanRetirementAnalysisPeriodDocumentId(
                          d.id,
                        ),
                        document: d.document,
                        documentType: d.documentType,
                        createdAt: d.createdAt,
                        updatedAt: d.updatedAt,
                        deletedAt: d.deletedAt ?? null,
                      },
                    ),
                ),
              }
            : undefined;
        return GetGeneralUrbanRetirementAnalysisPeriodQueryResult.build({
          ...base,
          ...(specialTimePeriod !== undefined && { specialTimePeriod }),
          ...(disabilityPeriod !== undefined && { disabilityPeriod }),
        });
      });

      const documents = this.mapper.mapArray(
        source.documents ?? [],
        GeneralUrbanRetirementAnalysisDocumentTypeormEntity,
        GetGeneralUrbanRetirementAnalysisDocumentQueryResult,
      );

      const legalProceedings = this.mapper.mapArray(
        source.legalProceedings ?? [],
        GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity,
        GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult,
      );

      return GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult.build({
        ...GetGeneralUrbanRetirementAnalysisQueryResult.build({
          id: new GeneralUrbanRetirementAnalysisId(source.id),
          careerStartDate: source.careerStartDate,
          publicServiceStartDate: source.publicServiceStartDate,
          generalUrbanRetirementBenefitAnalysis:
            source.generalUrbanRetirementBenefitAnalysis ?? null,
          federativeEntity: source.federativeEntity ?? null,
          state: source.state ?? null,
          municipality: source.municipality ?? null,
          name: source.name ?? null,
          benefitType: source.benefitType ?? null,
          currentPosition: source.currentPosition ?? null,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt ?? null,
        }),
        generalUrbanRetirementAnalysisResult,
        remunerations,
        periods,
        documents,
        legalProceedings,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisTypeormEntity,
      GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult,
    ): GeneralUrbanRetirementAnalysisTypeormEntity => {
      const generalUrbanRetirementAnalysisResult =
        source.generalUrbanRetirementAnalysisResult !== null
          ? GeneralUrbanRetirementAnalysisResultTypeormEntity.build({
              id: source.generalUrbanRetirementAnalysisResult.id.toString(),
              generalUrbanRetirementCompleteAnalysis:
                source.generalUrbanRetirementAnalysisResult
                  .generalUrbanRetirementCompleteAnalysis ?? null,
              generalUrbanRetirementCompleteAnalysisDownload:
                source.generalUrbanRetirementAnalysisResult
                  .generalUrbanRetirementCompleteAnalysisDownload ?? null,
              generalUrbanRetirementSimplifiedAnalysis:
                source.generalUrbanRetirementAnalysisResult
                  .generalUrbanRetirementSimplifiedAnalysis ?? null,
              createdAt: source.generalUrbanRetirementAnalysisResult.createdAt,
              updatedAt: source.generalUrbanRetirementAnalysisResult.updatedAt,
              deletedAt:
                source.generalUrbanRetirementAnalysisResult.deletedAt ?? null,
              generalUrbanRetirementAnalysis: null,
            })
          : null;

      const remunerations = this.mapper.mapArray(
        source.remunerations,
        GetGeneralUrbanRetirementAnalysisRemunerationQueryResult,
        GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
      );

      const documents = this.mapper.mapArray(
        source.documents,
        GetGeneralUrbanRetirementAnalysisDocumentQueryResult,
        GeneralUrbanRetirementAnalysisDocumentTypeormEntity,
      );

      const legalProceedings = this.mapper.mapArray(
        source.legalProceedings,
        GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult,
        GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity,
      );

      return GeneralUrbanRetirementAnalysisTypeormEntity.build({
        id: source.id.toString(),
        careerStartDate: source.careerStartDate ?? null,
        publicServiceStartDate: source.publicServiceStartDate ?? null,
        generalUrbanRetirementBenefitAnalysis:
          source.generalUrbanRetirementBenefitAnalysis ?? null,
        federativeEntity: source.federativeEntity ?? null,
        state: source.state ?? null,
        municipality: source.municipality ?? null,
        name: source.name ?? null,
        benefitType: source.benefitType ?? null,
        currentPosition: source.currentPosition ?? null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
        generalUrbanRetirementAnalysisResult,
        remunerations,
        documents,
        legalProceedings,
        analysisToolRecord: null,
        periods: null,
        periodDocuments: null,
      });
    };

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult,
      GeneralUrbanRetirementAnalysisTypeormEntity,
      constructUsing(convertQueryResultToOrmEntity),
    );
  }
}
