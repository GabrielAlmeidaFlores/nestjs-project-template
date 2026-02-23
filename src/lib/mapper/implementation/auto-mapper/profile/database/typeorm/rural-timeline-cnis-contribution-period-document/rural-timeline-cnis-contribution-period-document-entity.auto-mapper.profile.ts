import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineCnisContributionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-document.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineCnisContributionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.entity';
import { RuralTimelineCnisContributionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/value-object/rural-timeline-cnis-contribution-period-document-id/rural-timeline-cnis-contribution-period-document-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineCnisContributionPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
    ): RuralTimelineCnisContributionPeriodDocumentEntity => {
      if (!source.ruralTimelineCnisContributionPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RuralTimelineCnisContributionPeriodDocumentEntity.name,
          sourceClass:
            RuralTimelineCnisContributionPeriodDocumentTypeormEntity.name,
        });
      }

      return new RuralTimelineCnisContributionPeriodDocumentEntity({
        id: new RuralTimelineCnisContributionPeriodDocumentId(source.id),
        ruralTimelineCnisContributionPeriodId:
          new RuralTimelineAnalysisCnisContributionPeriodId(
            source.ruralTimelineCnisContributionPeriod.id,
          ),
        type: source.type,
        document: source.document,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
      RuralTimelineCnisContributionPeriodDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineCnisContributionPeriodDocumentEntity,
    ): RuralTimelineCnisContributionPeriodDocumentTypeormEntity => {
      return RuralTimelineCnisContributionPeriodDocumentTypeormEntity.build({
        id: source.id.toString(),
        type: source.type,
        document: source.document,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineCnisContributionPeriodDocumentEntity,
      RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
