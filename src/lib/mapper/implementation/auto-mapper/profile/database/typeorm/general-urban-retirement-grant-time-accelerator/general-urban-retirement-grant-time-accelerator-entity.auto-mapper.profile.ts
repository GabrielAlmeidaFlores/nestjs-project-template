import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-time-accelerator.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/general-urban-retirement-grant-time-accelerator.entity';
import { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantTimeAcceleratorEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementGrantTimeAcceleratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
    ): GeneralUrbanRetirementGrantTimeAcceleratorEntity => {
      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== undefined &&
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantTypeormEntity,
              GeneralUrbanRetirementGrantEntity,
            )
          : null;

      return new GeneralUrbanRetirementGrantTimeAcceleratorEntity({
        ...source,
        id: new GeneralUrbanRetirementGrantTimeAcceleratorId(source.id),
        generalUrbanRetirementGrant,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
      GeneralUrbanRetirementGrantTimeAcceleratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementGrantTimeAcceleratorEntity,
    ): GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity => {
      const generalUrbanRetirementGrant =
        source.generalUrbanRetirementGrant !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrant,
              GeneralUrbanRetirementGrantEntity,
              GeneralUrbanRetirementGrantTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementGrant: generalUrbanRetirementGrant ?? null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantTimeAcceleratorEntity,
      GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
      mappingFunction,
    );
  }
}
