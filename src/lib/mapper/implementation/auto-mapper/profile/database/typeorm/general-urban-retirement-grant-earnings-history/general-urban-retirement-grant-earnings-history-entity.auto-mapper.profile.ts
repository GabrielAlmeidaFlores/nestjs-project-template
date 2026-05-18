import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-earnings-history.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/general-urban-retirement-grant-earnings-history.entity';
import { GeneralUrbanRetirementGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/value-object/general-urban-retirement-grant-earnings-history-id.value-object';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';

@Injectable()
export class GeneralUrbanRetirementGrantEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementGrantEarningsHistoryEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity,
    ): GeneralUrbanRetirementGrantEarningsHistoryEntity => {
      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== undefined &&
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantTypeormEntity,
              GeneralUrbanRetirementGrantEntity,
            )
          : null;

      const generalUrbanRetirementGrantPeriod =
        source.generalUrbanRetirementGrantPeriod !== undefined &&
        source.generalUrbanRetirementGrantPeriod !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrantPeriod,
              GeneralUrbanRetirementGrantPeriodTypeormEntity,
              GeneralUrbanRetirementGrantPeriodEntity,
            )
          : null;

      return new GeneralUrbanRetirementGrantEarningsHistoryEntity({
        ...source,
        id: new GeneralUrbanRetirementGrantEarningsHistoryId(source.id),
        generalUrbanRetirementGrant,
        generalUrbanRetirementGrantPeriod,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity,
      GeneralUrbanRetirementGrantEarningsHistoryEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementGrantEarningsHistoryEntity,
    ): GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity => {
      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantEntity,
              GeneralUrbanRetirementGrantTypeormEntity,
            )
          : undefined;

      const generalUrbanRetirementGrantPeriod =
        source.generalUrbanRetirementGrantPeriod !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrantPeriod,
              GeneralUrbanRetirementGrantPeriodEntity,
              GeneralUrbanRetirementGrantPeriodTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementGrant: generalUrbanRetirementGrant ?? null,
        generalUrbanRetirementGrantPeriod:
          generalUrbanRetirementGrantPeriod ?? null,
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantEarningsHistoryEntity,
      GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity,
      mappingFunction,
    );
  }
}
