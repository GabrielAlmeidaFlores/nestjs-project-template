import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding.entity';
import { GeneralUrbanRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/value-object/general-urban-retirement-grant-legal-proceeding-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementGrantLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementGrantLegalProceedingTypeormEntity,
    ): GeneralUrbanRetirementGrantLegalProceedingEntity => {
      if (!source.generalUrbanRetirementGrant) {
        throw new Error(
          'generalUrbanRetirementGrant is required for GeneralUrbanRetirementGrantLegalProceedingEntity',
        );
      }

      const generalUrbanRetirementGrant = this.mapper.map(
        source.generalUrbanRetirementGrant,
        GeneralUrbanRetirementGrantTypeormEntity,
        GeneralUrbanRetirementGrantEntity,
      );

      return new GeneralUrbanRetirementGrantLegalProceedingEntity({
        ...source,
        id: new GeneralUrbanRetirementGrantLegalProceedingId(source.id),
        generalUrbanRetirementGrant,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantLegalProceedingTypeormEntity,
      GeneralUrbanRetirementGrantLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementGrantLegalProceedingEntity,
    ): GeneralUrbanRetirementGrantLegalProceedingTypeormEntity => {
      const generalUrbanRetirementGrant = this.mapper.map(
        source.generalUrbanRetirementGrant,
        GeneralUrbanRetirementGrantEntity,
        GeneralUrbanRetirementGrantTypeormEntity,
      );

      return GeneralUrbanRetirementGrantLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementGrant,
      } as any);
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantLegalProceedingEntity,
      GeneralUrbanRetirementGrantLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
