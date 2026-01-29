import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import {
  GetRuralTimelineAnalysisWithRelationsQueryResult,
  GetRuralTimelineAnalysisPeriodQueryResult,
  GetRuralTimelineAnalysisPeriodDocumentQueryResult,
  GetRuralTimelineAnalysisPeriodResidenceQueryResult,
  GetRuralTimelineAnalysisPeriodPropertyQueryResult,
  GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult,
  GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult,
  GetRuralTimelineAnalysisDocumentQueryResult,
  GetRuralTimelineAnalysisCnisContributionPeriodQueryResult,
  GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult,
} from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

@Injectable()
export class RuralTimelineAnalysisEntityAutoMapperProfile {
  protected readonly _type = RuralTimelineAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisTypeormEntity,
    ): RuralTimelineAnalysisEntity => {
      const analysisToolRecord = this.mapper.map(
        source.analysisToolRecord,
        AnalysisToolRecordTypeormEntity,
        AnalysisToolRecordEntity,
      );

      return new RuralTimelineAnalysisEntity({
        ...source,
        id: new RuralTimelineAnalysisId(source.id),
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisTypeormEntity,
      RuralTimelineAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisEntity,
    ): RuralTimelineAnalysisTypeormEntity => {
      return RuralTimelineAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisEntity,
      RuralTimelineAnalysisTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: RuralTimelineAnalysisTypeormEntity,
    ): GetRuralTimelineAnalysisWithRelationsQueryResult => {
      const periods = (source.ruralTimelinePeriod ?? []).map((period) => {
        const documents = (period.ruralTimelinePeriodDocument ?? []).map(
          (doc) =>
            GetRuralTimelineAnalysisPeriodDocumentQueryResult.build({
              id: doc.id,
              documentYear: doc.documentYear ?? null,
              documentHolderType: doc.documentHolderType ?? null,
              selfOwned: doc.selfOwned ?? null,
              probatoryPurpose: doc.probatoryPurpose ?? null,
              document: doc.document,
              type: doc.type,
            }),
        );

        const residence = period.ruralTimelinePeriodResidence
          ? GetRuralTimelineAnalysisPeriodResidenceQueryResult.build({
              city: period.ruralTimelinePeriodResidence.city,
              stateCode: period.ruralTimelinePeriodResidence.stateCode,
              distanceToPropertyKm: new DecimalValue(
                period.ruralTimelinePeriodResidence.distanceToPropertyKm,
              ),
            })
          : null;

        const property = period.ruralTimelinePeriodProperty
          ? GetRuralTimelineAnalysisPeriodPropertyQueryResult.build({
              propertyName: period.ruralTimelinePeriodProperty.propertyName,
              ownerName: period.ruralTimelinePeriodProperty.ownerName,
              postalCode: period.ruralTimelinePeriodProperty.postalCode,
              stateCode: period.ruralTimelinePeriodProperty.stateCode,
              city: period.ruralTimelinePeriodProperty.city,
              neighborhood: period.ruralTimelinePeriodProperty.neighborhood,
              street: period.ruralTimelinePeriodProperty.street,
              streetNumber: period.ruralTimelinePeriodProperty.streetNumber,
              landOwnershipType:
                period.ruralTimelinePeriodProperty.landOwnershipType,
            })
          : null;

        const economicAspects = (
          period.ruralTimelinePeriodEconomicAspects ?? []
        ).map((aspect) =>
          GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult.build({
            type: aspect.type,
            content: aspect.content ?? null,
          }),
        );

        const familyGroupMembers = (
          period.ruralTimelinePeriodFamilyGroupMember ?? []
        ).map((member) =>
          GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult.build({
            name: member.name,
            federalDocument: new FederalDocument(member.federalDocument),
            kinship: member.kinship,
            receivesRuralBenefit: member.receivesRuralBenefit,
            benefitNumber: member.benefitNumber,
            cnisDocument: member.cnisDocument ?? null,
          }),
        );

        return GetRuralTimelineAnalysisPeriodQueryResult.build({
          id: new RuralTimelineAnalysisPeriodId(period.id),
          startDate: period.startDate,
          endDate: period.endDate,
          workerType: period.workerType,
          workRegimeType: period.workRegimeType,
          productionDestination: period.productionDestination ?? null,
          documentAnalysis: period.documentAnalysis ?? null,
          ruralTimelineAnalysisPeriodDocument: documents,
          ruralTimelineAnalysisPeriodResidence: residence,
          ruralTimelineAnalysisPeriodProperty: property,
          ruralTimelineAnalysisPeriodEconomicAspects: economicAspects,
          ruralTimelineAnalysisPeriodFamilyGroupMember: familyGroupMembers,
        });
      });

      const cnisDocuments = (source.ruralTimelineDocument ?? []).map((doc) =>
        GetRuralTimelineAnalysisDocumentQueryResult.build({
          id: doc.id,
          type: doc.type,
          document: doc.document,
        }),
      );

      const cnisContributionPeriods = (
        source.ruralTimelineCnisContributionPeriod ?? []
      ).map((period) => {
        const underMinimumPeriods = (
          period.ruralTimelineCnisContributionPeriodUnderMinimum ?? []
        ).map((underMin) =>
          GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult.build(
            {
              contributionDate: underMin.contributionDate,
              contributionAmount: new DecimalValue(underMin.contributionAmount),
            },
          ),
        );

        return GetRuralTimelineAnalysisCnisContributionPeriodQueryResult.build({
          employmentRelationshipSource:
            period.employmentRelationshipSource ?? null,
          startDate: period.startDate ?? null,
          endDate: period.endDate ?? null,
          category: period.category ?? null,
          qualifyingPeriod: period.qualifyingPeriod ?? null,
          status: period.status ?? null,
          averageContributionAmount:
            period.averageContributionAmount !== null &&
            period.averageContributionAmount !== undefined
              ? new DecimalValue(period.averageContributionAmount)
              : null,
          contributionAdjustmentIntent: period.contributionAdjustmentIntent,
          externalSupplementationIntent: period.externalSupplementationIntent,
          ruralTimelineCnisContributionPeriodUnderMinimum: underMinimumPeriods,
        });
      });

      return GetRuralTimelineAnalysisWithRelationsQueryResult.build({
        id: new RuralTimelineAnalysisId(source.id),
        ruralTimelineAnalysis: source.ruralTimelineAnalysis ?? null,
        ruralTimelinePeriodDocumentAnalysis:
          source.ruralTimelinePeriodDocumentAnalysis ?? null,
        workRegime: source.workRegime,
        periods: periods,
        ruralTimelineAnalysisPeriod: periods,
        ruralTimelineDocument: cnisDocuments,
        ruralTimelineCnisContributionPeriod: cnisContributionPeriods,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      RuralTimelineAnalysisTypeormEntity,
      GetRuralTimelineAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }
}
