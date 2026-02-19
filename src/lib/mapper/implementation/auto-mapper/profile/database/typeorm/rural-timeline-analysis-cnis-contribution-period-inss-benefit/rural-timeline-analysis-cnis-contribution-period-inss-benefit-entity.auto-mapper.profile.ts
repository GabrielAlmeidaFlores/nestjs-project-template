import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisCnisContributionPeriodInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-inss-benefit.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-inss-benefit/rural-timeline-analysis-cnis-contribution-period-inss-benefit.entity';
import { RuralTimelineAnalysisCnisContributionPeriodInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-inss-benefit/value-object/rural-timeline-analysis-cnis-contribution-period-inss-benefit-id/rural-timeline-analysis-cnis-contribution-period-inss-benefit-id.value-object';

@Injectable()
export class RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodInssBenefitTypeormEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntity => {
      const ruralTimelineCnisContributionPeriod = this.mapper.map(
        source.ruralTimelineCnisContributionPeriod,
        RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
        RuralTimelineAnalysisCnisContributionPeriodEntity,
      );

      return new RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntity({
        ...source,
        id: new RuralTimelineAnalysisCnisContributionPeriodInssBenefitId(
          source.id,
        ),
        ruralTimelineCnisContributionPeriodId:
          ruralTimelineCnisContributionPeriod.id,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodInssBenefitTypeormEntity,
      RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntity,
    ): RuralTimelineAnalysisCnisContributionPeriodInssBenefitTypeormEntity => {
      return RuralTimelineAnalysisCnisContributionPeriodInssBenefitTypeormEntity.build(
        {
          id: source.id.toString(),
          inssBenefitNumber: source.inssBenefitNumber,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
          ruralTimelineCnisContributionPeriod: {
            id: source.ruralTimelineCnisContributionPeriodId.toString(),
          } as unknown as RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RuralTimelineAnalysisCnisContributionPeriodInssBenefitEntity,
      RuralTimelineAnalysisCnisContributionPeriodInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
