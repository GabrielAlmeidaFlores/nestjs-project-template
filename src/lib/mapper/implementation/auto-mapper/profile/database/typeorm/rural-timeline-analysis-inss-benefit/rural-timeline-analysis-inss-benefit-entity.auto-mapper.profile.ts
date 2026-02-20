import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-inss-benefit.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
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
      const ruralTimelineAnalysis = this.mapper.map(
        source.ruralTimelineAnalysis,
        RuralTimelineAnalysisTypeormEntity,
        RuralTimelineAnalysisEntity,
      );

      return new RuralTimelineAnalysisInssBenefitEntity({
        id: new RuralTimelineAnalysisInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        ruralTimelineAnalysis,
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
      const ruralTimelineAnalysis = this.mapper.map(
        source.ruralTimelineAnalysis,
        RuralTimelineAnalysisEntity,
        RuralTimelineAnalysisTypeormEntity,
      );

      return RuralTimelineAnalysisInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
        ruralTimelineAnalysis,
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
