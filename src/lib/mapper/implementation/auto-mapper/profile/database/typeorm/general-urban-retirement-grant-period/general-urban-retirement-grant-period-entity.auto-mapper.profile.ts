import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantPeriodEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementGrantPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementGrantPeriodTypeormEntity,
    ): GeneralUrbanRetirementGrantPeriodEntity => {
      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== undefined &&
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantTypeormEntity,
              GeneralUrbanRetirementGrantEntity,
            )
          : null;

      const contributionAverage =
        source.contributionAverage !== null
          ? new DecimalValue(source.contributionAverage)
          : null;

      return new GeneralUrbanRetirementGrantPeriodEntity({
        id: new GeneralUrbanRetirementGrantPeriodId(source.id),
        periodName: source.periodName,
        periodStart: source.periodStart,
        periodEnd: source.periodEnd,
        category: source.category,
        isPendency: source.isPendency,
        reasonPendency: source.reasonPendency,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        contributionAverage,
        typeOfContribution: source.typeOfContribution,
        generalUrbanRetirementGrant,
        status: source.status,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantPeriodTypeormEntity,
      GeneralUrbanRetirementGrantPeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementGrantPeriodEntity,
    ): GeneralUrbanRetirementGrantPeriodTypeormEntity => {
      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantEntity,
              GeneralUrbanRetirementGrantTypeormEntity,
            )
          : null;

      const contributionAverage =
        source.contributionAverage !== null
          ? source.contributionAverage.toString()
          : null;

      return GeneralUrbanRetirementGrantPeriodTypeormEntity.build({
        id: source.id.toString(),
        periodName: source.periodName,
        periodStart: source.periodStart,
        periodEnd: source.periodEnd,
        category: source.category,
        isPendency: source.isPendency,
        reasonPendency: source.reasonPendency,
        competenceBelowTheMinimum: source.competenceBelowTheMinimum,
        contributionAverage,
        typeOfContribution: source.typeOfContribution,
        generalUrbanRetirementGrant,
        status: source.status,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantPeriodEntity,
      GeneralUrbanRetirementGrantPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
