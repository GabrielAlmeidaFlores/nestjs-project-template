import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-inss-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/rural-timeline-analysis-inss-benefit.entity';
import { RuralTimelineAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/value-object/rural-timeline-analysis-inss-benefit-id/rural-timeline-analysis-inss-benefit-id.value-object';

@Injectable()
export class RuralTimelineAnalysisInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisInssBenefitTypeormEntity,
    ): RuralTimelineAnalysisInssBenefitEntity => {
      if (!source.ruralTimelineAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: RuralTimelineAnalysisInssBenefitEntity.name,
          sourceClass: RuralTimelineAnalysisInssBenefitTypeormEntity.name,
        });
      }

      return new RuralTimelineAnalysisInssBenefitEntity({
        id: new RuralTimelineAnalysisInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        ruralTimelineAnalysisId: new RuralTimelineAnalysisId(
          source.ruralTimelineAnalysis.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisInssBenefitTypeormEntity,
      RuralTimelineAnalysisInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisInssBenefitEntity,
    ): RuralTimelineAnalysisInssBenefitTypeormEntity => {
      return RuralTimelineAnalysisInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        ruralTimelineAnalysis: undefined,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisInssBenefitEntity,
      RuralTimelineAnalysisInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
