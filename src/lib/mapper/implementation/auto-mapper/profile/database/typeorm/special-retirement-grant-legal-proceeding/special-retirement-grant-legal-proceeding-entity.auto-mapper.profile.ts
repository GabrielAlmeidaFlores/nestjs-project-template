import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-legal-proceeding.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding.entity';
import { SpecialRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/value-object/special-retirement-grant-legal-proceeding-id/special-retirement-grant-legal-proceeding-id.value-object';

@Injectable()
export class SpecialRetirementGrantLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    SpecialRetirementGrantLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantLegalProceedingTypeormEntity,
    ): SpecialRetirementGrantLegalProceedingEntity => {
      if (!source.specialRetirementGrant) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpecialRetirementGrantLegalProceedingEntity.name,
          sourceClass: SpecialRetirementGrantLegalProceedingTypeormEntity.name,
        });
      }

      return new SpecialRetirementGrantLegalProceedingEntity({
        ...source,
        id: new SpecialRetirementGrantLegalProceedingId(source.id),
        specialRetirementGrant: this.mapper.map(
          source.specialRetirementGrant,
          SpecialRetirementGrantTypeormEntity,
          SpecialRetirementGrantEntity,
        ),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantLegalProceedingTypeormEntity,
      SpecialRetirementGrantLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialRetirementGrantLegalProceedingEntity,
    ): SpecialRetirementGrantLegalProceedingTypeormEntity => {
      return SpecialRetirementGrantLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialRetirementGrant: {
          id: source.specialRetirementGrant.id.toString(),
        } as SpecialRetirementGrantTypeormEntity,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantLegalProceedingEntity,
      SpecialRetirementGrantLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
