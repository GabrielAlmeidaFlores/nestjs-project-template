import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-special-period.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantSpecialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/general-urban-retirement-grant-special-period.entity';
import { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantSpecialPeriodEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementGrantSpecialPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
    ): GeneralUrbanRetirementGrantSpecialPeriodEntity => {
      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== undefined &&
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantTypeormEntity,
              GeneralUrbanRetirementGrantEntity,
            )
          : null;

      return new GeneralUrbanRetirementGrantSpecialPeriodEntity({
        ...source,
        id: new GeneralUrbanRetirementGrantSpecialPeriodId(source.id),
        generalUrbanRetirementGrant,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
      GeneralUrbanRetirementGrantSpecialPeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementGrantSpecialPeriodEntity,
    ): GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity => {
      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantEntity,
              GeneralUrbanRetirementGrantTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementGrant: generalUrbanRetirementGrant ?? null,
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantSpecialPeriodEntity,
      GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
