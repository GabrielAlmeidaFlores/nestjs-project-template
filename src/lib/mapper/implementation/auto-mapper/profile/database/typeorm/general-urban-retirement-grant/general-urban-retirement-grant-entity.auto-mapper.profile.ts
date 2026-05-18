import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-result.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';

@Injectable()
export class GeneralUrbanRetirementGrantEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementGrantEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementGrantTypeormEntity,
    ): GeneralUrbanRetirementGrantEntity => {
      const generalUrbanRetirementGrantResult =
        source.generalUrbanRetirementGrantResult !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementGrantResult,
              GeneralUrbanRetirementGrantResultTypeormEntity,
              GeneralUrbanRetirementGrantResultEntity,
            )
          : null;

      return new GeneralUrbanRetirementGrantEntity({
        ...source,
        id: new GeneralUrbanRetirementGrantId(source.id),
        generalUrbanRetirementGrantResult,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantTypeormEntity,
      GeneralUrbanRetirementGrantEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementGrantEntity,
    ): GeneralUrbanRetirementGrantTypeormEntity => {
      const generalUrbanRetirementGrantResult =
        source.generalUrbanRetirementGrantResult !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrantResult,
              GeneralUrbanRetirementGrantResultEntity,
              GeneralUrbanRetirementGrantResultTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementGrantTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementGrantResult,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantEntity,
      GeneralUrbanRetirementGrantTypeormEntity,
      mappingFunction,
    );
  }
}
